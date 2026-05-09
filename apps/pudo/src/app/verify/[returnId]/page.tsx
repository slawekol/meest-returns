import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function VerifyReturnPage() {
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
        <button className="p-sm text-primary hover:bg-surface-container-low transition-colors active:opacity-80 rounded-full">
          <MaterialIcon name="account_circle" size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center pb-[100px] pt-lg px-md overflow-y-auto w-full max-w-[768px] mx-auto">
        <div className="w-full mb-lg flex justify-between items-end">
          <div>
            <h1 className="font-display text-display text-text-primary mb-xs">Sprawdź paczkę</h1>
            <p className="font-body text-body text-text-secondary">
              Zweryfikuj stan zwracanego produktu.
            </p>
          </div>
          <div className="hidden sm:flex bg-badge-initiated-bg border border-border-base rounded-full px-sm py-xs items-center gap-xs">
            <MaterialIcon name="package" size={16} className="text-text-secondary" />
            <span className="font-small text-small text-text-primary">1 / 1 Elementów</span>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest border border-border-base rounded-xl overflow-hidden mb-section-gap flex flex-col md:flex-row group transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="w-full md:w-[35%] h-48 md:h-auto bg-[#FB923C] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-border-base">
            <MaterialIcon name="apparel" size={64} className="text-white opacity-40 mix-blend-overlay" />
            <div className="absolute bottom-xs right-xs bg-surface/80 backdrop-blur-sm px-2 py-1 rounded text-label-caps font-label-caps text-text-primary">
              KOLOR: POMARAŃCZOWY
            </div>
          </div>
          <div className="p-lg flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-sm">
                <h2 className="font-h2 text-h2 text-text-primary uppercase tracking-tight">
                  Sweter dziergany pomarańczowy
                </h2>
                <span className="bg-bg-subtle text-text-secondary font-label-caps text-label-caps px-2 py-1 rounded border border-border-base shrink-0 ml-md">
                  SKU: SW-OR-M-01
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-sm gap-x-md mb-md">
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary mb-1">ROZMIAR</p>
                  <p className="font-small text-small text-text-primary">M</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary mb-1">BRAND</p>
                  <p className="font-small text-small text-text-primary">Reserved</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-text-secondary mb-1">ILOŚĆ</p>
                  <p className="font-small text-small text-text-primary">1 szt.</p>
                </div>
              </div>
            </div>
            <div className="mt-md pt-md border-t border-border-base flex items-center justify-between">
              <div>
                <p className="font-label-caps text-label-caps text-text-secondary mb-1">NR ZWROTU</p>
                <p className="font-technical text-technical text-text-primary bg-bg-light px-2 py-1 rounded border border-border-base inline-block">
                  RTN-2026-A41B
                </p>
              </div>
              <button className="w-10 h-10 flex items-center justify-center bg-surface border border-border-base rounded hover:bg-surface-container transition-colors">
                <MaterialIcon name="content_copy" className="text-text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mb-section-gap">
          <h3 className="font-h2 text-h2 text-text-primary mb-md">Lista weryfikacyjna</h3>
          <div className="space-y-sm">
            <label className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg cursor-pointer hover:bg-bg-subtle transition-colors group">
              <div className="relative flex items-start pt-1">
                <input
                  className="w-6 h-6 rounded border-border-base text-success focus:ring-success focus:ring-offset-0 bg-surface checked:border-success"
                  type="checkbox"
                />
              </div>
              <div className="flex-1">
                <p className="font-body text-body text-text-primary font-medium group-hover:text-primary transition-colors">
                  Metki oryginalne, nieuszkodzone
                </p>
                <p className="font-small text-small text-text-secondary mt-1">
                  Sprawdź czy metki wewnętrzne i zewnętrzne są nienaruszone.
                </p>
              </div>
            </label>
            <label className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg cursor-pointer hover:bg-bg-subtle transition-colors group">
              <div className="relative flex items-start pt-1">
                <input
                  className="w-6 h-6 rounded border-border-base text-success focus:ring-success focus:ring-offset-0 bg-surface checked:border-success"
                  type="checkbox"
                />
              </div>
              <div className="flex-1">
                <p className="font-body text-body text-text-primary font-medium group-hover:text-primary transition-colors">
                  Produkt w worku foliowym
                </p>
                <p className="font-small text-small text-text-secondary mt-1">
                  Upewnij się, że produkt znajduje się w oryginalnym opakowaniu ochronnym.
                </p>
              </div>
            </label>
            <label className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg cursor-pointer hover:bg-bg-subtle transition-colors group">
              <div className="relative flex items-start pt-1">
                <input
                  className="w-6 h-6 rounded border-border-base text-success focus:ring-success focus:ring-offset-0 bg-surface checked:border-success"
                  type="checkbox"
                />
              </div>
              <div className="flex-1">
                <p className="font-body text-body text-text-primary font-medium group-hover:text-primary transition-colors">
                  Wygląd zgadza się z opisem powyżej
                </p>
                <p className="font-small text-small text-text-secondary mt-1">
                  Porównaj kolor, rozmiar i cechy szczególne z deklaracją.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full max-w-[768px] mx-auto bg-surface-container-lowest border-t border-border-base p-md flex flex-row gap-md items-center justify-between z-30">
          <Link
            href="/verify/RTN-2026-A41B/reject"
            className="flex-1 h-[56px] flex items-center justify-center gap-sm bg-surface-container-lowest text-error border border-error hover:bg-badge-rejected-bg transition-colors rounded font-h2 text-h2 px-[24px]"
          >
            <MaterialIcon name="close" size={24} />
            Odrzuć zwrot
          </Link>
          <Link
            href="/verify/RTN-2026-A41B/photo"
            className="flex-1 h-[56px] flex items-center justify-center gap-sm bg-success text-on-primary border border-success rounded font-h2 text-h2 px-[24px] hover:opacity-90 transition-opacity"
          >
            <MaterialIcon name="check" size={24} />
            Przyjmij paczkę
          </Link>
        </div>
      </main>
    </div>
  );
}
