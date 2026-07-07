'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { api } from '../lib/api';
import { setFlow, emptyFlow } from '../lib/flow';

export default function LandingPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('MOD-2026-0042893');
  const [email, setEmail] = useState('anna.kowalska@example.com');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const order = await api.lookupOrder(orderNumber, email);
      sessionStorage.removeItem('meest-returns-flow');
      setFlow({ ...emptyFlow(), email, order });
      router.push('/select-products');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[480px] min-h-[844px] bg-surface-container-lowest shadow-[0_0_40px_rgba(0,0,0,0.05)] relative flex flex-col mx-auto overflow-hidden">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-md h-[60px] max-w-[480px] mx-auto bg-surface-container-lowest">
        <div className="flex items-center">
          <span className="font-display text-display tracking-tight text-text-primary">
            Meest&amp;Returns
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-container-padding pt-[100px] pb-lg">
        <div className="mb-section-gap">
          <h1 className="font-h1 text-h1 text-text-primary mb-xs">
            Zwróć zamówienie w 30 sekund
          </h1>
          <p className="font-body text-body text-text-secondary">
            Bez drukowania etykiet, bez pakowania
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-form-gap mb-section-gap">
          <div className="flex flex-col gap-xs">
            <label className="font-small text-small text-text-primary" htmlFor="order-number">
              Numer zamówienia
            </label>
            <input
              id="order-number"
              name="orderNumber"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="MOD-2026-0042893"
              className="h-[44px] px-md rounded-lg border border-border-base bg-surface-container-lowest font-body text-body text-text-primary focus:outline-none focus:ring-0 focus:border-[2px] focus:border-success transition-colors w-full placeholder:text-text-muted"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-small text-small text-text-primary" htmlFor="order-email">
              Email z zamówienia
            </label>
            <input
              id="order-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
              className="h-[44px] px-md rounded-lg border border-border-base bg-surface-container-lowest font-body text-body text-text-primary focus:outline-none focus:ring-0 focus:border-[2px] focus:border-success transition-colors w-full placeholder:text-text-muted"
            />
          </div>
          {error && (
            <div className="flex items-center gap-sm text-error font-small text-small bg-badge-rejected-bg border border-error rounded-lg px-md py-sm">
              <MaterialIcon name="error" size={18} />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] px-[24px] py-[12px] bg-success text-on-secondary font-body text-body font-medium rounded flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'Szukam…' : 'Znajdź zamówienie'}
          </button>
        </form>

        <div className="flex flex-col gap-md mt-auto">
          <p className="font-small text-small text-text-secondary text-center">
            Zwroty obsługiwane przez sieć Meest Box
          </p>
          <div className="flex items-center justify-center gap-lg text-text-secondary">
            <span className="flex items-center gap-xs font-small text-small">
              <MaterialIcon name="location_on" size={18} /> 1,350 punktów w Polsce
            </span>
            <span className="flex items-center gap-xs font-small text-small">
              <MaterialIcon name="schedule" size={18} /> Zwrot środków 24h
            </span>
            <span className="flex items-center gap-xs font-small text-small">
              <MaterialIcon name="check_circle" size={18} /> Bezpłatne
            </span>
          </div>
          <Link
            href="/tracking"
            className="text-center font-label-caps text-label-caps text-text-muted hover:text-text-primary transition-colors pb-lg"
          >
            Masz już zwrot? Sprawdź status →
          </Link>
        </div>
      </main>
    </div>
  );
}
