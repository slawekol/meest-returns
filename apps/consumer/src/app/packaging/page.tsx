'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { api } from '../../lib/api';
import { getFlow, setFlow } from '../../lib/flow';

export default function PackagingPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const f = getFlow();
    if (!f.order || !f.pudoPointId) router.replace('/');
  }, [router]);

  async function generate() {
    const f = getFlow();
    if (!f.order || !f.pudoPointId || !f.reason) return;
    setLoading(true);
    setError(null);
    try {
      const created = await api.createReturn({
        orderNumber: f.order.orderNumber,
        email: f.email,
        skus: f.selectedSkus,
        reason: f.reason,
        reasonComment: f.reasonComment || undefined,
        pudoPointId: f.pudoPointId,
      });
      setFlow({ created });
      router.push('/qr-code');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="w-full max-w-[480px] mx-auto flex items-center px-container-padding h-11 border-b border-border-base bg-surface">
        <Link
          href="/pickup-point"
          className="mr-sm text-text-primary hover:bg-bg-subtle p-xs rounded-full transition-colors flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" size={24} />
        </Link>
        <span className="font-h1 text-h1 text-text-primary flex-1 text-center pr-[32px]">
          Meest&amp;Returns
        </span>
      </header>

      <main className="w-full max-w-[480px] mx-auto flex-1 flex flex-col px-container-padding py-xl pb-[140px]">
        <div className="mb-xl text-center">
          <h1 className="font-display text-display text-text-primary mb-sm">Przygotuj paczkę</h1>
          <p className="font-body text-body text-error font-medium">
            Zwrot zostanie odrzucony jeśli paczka nie spełnia wymagań
          </p>
        </div>

        <div className="flex flex-col gap-form-gap mb-xxl">
          {[
            { icon: 'sell', text: 'Metki oryginalne nieuszkodzone' },
            { icon: 'local_mall', text: 'Produkt w worku foliowym (możesz użyć torby z zakupów)' },
            { icon: 'inventory_2', text: 'Bez oryginalnego pudełka — tylko produkt w worku' },
          ].map((r) => (
            <div
              key={r.icon}
              className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-text-primary">
                <MaterialIcon name={r.icon} />
              </div>
              <div className="flex-1 pt-unit">
                <p className="font-body text-body text-text-primary font-medium">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div className="text-error font-small text-small bg-badge-rejected-bg border border-error rounded-lg px-md py-sm">
            {error}
          </div>
        )}
      </main>

      <div className="fixed bottom-0 w-full max-w-[480px] left-1/2 -translate-x-1/2 bg-surface border-t border-border-base p-container-padding z-40">
        <label className="flex items-center gap-sm mb-md cursor-pointer group">
          <div
            className={`relative flex items-center justify-center w-5 h-5 rounded border transition-colors ${
              confirmed ? 'bg-success border-success' : 'border-outline bg-surface-container-lowest group-hover:border-success'
            }`}
          >
            <input
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full z-10"
              id="confirm-requirements"
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <MaterialIcon
              name="check"
              size={16}
              filled
              className={`text-white transition-opacity ${confirmed ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          <span className="font-small text-small text-text-primary font-medium select-none">
            Potwierdzam, że paczka spełnia wymagania
          </span>
        </label>

        <button
          onClick={generate}
          disabled={!confirmed || loading}
          className="w-full h-[44px] rounded-lg bg-text-primary text-on-primary font-body text-body font-medium flex items-center justify-center transition-colors select-none disabled:opacity-50"
        >
          {loading ? 'Generuję…' : 'Wygeneruj kod QR'}
        </button>
      </div>
    </>
  );
}
