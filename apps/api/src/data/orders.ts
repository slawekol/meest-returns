// Stub adaptera OMS merchanta. W produkcji te dane przychodzą z API sklepu
// (Modivo/LPP) - tu trzymamy je lokalnie, zeby demo dzialalo bez integracji.

export interface DemoOrderItem {
  sku: string;
  name: string;
  size: string;
  color: string;
  price: number; // PLN
  imageUrl: string;
}

export interface DemoOrder {
  orderNumber: string;
  email: string;
  merchantEmail: string; // klucz do Merchant w DB
  placedAt: string;
  items: DemoOrderItem[];
}

export const DEMO_ORDERS: DemoOrder[] = [
  {
    orderNumber: 'MOD-2026-0042893',
    email: 'anna.kowalska@example.com',
    merchantEmail: 'returns@modivo.demo',
    placedAt: '2026-06-28T14:22:00Z',
    items: [
      { sku: 'MOD-DRS-001', name: 'Czarna sukienka midi', size: 'M', color: 'Czarny', price: 199.0, imageUrl: '/placeholder-product.svg' },
      { sku: 'MOD-SHO-014', name: 'Sneakersy skórzane', size: '38', color: 'Biały', price: 349.0, imageUrl: '/placeholder-product.svg' },
      { sku: 'MOD-JKT-007', name: 'Kurtka jeansowa oversize', size: 'S', color: 'Niebieski', price: 279.0, imageUrl: '/placeholder-product.svg' },
    ],
  },
  {
    orderNumber: 'MOD-2026-0051277',
    email: 'jan.nowak@example.com',
    merchantEmail: 'returns@modivo.demo',
    placedAt: '2026-07-01T09:10:00Z',
    items: [
      { sku: 'MOD-TSH-101', name: 'T-shirt basic bawełniany', size: 'L', color: 'Szary', price: 89.0, imageUrl: '/placeholder-product.svg' },
      { sku: 'MOD-PNT-055', name: 'Spodnie chino slim', size: '32/32', color: 'Beżowy', price: 219.0, imageUrl: '/placeholder-product.svg' },
    ],
  },
  {
    orderNumber: 'VST-2026-0007731',
    email: 'maria.wisniewska@example.com',
    merchantEmail: 'zwroty@vestiro.demo',
    placedAt: '2026-07-03T18:45:00Z',
    items: [
      { sku: 'VST-BLZ-021', name: 'Marynarka lniana', size: '36', color: 'Kremowy', price: 429.0, imageUrl: '/placeholder-product.svg' },
      { sku: 'VST-SKT-009', name: 'Spódnica plisowana', size: 'S', color: 'Zielony', price: 189.0, imageUrl: '/placeholder-product.svg' },
    ],
  },
];

export function findOrder(orderNumber: string, email?: string): DemoOrder | undefined {
  const o = DEMO_ORDERS.find(
    (x) => x.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase(),
  );
  if (!o) return undefined;
  // W demo email weryfikujemy miekko: pusty = OK (szybsza sciezka na pitchu).
  if (email && email.trim() && email.trim().toLowerCase() !== o.email.toLowerCase()) {
    return undefined;
  }
  return o;
}
