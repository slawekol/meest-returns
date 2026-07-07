import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '@meest/db';
import { newBagCode } from '../lib/ids.js';

const verifySchema = z.object({ code: z.string().min(4) });

async function getOrOpenBag(pudoPointId: string) {
  const point = await prisma.pudoPoint.findUniqueOrThrow({ where: { id: pudoPointId } });
  if (point.currentBagId) {
    const bag = await prisma.bag.findUnique({ where: { id: point.currentBagId } });
    if (bag && bag.status === 'OPEN') return bag;
  }
  const bag = await prisma.bag.create({
    data: { bagCode: newBagCode(point.code), pudoPointId: point.id },
  });
  await prisma.pudoPoint.update({ where: { id: point.id }, data: { currentBagId: bag.id } });
  return bag;
}

export async function pudoRoutes(app: FastifyInstance) {
  // Ostatni zainicjowany zwrot (do "Symuluj wykrycie kodu" w demo)
  app.get('/api/pudo/latest-initiated', async (_req, reply) => {
    const ret = await prisma.return.findFirst({
      where: { status: 'INITIATED' },
      orderBy: { createdAt: 'desc' },
    });
    if (!ret) return reply.code(404).send({ error: 'NO_INITIATED_RETURNS' });
    return { returnId: ret.returnId };
  });

  // Operator skanuje QR lub wpisuje kod recznie.
  // Przyjmujemy returnId (RTN-...) albo qrToken.
  app.post('/api/pudo/verify', async (req, reply) => {
    const { code } = verifySchema.parse(req.body);
    const c = code.trim();
    const ret = await prisma.return.findFirst({
      where: { OR: [{ returnId: c.toUpperCase() }, { qrToken: c }] },
      include: { merchant: true, consumer: true, pudoPoint: true },
    });
    if (!ret) return reply.code(404).send({ error: 'RETURN_NOT_FOUND', message: 'Nie znaleziono zwrotu o tym kodzie.' });
    if (ret.status !== 'INITIATED') {
      return reply.code(409).send({ error: 'ALREADY_PROCESSED', message: `Zwrot ma status ${ret.status}.`, returnId: ret.returnId, status: ret.status });
    }
    if (ret.qrExpiresAt < new Date()) {
      return reply.code(410).send({ error: 'QR_EXPIRED', message: 'Kod QR wygasł.' });
    }
    await prisma.returnEvent.create({
      data: { returnId: ret.id, eventType: 'SCANNED_AT_PUDO', actorType: 'OPERATOR', metadata: {} },
    });
    return {
      returnId: ret.returnId,
      merchantName: ret.merchant.name,
      merchantOrderId: ret.merchantOrderId,
      consumerEmail: ret.consumer.email,
      consumerScore: Number(ret.consumer.score),
      consumerFlagged: ret.consumer.flagged,
      refundAmount: Number(ret.refundAmount),
      refundPolicy: ret.merchant.refundPolicy,
      reason: ret.reason,
      items: ret.productSnapshot,
      checklist: [
        'Produkt ma oryginalne metki',
        'Brak śladów użytkowania',
        'Zgodność z listą produktów',
      ],
    };
  });

  // Przyjecie zwrotu do kontenera -> natychmiastowy refund
  app.post('/api/pudo/returns/:returnId/accept', async (req, reply) => {
    const { returnId } = req.params as { returnId: string };
    const ret = await prisma.return.findUnique({
      where: { returnId: returnId.toUpperCase() },
      include: { merchant: true, consumer: true },
    });
    if (!ret) return reply.code(404).send({ error: 'RETURN_NOT_FOUND' });
    if (ret.status !== 'INITIATED') return reply.code(409).send({ error: 'ALREADY_PROCESSED', status: ret.status });

    const bag = await getOrOpenBag(ret.pudoPointId);
    const now = new Date();
    const instant = ret.merchant.refundPolicy === 'INSTANT_AT_PUDO' && !ret.consumer.flagged;

    const feeRate = 0.015; // prowizja finansowania refundu (wariant faktoringowy)
    const amount = Number(ret.refundAmount);
    const fee = Math.round(amount * feeRate * 100) / 100;

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.return.update({
        where: { id: ret.id },
        data: {
          status: 'DROPPED_OFF',
          droppedOffAt: now,
          bagId: bag.id,
          refundStatus: instant ? 'RELEASED' : 'RESERVED',
        },
      });

      await tx.returnEvent.createMany({
        data: [
          { returnId: ret.id, eventType: 'ACCEPTED_AT_PUDO', actorType: 'OPERATOR', metadata: { bagCode: bag.bagCode } },
          ...(instant
            ? [
                { returnId: ret.id, eventType: 'REFUND_TRIGGERED', actorType: 'SYSTEM' as const, metadata: {} },
                { returnId: ret.id, eventType: 'REFUND_COMPLETED', actorType: 'SYSTEM' as const, metadata: { amount } },
              ]
            : []),
        ],
      });

      let refund = null;
      if (instant) {
        refund = await tx.refund.create({
          data: {
            returnId: ret.id, amount, status: 'COMPLETED', method: 'CARD',
            merchantTransactionId: `TXN-${Date.now()}`, processedAt: now,
          },
        });
        const newBalance = Number(ret.merchant.depositBalance) - amount - fee;
        await tx.merchant.update({ where: { id: ret.merchantId }, data: { depositBalance: newBalance } });
        await tx.depositTransaction.createMany({
          data: [
            { merchantId: ret.merchantId, type: 'REFUND_PAYOUT', amount: -amount, balanceAfter: newBalance + fee, returnId: ret.id, description: `Refund ${ret.returnId}` },
            { merchantId: ret.merchantId, type: 'FEE', amount: -fee, balanceAfter: newBalance, returnId: ret.id, description: `Prowizja finansowania 1,5% (${ret.returnId})` },
          ],
        });
      }

      await tx.consumer.update({
        where: { id: ret.consumerId },
        data: { returnsCount: { increment: 1 } },
      });

      const webhookPayload = {
        event: instant ? 'return.refunded' : 'return.dropped_off',
        returnId: ret.returnId,
        orderId: ret.merchantOrderId,
        amount,
        currency: 'PLN',
        occurredAt: now.toISOString(),
      };
      await tx.webhookDelivery.create({
        data: {
          merchantId: ret.merchantId, returnId: ret.id,
          url: ret.merchant.webhookUrl ?? 'https://demo.webhook.local/meest',
          payload: webhookPayload, responseStatus: 200, attemptCount: 1,
          lastAttemptAt: now, status: 'DELIVERED',
        },
      });

      return { updated, refund };
    });

    const bagCount = await prisma.return.count({ where: { bagId: bag.id } });

    return {
      returnId: ret.returnId,
      status: result.updated.status,
      refund: instant
        ? { status: 'COMPLETED', amount, processedAt: now, feeCharged: fee }
        : { status: 'RESERVED', amount, note: 'Refund po weryfikacji w hubie (24-48h)' },
      bag: { bagCode: bag.bagCode, count: bagCount, capacity: bag.capacity },
      consumerEmail: ret.consumer.email,
    };
  });

  // Odrzucenie zwrotu w punkcie
  app.post('/api/pudo/returns/:returnId/reject', async (req, reply) => {
    const { returnId } = req.params as { returnId: string };
    const { reason } = (req.body ?? {}) as { reason?: string };
    const ret = await prisma.return.findUnique({ where: { returnId: returnId.toUpperCase() } });
    if (!ret) return reply.code(404).send({ error: 'RETURN_NOT_FOUND' });
    if (ret.status !== 'INITIATED') return reply.code(409).send({ error: 'ALREADY_PROCESSED', status: ret.status });

    await prisma.$transaction([
      prisma.return.update({
        where: { id: ret.id },
        data: { status: 'REJECTED', rejectionReason: reason ?? 'Odrzucono w punkcie', refundStatus: 'CANCELLED' },
      }),
      prisma.returnEvent.create({
        data: { returnId: ret.id, eventType: 'REJECTED_AT_PUDO', actorType: 'OPERATOR', metadata: { reason: reason ?? null } },
      }),
      prisma.consumer.update({
        where: { id: ret.consumerId },
        data: { rejectionsCount: { increment: 1 } },
      }),
    ]);
    return { returnId: ret.returnId, status: 'REJECTED' };
  });

  // Dashboard punktu
  app.get('/api/pudo/points/:code/dashboard', async (req, reply) => {
    const { code } = req.params as { code: string };
    const point = await prisma.pudoPoint.findUnique({ where: { code: code.toUpperCase() } });
    if (!point) return reply.code(404).send({ error: 'POINT_NOT_FOUND' });

    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const bag = point.currentBagId
      ? await prisma.bag.findUnique({ where: { id: point.currentBagId }, include: { returns: { orderBy: { droppedOffAt: 'desc' } } } })
      : null;
    const todayCount = await prisma.return.count({
      where: { pudoPointId: point.id, droppedOffAt: { gte: startOfDay } },
    });
    const pendingPickup = await prisma.bag.count({ where: { pudoPointId: point.id, status: 'CLOSED' } });

    return {
      point: { code: point.code, name: point.name, city: point.city },
      todayAccepted: todayCount,
      bagsAwaitingPickup: pendingPickup,
      currentBag: bag
        ? {
            bagCode: bag.bagCode, capacity: bag.capacity, count: bag.returns.length,
            returns: bag.returns.map((r) => ({
              returnId: r.returnId, droppedOffAt: r.droppedOffAt, refundAmount: Number(r.refundAmount),
            })),
          }
        : null,
    };
  });

  // Zamkniecie kontenera (gotowy do odbioru)
  app.post('/api/pudo/points/:code/bag/close', async (req, reply) => {
    const { code } = req.params as { code: string };
    const point = await prisma.pudoPoint.findUnique({ where: { code: code.toUpperCase() } });
    if (!point || !point.currentBagId) return reply.code(404).send({ error: 'NO_OPEN_BAG' });
    const bag = await prisma.bag.update({
      where: { id: point.currentBagId },
      data: { status: 'CLOSED', closedAt: new Date() },
    });
    await prisma.pudoPoint.update({ where: { id: point.id }, data: { currentBagId: null } });
    await prisma.return.updateMany({ where: { bagId: bag.id }, data: { status: 'IN_TRANSIT' } });
    return { bagCode: bag.bagCode, status: 'CLOSED' };
  });
}
