import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function ConfirmedPage() {
  return (
    <div className="bg-bg-subtle text-text-primary font-body antialiased min-h-screen flex">
      <header className="md:hidden flex justify-between items-center px-lg py-sm w-full h-[64px] bg-surface border-b border-border-base fixed top-0 z-50">
        <div className="font-h1 text-h1 font-bold text-primary">PUDO Operator</div>
        <div className="flex gap-md">
          <button className="text-primary hover:bg-surface-container-high transition-colors p-sm rounded-full active:scale-95 duration-100">
            <MaterialIcon name="notifications" />
          </button>
          <button className="text-primary hover:bg-surface-container-high transition-colors p-sm rounded-full active:scale-95 duration-100">
            <MaterialIcon name="account_circle" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-[64px] md:pt-0 min-h-screen">
        <div className="flex-1 flex items-center justify-center p-container-padding">
          <div className="max-w-[480px] w-full flex flex-col items-center text-center space-y-xl">
            <div className="w-[96px] h-[96px] rounded-full bg-badge-completed-bg flex items-center justify-center">
              <MaterialIcon name="check_circle" size={48} filled className="text-success" />
            </div>
            <div className="space-y-sm">
              <h1 className="font-display text-display text-text-primary">Zwrot przyjęty</h1>
              <p className="font-body text-body text-text-secondary">
                Klient otrzyma zwrot środków w ciągu 24h
              </p>
            </div>
            <div className="w-full bg-surface border border-border-base rounded-xl p-xl shadow-sm">
              <p className="font-body text-body text-text-secondary mb-sm">Paczka trafia do worka</p>
              <div className="inline-block bg-primary-container text-on-primary font-technical text-[24px] font-bold px-lg py-md rounded-lg">
                A (Fashion)
              </div>
            </div>
            <div className="w-full space-y-md pt-md">
              <Link
                href="/scan"
                className="w-full bg-success text-on-primary font-h2 text-h2 font-medium h-[56px] rounded hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-sm"
              >
                <MaterialIcon name="qr_code_scanner" size={24} />
                Skanuj następny kod
              </Link>
              <Link
                href="/dashboard"
                className="w-full bg-surface text-text-primary border border-border-base font-h2 text-h2 h-[56px] rounded flex items-center justify-center hover:bg-surface-container-low transition-colors"
              >
                Wróć do pulpitu
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
