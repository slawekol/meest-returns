import { MaterialIcon } from '@meest/ui';

export default function Loading() {
  return (
    <>
      <header className="bg-surface dark:bg-surface-container-high border-b border-border-base dark:border-outline-variant docked full-width top-0 z-50">
        <div className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto">
          <button
            aria-label="Wróć"
            className="flex items-center justify-center p-xs mr-md text-text-primary dark:text-on-surface hover:bg-bg-subtle dark:hover:bg-surface-variant transition-opacity opacity-80 rounded-full"
          >
            <MaterialIcon name="arrow_back" />
          </button>
          <h1 className="font-display text-display text-primary dark:text-inverse-primary truncate">
            Meest&amp;Returns
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center w-full max-w-[480px] mx-auto px-container-padding min-h-[80vh]">
        <div className="flex flex-col items-center text-center">
          <div className="qr-loader mb-lg" />
          <h2 className="font-h2 text-h2 text-text-primary mb-xs">Generujemy Twój kod QR...</h2>
          <p className="font-body text-body text-text-secondary">To zajmie tylko chwilę.</p>
        </div>
      </main>
    </>
  );
}
