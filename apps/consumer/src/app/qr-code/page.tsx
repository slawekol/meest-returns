import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function QrCodePage() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-border-base transition-colors duration-200">
        <div className="flex items-center justify-between px-md h-11 w-full max-w-[480px] mx-auto">
          <Link
            href="/packaging"
            className="text-text-secondary hover:bg-bg-subtle p-sm rounded-full transition-colors"
          >
            <MaterialIcon name="arrow_back" />
          </Link>
          <h1 className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns</h1>
          <button className="text-text-secondary hover:bg-bg-subtle p-sm rounded-full transition-colors">
            <MaterialIcon name="notifications" />
          </button>
        </div>
      </header>

      <main className="pt-[80px] px-container-padding max-w-[480px] mx-auto flex flex-col gap-lg">
        <div className="text-center">
          <h2 className="font-display text-display text-text-primary mb-sm">Twój kod QR</h2>
          <p className="font-body text-body text-text-secondary">
            Pokaż kod w punkcie. Operator zeskanuje i przyjmie paczkę.
          </p>
        </div>

        <div className="flex flex-col items-center gap-sm bg-surface-container-lowest p-lg rounded-xl border border-border-base shadow-sm mx-auto w-full max-w-[340px]">
          <div className="w-[280px] h-[280px] bg-white border border-border-base rounded-lg p-sm flex items-center justify-center">
            <img
              alt="Kod QR"
              className="w-full h-full object-contain"
              src="/placeholder-product.svg"
            />
          </div>
          <p className="font-technical text-technical text-text-primary tracking-widest mt-md">
            RTN-K9F2-8XLM
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md">
          <div className="flex justify-between items-start mb-md">
            <div className="flex gap-sm">
              <div className="text-success mt-xs">
                <MaterialIcon name="storefront" filled />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary">Sklep Żabka</h3>
                <p className="font-body text-body text-text-secondary">ul. Marszałkowska 10</p>
                <p className="font-small text-small text-text-secondary mt-xs flex items-center gap-xs">
                  <MaterialIcon name="schedule" size={16} /> Otwarte do 22:00
                </p>
              </div>
            </div>
            <div className="font-small text-small text-text-secondary font-medium">240 m</div>
          </div>
          <button className="w-full h-[44px] flex items-center justify-center gap-sm bg-white border border-border-base rounded text-text-primary font-small text-small font-medium hover:bg-bg-subtle transition-colors">
            <MaterialIcon name="map" size={18} />
            Pokaż na mapie
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
          <div className="px-md py-sm border-b border-border-base bg-bg-subtle">
            <h3 className="font-small text-small text-text-primary font-semibold">Twoje produkty</h3>
          </div>
          <div className="p-md flex flex-col gap-md">
            <div className="flex items-center gap-md">
              <img
                alt="Black midi dress"
                className="w-[48px] h-[48px] rounded object-cover border border-border-base"
                src="/placeholder-product.svg"
              />
              <div className="flex-1">
                <p className="font-body text-body text-text-primary font-medium">
                  Black midi dress
                </p>
              </div>
            </div>
            <div className="flex items-center gap-md">
              <img
                alt="White oversize shirt"
                className="w-[48px] h-[48px] rounded object-cover border border-border-base"
                src="/placeholder-product.svg"
              />
              <div className="flex-1">
                <p className="font-body text-body text-text-primary font-medium">
                  White oversize shirt
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-sm mt-sm">
          <button className="w-full h-[44px] flex items-center justify-center bg-primary text-white rounded font-small text-small font-medium hover:bg-opacity-90 transition-opacity">
            Zapisz kod
          </button>
          <button className="w-full h-[44px] flex items-center justify-center bg-white border border-border-base rounded text-text-primary font-small text-small font-medium hover:bg-bg-subtle transition-colors">
            Wyślij na email
          </button>
        </div>

        <p className="text-center font-small text-small text-text-muted mt-sm mb-xl">
          Kod jest ważny 14 dni
        </p>

        <Link
          href="/tracking"
          className="text-center font-label-caps text-label-caps text-text-muted hover:text-text-primary transition-colors mb-xl"
        >
          Sprawdź status zwrotu →
        </Link>
      </main>
    </>
  );
}
