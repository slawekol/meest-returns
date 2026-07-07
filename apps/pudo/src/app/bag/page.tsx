'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import { api, type PointDashboard } from '../../lib/api';

export default function BagPage() {
  const [data, setData] = useState<PointDashboard | null>(null);
  const [closed, setClosed] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api.dashboard().then(setData).catch(() => {});
  }, []);

  useEffect(load, [load]);

  async function closeBag() {
    if (busy) return;
    setBusy(true);
    try {
      const r = await api.closeBag();
      setClosed(r.bagCode);
      load();
    } finally {
      setBusy(false);
    }
  }

  const bag = data?.currentBag;

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body antialiased">
      <header className="flex items-center h-[56px] px-md w-full max-w-[768px] mx-auto border-b border-border-base">
        <Link href="/dashboard" className="mr-md text-text-primary hover:bg-bg-subtle p-xs rounded-full transition-colors flex items-center justify-center">
          <MaterialIcon name="arrow_back" size={24} />
        </Link>
        <h1 className="font-h1 text-h1 text-text-primary">Kontener zbiorczy</h1>
      </header>

      <main className="flex-grow w-full max-w-[768px] mx-auto px-md py-lg flex flex-col gap-lg">
        {closed && (
          <div className="bg-badge-completed-bg border border-success rounded-lg p-md flex items-center gap-sm">
            <MaterialIcon name="check_circle" className="text-success" filled />
            <p className="font-body text-body text-text-primary">
              Kontener <span className="font-technical">{closed}</span> zamknięty — gotowy do odbioru do hubu Dębica.
            </p>
          </div>
        )}

        {bag ? (
          <>
            <div className="bg-surface-container-lowest border border-border-base rounded-xl p-lg">
              <div className="flex justify-between items-center mb-md">
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary uppercase mb-xs">Aktywny kontener</p>
                  <p className="font-technical text-h1 font-bold text-text-primary">{bag.bagCode}</p>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-label-caps text-text-secondary uppercase mb-xs">Zapełnienie</p>
                  <p className="font-technical text-h1 font-bold text-text-primary">
                    {bag.count} / {bag.capacity}
                  </p>
                </div>
              </div>
              <div className="w-full bg-bg-subtle h-[8px] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${bag.count / bag.capacity >= 0.8 ? 'bg-warning' : 'bg-success'}`}
                  style={{ width: `${Math.round((bag.count / bag.capacity) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
              <div className="px-md py-sm border-b border-border-base bg-bg-subtle">
                <h3 className="font-small text-small text-text-primary font-semibold">Zawartość</h3>
              </div>
              <div className="divide-y divide-border-base">
                {bag.returns.map((r) => (
                  <div key={r.returnId} className="px-md py-sm flex justify-between items-center">
                    <span className="font-technical text-technical text-text-primary">{r.returnId}</span>
                    <span className="font-small text-small text-text-secondary">
                      {r.droppedOffAt
                        ? new Date(r.droppedOffAt).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })
                        : '—'}
                    </span>
                  </div>
                ))}
                {bag.returns.length === 0 && (
                  <p className="px-md py-lg font-body text-body text-text-secondary text-center">Kontener jest pusty</p>
                )}
              </div>
            </div>

            <button
              onClick={closeBag}
              disabled={busy || bag.returns.length === 0}
              className="w-full h-[56px] bg-text-primary text-on-primary font-h2 text-h2 rounded-lg flex items-center justify-center gap-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <MaterialIcon name="local_shipping" size={24} />
              Zamknij kontener do odbioru
            </button>
          </>
        ) : (
          <p className="font-body text-body text-text-secondary text-center py-xl">
            Brak otwartego kontenera — otworzy się automatycznie przy pierwszym przyjętym zwrocie.
          </p>
        )}
      </main>
    </div>
  );
}
