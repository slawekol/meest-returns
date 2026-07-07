'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { api, type Tracking } from '../../lib/api';
import { getFlow } from '../../lib/flow';

const STEPS = [
  { key: 'INITIATED', label: 'Zwrot zainicjowany' },
  { key: 'DROPPED_OFF', label: 'Oddany w punkcie' },
  { key: 'REFUNDED', label: 'Środki zwrócone' },
  { key: 'IN_TRANSIT', label: 'W transporcie do hubu' },
  { key: 'COMPLETED', label: 'Przyjęty przez sklep' },
];

function stepState(t: Tracking, key: string): 'done' | 'current' | 'todo' {
  const doneMap: Record<string, boolean> = {
    INITIATED: true,
    DROPPED_OFF: !!t.droppedOffAt,
    REFUNDED: t.refund?.status === 'COMPLETED',
    IN_TRANSIT: ['IN_TRANSIT', 'AT_HUB', 'SORTED', 'SHIPPED_TO_MERCHANT', 'COMPLETED'].includes(t.status),
    COMPLETED: t.status === 'COMPLETED',
  };
  if (doneMap[key]) return 'done';
  const order = STEPS.map((s) => s.key);
  const firstTodo = order.find((k) => !doneMap[k]);
  return key === firstTodo ? 'current' : 'todo';
}

function stepDate(t: Tracking, key: string): string | null {
  const map: Record<string, string | null> = {
    INITIATED: t.createdAt,
    DROPPED_OFF: t.droppedOffAt,
    REFUNDED: t.refund?.processedAt ?? null,
    COMPLETED: t.completedAt,
    IN_TRANSIT: null,
  };
  const d = map[key];
  return d ? new Date(d).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' }) : null;
}

function TrackingInner() {
  const params = useSearchParams();
  const [returnId, setReturnId] = useState<string>('');
  const [input, setInput] = useState('');
  const [data, setData] = useState<Tracking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (id: string) => {
    try {
      setData(await api.tracking(id));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setData(null);
    }
  }, []);

  useEffect(() => {
    const fromUrl = params.get('id');
    const fromFlow = getFlow().created?.returnId;
    const id = fromUrl ?? fromFlow ?? '';
    if (id) {
      setReturnId(id);
      setInput(id);
      load(id);
    }
  }, [params, load]);

  // live refresh - refund pojawia sie na oczach klienta
  useEffect(() => {
    if (!returnId) return;
    const t = setInterval(() => load(returnId), 4000);
    return () => clearInterval(t);
  }, [returnId, load]);

  return (
    <div className="w-full max-w-[480px] bg-surface min-h-screen relative shadow-[0_0_40px_rgba(0,0,0,0.05)] pb-section-gap mx-auto">
      <header className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto bg-surface border-b border-border-base sticky top-0 z-50">
        <Link
          href="/"
          className="mr-md text-text-primary hover:bg-bg-subtle p-sm rounded-full transition-opacity flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" weight={300} />
        </Link>
        <div className="flex-1 text-center pr-10">
          <h1 className="font-display text-display text-primary tracking-tight">Meest&amp;Returns</h1>
        </div>
      </header>

      <main className="px-container-padding pt-lg">
        <div className="mb-lg">
          <h2 className="font-h1 text-h1 text-text-primary mb-xs">Status zwrotu</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReturnId(input.trim().toUpperCase());
              load(input.trim().toUpperCase());
            }}
            className="flex gap-sm mt-sm"
          >
            <input
              className="flex-1 h-[44px] px-md rounded-lg border border-border-base bg-surface-container-lowest font-technical text-technical text-text-primary focus:outline-none focus:border-success"
              placeholder="RTN-2026-XXXX"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="h-[44px] px-lg bg-text-primary text-on-primary rounded-lg font-small text-small font-semibold"
            >
              Sprawdź
            </button>
          </form>
          {error && <p className="font-small text-small text-error mt-sm">{error}</p>}
        </div>

        {data && (
          <>
            <div className="flex items-center text-text-secondary mb-md">
              <MaterialIcon name="tag" size={16} weight={300} className="mr-sm" />
              <span className="font-technical text-technical">{data.returnId}</span>
              <span className="mx-sm">•</span>
              <span className="font-small text-small">{data.merchantName}</span>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-xl p-lg mb-form-gap relative">
              <div className="absolute left-[39px] top-[40px] bottom-[40px] w-[1px] bg-border-base z-0" />
              <div className="relative z-10 flex flex-col gap-lg">
                {STEPS.map((s) => {
                  const st = stepState(data, s.key);
                  const date = stepDate(data, s.key);
                  return (
                    <div key={s.key} className={`flex gap-md group ${st === 'todo' ? 'opacity-60' : ''}`}>
                      {st === 'done' ? (
                        <div className="w-[32px] h-[32px] rounded-full bg-badge-completed-bg border border-success flex items-center justify-center shrink-0 mt-1">
                          <MaterialIcon name="check" size={16} weight={500} className="text-success" />
                        </div>
                      ) : st === 'current' ? (
                        <div className="w-[32px] h-[32px] rounded-full bg-badge-dropped-bg border border-warning flex items-center justify-center shrink-0 mt-1 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]">
                          <MaterialIcon name="hourglass_empty" size={16} weight={500} className="text-warning" />
                        </div>
                      ) : (
                        <div className="w-[32px] h-[32px] rounded-full bg-surface border border-border-base flex items-center justify-center shrink-0 mt-1">
                          <div className="w-[8px] h-[8px] rounded-full bg-border-base" />
                        </div>
                      )}
                      <div className="flex-1 pb-xs">
                        <h3 className={`font-body text-body ${st === 'todo' ? 'font-medium text-text-secondary' : 'font-semibold text-text-primary'}`}>
                          {s.label}
                        </h3>
                        {date && (
                          <div className="flex items-center text-text-secondary mt-xs">
                            <MaterialIcon name="calendar_today" size={14} weight={300} className="mr-xs" />
                            <p className="font-small text-small">{date}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-sm mb-xl">
              <div className="bg-surface-container-lowest border border-border-base rounded-xl p-md flex items-center">
                <div className="w-[40px] h-[40px] rounded-lg bg-bg-subtle flex items-center justify-center text-text-secondary mr-md shrink-0">
                  <MaterialIcon name="credit_card" weight={300} />
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary uppercase mb-xs">
                    {data.refund?.status === 'COMPLETED' ? 'Zwrócono na kartę' : 'Do zwrotu'}
                  </p>
                  <p className="font-body text-body font-semibold text-text-primary">
                    {data.refundAmount} zł{' '}
                    {data.refund?.status === 'COMPLETED' && data.refund.processedAt && (
                      <span className="font-normal text-success">
                        ✓ {new Date(data.refund.processedAt).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-border-base rounded-xl p-md flex items-center">
                <div className="w-[40px] h-[40px] rounded-lg bg-bg-subtle flex items-center justify-center text-text-secondary mr-md shrink-0">
                  <MaterialIcon name="storefront" weight={300} />
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary uppercase mb-xs">
                    Punkt nadania
                  </p>
                  <p className="font-body text-body font-semibold text-text-primary">
                    {data.pudoPoint.name}, {data.pudoPoint.city}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense>
      <TrackingInner />
    </Suspense>
  );
}
