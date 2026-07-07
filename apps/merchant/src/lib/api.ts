export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function req<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'content-type': 'application/json' },
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { message?: string }).message ?? 'Błąd API');
  return data as T;
}

export interface MerchantReturn {
  returnId: string; orderId: string; status: string; refundStatus: string;
  refundAmount: number; reason: string; consumerEmail: string; pudoPoint: string;
  items: { sku: string; name: string; size: string; color: string; price: number }[];
  createdAt: string; droppedOffAt: string | null; refundProcessedAt: string | null;
}
export interface MerchantStats {
  merchant: { name: string; depositBalance: number; refundPolicy: string };
  last30days: {
    totalReturns: number; refundsCompleted: number; refundsAmount: number;
    inLogistics: number; avgMinutesToRefund: number | null;
  };
  byReason: { reason: string; count: number }[];
  dailyVolume: { date: string; count: number }[];
}

export const api = {
  stats: () => req<MerchantStats>('/api/merchant/stats'),
  returns: (status?: string) =>
    req<{ merchant: { name: string; depositBalance: number }; returns: MerchantReturn[] }>(
      `/api/merchant/returns${status ? `?status=${status}` : ''}`,
    ),
};

export const REASON_LABELS: Record<string, string> = {
  WRONG_SIZE: 'Zły rozmiar',
  NOT_AS_DESCRIBED: 'Niezgodny z opisem',
  LOW_QUALITY: 'Niska jakość',
  CHANGED_MIND: 'Zmieniono zdanie',
  DAMAGED: 'Uszkodzony',
  OTHER: 'Inne',
};

export const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  INITIATED: { label: 'Zainicjowany', cls: 'bg-badge-initiated-bg text-text-secondary' },
  DROPPED_OFF: { label: 'Oddany w punkcie', cls: 'bg-badge-dropped-bg text-warning' },
  IN_TRANSIT: { label: 'W transporcie', cls: 'bg-badge-transit-bg text-primary' },
  AT_HUB: { label: 'W hubie Dębica', cls: 'bg-badge-transit-bg text-primary' },
  SORTED: { label: 'Posortowany', cls: 'bg-badge-transit-bg text-primary' },
  SHIPPED_TO_MERCHANT: { label: 'W drodze do DC', cls: 'bg-badge-transit-bg text-primary' },
  COMPLETED: { label: 'Zakończony', cls: 'bg-badge-completed-bg text-success' },
  REJECTED: { label: 'Odrzucony', cls: 'bg-badge-rejected-bg text-error' },
  EXPIRED: { label: 'Wygasł', cls: 'bg-surface-container text-text-secondary' },
};
