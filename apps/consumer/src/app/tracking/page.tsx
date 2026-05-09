import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function TrackingPage() {
  return (
    <div className="w-full max-w-[480px] bg-surface min-h-screen relative shadow-[0_0_40px_rgba(0,0,0,0.05)] pb-section-gap mx-auto">
      <header className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto bg-surface dark:bg-surface-container-high border-b border-border-base dark:border-outline-variant sticky top-0 z-50">
        <Link
          href="/"
          className="mr-md text-text-primary dark:text-on-surface hover:bg-bg-subtle dark:hover:bg-surface-variant p-sm rounded-full transition-opacity opacity-100 hover:opacity-80 active:opacity-80 flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" weight={300} />
        </Link>
        <div className="flex-1 text-center pr-10">
          <h1 className="font-display text-display text-primary dark:text-inverse-primary tracking-tight">
            Meest&amp;Returns
          </h1>
        </div>
      </header>

      <main className="px-container-padding pt-lg">
        <div className="mb-xl">
          <h2 className="font-h1 text-h1 text-text-primary mb-xs">Status zwrotu</h2>
          <div className="flex items-center text-text-secondary">
            <MaterialIcon name="tag" size={16} weight={300} className="mr-sm" />
            <span className="font-technical text-technical">RTN-K9F2-8XLM</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-xl p-lg mb-form-gap relative">
          <div className="absolute left-[39px] top-[40px] bottom-[40px] w-[1px] bg-border-base z-0" />
          <div className="relative z-10 flex flex-col gap-lg">
            <div className="flex gap-md group">
              <div className="w-[32px] h-[32px] rounded-full bg-badge-completed-bg border border-success flex items-center justify-center shrink-0 mt-1">
                <MaterialIcon name="check" size={16} weight={500} className="text-success" />
              </div>
              <div className="flex-1 pb-xs">
                <h3 className="font-body text-body font-semibold text-text-primary">
                  Zwrot zainicjowany
                </h3>
                <div className="flex items-center text-text-secondary mt-xs">
                  <MaterialIcon name="calendar_today" size={14} weight={300} className="mr-xs" />
                  <p className="font-small text-small">12.10.2023, 14:20</p>
                </div>
              </div>
            </div>

            <div className="flex gap-md group">
              <div className="w-[32px] h-[32px] rounded-full bg-badge-dropped-bg border border-warning flex items-center justify-center shrink-0 mt-1 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]">
                <MaterialIcon name="hourglass_empty" size={16} weight={500} className="text-warning" />
              </div>
              <div className="flex-1 pb-xs">
                <h3 className="font-body text-body font-semibold text-text-primary">
                  Oddany w punkcie
                </h3>
                <div className="flex items-center text-text-secondary mt-xs">
                  <MaterialIcon name="calendar_today" size={14} weight={300} className="mr-xs" />
                  <p className="font-small text-small">13.10.2023, 09:45</p>
                </div>
              </div>
            </div>

            <div className="flex gap-md group opacity-60">
              <div className="w-[32px] h-[32px] rounded-full bg-surface border border-border-base flex items-center justify-center shrink-0 mt-1">
                <div className="w-[8px] h-[8px] rounded-full bg-border-base" />
              </div>
              <div className="flex-1 pt-1 pb-xs">
                <h3 className="font-body text-body font-medium text-text-secondary">W transporcie</h3>
              </div>
            </div>

            <div className="flex gap-md group opacity-60">
              <div className="w-[32px] h-[32px] rounded-full bg-surface border border-border-base flex items-center justify-center shrink-0 mt-1">
                <div className="w-[8px] h-[8px] rounded-full bg-border-base" />
              </div>
              <div className="flex-1 pt-1 pb-xs">
                <h3 className="font-body text-body font-medium text-text-secondary">
                  Dotarł do magazynu
                </h3>
              </div>
            </div>

            <div className="flex gap-md group opacity-60">
              <div className="w-[32px] h-[32px] rounded-full bg-surface border border-border-base flex items-center justify-center shrink-0 mt-1">
                <div className="w-[8px] h-[8px] rounded-full bg-border-base" />
              </div>
              <div className="flex-1 pt-1 pb-xs">
                <h3 className="font-body text-body font-medium text-text-secondary">
                  Środki zwrócone
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-sm mb-xl">
          <div className="bg-surface-container-lowest border border-border-base rounded-xl p-md flex items-center">
            <div className="w-[40px] h-[40px] rounded-lg bg-bg-subtle flex items-center justify-center text-text-secondary mr-md shrink-0">
              <MaterialIcon name="event_available" weight={300} />
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-text-secondary uppercase mb-xs">
                Przewidywany zwrot środków
              </p>
              <p className="font-body text-body font-semibold text-text-primary">15.10.2023</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-xl p-md flex items-center">
            <div className="w-[40px] h-[40px] rounded-lg bg-bg-subtle flex items-center justify-center text-text-secondary mr-md shrink-0">
              <MaterialIcon name="credit_card" weight={300} />
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-text-secondary uppercase mb-xs">
                Zwracamy
              </p>
              <p className="font-body text-body font-semibold text-text-primary">
                359 zł{' '}
                <span className="font-normal text-text-secondary">
                  na kartę kończącą się 4242
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <button className="w-full min-h-[44px] py-[12px] px-lg bg-surface-container-lowest border border-border-base rounded-lg font-body text-body font-semibold text-text-primary flex items-center justify-center hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <MaterialIcon name="help_outline" size={16} weight={300} className="mr-sm" />
            Pomoc
          </button>
        </div>
      </main>
    </div>
  );
}
