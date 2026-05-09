import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function RejectReasonPage() {
  return (
    <div className="bg-bg-light text-on-surface font-body w-full max-w-[768px] mx-auto min-h-screen flex flex-col antialiased">
      <header className="bg-surface flex justify-between items-center h-[56px] px-md w-full border-b border-border-base z-10 sticky top-0">
        <div className="flex items-center gap-sm">
          <Link
            href="/verify/RTN-2026-A41B"
            aria-label="Wróć"
            className="p-sm text-primary hover:bg-surface-container-low transition-colors active:opacity-80 rounded-full"
          >
            <MaterialIcon name="arrow_back" size={24} />
          </Link>
          <h1 className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns Operator</h1>
        </div>
        <div className="flex items-center">
          <button className="p-sm text-primary hover:bg-surface-container-low transition-colors active:opacity-80 rounded-full">
            <MaterialIcon name="account_circle" size={24} />
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col p-container-padding gap-section-gap">
        <section className="flex flex-col gap-sm">
          <h2 className="font-display text-display text-primary">Dlaczego odrzucasz?</h2>
          <p className="font-body text-body text-text-secondary">
            Wybierz główny powód odrzucenia zwrotu. Ta informacja zostanie przekazana klientowi.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-form-gap">
          <button className="flex items-start p-md bg-surface border-2 border-success rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all text-left min-h-[72px] relative overflow-hidden group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/10 text-success mr-sm shrink-0">
              <MaterialIcon name="label_off" />
            </div>
            <div className="flex flex-col">
              <span className="font-h2 text-h2 text-primary group-hover:text-success transition-colors">
                Brak metki / metka uszkodzona
              </span>
            </div>
            <div className="absolute top-sm right-sm text-success">
              <MaterialIcon name="check_circle" filled />
            </div>
          </button>

          <button className="flex items-start p-md bg-surface border border-border-base rounded-lg hover:border-outline hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all text-left min-h-[72px] group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container text-text-secondary mr-sm shrink-0">
              <MaterialIcon name="layers_clear" />
            </div>
            <div className="flex flex-col">
              <span className="font-h2 text-h2 text-primary">Brak worka foliowego</span>
            </div>
          </button>

          <button className="flex items-start p-md bg-surface border border-border-base rounded-lg hover:border-outline hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all text-left min-h-[72px] group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container text-text-secondary mr-sm shrink-0">
              <MaterialIcon name="report" />
            </div>
            <div className="flex flex-col">
              <span className="font-h2 text-h2 text-primary">Produkt niezgodny z opisem</span>
            </div>
          </button>

          <button className="flex items-start p-md bg-surface border border-border-base rounded-lg hover:border-outline hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all text-left min-h-[72px] group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container text-text-secondary mr-sm shrink-0">
              <MaterialIcon name="more_horiz" />
            </div>
            <div className="flex flex-col">
              <span className="font-h2 text-h2 text-primary">Inny powód</span>
            </div>
          </button>
        </section>
      </main>

      <div className="p-container-padding bg-surface border-t border-border-base mt-auto sticky bottom-0 z-10">
        <Link
          href="/verify/RTN-2026-A41B/rejected"
          className="w-full h-[56px] bg-[#EF4444] hover:bg-[#DC2626] text-on-error font-h2 text-h2 rounded flex items-center justify-center gap-sm transition-colors active:scale-[0.98]"
        >
          <MaterialIcon name="block" />
          Odrzuć i wyjaśnij klientowi
        </Link>
      </div>
    </div>
  );
}
