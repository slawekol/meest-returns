'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import type { AcceptResult } from '../../../../lib/api';

export default function ConfirmedPage() {
  const [result, setResult] = useState<AcceptResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('pudo-last-accept');
      if (raw) setResult(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, []);

  const instant = result?.refund.status === 'COMPLETED';

  return (
    <div className="bg-bg-subtle text-text-primary font-body antialiased min-h-screen flex">
      <main className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center p-container-padding">
          <div className="max-w-[480px] w-full flex flex-col items-center text-center space-y-xl">
            <div className="w-[96px] h-[96px] rounded-full bg-badge-completed-bg flex items-center justify-center">
              <MaterialIcon name="check_circle" size={48} filled className="text-success" />
            </div>
            <div className="space-y-sm">
              <h1 className="font-display text-display text-text-primary">Zwrot przyjęty</h1>
              <p className="font-body text-body text-text-secondary">
                {instant
                  ? `Refund ${result?.refund.amount} zł wypłacony klientowi natychmiast`
                  : 'Klient otrzyma zwrot środków po weryfikacji w hubie (24–48h)'}
              </p>
              {result && (
                <p className="font-technical text-technical text-text-secondary">{result.returnId}</p>
              )}
            </div>
            <div className="w-full bg-surface border border-border-base rounded-xl p-xl shadow-sm">
              <p className="font-body text-body text-text-secondary mb-sm">Paczka trafia do kontenera</p>
              <div className="inline-block bg-primary-container text-on-primary font-technical text-[24px] font-bold px-lg py-md rounded-lg">
                {result?.bag.bagCode ?? '—'}
              </div>
              {result && (
                <p className="font-small text-small text-text-secondary mt-md">
                  Zapełnienie: {result.bag.count} / {result.bag.capacity}
                </p>
              )}
            </div>
            <div className="w-full space-y-md pt-md">
              <Link
                href="/scan"
                className="w-full bg-success text-on-primary font-h2 text-h2 font-medium h-[56px] rounded hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-sm"
              >
                <MaterialIcon name="qr_code_scanner" size={24} />
                Skanuj następny kod
              </Link>
              <Link
                href="/dashboard"
                className="w-full bg-surface text-text-primary border border-border-base font-h2 text-h2 h-[56px] rounded flex items-center justify-center hover:bg-surface-container-low transition-colors"
              >
                Wróć do pulpitu
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
