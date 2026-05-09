import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function OperatorDashboardPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body antialiased">
      <header className="bg-surface dark:bg-surface-container-highest text-primary dark:text-on-surface flex justify-between items-center h-[56px] px-md w-full max-w-[768px] mx-auto border-b border-border-base docked full-width top-0">
        <div className="flex flex-col">
          <span className="font-h1 text-h1 font-bold text-primary dark:text-on-surface">
            Meest&amp;Returns Operator
          </span>
          <span className="font-small text-small text-on-surface-variant">Żabka #4822</span>
        </div>
        <div className="flex items-center gap-md">
          <span className="font-small text-small text-on-surface-variant hidden sm:inline">
            Zalogowany: Jan Kowalski
          </span>
          <Link
            href="/"
            className="flex items-center gap-xs font-small text-small text-primary hover:bg-surface-container-low transition-colors px-sm py-xs rounded active:opacity-80 transition-opacity"
          >
            <span>Wyloguj</span>
            <MaterialIcon name="logout" />
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[768px] mx-auto px-md py-lg flex flex-col gap-lg pb-xxxl">
        <Link
          href="/scan"
          className="w-full bg-success text-on-primary h-[80px] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center gap-md active:opacity-90 transition-opacity"
        >
          <MaterialIcon name="qr_code_scanner" size={32} filled />
          <span className="font-display text-display uppercase">SKANUJ KOD ZWROTU</span>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md flex flex-col gap-xs hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wide">
              Dziś przyjęto
            </span>
            <span className="font-technical text-technical text-h1 font-bold text-primary">12</span>
          </div>
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md flex flex-col gap-xs hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wide">
              W tym worku
            </span>
            <span className="font-technical text-technical text-h1 font-bold text-primary">8</span>
          </div>
          <Link
            href="/bag"
            className="bg-badge-dropped-bg border border-warning/20 rounded-lg p-md flex flex-col gap-xs hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-tertiary-fixed-variant uppercase tracking-wide">
                Worek pełny
              </span>
              <MaterialIcon name="warning" size={16} filled className="text-warning" />
            </div>
            <div className="flex items-baseline gap-xs">
              <span className="font-small text-small text-on-tertiary-fixed-variant">za</span>
              <span className="font-technical text-technical text-h1 font-bold text-on-tertiary-fixed-variant">
                2
              </span>
              <span className="font-small text-small text-on-tertiary-fixed-variant">paczki</span>
            </div>
            <div className="w-full bg-warning/20 h-[4px] rounded-full mt-sm overflow-hidden">
              <div className="bg-warning h-full rounded-full" style={{ width: '80%' }} />
            </div>
          </Link>
        </div>
      </main>

      <nav className="bg-surface dark:bg-surface-container-high text-primary dark:text-on-surface border-t border-border-base docked full-width bottom-0 fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[64px] bg-surface md:hidden">
        <Link
          href="/scan"
          className="flex flex-col items-center justify-center text-primary dark:text-secondary-fixed-dim font-bold active:bg-surface-container active:scale-95 transition-all w-full h-full"
        >
          <MaterialIcon name="qr_code_scanner" size={24} filled className="text-success" />
          <span className="font-label-caps text-label-caps text-success mt-xs">Skanuj</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container active:scale-95 transition-all w-full h-full"
        >
          <MaterialIcon name="home" size={24} />
          <span className="font-label-caps text-label-caps mt-xs">Pulpit</span>
        </Link>
        <Link
          href="/bag"
          className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container active:scale-95 transition-all w-full h-full"
        >
          <MaterialIcon name="package_2" size={24} />
          <span className="font-label-caps text-label-caps mt-xs">Batch</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container active:scale-95 transition-all w-full h-full">
          <MaterialIcon name="person" size={24} />
          <span className="font-label-caps text-label-caps mt-xs">Profil</span>
        </button>
      </nav>
    </div>
  );
}
