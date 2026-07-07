'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { api, type VerifyData } from '../../../lib/api';

const CHECKLIST = [
  { title: 'Metki oryginalne, nieuszkodzone', desc: 'Sprawdź czy metki wewnętrzne i zewnętrzne są nienaruszone.' },
  { title: 'Brak śladów użytkowania', desc: 'Produkt nie nosi śladów noszenia, prania ani zapachów.' },
  { title: 'Wygląd zgadza się z opisem', desc: 'Porównaj kolor, rozmiar i cechy szczególne z deklaracją.' },
];

export default function VerifyReturnPage({ params }: { params: Promise<{ returnId: string }> }) {
  const { returnId } = use(params);
  const router = useRouter();
  const [data, setData] = useState<VerifyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .verify(returnId)
      .then(setData)
      .catch((e) => setError((e as Error).message));
  }, [returnId]);

  const allChecked = checks.every(Boolean);

  async function accept() {
    if (!allChecked || busy) return;
    setBusy(true);
    try {
      const result = await api.accept(returnId);
      sessionStorage.setItem('pudo-last-accept', JSON.stringify(result));
      router.push(`/verify/${returnId}/confirmed`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  async function reject() {
    if (busy) return;
    setBusy(true);
    try {
      await api.reject(returnId, 'Produkt nie spełnia wymagań (weryfikacja w punkcie)');
      router.push(`/verify/${returnId}/rejected`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-md px-lg text-center">
        <MaterialIcon name="error" size={48} className="text-error" />
        <p className="font-body text-body text-text-primary">{error}</p>
        <Link href="/scan" className="text-primary font-body text-body underline">
          Wróć do skanowania
        </Link>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-body text-text-secondary">Ładuję dane zwrotu…</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col antialiased">
      <header className="flex justify-between items-center h-[56px] px-md w-full bg-surface border-b border-border-base sticky top-0 z-40">
        <div className="flex items-center gap-sm">
          <Link
            href="/scan"
            aria-label="Wróć"
            className="p-sm text-primary hover:bg-surface-container-low transition-colors active:opacity-80 rounded-full"
          >
            <MaterialIcon name="arrow_back" size={24} />
          </Link>
          <h1 className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns Operator</h1>
        </div>
        <div className="flex items-center gap-sm">
          {data.consumerFlagged ? (
            <span className="bg-badge-rejected-bg text-error font-label-caps text-label-caps px-sm py-xs rounded-full border border-error">
              KLIENT OZNACZONY
            </span>
          ) : (
            <span className="bg-badge-completed-bg text-success font-label-caps text-label-caps px-sm py-xs rounded-full border border-success">
              SCORE {data.consumerScore.toFixed(1)}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pb-[100px] pt-lg px-md overflow-y-auto w-full max-w-[768px] mx-auto">
        <div className="w-full mb-lg flex justify-between items-end">
          <div>
            <h1 className="font-display text-display text-text-primary mb-xs">Sprawdź paczkę</h1>
            <p className="font-body text-body text-text-secondary">
              {data.merchantName} • zamówienie {data.merchantOrderId}
            </p>
          </div>
          <div className="hidden sm:flex bg-badge-initiated-bg border border-border-base rounded-full px-sm py-xs items-center gap-xs">
            <MaterialIcon name="package_2" size={16} className="text-text-secondary" />
            <span className="font-small text-small text-text-primary">
              {data.items.length} {data.items.length === 1 ? 'element' : 'elementy'}
            </span>
          </div>
        </div>

        {data.items.map((item) => (
          <div
            key={item.sku}
            className="w-full bg-surface-container-lowest border border-border-base rounded-xl overflow-hidden mb-md flex flex-col md:flex-row group transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div className="w-full md:w-[35%] h-48 md:h-auto bg-bg-subtle relative flex items-center justify-center border-b md:border-b-0 md:border-r border-border-base">
              <MaterialIcon name="apparel" size={64} className="text-text-muted" />
              <div className="absolute bottom-xs right-xs bg-surface/80 backdrop-blur-sm px-2 py-1 rounded text-label-caps font-label-caps text-text-primary">
                KOLOR: {item.color.toUpperCase()}
              </div>
            </div>
            <div className="p-lg flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-sm">
                  <h2 className="font-h2 text-h2 text-text-primary uppercase tracking-tight">{item.name}</h2>
                  <span className="bg-bg-subtle text-text-secondary font-label-caps text-label-caps px-2 py-1 rounded border border-border-base shrink-0 ml-md">
                    SKU: {item.sku}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-sm gap-x-md mb-md">
                  <div>
                    <p className="font-label-caps text-label-caps text-text-secondary mb-1">ROZMIAR</p>
                    <p className="font-small text-small text-text-primary">{item.size}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-text-secondary mb-1">WARTOŚĆ</p>
                    <p className="font-small text-small text-text-primary">{item.price} zł</p>
                  </div>
                </div>
              </div>
              <div className="mt-md pt-md border-t border-border-base flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary mb-1">NR ZWROTU</p>
                  <p className="font-technical text-technical text-text-primary bg-bg-light px-2 py-1 rounded border border-border-base inline-block">
                    {data.returnId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-label-caps text-text-secondary mb-1">REFUND</p>
                  <p className="font-body text-body font-semibold text-text-primary">{data.refundAmount} zł</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="w-full mb-section-gap mt-md">
          <h3 className="font-h2 text-h2 text-text-primary mb-md">Lista weryfikacyjna</h3>
          <div className="space-y-sm">
            {CHECKLIST.map((c, i) => (
              <label
                key={c.title}
                className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg cursor-pointer hover:bg-bg-subtle transition-colors group"
              >
                <div className="relative flex items-start pt-1">
                  <input
                    className="w-6 h-6 rounded border-border-base text-success focus:ring-success focus:ring-offset-0 bg-surface checked:border-success"
                    type="checkbox"
                    checked={checks[i]}
                    onChange={(e) => setChecks((arr) => arr.map((v, j) => (j === i ? e.target.checked : v)))}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-body text-body text-text-primary font-medium group-hover:text-primary transition-colors">
                    {c.title}
                  </p>
                  <p className="font-small text-small text-text-secondary mt-1">{c.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="font-small text-small text-error mb-md">{error}</p>}

        <div className="fixed bottom-0 left-0 right-0 w-full max-w-[768px] mx-auto bg-surface-container-lowest border-t border-border-base p-md flex flex-row gap-md items-center justify-between z-30">
          <button
            onClick={reject}
            disabled={busy}
            className="flex-1 h-[56px] flex items-center justify-center gap-sm bg-surface-container-lowest text-error border border-error hover:bg-badge-rejected-bg transition-colors rounded font-h2 text-h2 px-[24px] disabled:opacity-50"
          >
            <MaterialIcon name="close" size={24} />
            Odrzuć zwrot
          </button>
          <button
            onClick={accept}
            disabled={!allChecked || busy}
            className="flex-1 h-[56px] flex items-center justify-center gap-sm bg-success text-on-primary border border-success rounded font-h2 text-h2 px-[24px] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <MaterialIcon name="check" size={24} />
            {busy ? 'Przetwarzam…' : 'Przyjmij paczkę'}
          </button>
        </div>
      </main>
    </div>
  );
}
