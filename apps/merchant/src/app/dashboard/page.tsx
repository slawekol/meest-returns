import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import { Sidebar } from '../../components/sidebar';
import { Topbar } from '../../components/topbar';

const reasons = [
  { label: 'Rozmiar za mały', percent: 34, count: 128, opacity: 'opacity-100', color: 'bg-primary' },
  { label: 'Zmieniono zdanie', percent: 22, count: 84, opacity: 'opacity-80', color: 'bg-primary' },
  { label: 'Rozmiar za duży', percent: 18, count: 68, opacity: 'opacity-60', color: 'bg-primary' },
  { label: 'Niezgodny z opisem', percent: 12, count: 45, opacity: 'opacity-40', color: 'bg-primary' },
  { label: 'Uszkodzony produkt', percent: 9, count: 34, opacity: 'opacity-80', color: 'bg-error' },
  { label: 'Inne', percent: 5, count: 19, opacity: 'opacity-100', color: 'bg-border-base' },
];

const topSkus = [
  {
    sku: 'MDV-SH-992-BLK',
    name: 'Koszula lniana slim fit czarna M',
    count: 42,
    rate: '18.5%',
    rateClass: 'bg-badge-rejected-bg text-on-error-container',
  },
  {
    sku: 'MDV-DN-014-BLU',
    name: 'Jeansy wide leg jasnoniebieskie 38',
    count: 38,
    rate: '15.2%',
    rateClass: 'bg-badge-rejected-bg text-on-error-container',
  },
  {
    sku: 'MDV-SN-441-WHT',
    name: 'Sneakersy skórzane białe 42',
    count: 29,
    rate: '11.0%',
    rateClass: 'bg-badge-dropped-bg text-warning',
  },
  {
    sku: 'MDV-JK-102-GRY',
    name: 'Marynarka oversize szara L',
    count: 24,
    rate: '9.4%',
    rateClass: 'bg-badge-dropped-bg text-warning',
  },
  {
    sku: 'MDV-DR-883-RED',
    name: 'Sukienka midi jedwabna czerwona S',
    count: 18,
    rate: '6.1%',
    rateClass: 'bg-surface-container text-text-secondary',
  },
  {
    sku: 'MDV-TS-005-WHT',
    name: 'T-shirt basic bawełna organiczna biały M',
    count: 15,
    rate: '4.2%',
    rateClass: 'bg-surface-container text-text-secondary',
  },
];

const sparklineBars = [
  { h: '40%', cls: 'bg-border-base' },
  { h: '60%', cls: 'bg-border-base' },
  { h: '50%', cls: 'bg-border-base' },
  { h: '70%', cls: 'bg-border-base' },
  { h: '40%', cls: 'bg-border-base' },
  { h: '30%', cls: 'bg-success opacity-50' },
  { h: '20%', cls: 'bg-success' },
];

export default function DashboardPage() {
  return (
    <>
      <Sidebar active="dashboard" />
      <Topbar title="Pulpit" />
      <main className="ml-[240px] mt-16 p-xl min-h-[calc(100vh-64px)] flex flex-col gap-section-gap">
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h1 className="font-h1 text-h1 text-primary">Pulpit</h1>
            <p className="font-body text-body text-text-secondary mt-xs">
              Przegląd logistyki zwrotów dla Modivo S.A.
            </p>
          </div>
          <div className="flex items-center gap-sm">
            <div className="flex items-center border border-border-base rounded-lg bg-surface-container-lowest h-[44px] px-sm cursor-pointer hover:bg-bg-subtle transition-colors">
              <MaterialIcon name="calendar_today" size={20} className="text-text-secondary mr-sm" />
              <span className="font-small text-small text-primary mr-md">Ostatnie 30 dni</span>
              <MaterialIcon name="arrow_drop_down" size={20} className="text-text-secondary" />
            </div>
            <button
              type="button"
              className="h-[44px] px-lg rounded-lg border border-border-base bg-surface-container-lowest hover:bg-bg-subtle text-primary font-small text-small font-medium flex items-center gap-sm transition-all active:bg-surface-container"
            >
              <MaterialIcon name="download" size={18} />
              Eksport CSV
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">Zwroty dziś</span>
              <MaterialIcon name="keyboard_return" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs">47</div>
            <div className="flex items-center gap-xs mt-auto">
              <MaterialIcon name="trending_up" size={16} className="text-success" />
              <span className="font-label-caps text-label-caps text-success">+12%</span>
              <span className="font-label-caps text-label-caps text-text-muted normal-case font-normal">
                vs wczoraj
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">
                Aktywne zwroty
              </span>
              <MaterialIcon name="local_shipping" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-sm">184</div>
            <div className="flex gap-unit mt-auto">
              <div
                className="h-2 bg-badge-initiated-bg rounded-l-full flex-grow border-r border-surface"
                title="Zainicjowane: 23"
              />
              <div
                className="h-2 bg-badge-transit-bg flex-[3] border-r border-surface"
                title="W tranzycie: 89"
              />
              <div
                className="h-2 bg-badge-completed-bg rounded-r-full flex-[2.5]"
                title="W hubie: 72"
              />
            </div>
            <div className="flex justify-between mt-sm font-label-caps text-label-caps text-text-muted">
              <span>Zainic: 23</span>
              <span>Tranzit: 89</span>
              <span>Hub: 72</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">
                Średni czas proc.
              </span>
              <MaterialIcon name="timer" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs flex items-baseline gap-xs">
              2.3 <span className="font-body text-body text-text-secondary">dnia</span>
            </div>
            <div className="mt-auto h-8 w-full flex items-end gap-[2px]">
              {sparklineBars.map((bar, i) => (
                <div
                  key={`spark-${i}`}
                  className={`w-full rounded-t-sm ${bar.cls}`}
                  style={{ height: bar.h }}
                />
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-md">
              <span className="font-small text-small text-text-secondary font-medium">
                Wartość zwrotów
              </span>
              <MaterialIcon name="payments" size={20} className="text-text-muted" />
            </div>
            <div className="font-display text-display text-primary mb-xs">
              47,392 <span className="font-h2 text-h2">zł</span>
            </div>
            <div className="flex items-center gap-xs mt-auto">
              <MaterialIcon name="trending_flat" size={16} className="text-text-secondary" />
              <span className="font-label-caps text-label-caps text-text-secondary">0%</span>
              <span className="font-label-caps text-label-caps text-text-muted normal-case font-normal">
                vs pop. okres
              </span>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-border-base rounded-lg p-lg">
          <div className="flex justify-between items-center mb-xl">
            <h2 className="font-h2 text-h2 text-primary">Zwroty w czasie (30 dni)</h2>
            <button type="button" className="text-text-secondary hover:text-primary transition-colors">
              <MaterialIcon name="more_horiz" size={20} />
            </button>
          </div>
          <div className="h-[300px] w-full border-b border-l border-border-base relative">
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="w-full h-px bg-border-base opacity-30" />
              <div className="w-full h-px bg-border-base opacity-30" />
              <div className="w-full h-px bg-border-base opacity-30" />
              <div className="w-full h-px bg-border-base opacity-30" />
              <div className="w-full h-px bg-border-base opacity-30" />
            </div>
            <svg
              className="w-full h-full absolute inset-0"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,50 L70,30 L80,35 L90,15 L100,20"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,50 L70,30 L80,35 L90,15 L100,20 L100,100 L0,100 Z"
                fill="rgba(0,0,0,0.03)"
                stroke="none"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-sm font-small text-small text-text-muted">
            <span>01 Maj</span>
            <span>15 Maj</span>
            <span>30 Maj</span>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg flex flex-col">
            <div className="flex justify-between items-center mb-xl">
              <h2 className="font-h2 text-h2 text-primary">Główne powody zwrotu</h2>
            </div>
            <div className="flex flex-col gap-md flex-1">
              {reasons.map((r) => (
                <div key={r.label} className="flex flex-col gap-xs">
                  <div className="flex justify-between font-small text-small">
                    <span className="text-primary font-medium">{r.label}</span>
                    <span className="text-text-secondary">
                      {r.percent}% ({r.count})
                    </span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div
                      className={`${r.color} ${r.opacity} h-2 rounded-full`}
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border-base rounded-lg flex flex-col overflow-hidden">
            <div className="p-lg border-b border-border-base flex justify-between items-center bg-surface-container-lowest">
              <h2 className="font-h2 text-h2 text-primary">Najczęściej zwracane SKU</h2>
              <Link href="/analytics" className="font-small text-small text-primary hover:underline font-medium">
                Zobacz pełny raport
              </Link>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-subtle border-b border-border-base">
                    <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary font-medium uppercase tracking-wider">
                      SKU / Produkt
                    </th>
                    <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary font-medium uppercase tracking-wider text-right">
                      Ilość zwrotów
                    </th>
                    <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary font-medium uppercase tracking-wider text-right">
                      Wskaźnik zwrotów
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-base">
                  {topSkus.map((s) => (
                    <tr key={s.sku} className="hover:bg-bg-subtle transition-colors">
                      <td className="py-sm px-md">
                        <div className="font-technical text-technical text-primary font-medium">
                          {s.sku}
                        </div>
                        <div className="font-small text-small text-text-muted line-clamp-1">
                          {s.name}
                        </div>
                      </td>
                      <td className="py-sm px-md font-technical text-technical text-primary text-right">
                        {s.count}
                      </td>
                      <td className="py-sm px-md text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.rateClass}`}
                        >
                          {s.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
