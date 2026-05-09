import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function SelectProductsPage() {
  return (
    <div className="w-full max-w-[480px] bg-bg-light min-h-screen relative pb-32 mx-auto">
      <header className="bg-surface dark:bg-on-background fixed top-0 w-full z-50 border-b border-border-base dark:border-outline-variant transition-colors duration-200">
        <div className="flex items-center justify-between px-md h-11 w-full max-w-[480px] mx-auto">
          <Link
            href="/"
            className="text-text-secondary dark:text-on-surface-variant hover:bg-bg-subtle dark:hover:bg-surface-variant p-1 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <MaterialIcon name="arrow_back" size={24} />
          </Link>
          <div className="font-h1 text-h1 font-bold text-primary dark:text-primary-fixed">
            Meest&amp;Returns
          </div>
          <button className="text-text-secondary dark:text-on-surface-variant hover:bg-bg-subtle dark:hover:bg-surface-variant p-1 rounded-full flex items-center justify-center transition-colors duration-200">
            <MaterialIcon name="notifications" size={24} />
          </button>
        </div>
      </header>

      <main className="pt-[68px] px-md flex flex-col gap-xl">
        <section className="bg-surface border border-border-base rounded-lg p-md">
          <div className="flex justify-between items-center mb-sm">
            <span className="font-small text-small text-text-secondary">Nr zamówienia</span>
            <span className="font-technical text-technical text-text-secondary">12.05.2024</span>
          </div>
          <div className="font-h2 text-h2 text-text-primary">#MOD-2026-0042893</div>
        </section>

        <section className="flex flex-col gap-md">
          <h2 className="font-h2 text-h2 text-text-primary">Wybierz produkty do zwrotu</h2>
          <div className="flex flex-col gap-sm">
            <label className="relative bg-surface border-[2px] border-success rounded-lg p-sm flex items-center gap-md cursor-pointer transition-colors hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] group">
              <div
                className="w-16 h-20 bg-bg-subtle rounded flex-shrink-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/placeholder-product.svg')" }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-body text-body font-semibold text-text-primary truncate">
                  Black midi dress
                </h3>
                <p className="font-small text-small text-text-secondary mt-xs">
                  Rozmiar: M • Kolor: Czarny
                </p>
                <div className="font-body text-body font-semibold mt-1">199 zł</div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-success text-on-secondary">
                <MaterialIcon name="check" size={16} filled />
              </div>
              <input defaultChecked className="absolute opacity-0 w-0 h-0" type="checkbox" />
            </label>

            <label className="relative bg-surface border-[2px] border-success rounded-lg p-sm flex items-center gap-md cursor-pointer transition-colors hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] group">
              <div
                className="w-16 h-20 bg-bg-subtle rounded flex-shrink-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/placeholder-product.svg')" }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-body text-body font-semibold text-text-primary truncate">
                  White oversize shirt
                </h3>
                <p className="font-small text-small text-text-secondary mt-xs">
                  Rozmiar: S • Kolor: Biały
                </p>
                <div className="font-body text-body font-semibold mt-1">160 zł</div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-success text-on-secondary">
                <MaterialIcon name="check" size={16} filled />
              </div>
              <input defaultChecked className="absolute opacity-0 w-0 h-0" type="checkbox" />
            </label>

            <label className="relative bg-surface border border-border-base rounded-lg p-sm flex items-center gap-md cursor-pointer transition-colors hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] group">
              <div
                className="w-16 h-20 bg-bg-subtle rounded flex-shrink-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/placeholder-product.svg')" }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-body text-body font-semibold text-text-primary truncate">
                  Tailored trousers
                </h3>
                <p className="font-small text-small text-text-secondary mt-xs">
                  Rozmiar: 38 • Kolor: Granatowy
                </p>
                <div className="font-body text-body font-semibold mt-1">249 zł</div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-border-base group-hover:border-outline" />
              <input className="absolute opacity-0 w-0 h-0" type="checkbox" />
            </label>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-surface border-t border-border-base p-md z-40 flex flex-col gap-sm">
        <div className="flex justify-between items-center px-xs">
          <span className="font-body text-body text-text-secondary">Zwracasz: 2 produkty</span>
          <span className="font-body text-body font-semibold text-text-primary">359 zł</span>
        </div>
        <Link
          href="/return-reason"
          className="w-full min-h-[44px] px-[24px] py-[12px] bg-success text-on-secondary font-body text-body font-medium rounded flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          Dalej
        </Link>
      </div>
    </div>
  );
}
