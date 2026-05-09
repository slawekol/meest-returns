import { MaterialIcon } from '@meest/ui';

export function NoReturnsYet() {
  return (
    <>
      <header className="bg-surface dark:bg-surface-container-high docked full-width top-0 border-b border-border-base dark:border-outline-variant flat no shadows flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto z-40 hidden md:flex sticky">
        <div className="flex items-center gap-sm">
          <MaterialIcon
            name="arrow_back"
            className="text-text-primary dark:text-on-surface cursor-pointer hover:bg-bg-subtle dark:hover:bg-surface-variant rounded-full p-1"
          />
        </div>
        <div className="flex-1 text-center">
          <h1 className="font-h1 text-h1 text-primary dark:text-inverse-primary">
            Meest&amp;Returns
          </h1>
        </div>
        <div className="w-8" />
      </header>

      <main className="w-full max-w-[480px] mx-auto px-container-padding pt-xl pb-section-gap min-h-[calc(100vh-108px)] flex flex-col">
        <div className="mb-section-gap">
          <h1 className="font-display text-display text-text-primary">Twoje zwroty</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 mb-lg flex items-center justify-center rounded-full bg-bg-subtle">
            <MaterialIcon name="package" size={48} className="text-text-muted" />
          </div>
          <h2 className="font-h2 text-h2 text-text-primary mb-sm">Brak aktywnych zwrotów</h2>
          <p className="font-body text-body text-text-secondary mb-xl max-w-[280px]">
            Wszystkie Twoje zwroty zostały zakończone lub nie masz jeszcze żadnych przesyłek w drodze.
          </p>
          <button className="bg-[#0F172A] hover:opacity-90 text-white font-body text-body rounded-[8px] h-[44px] px-[24px] w-full max-w-[300px] transition-opacity">
            Zwróć produkt
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around items-center h-16 bg-surface dark:bg-surface-container-lowest px-md border-t border-border-base dark:border-outline-variant z-50 md:hidden">
        <div className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed font-bold cursor-pointer opacity-80 scale-95 transition-transform w-1/4">
          <MaterialIcon name="package_2" filled className="mb-xs" />
          <span className="font-small text-[11px] leading-none">Moje Zwroty</span>
        </div>
        <div className="flex flex-col items-center justify-center text-text-secondary dark:text-text-muted hover:text-primary dark:hover:text-inverse-primary cursor-pointer w-1/4">
          <MaterialIcon name="add_circle" className="mb-xs" />
          <span className="font-small text-[11px] leading-none">Nadaj</span>
        </div>
        <div className="flex flex-col items-center justify-center text-text-secondary dark:text-text-muted hover:text-primary dark:hover:text-inverse-primary cursor-pointer w-1/4">
          <MaterialIcon name="location_on" className="mb-xs" />
          <span className="font-small text-[11px] leading-none">Punkty</span>
        </div>
        <div className="flex flex-col items-center justify-center text-text-secondary dark:text-text-muted hover:text-primary dark:hover:text-inverse-primary cursor-pointer w-1/4">
          <MaterialIcon name="person" className="mb-xs" />
          <span className="font-small text-[11px] leading-none">Profil</span>
        </div>
      </nav>
    </>
  );
}
