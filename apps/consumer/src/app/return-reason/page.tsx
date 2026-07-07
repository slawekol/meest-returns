'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { getFlow, setFlow, type FlowState } from '../../lib/flow';

const REASONS = [
  { value: 'WRONG_SIZE', label: 'Za duży / za mały rozmiar' },
  { value: 'NOT_AS_DESCRIBED', label: 'Inny niż na zdjęciu' },
  { value: 'LOW_QUALITY', label: 'Niska jakość' },
  { value: 'CHANGED_MIND', label: 'Nie pasuje / nie podoba się' },
  { value: 'DAMAGED', label: 'Wadliwy / uszkodzony' },
  { value: 'OTHER', label: 'Inny powód' },
];

export default function ReturnReasonPage() {
  const router = useRouter();
  const [flow, setLocal] = useState<FlowState | null>(null);
  const [reason, setReason] = useState('WRONG_SIZE');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const f = getFlow();
    if (!f.order || f.selectedSkus.length === 0) {
      router.replace('/');
      return;
    }
    setLocal(f);
    if (f.reason) setReason(f.reason);
    setComment(f.reasonComment ?? '');
  }, [router]);

  if (!flow?.order) return null;
  const items = flow.order.items.filter((i) => flow.selectedSkus.includes(i.sku));
  const first = items[0];

  const next = () => {
    setFlow({ reason, reasonComment: comment });
    router.push('/pickup-point');
  };

  return (
    <div className="max-w-[480px] mx-auto bg-surface-container-lowest min-h-screen relative shadow-sm flex flex-col">
      <header className="top-0 border-b border-border-base bg-surface z-10 sticky">
        <div className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto justify-between">
          <Link
            href="/select-products"
            className="text-primary hover:bg-bg-subtle p-sm -ml-sm rounded-full transition-opacity flex items-center justify-center"
          >
            <MaterialIcon name="arrow_back" weight={300} />
          </Link>
          <div className="font-display text-display text-primary text-[18px] tracking-tight">
            Meest&amp;Returns
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-container-padding py-lg flex flex-col gap-lg">
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs font-label-caps text-label-caps text-text-secondary uppercase tracking-wider">
            <span>Krok 1 z 2</span>
          </div>
          <h1 className="font-h1 text-h1 text-text-primary">Dlaczego zwracasz?</h1>
        </div>

        {first && (
          <div className="bg-bg-subtle border border-border-base rounded-lg p-md flex gap-md items-center shadow-sm">
            <div className="w-[60px] h-[60px] bg-surface-container-highest rounded-DEFAULT overflow-hidden flex-shrink-0 border border-border-base">
              <img alt={first.name} className="w-full h-full object-cover" src={first.imageUrl} />
            </div>
            <div className="flex flex-col">
              <span className="font-small text-small text-text-secondary">
                {items.length > 1 ? `Zwracane produkty (${items.length}):` : 'Zwracany produkt:'}
              </span>
              <span className="font-body text-body font-medium text-text-primary">
                {items.map((i) => i.name).join(', ')}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-sm">
          {REASONS.map((r) => (
            <label
              key={r.value}
              className={`relative flex items-center p-md rounded-lg bg-surface-container-lowest cursor-pointer transition-shadow ${
                reason === r.value
                  ? 'border-[2px] border-success shadow-[0_4px_12px_rgba(0,0,0,0.02)]'
                  : 'border border-border-base hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-bg-light'
              }`}
            >
              <div className={`flex-1 font-body text-body text-text-primary ${reason === r.value ? 'font-medium' : ''}`}>
                {r.label}
              </div>
              <input
                checked={reason === r.value}
                onChange={() => setReason(r.value)}
                className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest checked:border-success"
                name="reason"
                type="radio"
                value={r.value}
              />
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-sm pt-sm pb-section-gap">
          <label className="font-small text-small text-text-secondary" htmlFor="comment">
            Dodatkowy komentarz (opcjonalnie)
          </label>
          <textarea
            className="w-full bg-surface-container-lowest border border-border-base rounded-lg px-md py-sm font-body text-body text-text-primary placeholder:text-text-muted focus:border-success focus:ring-0 focus:outline-none transition-colors"
            id="comment"
            placeholder="Opisz szczegóły..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </main>

      <div className="p-container-padding border-t border-border-base bg-surface-container-lowest sticky bottom-0 z-20">
        <button
          onClick={next}
          className="w-full bg-text-primary text-on-primary font-small text-small font-semibold rounded-lg h-[44px] px-lg flex items-center justify-center hover:bg-opacity-90 transition-opacity"
        >
          Dalej
        </button>
      </div>
    </div>
  );
}
