'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import { Sidebar } from '../../components/sidebar';
import { Topbar } from '../../components/topbar';
import { api, REASON_LABELS, STATUS_LABELS, type MerchantStats, type MerchantReturn } from '../../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<MerchantStats | null>(null);
  const [returns, setReturns] = useState<MerchantReturn[]>([]);

  const load = useCallback(() => {
    api.stats().then(setStats).catch(() => {});
    api.returns().then((r) => setReturns(r.returns.slice(0, 8))).catch(() => {});
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000); // live: refund pojawia się w trakcie demo
    return () => clearInterval(t);
  }, [load]);

  const d = stats?.last30days;
  const totalReasons = stats?.byReason.reduce((s, r) => s + r.count, 0) ?? 0;
  const maxDay = Math.max(1, ...(stats?.dailyVolume.map((x) => x.count) ?? [1]));

  return (
    <>
      <Sidebar active="dashboard" />
      <Topbar title="Pulpit" />
      <main className="ml-[240px] mt-16 p-xl min-h-[calc(100vh-64px)] flex flex-col gap-section-gap">
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h1 className="font-h1 text-h1 text-primary">Pulpit</h1>
            <p className="font-body text-body text-text-secondary mt-xs">
              Przegląd logistyki zwrotów dla {stats?.merchant.name ?? '…'}
            </p>
          </div>
          <div className="flex items-center gap-sm">
            <div className="flex items-center border border-border-base rounded-lg bg-surface-container-lowest h-[44px] px-sm">
              <MaterialIcon name="calendar_today" size={20} className="text-text-secondary mr-sm" />
              <span className="font-small text-small text-primary mr-md">Ostatnie 30 dni</span>
            </div>
            <div className="flex items-center border border-border-base rounded-lg bg-surface-container-lowest h-[44px] px-md">
              <MaterialIcon name="account_balance_wallet" size={20} className="text-text-secondary mr-sm" />
              <span className="font-small text-small text-primary">
                Depozyt: {stats ? stats.merchant.depositBalance.toLocaleString('pl-PL', { maximumFractionDigits: 0 }) : '—'} zł
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">Zwroty (30 dni)</span>
              <MaterialIcon name="keyboard_return" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs">{d?.totalReturns ?? '—'}</div>
            <div className="flex items-center gap-xs mt-auto">
              <span className="font-label-caps text-label-caps text-text-muted normal-case font-normal">
                przez sieć Meest Box
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">W logistyce zwrotnej</span>
              <MaterialIcon name="local_shipping" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs">{d?.inLogistics ?? '—'}</div>
            <div className="flex items-center gap-xs mt-auto">
              <span className="font-label-caps text-label-caps text-text-muted normal-case font-normal">
                punkt → hub Dębica → DC
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">Refundy wypłacone</span>
              <MaterialIcon name="payments" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs">
              {d ? d.refundsAmount.toLocaleString('pl-PL', { maximumFractionDigits: 0 }) : '—'} zł
            </div>
            <div className="flex items-center gap-xs mt-auto">
              <span className="font-label-caps text-label-caps text-success">{d?.refundsCompleted ?? 0} transakcji</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">Śr. czas do refundu</span>
              <MaterialIcon name="bolt" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs">
              {d?.avgMinutesToRefund != null
                ? d.avgMinutesToRefund < 120
                  ? `${d.avgMinutesToRefund} min`
                  : `${Math.round(d.avgMinutesToRefund / 60)} h`
                : '—'}
            </div>
            <div className="flex items-center gap-xs mt-auto">
              <MaterialIcon name="trending_down" size={16} className="text-success" />
              <span className="font-label-caps text-label-caps text-text-muted normal-case font-normal">
                vs 14 dni u kuriera
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          <div className="lg:col-span-2 bg-surface-container-lowest border border-border-base rounded-lg p-lg">
            <div className="flex justify-between items-center mb-lg">
              <h2 className="font-h2 text-h2 text-primary">Wolumen dzienny (14 dni)</h2>
            </div>
            <div className="flex items-end gap-xs h-[160px]">
              {stats?.dailyVolume.map((v) => (
                <div key={v.date} className="flex-1 flex flex-col items-center gap-xs" title={`${v.date}: ${v.count}`}>
                  <div
                    className="w-full bg-primary/70 hover:bg-primary rounded-t transition-colors"
                    style={{ height: `${Math.max(4, (v.count / maxDay) * 150)}px` }}
                  />
                  <span className="font-label-caps text-[9px] text-text-muted">{v.date.slice(8)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
            <h2 className="font-h2 text-h2 text-primary mb-lg">Powody zwrotów</h2>
            <div className="flex flex-col gap-md">
              {stats?.byReason
                .sort((a, b) => b.count - a.count)
                .map((r) => (
                  <div key={r.reason}>
                    <div className="flex justify-between mb-xs">
                      <span className="font-small text-small text-text-primary">
                        {REASON_LABELS[r.reason] ?? r.reason}
                      </span>
                      <span className="font-small text-small text-text-secondary">
                        {r.count} ({totalReasons ? Math.round((r.count / totalReasons) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full bg-bg-subtle h-[6px] rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${totalReasons ? (r.count / totalReasons) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
          <div className="px-lg py-md border-b border-border-base flex justify-between items-center">
            <h2 className="font-h2 text-h2 text-primary">Ostatnie zwroty</h2>
            <Link href="/returns" className="font-small text-small text-primary hover:underline">
              Zobacz wszystkie →
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-base bg-bg-subtle">
                {['Nr zwrotu', 'Zamówienie', 'Klient', 'Punkt', 'Kwota', 'Status', 'Refund'].map((h) => (
                  <th key={h} className="text-left px-lg py-sm font-label-caps text-label-caps text-text-secondary uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {returns.map((r) => {
                const st = STATUS_LABELS[r.status] ?? { label: r.status, cls: '' };
                return (
                  <tr key={r.returnId} className="hover:bg-bg-subtle transition-colors">
                    <td className="px-lg py-sm font-technical text-technical text-text-primary">{r.returnId}</td>
                    <td className="px-lg py-sm font-small text-small text-text-secondary">{r.orderId}</td>
                    <td className="px-lg py-sm font-small text-small text-text-secondary">{r.consumerEmail}</td>
                    <td className="px-lg py-sm font-small text-small text-text-secondary">{r.pudoPoint}</td>
                    <td className="px-lg py-sm font-small text-small font-semibold text-text-primary">{r.refundAmount} zł</td>
                    <td className="px-lg py-sm">
                      <span className={`font-label-caps text-label-caps px-sm py-xs rounded-full ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-lg py-sm">
                      {r.refundProcessedAt ? (
                        <span className="flex items-center gap-xs font-small text-small text-success">
                          <MaterialIcon name="check_circle" size={16} filled />
                          {new Date(r.refundProcessedAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ) : (
                        <span className="font-small text-small text-text-muted">oczekuje</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {returns.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-lg py-xl text-center font-body text-body text-text-secondary">
                    Ładuję zwroty…
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
