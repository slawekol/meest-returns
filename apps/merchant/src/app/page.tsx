import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

const brandPanelStyle = {
  backgroundColor: '#0F172A',
  backgroundImage:
    'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
};

const geometricPatternStyle = {
  backgroundImage:
    'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
};

export default function MerchantLoginPage() {
  return (
    <main className="flex-1 flex flex-col md:flex-row min-h-screen w-full">
      <section
        className="hidden md:flex md:w-3/5 relative overflow-hidden flex-col justify-between p-xxxl"
        style={brandPanelStyle}
      >
        <div className="absolute inset-0 pointer-events-none" style={geometricPatternStyle} />
        <div className="relative z-10">
          <div className="flex items-center gap-sm">
            <MaterialIcon name="local_shipping" size={32} className="text-on-primary" />
            <span className="font-display text-display text-on-primary tracking-tight">
              Meest&amp;Returns
            </span>
          </div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1
            className="font-display text-display text-on-primary mb-md leading-tight"
            style={{ fontSize: '48px' }}
          >
            Zwroty pod kontrolą.
          </h1>
          <p className="font-body text-body text-text-muted text-lg">
            Panel partnerów Meest&amp;Returns. Profesjonalne narzędzie do zarządzania logistyką
            zwrotną w środowisku e-commerce.
          </p>
        </div>
        <div className="relative z-10">
          <p className="font-small text-small text-text-muted opacity-60">
            © 2026 Meest&amp;Returns. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </section>

      <section className="w-full md:w-2/5 bg-surface-container-lowest flex flex-col justify-center px-container-padding py-xxxl sm:px-xxl relative">
        <div className="md:hidden flex items-center justify-center gap-sm mb-xl">
          <MaterialIcon name="local_shipping" size={28} className="text-primary" />
          <span className="font-h1 text-h1 text-primary">Meest&amp;Returns</span>
        </div>
        <div className="max-w-md w-full mx-auto">
          <div className="mb-xl text-center md:text-left">
            <h2 className="font-h1 text-h1 text-text-primary mb-xs">Zaloguj do panelu</h2>
            <p className="font-body text-body text-text-secondary">
              Wprowadź swoje dane dostępowe, aby kontynuować.
            </p>
          </div>
          <form action="/dashboard" className="space-y-form-gap">
            <div>
              <label
                className="block font-small text-small text-text-primary mb-xs"
                htmlFor="email"
              >
                Adres Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                  <MaterialIcon name="mail" size={20} className="text-text-muted" />
                </div>
                <input
                  className="block w-full pl-xl pr-md py-sm bg-surface-container-lowest border border-border-base rounded font-body text-body text-text-primary focus:outline-none focus:ring-0 focus:border-success h-[44px] transition-colors"
                  id="email"
                  name="email"
                  placeholder="operator@firma.pl"
                  required
                  type="email"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-xs">
                <label
                  className="block font-small text-small text-text-primary"
                  htmlFor="password"
                >
                  Hasło
                </label>
                <a className="font-small text-small text-info hover:underline transition-all" href="#">
                  Zapomniałem hasła
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                  <MaterialIcon name="lock" size={20} className="text-text-muted" />
                </div>
                <input
                  className="block w-full pl-xl pr-md py-sm bg-surface-container-lowest border border-border-base rounded font-body text-body text-text-primary focus:outline-none focus:ring-0 focus:border-success h-[44px] transition-colors"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>
            <div className="pt-sm">
              <button
                type="submit"
                className="w-full bg-[#0F172A] text-on-primary font-small text-small h-[44px] rounded flex items-center justify-center gap-sm hover:bg-primary transition-colors active:scale-[0.98]"
              >
                Zaloguj
                <MaterialIcon name="arrow_forward" size={16} />
              </button>
            </div>
          </form>
          <div className="mt-xl text-center md:text-left border-t border-border-base pt-lg">
            <p className="font-small text-small text-text-secondary">
              Nie masz konta?{' '}
              <Link href="/" className="text-text-primary font-medium hover:underline">
                Skontaktuj się z opiekunem.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
