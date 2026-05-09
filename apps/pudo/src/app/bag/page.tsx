import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function BagManagementPage() {
  return (
    <div className="bg-bg-light text-text-primary min-h-screen flex w-full max-w-[768px] mx-auto">
      <nav className="md:hidden flex justify-between items-center h-[56px] px-md w-full bg-surface border-b border-border-base fixed top-0 left-0 z-40">
        <div className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns Operator</div>
        <div className="flex items-center gap-sm">
          <MaterialIcon name="account_circle" size={24} className="text-primary" />
        </div>
      </nav>

      <main className="flex-1 w-full pt-[56px] md:pt-0 pb-[80px] md:pb-lg px-md md:px-xl py-xl bg-bg-subtle min-h-screen">
        <header className="mb-xl flex items-center gap-sm">
          <Link
            href="/dashboard"
            aria-label="Wróć"
            className="p-sm text-primary hover:bg-surface-container-low transition-colors rounded-full"
          >
            <MaterialIcon name="arrow_back" size={24} />
          </Link>
          <div>
            <h1 className="font-display text-display text-text-primary">Worek bieżący</h1>
            <p className="font-body text-body text-text-secondary mt-xs">
              Zarządzaj otwartą partią zwrotów
            </p>
          </div>
        </header>

        <section className="bg-surface border border-border-base rounded-xl p-lg mb-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200">
          <div className="flex justify-between items-start mb-md">
            <div>
              <h2 className="font-technical text-technical text-text-primary font-bold tracking-tight">
                Worek #A-2026-3847
              </h2>
              <p className="font-body text-body text-text-secondary mt-xs">
                Otwarty: poniedziałek 09:34
              </p>
            </div>
            <div className="bg-badge-initiated-bg border border-border-base px-sm py-xs rounded-full font-label-caps text-label-caps text-text-primary flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-warning" /> W trakcie
            </div>
          </div>
          <div className="mt-lg">
            <div className="flex justify-between items-end mb-sm">
              <span className="font-small text-small text-text-secondary">Pojemność worka</span>
              <span className="font-h2 text-h2 text-text-primary">Paczek: 8 / 12</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: '66.66%' }} />
            </div>
            <p className="font-small text-small text-text-muted mt-sm text-right">
              Pozostało miejsca na 4 paczki
            </p>
          </div>
        </section>

        <section className="bg-surface border border-border-base rounded-xl overflow-hidden mb-xl">
          <div className="px-md py-sm border-b border-border-base bg-surface-container-lowest">
            <h3 className="font-small text-small text-text-secondary">
              Zawartość worka (Ostatnio dodane)
            </h3>
          </div>
          <ul className="divide-y divide-border-base">
            <li className="flex items-center px-md py-md hover:bg-bg-subtle transition-colors group">
              <div
                className="w-3 h-3 rounded-full bg-warning mr-md flex-shrink-0"
                title="Pomarańczowy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-xs">
                  <span className="font-body text-body text-text-primary font-semibold truncate pr-2">
                    Sweter dziergany pomarańczowy
                  </span>
                  <span className="font-small text-small text-text-secondary flex-shrink-0">
                    10:15
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="font-technical text-[13px] text-text-secondary">
                    RTN-K9F2-8XLM
                  </span>
                </div>
              </div>
            </li>
            <li className="flex items-center px-md py-md hover:bg-bg-subtle transition-colors group">
              <div
                className="w-3 h-3 rounded-full bg-info mr-md flex-shrink-0"
                title="Niebieski"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-xs">
                  <span className="font-body text-body text-text-primary font-semibold truncate pr-2">
                    Jeansy slim fit
                  </span>
                  <span className="font-small text-small text-text-secondary flex-shrink-0">
                    09:58
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="font-technical text-[13px] text-text-secondary">
                    RTN-L2B3-9YNP
                  </span>
                </div>
              </div>
            </li>
            <li className="flex items-center px-md py-md hover:bg-bg-subtle transition-colors group">
              <div
                className="w-3 h-3 rounded-full bg-primary mr-md flex-shrink-0"
                title="Czarny"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-xs">
                  <span className="font-body text-body text-text-primary font-semibold truncate pr-2">
                    Kurtka przejściowa
                  </span>
                  <span className="font-small text-small text-text-secondary flex-shrink-0">
                    09:45
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="font-technical text-[13px] text-text-secondary">
                    RTN-M5X4-2ZLQ
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <div className="flex flex-col gap-md mt-auto">
          <button className="w-full h-[56px] bg-primary text-on-primary font-h2 text-h2 rounded-lg flex items-center justify-center px-lg active:scale-[0.98] transition-transform">
            Zamknij worek (gotowy do odbioru)
          </button>
          <button className="w-full h-[56px] bg-surface text-text-primary border border-border-base font-h2 text-h2 rounded-lg flex items-center justify-center px-lg active:scale-[0.98] transition-transform hover:bg-surface-container-low">
            <MaterialIcon name="print" size={24} className="mr-sm" />
            Wydrukuj manifest
          </button>
          <div className="text-center mt-sm">
            <button
              className="font-small text-small text-text-muted cursor-not-allowed"
              disabled
            >
              Otwórz nowy worek
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
