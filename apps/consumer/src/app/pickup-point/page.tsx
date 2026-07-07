'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { api, type PudoPoint } from '../../lib/api';
import { getFlow, setFlow } from '../../lib/flow';

export default function PickupPointPage() {
  const router = useRouter();
  const [points, setPoints] = useState<PudoPoint[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const f = getFlow();
    if (!f.order) {
      router.replace('/');
      return;
    }
    api
      .pudoPoints()
      .then((p) => {
        setPoints(p);
        setSelectedId(f.pudoPointId ?? p[0]?.id ?? null);
      })
      .catch((e) => setError((e as Error).message));
  }, [router]);

  const filtered = points.filter((p) =>
    `${p.name} ${p.address} ${p.city} ${p.postalCode}`.toLowerCase().includes(query.toLowerCase()),
  );

  const next = () => {
    const p = points.find((x) => x.id === selectedId);
    if (!p) return;
    setFlow({ pudoPointId: p.id, pudoPointLabel: `${p.name}, ${p.address}, ${p.city}` });
    router.push('/packaging');
  };

  return (
    <div className="w-full max-w-[480px] bg-surface min-h-screen relative shadow-sm overflow-hidden flex flex-col mx-auto">
      <header className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto bg-surface border-b border-border-base z-10 shrink-0">
        <Link
          href="/return-reason"
          className="mr-md text-text-primary hover:bg-bg-subtle p-xs rounded-full transition-colors flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" size={24} />
        </Link>
        <h1 className="font-h1 text-h1 text-text-primary">Wybierz punkt odbioru</h1>
      </header>

      <div className="px-md pt-md shrink-0">
        <div className="relative bg-surface rounded-lg shadow-sm border border-border-base flex items-center px-md h-[44px]">
          <MaterialIcon name="search" className="text-text-secondary mr-sm" />
          <input
            className="w-full bg-transparent border-none outline-none focus:ring-0 text-body font-body text-text-primary placeholder:text-text-secondary h-full py-0"
            placeholder="Szukaj adresu, miasta lub kodu pocztowego"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 bg-surface overflow-y-auto pb-[88px] px-md pt-md space-y-sm">
        {error && (
          <div className="text-error font-small text-small bg-badge-rejected-bg border border-error rounded-lg px-md py-sm">
            {error}
          </div>
        )}
        {filtered.map((p) => {
          const isSel = p.id === selectedId;
          const hours = (p.openingHours as Record<string, string>)?.['pn-pt'];
          return (
            <div
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`bg-surface rounded-lg p-md cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow ${
                isSel ? 'border-2 border-success' : 'border border-border-base'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div
                    className={`p-sm rounded-full mr-md flex-shrink-0 mt-xs ${
                      isSel ? 'bg-badge-completed-bg text-success' : 'bg-bg-subtle text-text-secondary'
                    }`}
                  >
                    <MaterialIcon name="location_on" />
                  </div>
                  <div>
                    <h3 className="font-h2 text-h2 text-text-primary mb-xs">{p.name}</h3>
                    <p className="font-body text-body text-text-secondary mb-xs">
                      {p.address}, {p.city}
                    </p>
                    {hours && (
                      <div className="flex items-center space-x-md">
                        <span className="font-small text-small text-success flex items-center">
                          <MaterialIcon name="schedule" size={16} className="mr-xs" />
                          pn–pt {hours}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-technical text-technical text-text-secondary whitespace-nowrap bg-bg-subtle px-sm py-xs rounded-full">
                  {p.code}
                </span>
              </div>
            </div>
          );
        })}
        {points.length === 0 && !error && (
          <p className="font-body text-body text-text-secondary text-center py-lg">Ładuję punkty…</p>
        )}
      </div>

      <div className="absolute bottom-0 w-full p-md bg-surface border-t border-border-base z-20">
        <button
          onClick={next}
          disabled={!selectedId}
          className="w-full bg-[#0F172A] text-on-secondary font-h2 text-h2 py-sm px-lg rounded flex items-center justify-center min-h-[44px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Wybieram ten punkt
        </button>
      </div>
    </div>
  );
}
