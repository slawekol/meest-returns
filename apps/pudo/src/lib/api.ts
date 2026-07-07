export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
export const POINT_CODE = process.env.NEXT_PUBLIC_PUDO_CODE ?? 'MB-WAW-001';

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

export interface VerifyData {
  returnId: string; merchantName: string; merchantOrderId: string;
  consumerEmail: string; consumerScore: number; consumerFlagged: boolean;
  refundAmount: number; refundPolicy: string; reason: string;
  items: { sku: string; name: string; size: string; color: string; price: number; imageUrl: string }[];
  checklist: string[];
}
export interface AcceptResult {
  returnId: string; status: string;
  refund: { status: string; amount: number; processedAt?: string; feeCharged?: number; note?: string };
  bag: { bagCode: string; count: number; capacity: number };
  consumerEmail: string;
}
export interface PointDashboard {
  point: { code: string; name: string; city: string };
  todayAccepted: number;
  bagsAwaitingPickup: number;
  currentBag: {
    bagCode: string; capacity: number; count: number;
    returns: { returnId: string; droppedOffAt: string | null; refundAmount: number }[];
  } | null;
}

export const api = {
  latestInitiated: () => req<{ returnId: string }>('/api/pudo/latest-initiated'),
  verify: (code: string) => req<VerifyData>('/api/pudo/verify', { method: 'POST', body: JSON.stringify({ code }) }),
  accept: (returnId: string) => req<AcceptResult>(`/api/pudo/returns/${returnId}/accept`, { method: 'POST', body: JSON.stringify({}) }),
  reject: (returnId: string, reason: string) => req<{ returnId: string; status: string }>(`/api/pudo/returns/${returnId}/reject`, { method: 'POST', body: JSON.stringify({ reason }) }),
  dashboard: (code = POINT_CODE) => req<PointDashboard>(`/api/pudo/points/${code}/dashboard`),
  closeBag: (code = POINT_CODE) => req<{ bagCode: string; status: string }>(`/api/pudo/points/${code}/bag/close`, { method: 'POST', body: JSON.stringify({}) }),
};
