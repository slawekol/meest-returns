import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function ManualEntryPage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body antialiased">
      <header className="fixed top-0 w-full z-50 border-b border-border-base bg-surface flex items-center justify-between px-md h-11 max-w-[768px] mx-auto left-1/2 -translate-x-1/2">
        <Link
          href="/scan"
          aria-label="Wróć"
          className="text-text-secondary hover:bg-bg-subtle transition-colors duration-200 p-unit rounded-full flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" />
        </Link>
        <span className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns</span>
        <button
          aria-label="Powiadomienia"
          className="text-text-secondary hover:bg-bg-subtle transition-colors duration-200 p-unit rounded-full flex items-center justify-center"
        >
          <MaterialIcon name="notifications" />
        </button>
      </header>

      <main className="pt-[60px] pb-lg px-container-padding max-w-[768px] mx-auto min-h-screen flex flex-col">
        <div className="mt-md mb-xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-badge-initiated-bg rounded-full flex items-center justify-center mb-md">
            <MaterialIcon name="dialpad" className="text-text-primary" />
          </div>
          <h1 className="font-display text-display text-text-primary">Wpisz kod zwrotu</h1>
          <p className="font-body text-body text-text-secondary mt-sm max-w-[280px]">
            Wprowadź 10-cyfrowy kod RTN podany na dokumencie zwrotu.
          </p>
        </div>

        <div className="mb-xl w-full">
          <div className="w-full border-2 border-success bg-surface-container-lowest rounded-lg h-[64px] flex items-center justify-center px-lg shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all">
            <span className="font-technical text-h1 text-text-muted mr-sm tracking-widest">
              RTN-
            </span>
            <span className="font-technical text-h1 text-text-primary tracking-widest">8372</span>
            <span className="w-[2px] h-[28px] bg-success ml-unit animate-pulse" />
          </div>
          <div className="mt-sm flex justify-between px-xs">
            <span className="font-small text-small text-text-muted">Format: RTN-XXXXXXXXXX</span>
            <span className="font-small text-small text-text-secondary">4 / 10</span>
          </div>
        </div>

        <div className="flex-grow" />

        <div className="w-full max-w-[320px] mx-auto grid grid-cols-3 gap-md mb-xl">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
            <button
              key={n}
              className="h-[64px] flex items-center justify-center bg-surface-container-lowest border border-border-base rounded-lg text-display font-display text-text-primary hover:bg-bg-subtle hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-95 transition-all"
            >
              {n}
            </button>
          ))}
          <button
            className="h-[64px] flex items-center justify-center rounded-lg text-text-primary bg-transparent"
            disabled
          />
          <button className="h-[64px] flex items-center justify-center bg-surface-container-lowest border border-border-base rounded-lg text-display font-display text-text-primary hover:bg-bg-subtle hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-95 transition-all">
            0
          </button>
          <button className="h-[64px] flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-subtle active:scale-95 transition-all">
            <MaterialIcon name="backspace" size={32} />
          </button>
        </div>

        <div className="mt-auto pt-md w-full">
          <Link
            href="/verify/RTN-2026-A41B"
            className="w-full bg-success text-on-primary font-h2 text-h2 py-[12px] px-[24px] min-h-[48px] rounded-lg flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
          >
            Zatwierdź
          </Link>
        </div>
      </main>
    </div>
  );
}
