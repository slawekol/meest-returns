import { MaterialIcon } from '@meest/ui';
import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

const reasonRows: Array<{
  reason: string;
  count: string;
  share: string;
  avg: string;
  trend: 'up' | 'down' | 'flat';
}> = [
  { reason: 'Zmieniono zdanie', count: '1,245', share: '42.1%', avg: '245 PLN', trend: 'up' },
  { reason: 'Rozmiar za duży', count: '832', share: '28.0%', avg: '180 PLN', trend: 'down' },
  { reason: 'Produkt niezgodny z opisem', count: '451', share: '15.2%', avg: '320 PLN', trend: 'up' },
  { reason: 'Rozmiar za mały', count: '310', share: '10.4%', avg: '195 PLN', trend: 'flat' },
  { reason: 'Uszkodzony w transporcie', count: '125', share: '4.3%', avg: '410 PLN', trend: 'down' },
];

const trendIcon = {
  up: { name: 'arrow_upward', tone: 'text-error' },
  down: { name: 'arrow_downward', tone: 'text-success' },
  flat: { name: 'horizontal_rule', tone: 'text-text-muted' },
} as const;

const months: Array<{ label: string; height: number }> = [
  { label: 'Sty', height: 120 },
  { label: 'Lut', height: 140 },
  { label: 'Mar', height: 110 },
  { label: 'Kwi', height: 160 },
  { label: 'Maj', height: 130 },
];

export default function AnalyticsPage() {
  return (
    <div className="bg-surface text-text-primary font-body antialiased min-h-screen">
      <Sidebar active="analytics" />
      <Topbar title="Analityka" />
      <main className="ml-[240px] pt-[64px] min-h-screen bg-bg-light">
        <div className="max-w-[1280px] mx-auto p-container-padding">
          <header className="mb-xl flex justify-between items-end">
            <div>
              <h1 className="font-display text-display text-text-primary mb-sm">Analityka</h1>
              <p className="font-body text-body text-text-secondary">
                Przegląd danych dotyczących zwrotów i wydajności operacyjnej.
              </p>
            </div>
          </header>

          <div className="border-b border-border-base mb-xl">
            <nav aria-label="Tabs" className="flex gap-lg">
              <a
                href="#"
                className="border-b-2 border-primary text-text-primary py-sm font-small text-small whitespace-nowrap"
              >
                Powody
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-text-secondary hover:text-text-primary hover:border-border-base py-sm font-small text-small whitespace-nowrap"
              >
                Produkty
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-text-secondary hover:text-text-primary hover:border-border-base py-sm font-small text-small whitespace-nowrap"
              >
                Lokalizacje
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-text-secondary hover:text-text-primary hover:border-border-base py-sm font-small text-small whitespace-nowrap"
              >
                Klienci
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
              <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg flex flex-col relative hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
                <h2 className="font-h2 text-h2 text-text-primary mb-md">Rozkład Powodów</h2>
                <div className="flex-grow flex items-center justify-center min-h-[240px]">
                  <div
                    className="relative w-48 h-48 rounded-full border-8"
                    style={{
                      borderTopColor: '#0F172A',
                      borderRightColor: '#64748B',
                      borderBottomColor: '#94A3B8',
                      borderLeftColor: '#E2E8F0',
                    }}
                  />
                </div>
                <div className="flex flex-col gap-sm mt-md font-small text-small">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <div className="w-3 h-3 rounded-full bg-text-primary" />
                      <span>Zmieniono zdanie</span>
                    </div>
                    <span className="font-technical text-technical">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <div className="w-3 h-3 rounded-full bg-text-secondary" />
                      <span>Rozmiar za duży</span>
                    </div>
                    <span className="font-technical text-technical">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <div className="w-3 h-3 rounded-full bg-text-muted" />
                      <span>Niezgodny z opisem</span>
                    </div>
                    <span className="font-technical text-technical">15%</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-border-base rounded-lg p-lg lg:col-span-2 flex flex-col relative hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
                <div className="absolute top-lg right-lg">
                  <div className="bg-badge-initiated-bg text-text-secondary font-label-caps text-label-caps px-sm py-xs rounded-full border border-border-base flex items-center gap-xs">
                    <MaterialIcon name="lock" size={14} />
                    Analityka rozszerzona dostępna w planie Premium
                  </div>
                </div>
                <h2 className="font-h2 text-h2 text-text-primary mb-md">Trendy (Top 3)</h2>
                <div className="flex-grow relative mt-xl min-h-[200px] border-l border-b border-border-base flex items-end justify-between px-md pt-md pb-xs">
                  {months.map((m) => (
                    <div key={m.label} className="flex flex-col items-center gap-xs w-1/6">
                      <div
                        className="w-full bg-text-primary rounded-t-sm opacity-90"
                        style={{ height: `${m.height}px` }}
                      />
                      <span className="font-label-caps text-label-caps text-text-secondary">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
              <div className="p-lg border-b border-border-base flex justify-between items-center bg-bg-light">
                <h3 className="font-h2 text-h2 text-text-primary">Szczegóły Powodów Zwrotu</h3>
                <button
                  type="button"
                  className="h-[44px] px-lg rounded bg-surface-container-lowest border border-border-base text-text-primary font-small text-small hover:bg-bg-subtle transition-colors flex items-center gap-sm"
                >
                  <MaterialIcon name="download" size={16} />
                  Eksportuj
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-lowest border-b border-border-base">
                      <th className="p-md font-label-caps text-label-caps text-text-secondary font-medium">
                        Powód zwrotu
                      </th>
                      <th className="p-md font-label-caps text-label-caps text-text-secondary font-medium text-right">
                        Liczba
                      </th>
                      <th className="p-md font-label-caps text-label-caps text-text-secondary font-medium text-right">
                        Procent (%)
                      </th>
                      <th className="p-md font-label-caps text-label-caps text-text-secondary font-medium text-right">
                        Średnia wartość
                      </th>
                      <th className="p-md font-label-caps text-label-caps text-text-secondary font-medium text-center">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-body text-body text-text-primary divide-y divide-border-base">
                    {reasonRows.map((row) => {
                      const t = trendIcon[row.trend];
                      return (
                        <tr key={row.reason} className="hover:bg-bg-subtle transition-colors">
                          <td className="p-md font-medium">{row.reason}</td>
                          <td className="p-md text-right font-technical text-technical">
                            {row.count}
                          </td>
                          <td className="p-md text-right font-technical text-technical">
                            {row.share}
                          </td>
                          <td className="p-md text-right font-technical text-technical">
                            {row.avg}
                          </td>
                          <td className="p-md text-center">
                            <MaterialIcon name={t.name} className={t.tone} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
