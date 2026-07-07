import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '@meest/db';
import { findOrder } from '../data/orders.js';
import { newReturnId, newQrToken } from '../lib/ids.js';

const lookupSchema = z.object({
  orderNumber: z.string().min(3),
  email: z.string().optional().default(''),
});

const createReturnSchema = z.object({
  orderNumber: z.string().min(3),
  email: z.string().optional().default(''),
  skus: z.array(z.string()).min(1),
  reason: z.enum(['WRONG_SIZE', 'NOT_AS_DESCRIBED', 'LOW_QUALITY', 'CHANGED_MIND', 'DAMAGED', 'OTHER']),
  reasonComment: z.string().optional(),
  pudoPointId: z.string().min(1),
});

export async function returnsRoutes(app: FastifyInstance) {
  // 1. Klient podaje numer zamowienia -> produkty do wyboru
  app.post('/api/orders/lookup', async (req, reply) => {
    const body = lookupSchema.parse(req.body);
    const order = findOrder(body.orderNumber, body.email);
    if (!order) {
      return reply.code(404).send({ error: 'ORDER_NOT_FOUND', message: 'Nie znaleziono zamówienia. Sprawdź numer i email.' });
    }
    const merchant = await prisma.merchant.findUnique({ where: { email: order.merchantEmail } });
    return {
      orderNumber: order.orderNumber,
      placedAt: order.placedAt,
      merchant: merchant ? { id: merchant.id, name: merchant.name } : null,
      items: order.items,
    };
  });

  // 2. Lista punktow PUDO
  app.get('/api/pudo-points', async (req) => {
    const { city } = (req.query ?? {}) as { city?: string };
    const points = await prisma.pudoPoint.findMany({
      where: { active: true, ...(city ? { city: { equals: city, mode: 'insensitive' } } : {}) },
      orderBy: { city: 'asc' },
    });
    return points.map((p) => ({
      id: p.id, code: p.code, name: p.name, address: p.address, city: p.city,
      postalCode: p.postalCode, latitude: Number(p.latitude), longitude: Number(p.longitude),
      openingHours: p.openingHours,
    }));
  });

  // 3. Utworzenie zwrotu -> kod QR
  app.post('/api/returns', async (req, reply) => {
    const body = createReturnSchema.parse(req.body);
    const order = findOrder(body.orderNumber, body.email);
    if (!order) return reply.code(404).send({ error: 'ORDER_NOT_FOUND' });

    const merchant = await prisma.merchant.findUnique({ where: { email: order.merchantEmail } });
    if (!merchant) return reply.code(500).send({ error: 'MERCHANT_NOT_ONBOARDED' });

    const point = await prisma.pudoPoint.findUnique({ where: { id: body.pudoPointId } });
    if (!point) return reply.code(404).send({ error: 'PUDO_POINT_NOT_FOUND' });

    const items = order.items.filter((i) => body.skus.includes(i.sku));
    if (items.length === 0) return reply.code(400).send({ error: 'NO_ITEMS_SELECTED' });

    const refundAmount = items.reduce((s, i) => s + i.price, 0);
    const consumerEmail = order.email;

    const consumer =
      (await prisma.consumer.findFirst({ where: { email: consumerEmail } })) ??
      (await prisma.consumer.create({ data: { email: consumerEmail } }));

    const ret = await prisma.return.create({
      data: {
        returnId: newReturnId(),
        merchantId: merchant.id,
        merchantOrderId: order.orderNumber,
        consumerId: consumer.id,
        pudoPointId: point.id,
        reason: body.reason,
        reasonComment: body.reasonComment,
        refundAmount,
        qrToken: newQrToken(),
        productSnapshot: items as object,
        events: {
          create: [
            { eventType: 'INITIATED', actorType: 'CONSUMER', metadata: { orderNumber: order.orderNumber } },
            { eventType: 'QR_GENERATED', actorType: 'SYSTEM', metadata: {} },
          ],
        },
      },
    });

    return reply.code(201).send({
      returnId: ret.returnId,
      qrToken: ret.qrToken,
      qrExpiresAt: ret.qrExpiresAt,
      refundAmount: Number(ret.refundAmount),
      status: ret.status,
      pudoPoint: { name: point.name, address: point.address, city: point.city, code: point.code },
      merchantName: merchant.name,
      items,
    });
  });

  // 4. Tracking dla klienta
  app.get('/api/returns/:returnId', async (req, reply) => {
    const { returnId } = req.params as { returnId: string };
    const ret = await prisma.return.findUnique({
      where: { returnId: returnId.toUpperCase() },
      include: {
        events: { orderBy: { createdAt: 'asc' } },
        pudoPoint: true,
        merchant: true,
        refund: true,
      },
    });
    if (!ret) return reply.code(404).send({ error: 'RETURN_NOT_FOUND' });
    return {
      returnId: ret.returnId,
      status: ret.status,
      refundStatus: ret.refundStatus,
      refundAmount: Number(ret.refundAmount),
      merchantName: ret.merchant.name,
      merchantOrderId: ret.merchantOrderId,
      qrToken: ret.qrToken,
      qrExpiresAt: ret.qrExpiresAt,
      items: ret.productSnapshot,
      pudoPoint: { name: ret.pudoPoint.name, address: ret.pudoPoint.address, city: ret.pudoPoint.city },
      createdAt: ret.createdAt,
      droppedOffAt: ret.droppedOffAt,
      completedAt: ret.completedAt,
      refund: ret.refund
        ? { status: ret.refund.status, amount: Number(ret.refund.amount), processedAt: ret.refund.processedAt }
        : null,
      timeline: ret.events.map((e) => ({ type: e.eventType, at: e.createdAt })),
    };
  });
}
