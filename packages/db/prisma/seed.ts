// Seed danych demo: merchanci, punkty PUDO, historyczne zwroty.
// Uruchomienie: pnpm --filter @meest/db db:seed
import 'dotenv/config';
import { prisma } from '../src/index.js';
import { randomBytes } from 'node:crypto';

const AL = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const rc = (n: number) => Array.from(randomBytes(n)).map((b) => AL[b % AL.length]).join('');

async function main() {
  console.log('Seeding...');
  await prisma.$transaction([
    prisma.webhookDelivery.deleteMany(),
    prisma.depositTransaction.deleteMany(),
    prisma.consumerScoreEvent.deleteMany(),
    prisma.refund.deleteMany(),
    prisma.returnPhoto.deleteMany(),
    prisma.returnEvent.deleteMany(),
    prisma.return.deleteMany(),
    prisma.bag.deleteMany(),
    prisma.shipment.deleteMany(),
    prisma.pudoOperator.deleteMany(),
    prisma.pudoPoint.deleteMany(),
    prisma.consumer.deleteMany(),
    prisma.merchant.deleteMany(),
    prisma.hubOperator.deleteMany(),
  ]);

  const modivo = await prisma.merchant.create({
    data: {
      name: 'Modivo (pilot)', email: 'returns@modivo.demo', apiKey: 'demo-modivo-key',
      refundPolicy: 'INSTANT_AT_PUDO', depositBalance: 50000, depositMinimum: 10000,
      webhookUrl: null,
    },
  });
  const vestiro = await prisma.merchant.create({
    data: {
      name: 'Vestiro', email: 'zwroty@vestiro.demo', apiKey: 'demo-vestiro-key',
      refundPolicy: 'INSTANT_AT_PUDO', depositBalance: 20000,
    },
  });

  const hours = { 'pn-pt': '08:00-20:00', sb: '09:00-15:00', nd: 'zamknięte' };
  const points = await Promise.all([
    prisma.pudoPoint.create({ data: { code: 'MB-WAW-001', name: 'Meest Box — Kiosk Centrum', address: 'ul. Marszałkowska 104', city: 'Warszawa', postalCode: '00-017', latitude: 52.2319, longitude: 21.0067, openingHours: hours } }),
    prisma.pudoPoint.create({ data: { code: 'MB-WAW-002', name: 'Meest Box — Sklep Mokotów', address: 'ul. Puławska 152', city: 'Warszawa', postalCode: '02-670', latitude: 52.1934, longitude: 21.0245, openingHours: hours } }),
    prisma.pudoPoint.create({ data: { code: 'MB-WRO-001', name: 'Meest Box — Rynek', address: 'ul. Świdnicka 12', city: 'Wrocław', postalCode: '50-066', latitude: 51.1079, longitude: 17.0329, openingHours: hours } }),
    prisma.pudoPoint.create({ data: { code: 'MB-WRO-002', name: 'Meest Box — Krzyki', address: 'ul. Powstańców Śląskich 95', city: 'Wrocław', postalCode: '53-332', latitude: 51.0862, longitude: 17.0122, openingHours: hours } }),
  ]);

  for (const p of points) {
    await prisma.pudoOperator.create({ data: { pudoPointId: p.id, name: 'Operator ' + p.code, pinHash: 'demo' } });
  }

  // Historyczne zwroty (30 dni) - zeby dashboard i analytics zyly
  const products = [
    { sku: 'MOD-DRS-001', name: 'Czarna sukienka midi', size: 'M', color: 'Czarny', price: 199, imageUrl: '/placeholder-product.svg' },
    { sku: 'MOD-SHO-014', name: 'Sneakersy skórzane', size: '38', color: 'Biały', price: 349, imageUrl: '/placeholder-product.svg' },
    { sku: 'MOD-TSH-101', name: 'T-shirt basic', size: 'L', color: 'Szary', price: 89, imageUrl: '/placeholder-product.svg' },
    { sku: 'MOD-PNT-055', name: 'Spodnie chino slim', size: '32/32', color: 'Beżowy', price: 219, imageUrl: '/placeholder-product.svg' },
    { sku: 'MOD-JKT-007', name: 'Kurtka jeansowa', size: 'S', color: 'Niebieski', price: 279, imageUrl: '/placeholder-product.svg' },
  ];
  const reasons = ['WRONG_SIZE', 'WRONG_SIZE', 'WRONG_SIZE', 'CHANGED_MIND', 'NOT_AS_DESCRIBED', 'LOW_QUALITY'] as const;
  const emails = ['k.zielinska@example.com', 'p.wojcik@example.com', 'a.kaminski@example.com', 'm.lewandowska@example.com', 'j.szymanski@example.com', 'e.dabrowska@example.com'];

  const consumers = await Promise.all(
    emails.map((email) => prisma.consumer.create({ data: { email, returnsCount: 0, score: 4 + Math.random() } })),
  );

  let balance = 50000;
  for (let i = 0; i < 46; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const created = new Date(Date.now() - daysAgo * 24 * 3600 * 1000 - Math.random() * 8 * 3600 * 1000);
    const dropped = new Date(created.getTime() + (1 + Math.random() * 30) * 3600 * 1000);
    const item = products[i % products.length]!;
    const consumer = consumers[i % consumers.length]!;
    const point = points[i % points.length]!;
    const done = daysAgo > 3; // starsze zwroty sa zakonczone
    const status = done ? 'COMPLETED' : (['DROPPED_OFF', 'IN_TRANSIT', 'AT_HUB'] as const)[i % 3]!;

    const ret = await prisma.return.create({
      data: {
        returnId: `RTN-2026-${rc(4)}`,
        merchantId: modivo.id,
        merchantOrderId: `MOD-2026-${String(40000 + Math.floor(Math.random() * 20000)).padStart(7, '0')}`,
        consumerId: consumer.id,
        pudoPointId: point.id,
        status,
        reason: reasons[i % reasons.length]!,
        refundAmount: item.price,
        refundStatus: 'RELEASED',
        qrToken: rc(24),
        productSnapshot: [item],
        createdAt: created,
        droppedOffAt: dropped,
        completedAt: done ? new Date(dropped.getTime() + 48 * 3600 * 1000) : null,
        events: {
          create: [
            { eventType: 'INITIATED', actorType: 'CONSUMER', metadata: {}, createdAt: created },
            { eventType: 'ACCEPTED_AT_PUDO', actorType: 'OPERATOR', metadata: {}, createdAt: dropped },
            { eventType: 'REFUND_COMPLETED', actorType: 'SYSTEM', metadata: {}, createdAt: new Date(dropped.getTime() + 60000) },
          ],
        },
      },
    });
    await prisma.refund.create({
      data: {
        returnId: ret.id, amount: item.price, status: 'COMPLETED', method: 'CARD',
        merchantTransactionId: `TXN-${created.getTime()}`, processedAt: new Date(dropped.getTime() + 60000),
        createdAt: dropped,
      },
    });
    balance -= item.price;
    await prisma.consumer.update({ where: { id: consumer.id }, data: { returnsCount: { increment: 1 } } });
  }
  await prisma.merchant.update({ where: { id: modivo.id }, data: { depositBalance: Math.round(balance * 100) / 100 } });

  console.log('Seed done. Merchants: Modivo (pilot) + Vestiro, points: 4, historic returns: 46');
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); process.exit(1); });
