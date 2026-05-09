import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function PackagingPage() {
  return (
    <>
      <header className="w-full max-w-[480px] mx-auto flex items-center px-container-padding h-11 border-b border-border-base bg-surface">
        <Link
          href="/pickup-point"
          className="mr-sm text-text-primary hover:bg-bg-subtle p-xs rounded-full transition-colors flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" size={24} />
        </Link>
        <span className="font-h1 text-h1 text-text-primary flex-1 text-center pr-[32px]">
          Meest&amp;Returns
        </span>
      </header>

      <main className="w-full max-w-[480px] mx-auto flex-1 flex flex-col px-container-padding py-xl pb-[100px]">
        <div className="mb-xl text-center">
          <h1 className="font-display text-display text-text-primary mb-sm">Przygotuj paczkę</h1>
          <p className="font-body text-body text-error font-medium">
            Zwrot zostanie odrzucony jeśli paczka nie spełnia wymagań
          </p>
        </div>

        <div className="flex flex-col gap-form-gap mb-xxl">
          <div className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-text-primary">
              <MaterialIcon name="sell" />
            </div>
            <div className="flex-1 pt-unit">
              <p className="font-body text-body text-text-primary font-medium">
                Metki oryginalne nieuszkodzone
              </p>
            </div>
          </div>

          <div className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-text-primary">
              <MaterialIcon name="local_mall" />
            </div>
            <div className="flex-1 pt-unit">
              <p className="font-body text-body text-text-primary font-medium">
                Produkt w worku foliowym (możesz użyć torby z zakupów)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-md p-md bg-surface-container-lowest border border-border-base rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-text-primary">
              <MaterialIcon name="inventory_2" />
            </div>
            <div className="flex-1 pt-unit">
              <p className="font-body text-body text-text-primary font-medium">
                Bez oryginalnego pudełka — tylko produkt w worku
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 w-full max-w-[480px] bg-surface border-t border-border-base p-container-padding z-40">
        <label className="flex items-center gap-sm mb-md cursor-pointer group">
          <div className="relative flex items-center justify-center w-5 h-5 rounded border border-outline bg-surface-container-lowest group-hover:border-success transition-colors">
            <input
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full z-10"
              id="confirm-requirements"
              type="checkbox"
            />
            <MaterialIcon
              name="check"
              size={16}
              filled
              className="text-surface-container-lowest opacity-0 transition-opacity"
            />
          </div>
          <span className="font-small text-small text-text-primary font-medium select-none">
            Potwierdzam, że paczka spełnia wymagania
          </span>
        </label>

        <Link
          href="/qr-code"
          className="w-full h-[44px] rounded-lg bg-text-primary text-on-primary font-body text-body font-medium flex items-center justify-center transition-colors select-none"
        >
          Wygeneruj kod QR
        </Link>
      </div>
    </>
  );
}
