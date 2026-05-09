import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import { Sidebar } from '../../../components/sidebar';
import { Topbar } from '../../../components/topbar';

const timeline = [
  { label: 'Inicjowany', date: '10.10, 09:12', state: 'done' as const },
  { label: 'Nadany', date: '11.10, 14:30', state: 'done' as const },
  { label: 'W drodze', date: '12.10, 08:15', state: 'done' as const },
  { label: 'W hubie', date: '13.10, 11:45', state: 'done' as const },
  { label: 'Zakończony', date: '14.10, 09:00', state: 'current' as const },
];

export default async function ReturnDetailPage({
  params,
}: {
  params: Promise<{ returnId: string }>;
}) {
  const { returnId } = await params;
  const displayId = returnId || 'RTN-2026-A41B';

  return (
    <>
      <Sidebar active="returns" />
      <Topbar title="Merchant Dashboard" />
      <main className="ml-[240px] pt-[64px] min-h-screen p-xl flex flex-col gap-section-gap">
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xs font-small text-small text-text-secondary">
            <Link href="/returns" className="hover:text-text-primary transition-colors">
              Zwroty
            </Link>
            <MaterialIcon name="chevron_right" size={16} />
            <span className="font-technical text-technical text-text-primary">{displayId}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-xl">
          <div className="w-full lg:w-2/3 flex flex-col gap-xl">
            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
              <h2 className="font-h2 text-h2 mb-md">Status Zwrotu</h2>
              <div className="relative flex items-center justify-between w-full mt-xl mb-md">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border-base z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-success z-0"
                  style={{ width: '100%' }}
                />
                {timeline.map((t) => (
                  <div key={t.label} className="relative z-10 flex flex-col items-center gap-xs">
                    {t.state === 'done' ? (
                      <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-on-primary">
                        <MaterialIcon name="check" size={14} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-surface-container-lowest border-2 border-success flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                    )}
                    <span className="font-label-caps text-label-caps text-text-primary">{t.label}</span>
                    <span className="font-technical text-[10px] text-text-secondary">{t.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
              <h2 className="font-h2 text-h2 mb-md">Szczegóły Produktu</h2>
              <div className="flex gap-md">
                <div className="w-24 h-24 rounded bg-surface-container overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Produkt"
                    className="w-full h-full object-cover"
                    src="/placeholder-product.svg"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-small text-small font-bold mb-xs">T-Shirt Bawełniany Basic</div>
                  <div className="font-technical text-technical text-text-secondary mb-sm">
                    SKU: TS-NAV-M-01
                  </div>
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-badge-completed-bg text-on-secondary-fixed-variant font-label-caps text-label-caps self-start">
                    Otrzymano
                  </div>
                </div>
                <div className="w-32 h-24 rounded bg-surface-container overflow-hidden shrink-0 border border-border-base">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Zdjęcie weryfikacji"
                    className="w-full h-full object-cover"
                    src="/placeholder-product.svg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
              <h2 className="font-h2 text-h2 mb-md">Powód Zwrotu</h2>
              <div className="flex flex-col gap-sm">
                <div className="flex items-center gap-sm">
                  <MaterialIcon name="straighten" size={20} className="text-text-secondary" />
                  <span className="font-small text-small font-bold">Rozmiar za mały</span>
                </div>
                <div className="p-sm bg-bg-subtle rounded border border-border-base">
                  <p className="font-body text-body text-text-secondary italic">
                    &quot;Koszulka jest świetnej jakości, ale niestety okazała się za ciasna w
                    ramionach. Zwykle noszę M, ale ta wypada mniejsza.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
              <h2 className="font-h2 text-h2 mb-md">Informacje Logistyczne</h2>
              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                    Punkt Nadania
                  </span>
                  <div className="flex items-center gap-xs">
                    <MaterialIcon name="storefront" size={16} className="text-text-primary" />
                    <span className="font-small text-small">Żabka #Z1203</span>
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                    Czas Skanowania
                  </span>
                  <span className="font-technical text-technical">11.10.2026, 14:30:12</span>
                </div>
                <div className="flex flex-col gap-xs">
                  <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                    ID Worka
                  </span>
                  <div className="flex items-center gap-xs">
                    <MaterialIcon name="inventory_2" size={16} className="text-text-primary" />
                    <span className="font-technical text-technical">#A-2026-3847</span>
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                    Status Transportu
                  </span>
                  <span className="font-small text-small text-success">Dostarczono do magazynu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-xl">
            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
              <div className="flex items-center gap-sm mb-md">
                <MaterialIcon name="person" size={20} className="text-text-primary" />
                <h2 className="font-h2 text-h2">Informacje o Kliencie</h2>
              </div>
              <div className="flex flex-col gap-md">
                <div className="flex justify-between items-center pb-sm border-b border-border-base">
                  <span className="font-small text-small text-text-secondary">Email</span>
                  <span className="font-technical text-technical text-text-primary">
                    j***@gmail.com
                  </span>
                </div>
                <div className="flex justify-between items-center pb-sm border-b border-border-base">
                  <span className="font-small text-small text-text-secondary">Ocena Kupującego</span>
                  <div className="flex items-center gap-xs">
                    <span className="font-small text-small font-bold text-text-primary">4.7/5</span>
                    <MaterialIcon name="star" size={16} filled className="text-warning" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-small text-small text-text-secondary">Liczba zwrotów</span>
                  <span className="font-small text-small font-bold text-text-primary">
                    8 (Lifetime)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
              <div className="flex items-center gap-sm mb-md">
                <MaterialIcon name="payments" size={20} className="text-text-primary" />
                <h2 className="font-h2 text-h2">Szczegóły Zwrotu Środków</h2>
              </div>
              <div className="flex flex-col gap-md">
                <div className="flex justify-between items-center">
                  <span className="font-h1 text-h1 font-bold text-text-primary">189,00 zł</span>
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-badge-completed-bg text-on-secondary-fixed-variant font-label-caps text-label-caps">
                    Zakończony
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-sm pt-sm border-t border-border-base">
                  <div className="flex flex-col gap-xs">
                    <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                      Metoda
                    </span>
                    <span className="font-small text-small">BLIK</span>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <span className="font-label-caps text-label-caps text-text-secondary uppercase">
                      Data
                    </span>
                    <span className="font-technical text-technical">14.10.2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg flex flex-col gap-sm">
              <button
                type="button"
                className="w-full min-h-[44px] px-lg py-[12px] bg-success text-on-primary rounded font-small text-small font-bold hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-sm"
              >
                <MaterialIcon name="check_circle" size={18} />
                Zatwierdź zwrot
              </button>
              <button
                type="button"
                className="w-full min-h-[44px] px-lg py-[12px] bg-surface text-error border border-error rounded font-small text-small font-bold hover:bg-error-container transition-colors flex items-center justify-center gap-sm"
              >
                <MaterialIcon name="cancel" size={18} />
                Odrzuć zwrot
              </button>
              <div className="h-[1px] w-full bg-border-base my-xs" />
              <button
                type="button"
                className="w-full min-h-[44px] px-lg py-[12px] bg-surface text-text-primary border border-border-base rounded font-small text-small font-bold hover:bg-bg-subtle transition-colors flex items-center justify-center gap-sm"
              >
                <MaterialIcon name="download" size={18} />
                Pobierz dokumenty
              </button>
              <button
                type="button"
                className="w-full min-h-[44px] px-lg py-[12px] bg-surface text-text-primary border border-border-base rounded font-small text-small font-bold hover:bg-bg-subtle transition-colors flex items-center justify-center gap-sm"
              >
                <MaterialIcon name="mail" size={18} />
                Skontaktuj się z klientem
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
