import Link from 'next/link';

export default function OperatorLoginPage() {
  return (
    <div className="bg-bg-subtle min-h-screen flex items-center justify-center p-md">
      <main className="w-full max-w-[480px] md:max-w-[768px] mx-auto">
        <div className="bg-surface-container-lowest border border-border-base rounded-lg p-container-padding md:p-xl flex flex-col gap-section-gap">
          <div className="flex flex-col items-center gap-md text-center">
            <div className="font-h1 text-h1 font-bold text-text-primary">Meest&amp;Returns</div>
            <h1 className="font-h2 text-h2 text-text-secondary">Punkt odbioru zwrotów</h1>
          </div>
          <form action="/dashboard" className="flex flex-col gap-lg">
            <div className="flex flex-col gap-sm">
              <label className="font-small text-small text-text-secondary" htmlFor="pointCode">
                Kod punktu
              </label>
              <input
                className="h-[56px] w-full border border-border-base rounded bg-surface-container-lowest px-md font-technical text-[24px] tracking-[0.2em] text-center text-text-primary focus:outline-none focus:border-success focus:border-[2px] transition-colors"
                id="pointCode"
                maxLength={4}
                name="pointCode"
                placeholder="0000"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-sm">
              <label className="font-small text-small text-text-secondary" htmlFor="operatorPin">
                PIN operatora
              </label>
              <input
                className="h-[56px] w-full border border-border-base rounded bg-surface-container-lowest px-md font-technical text-[24px] tracking-[0.2em] text-center text-text-primary focus:outline-none focus:border-success focus:border-[2px] transition-colors"
                id="operatorPin"
                maxLength={4}
                name="operatorPin"
                placeholder="••••"
                required
                type="password"
              />
            </div>
            <button
              className="h-[44px] w-full bg-primary text-on-primary font-small text-small rounded flex items-center justify-center gap-sm mt-md hover:bg-surface-tint transition-colors"
              type="submit"
            >
              Zaloguj
            </button>
          </form>
          <div className="text-center mt-auto">
            <p className="font-small text-small text-text-muted">
              Problem z logowaniem? <span className="text-text-primary">+48 22 000 00 00</span>
            </p>
          </div>
        </div>
        <div className="mt-md text-center">
          <Link
            href="/dashboard"
            className="font-label-caps text-label-caps text-text-muted hover:text-text-primary transition-colors"
          >
            Pomiń logowanie (demo) →
          </Link>
        </div>
      </main>
    </div>
  );
}
