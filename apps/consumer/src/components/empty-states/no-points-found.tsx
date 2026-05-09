import { MaterialIcon } from '@meest/ui';

export function NoPointsFound() {
  return (
    <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col relative shadow-sm border-x border-border-base mx-auto">
      <div className="absolute top-0 w-full z-10 px-container-padding py-md pt-lg">
        <div className="flex items-center gap-sm">
          <button
            aria-label="Wróć"
            className="w-11 h-11 flex items-center justify-center bg-surface rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-border-base hover:bg-bg-subtle transition-colors flex-shrink-0"
          >
            <MaterialIcon name="arrow_back" size={24} className="text-text-primary" />
          </button>
          <div className="flex-1 relative">
            <input
              className="w-full h-11 pl-xl pr-md rounded-lg border border-border-base bg-surface font-body text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-success focus:border-2 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              placeholder="Wpisz adres lub kod pocztowy"
              type="text"
            />
            <MaterialIcon
              name="search"
              className="absolute left-sm top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </div>

      <div className="h-[353px] w-full bg-surface-container relative">
        <img
          alt="Mapa"
          className="w-full h-full object-cover grayscale opacity-50"
          src="/placeholder-product.svg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-container-padding pb-section-gap -mt-lg z-10 relative bg-surface rounded-t-xl">
        <div className="w-16 h-16 rounded-full bg-bg-subtle flex items-center justify-center mb-lg border border-border-base">
          <MaterialIcon name="wrong_location" size={32} className="text-text-muted" weight={300} />
        </div>
        <h2 className="font-h2 text-h2 text-text-primary text-center mb-xs">
          Nie znaleźliśmy punktów w Twojej okolicy
        </h2>
        <p className="font-body text-body text-text-secondary text-center max-w-[320px]">
          Spróbuj wpisać inny adres lub kod pocztowy w wyszukiwarce powyżej.
        </p>
      </div>
    </div>
  );
}
