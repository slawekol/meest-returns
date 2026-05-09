import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function LandingPage() {
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

        <form action="/select-products" className="flex flex-col gap-form-gap mb-section-gap">
          <div className="flex flex-col gap-xs">
            <label
              className="font-small text-small text-text-primary"
              htmlFor="order-number"
            >
              Numer zamówienia
            </label>
            <input
              id="order-number"
              name="orderNumber"
              type="text"
              placeholder="MOD-2026-0042893"
              className="h-[44px] px-md rounded-lg border border-border-base bg-surface-container-lowest font-body text-body text-text-primary focus:outline-none focus:ring-0 focus:border-[2px] focus:border-success transition-colors w-full placeholder:text-text-muted"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label
              className="font-small text-small text-text-primary"
              htmlFor="order-email"
            >
              Email z zamówienia
            </label>
            <input
              id="order-email"
              name="email"
              type="email"
              placeholder="twoj@email.pl"
              className="h-[44px] px-md rounded-lg border border-border-base bg-surface-container-lowest font-body text-body text-text-primary focus:outline-none focus:ring-0 focus:border-[2px] focus:border-success transition-colors w-full placeholder:text-text-muted"
            />
          </div>
          <button
            type="submit"
            className="h-[44px] mt-sm rounded-lg bg-text-primary text-on-primary font-small text-small font-medium hover:bg-black transition-colors flex items-center justify-center w-full"
          >
            Znajdź zamówienie
          </button>
          <div className="text-center mt-xs">
            <span className="font-label-caps text-label-caps text-text-muted">
              Zwroty obsługiwane przez sieć Meest Box
            </span>
          </div>
        </form>

        <div className="flex-1" />

        <div className="flex flex-col gap-sm border-t border-border-base pt-lg">
          <div className="flex items-center gap-md">
            <MaterialIcon name="location_on" className="text-text-secondary" />
            <span className="font-small text-small text-text-primary">
              1,350 punktów w Polsce
            </span>
          </div>
          <div className="flex items-center gap-md">
            <MaterialIcon name="schedule" className="text-text-secondary" />
            <span className="font-small text-small text-text-primary">
              Zwrot środków 24h
            </span>
          </div>
          <div className="flex items-center gap-md">
            <MaterialIcon name="check_circle" className="text-text-secondary" />
            <span className="font-small text-small text-text-primary">Bezpłatne</span>
          </div>
        </div>

        <Link
          href="/tracking"
          className="mt-md text-center font-label-caps text-label-caps text-text-muted hover:text-text-primary transition-colors"
        >
          Masz już zwrot? Sprawdź status →
        </Link>
      </main>
    </div>
  );
}
