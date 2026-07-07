'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import { api, type PointDashboard } from '../../lib/api';

export default function OperatorDashboardPage() {
  const [data, setData] = useState<PointDashboard | null>(null);

  const load = useCallback(() => {
    api.dashboard().then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  const bag = data?.currentBag;
  const fill = bag ? Math.round((bag.count / bag.capacity) * 100) : 0;

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body antialiased">
      <header className="bg-surface text-primary flex justify-between items-center h-[56px] px-md w-full max-w-[768px] mx-auto border-b border-border-base">
        <div className="flex flex-col">
          <span className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns Operator</span>
          <span className="font-small text-small text-on-surface-variant">
            {data ? `${data.point.name} (${data.point.code})` : 'Ładuję…'}
          </span>
        </div>
        <div className="flex items-center gap-md">
          <span className="font-small text-small text-on-surface-variant hidden sm:inline">
            Zalogowany: Operator
          </span>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[768px] mx-auto px-md py-lg flex flex-col gap-lg pb-xxxl">
        <Link
          href="/scan"
          className="w-full bg-success text-on-primary h-[80px] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center gap-md active:opacity-90 transition-opacity"
        >
          <MaterialIcon name="qr_code_scanner" size={32} filled />
          <span className="font-display text-display uppercase">SKANUJ KOD ZWROTU</span>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md flex flex-col gap-xs hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wide">
              Dziś przyjęto
            </span>
            <span className="font-technical text-technical text-h1 font-bold text-primary">
              {data?.todayAccepted ?? '—'}
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md flex flex-col gap-xs hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wide">
              W tym kontenerze
            </span>
            <span className="font-technical text-technical text-h1 font-bold text-primary">
              {bag?.count ?? 0}
            </span>
          </div>
          <Link
            href="/bag"
            className={`rounded-lg p-md flex flex-col gap-xs hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow border ${
              fill >= 80 ? 'bg-badge-dropped-bg border-warning/20' : 'bg-surface-container-lowest border-border-base'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wide">
                Zapełnienie kontenera
              </span>
              {fill >= 80 && <MaterialIcon name="warning" size={16} filled className="text-warning" />}
            </div>
            <div className="flex items-baseline gap-xs">
              <span className="font-technical text-technical text-h1 font-bold text-text-primary">{fill}%</span>
              {bag && (
                <span className="font-small text-small text-on-surface-variant">
                  ({bag.count}/{bag.capacity})
                </span>
              )}
            </div>
            <div className="w-full bg-bg-subtle h-[4px] rounded-full mt-sm overflow-hidden">
              <div
                className={`h-full rounded-full ${fill >= 80 ? 'bg-warning' : 'bg-success'}`}
                style={{ width: `${fill}%` }}
              />
            </div>
          </Link>
        </div>

        {bag && bag.returns.length > 0 && (
          <div className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
            <div className="px-md py-sm border-b border-border-base bg-bg-subtle flex justify-between items-center">
              <h3 className="font-small text-small text-text-primary font-semibold">
                Kontener {bag.bagCode}
              </h3>
              <span className="font-small text-small text-text-secondary">
                oczekuje na odbiór: {data?.bagsAwaitingPickup ?? 0}
              </span>
            </div>
            <div className="divide-y divide-border-base">
              {bag.returns.slice(0, 8).map((r) => (
                <div key={r.returnId} className="px-md py-sm flex justify-between items-center">
                  <span className="font-technical text-technical text-text-primary">{r.returnId}</span>
                  <span className="font-small text-small text-text-secondary">
                    {r.droppedOffAt
                      ? new Date(r.droppedOffAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
                      : '—'}
                  </span>
                  <span className="font-small text-small font-semibold text-text-primary">{r.refundAmount} zł</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="bg-surface text-primary border-t border-border-base fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[64px] md:hidden">
        <Link href="/scan" className="flex flex-col items-center justify-center font-bold active:bg-surface-container active:scale-95 transition-all w-full h-full">
          <MaterialIcon name="qr_code_scanner" size={24} filled className="text-success" />
          <span className="font-label-caps text-label-caps text-success mt-xs">Skanuj</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container active:scale-95 transition-all w-full h-full">
          <MaterialIcon name="home" size={24} />
          <span className="font-label-caps text-label-caps mt-xs">Pulpit</span>
        </Link>
        <Link href="/bag" className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container active:scale-95 transition-all w-full h-full">
          <MaterialIcon name="package_2" size={24} />
          <span className="font-label-caps text-label-caps mt-xs">Kontener</span>
        </Link>
      </nav>
    </div>
  );
}
