export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message ?? data.error ?? 'Błąd API'), { status: res.status, data });
  return data as T;
}

export interface OrderItem {
  sku: string; name: string; size: string; color: string; price: number; imageUrl: string;
}
export interface OrderLookup {
  orderNumber: string; placedAt: string;
  merchant: { id: string; name: string } | null;
  items: OrderItem[];
}
export interface PudoPoint {
  id: string; code: string; name: string; address: string; city: string;
  postalCode: string; openingHours: Record<string, string>;
}
export interface CreatedReturn {
  returnId: string; qrToken: string; qrExpiresAt: string; refundAmount: number;
  status: string; pudoPoint: { name: string; address: string; city: string; code: string };
  merchantName: string; items: OrderItem[];
}
export interface Tracking {
  returnId: string; status: string; refundStatus: string; refundAmount: number;
  merchantName: string; merchantOrderId: string; items: OrderItem[];
  pudoPoint: { name: string; address: string; city: string };
  createdAt: string; droppedOffAt: string | null; completedAt: string | null;
  refund: { status: string; amount: number; processedAt: string | null } | null;
  timeline: { type: string; at: string }[];
}

export const api = {
  lookupOrder: (orderNumber: string, email: string) =>
    req<OrderLookup>('/api/orders/lookup', { method: 'POST', body: JSON.stringify({ orderNumber, email }) }),
  pudoPoints: (city?: string) =>
    req<PudoPoint[]>(`/api/pudo-points${city ? `?city=${encodeURIComponent(city)}` : ''}`),
  createReturn: (input: { orderNumber: string; email: string; skus: string[]; reason: string; reasonComment?: string; pudoPointId: string }) =>
    req<CreatedReturn>('/api/returns', { method: 'POST', body: JSON.stringify(input) }),
  tracking: (returnId: string) => req<Tracking>(`/api/returns/${encodeURIComponent(returnId)}`),
};
