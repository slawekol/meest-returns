import type { FastifyInstance } from 'fastify';
import { prisma } from '@meest/db';

// Demo-auth: naglowek x-api-key; bez niego bierzemy pierwszego merchanta
// (uproszczenie na potrzeby demo inwestorskiego).
async function resolveMerchant(apiKey?: string) {
  if (apiKey) {
    return prisma.merchant.findUnique({ where: { apiKey } });
  }
  return prisma.merchant.findFirst({ orderBy: { createdAt: 'asc' } });
}

export async function merchantRoutes(app: FastifyInstance) {
  app.get('/api/merchant/returns', async (req, reply) => {
    const merchant = await resolveMerchant(req.headers['x-api-key'] as string | undefined);
    if (!merchant) return reply.code(401).send({ error: 'UNKNOWN_MERCHANT' });
    const { status, limit } = (req.query ?? {}) as { status?: string; limit?: string };

    const returns = await prisma.return.findMany({
      where: { merchantId: merchant.id, ...(status ? { status: status as never } : {}) },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Number(limit ?? 50), 200),
      include: { consumer: true, pudoPoint: true, refund: true },
    });
    return {
      merchant: { name: merchant.name, depositBalance: Number(merchant.depositBalance) },
      returns: returns.map((r) => ({
        returnId: r.returnId,
        orderId: r.merchantOrderId,
        status: r.status,
        refundStatus: r.refundStatus,
        refundAmount: Number(r.refundAmount),
        reason: r.reason,
        consumerEmail: r.consumer.email,
        pudoPoint: `${r.pudoPoint.name}, ${r.pudoPoint.city}`,
        items: r.productSnapshot,
        createdAt: r.createdAt,
        droppedOffAt: r.droppedOffAt,
        refundProcessedAt: r.refund?.processedAt ?? null,
      })),
    };
  });

  app.get('/api/merchant/returns/:returnId', async (req, reply) => {
    const merchant = await resolveMerchant(req.headers['x-api-key'] as string | undefined);
    if (!merchant) return reply.code(401).send({ error: 'UNKNOWN_MERCHANT' });
    const { returnId } = req.params as { returnId: string };
    const r = await prisma.return.findFirst({
      where: { returnId: returnId.toUpperCase(), merchantId: merchant.id },
      include: { consumer: true, pudoPoint: true, refund: true, events: { orderBy: { createdAt: 'asc' } } },
    });
    if (!r) return reply.code(404).send({ error: 'RETURN_NOT_FOUND' });
    return {
      returnId: r.returnId,
      orderId: r.merchantOrderId,
      status: r.status,
      refundStatus: r.refundStatus,
      refundAmount: Number(r.refundAmount),
      reason: r.reason,
      reasonComment: r.reasonComment,
      consumer: { email: r.consumer.email, score: Number(r.consumer.score), returnsCount: r.consumer.returnsCount },
      pudoPoint: { name: r.pudoPoint.name, address: r.pudoPoint.address, city: r.pudoPoint.city },
      items: r.productSnapshot,
      refund: r.refund ? { status: r.refund.status, amount: Number(r.refund.amount), processedAt: r.refund.processedAt } : null,
      timeline: r.events.map((e) => ({ type: e.eventType, at: e.createdAt, meta: e.metadata })),
    };
  });

  app.get('/api/merchant/stats', async (req, reply) => {
    const merchant = await resolveMerchant(req.headers['x-api-key'] as string | undefined);
    if (!merchant) return reply.code(401).send({ error: 'UNKNOWN_MERCHANT' });

    const since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    const [total, inTransit, completedRefunds, byReason, recent] = await Promise.all([
      prisma.return.count({ where: { merchantId: merchant.id, createdAt: { gte: since } } }),
      prisma.return.count({ where: { merchantId: merchant.id, status: { in: ['DROPPED_OFF', 'IN_TRANSIT', 'AT_HUB', 'SORTED'] } } }),
      prisma.refund.aggregate({
        where: { return: { merchantId: merchant.id }, status: 'COMPLETED', createdAt: { gte: since } },
        _sum: { amount: true }, _count: true,
      }),
      prisma.return.groupBy({
        by: ['reason'], where: { merchantId: merchant.id, createdAt: { gte: since } }, _count: true,
      }),
      prisma.return.findMany({
        where: { merchantId: merchant.id },
        orderBy: { createdAt: 'desc' }, take: 14,
        select: { createdAt: true },
      }),
    ]);

    // srednia od utworzenia do refundu
    const refunds = await prisma.refund.findMany({
      where: { return: { merchantId: merchant.id }, status: 'COMPLETED' },
      include: { return: { select: { createdAt: true } } },
      take: 100, orderBy: { createdAt: 'desc' },
    });
    const avgMinutes = refunds.length
      ? Math.round(
          refunds.reduce((s, f) => s + ((f.processedAt ?? f.createdAt).getTime() - f.return.createdAt.getTime()), 0) /
            refunds.length / 60000,
        )
      : null;

    // wolumen dzienny (14 dni)
    const days: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 3600 * 1000);
      days[d.toISOString().slice(0, 10)] = 0;
    }
    const last14 = await prisma.return.findMany({
      where: { merchantId: merchant.id, createdAt: { gte: new Date(Date.now() - 14 * 24 * 3600 * 1000) } },
      select: { createdAt: true },
    });
    for (const r of last14) {
      const k = r.createdAt.toISOString().slice(0, 10);
      if (k in days) days[k] = (days[k] ?? 0) + 1;
    }

    return {
      merchant: { name: merchant.name, depositBalance: Number(merchant.depositBalance), refundPolicy: merchant.refundPolicy },
      last30days: {
        totalReturns: total,
        refundsCompleted: completedRefunds._count,
        refundsAmount: Number(completedRefunds._sum.amount ?? 0),
        inLogistics: inTransit,
        avgMinutesToRefund: avgMinutes,
      },
      byReason: byReason.map((r) => ({ reason: r.reason, count: r._count })),
      dailyVolume: Object.entries(days).map(([date, count]) => ({ date, count })),
      _recentDates: recent.map((r) => r.createdAt),
    };
  });
}
