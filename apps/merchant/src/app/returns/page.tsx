'use client';

import { useCallback, useEffect, useState } from 'react';
import { MaterialIcon } from '@meest/ui';
import { Sidebar } from '../../components/sidebar';
import { Topbar } from '../../components/topbar';
import { api, REASON_LABELS, STATUS_LABELS, type MerchantReturn } from '../../lib/api';

const FILTERS = [
  { value: '', label: 'Wszystkie' },
  { value: 'DROPPED_OFF', label: 'Oddane w punkcie' },
  { value: 'IN_TRANSIT', label: 'W transporcie' },
  { value: 'AT_HUB', label: 'W hubie' },
  { value: 'COMPLETED', label: 'Zakończone' },
  { value: 'REJECTED', label: 'Odrzucone' },
];

export default function ReturnsPage() {
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState<MerchantReturn[]>([]);
  const [query, setQuery] = useState('');

  const load = useCallback(() => {
    api.returns(status || undefined).then((r) => setRows(r.returns)).catch(() => {});
  }, [status]);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  const filtered = rows.filter((r) =>
    `${r.returnId} ${r.orderId} ${r.consumerEmail}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <Sidebar active="returns" />
      <Topbar title="Zwroty" />
      <main className="ml-[240px] mt-16 p-xl min-h-[calc(100vh-64px)] flex flex-col gap-lg">
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div>
            <h1 className="font-h1 text-h1 text-primary">Zwroty</h1>
            <p className="font-body text-body text-text-secondary mt-xs">
              {filtered.length} zwrotów • odświeżane na żywo
            </p>
          </div>
          <div className="flex items-center gap-sm">
            <div className="relative flex items-center border border-border-base rounded-lg bg-surface-container-lowest h-[44px] px-md w-[280px]">
              <MaterialIcon name="search" size={20} className="text-text-secondary mr-sm" />
              <input
                className="w-full bg-transparent border-none outline-none focus:ring-0 font-small text-small text-text-primary placeholder:text-text-muted"
                placeholder="Szukaj RTN, zamówienia, klienta…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="flex gap-sm flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`h-[36px] px-md rounded-full font-small text-small font-medium transition-colors border ${
                status === f.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-container-lowest text-text-secondary border-border-base hover:bg-bg-subtle'
              }`}
            >
              {f.label}
            </button>
          ))}
        </section>

        <section className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-base bg-bg-subtle">
                {['Nr zwrotu', 'Zamówienie', 'Produkty', 'Powód', 'Klient', 'Punkt PUDO', 'Kwota', 'Status', 'Utworzony'].map((h) => (
                  <th key={h} className="text-left px-md py-sm font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {filtered.map((r) => {
                const st = STATUS_LABELS[r.status] ?? { label: r.status, cls: '' };
                return (
                  <tr key={r.returnId} className="hover:bg-bg-subtle transition-colors">
                    <td className="px-md py-sm font-technical text-technical text-text-primary whitespace-nowrap">{r.returnId}</td>
                    <td className="px-md py-sm font-small text-small text-text-secondary whitespace-nowrap">{r.orderId}</td>
                    <td className="px-md py-sm font-small text-small text-text-primary max-w-[220px] truncate">
                      {r.items.map((i) => i.name).join(', ')}
                    </td>
                    <td className="px-md py-sm font-small text-small text-text-secondary whitespace-nowrap">
                      {REASON_LABELS[r.reason] ?? r.reason}
                    </td>
                    <td className="px-md py-sm font-small text-small text-text-secondary">{r.consumerEmail}</td>
                    <td className="px-md py-sm font-small text-small text-text-secondary">{r.pudoPoint}</td>
                    <td className="px-md py-sm font-small text-small font-semibold text-text-primary whitespace-nowrap">
                      {r.refundAmount} zł
                    </td>
                    <td className="px-md py-sm whitespace-nowrap">
                      <span className={`font-label-caps text-label-caps px-sm py-xs rounded-full ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-md py-sm font-small text-small text-text-secondary whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-lg py-xl text-center font-body text-body text-text-secondary">
                    Brak zwrotów dla wybranych filtrów
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
