import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function ReturnReasonPage() {
  return (
    <div className="max-w-[480px] mx-auto bg-surface-container-lowest min-h-screen relative shadow-sm flex flex-col">
      <header className="docked full-width top-0 border-b border-border-base dark:border-outline-variant flat no shadows bg-surface dark:bg-surface-container-high z-10 sticky">
        <div className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto justify-between">
          <Link
            href="/select-products"
            className="text-primary dark:text-inverse-primary hover:bg-bg-subtle dark:hover:bg-surface-variant p-sm -ml-sm rounded-full Active: opacity-80 transition-opacity flex items-center justify-center"
          >
            <MaterialIcon name="arrow_back" weight={300} />
          </Link>
          <div className="font-display text-display text-primary dark:text-inverse-primary text-[18px] tracking-tight">
            Meest&amp;Returns
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-container-padding py-lg flex flex-col gap-lg">
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs font-label-caps text-label-caps text-text-secondary uppercase tracking-wider">
            <span>Krok 1 z 2</span>
          </div>
          <h1 className="font-h1 text-h1 text-text-primary">Dlaczego zwracasz?</h1>
        </div>

        <div className="bg-bg-subtle border border-border-base rounded-lg p-md flex gap-md items-center shadow-sm">
          <div className="w-[60px] h-[60px] bg-surface-container-highest rounded-DEFAULT overflow-hidden flex-shrink-0 border border-border-base">
            <img
              alt="Koszulka Basic L, Biała"
              className="w-full h-full object-cover"
              src="/placeholder-product.svg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-small text-small text-text-secondary">Zwracany produkt:</span>
            <span className="font-body text-body font-medium text-text-primary">
              Koszulka Basic L, Biała
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <label className="relative flex items-center p-md border-[2px] border-success rounded-lg bg-surface-container-lowest cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-shadow">
            <div className="flex-1 font-body text-body text-text-primary font-medium">
              Za duży / za mały rozmiar
            </div>
            <input
              defaultChecked
              className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest checked:border-success"
              name="reason"
              type="radio"
              value="size"
            />
          </label>
          <label className="relative flex items-center p-md border border-border-base rounded-lg bg-surface-container-lowest cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow hover:bg-bg-light">
            <div className="flex-1 font-body text-body text-text-primary">Inny niż na zdjęciu</div>
            <input
              className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest"
              name="reason"
              type="radio"
              value="different"
            />
          </label>
          <label className="relative flex items-center p-md border border-border-base rounded-lg bg-surface-container-lowest cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow hover:bg-bg-light">
            <div className="flex-1 font-body text-body text-text-primary">Niska jakość</div>
            <input
              className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest"
              name="reason"
              type="radio"
              value="quality"
            />
          </label>
          <label className="relative flex items-center p-md border border-border-base rounded-lg bg-surface-container-lowest cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow hover:bg-bg-light">
            <div className="flex-1 font-body text-body text-text-primary">
              Nie pasuje / nie podoba się
            </div>
            <input
              className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest"
              name="reason"
              type="radio"
              value="dislike"
            />
          </label>
          <label className="relative flex items-center p-md border border-border-base rounded-lg bg-surface-container-lowest cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow hover:bg-bg-light">
            <div className="flex-1 font-body text-body text-text-primary">Wadliwy / uszkodzony</div>
            <input
              className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest"
              name="reason"
              type="radio"
              value="damaged"
            />
          </label>
          <label className="relative flex items-center p-md border border-border-base rounded-lg bg-surface-container-lowest cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow hover:bg-bg-light">
            <div className="flex-1 font-body text-body text-text-primary">Inny powód</div>
            <input
              className="w-5 h-5 text-success border-border-base focus:ring-success focus:ring-offset-0 bg-surface-container-lowest"
              name="reason"
              type="radio"
              value="other"
            />
          </label>
        </div>

        <div className="flex flex-col gap-sm pt-sm pb-section-gap">
          <label className="font-small text-small text-text-secondary" htmlFor="comment">
            Dodatkowy komentarz (opcjonalnie)
          </label>
          <textarea
            className="w-full bg-surface-container-lowest border border-border-base rounded-lg px-md py-sm font-body text-body text-text-primary placeholder:text-text-muted focus:border-success focus:ring-0 focus:outline-none transition-colors"
            id="comment"
            placeholder="Opisz szczegóły..."
            rows={3}
          />
        </div>
      </main>

      <div className="p-container-padding border-t border-border-base bg-surface-container-lowest sticky bottom-0 z-20">
        <Link
          href="/pickup-point"
          className="w-full bg-text-primary text-on-primary font-small text-small font-semibold rounded-lg h-[44px] px-lg flex items-center justify-center hover:bg-opacity-90 transition-opacity"
        >
          Dalej
        </Link>
      </div>
    </div>
  );
}
