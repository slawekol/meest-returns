import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';
import { Sidebar } from '../../components/sidebar';
import { Topbar } from '../../components/topbar';

type ReturnRow = {
  id: string;
  status: 'in_transit' | 'received' | 'completed' | 'initiated' | 'rejected';
  email: string;
  productName: string;
  productImage?: string;
  value: string;
  pudo: string;
  date: string;
};

const returns: ReturnRow[] = [
  {
    id: 'RTN-2026-A41B',
    status: 'in_transit',
    email: 'a***@gmail.com',
    productName: 'Smartwatch Series 8',
    productImage: '/placeholder-product.svg',
    value: '1 299,00 PLN',
    pudo: 'PUDO WWA-01',
    date: '12.10.2026 14:30',
  },
  {
    id: 'RTN-2026-A41C',
    status: 'received',
    email: 'j***@wp.pl',
    productName: 'Słuchawki Pro Max',
    productImage: '/placeholder-product.svg',
    value: '899,00 PLN',
    pudo: 'Magazyn Główny',
    date: '11.10.2026 09:15',
  },
  {
    id: 'RTN-2026-A41D',
    status: 'completed',
    email: 'm***@firma.pl',
    productName: 'Klawiatura Mechaniczna X1',
    value: '349,00 PLN',
    pudo: 'Magazyn Główny',
    date: '10.10.2026 16:45',
  },
  {
    id: 'RTN-2026-A41E',
    status: 'initiated',
    email: 'p***@onet.pl',
    productName: 'Mysz Ergonomiczna',
    value: '129,00 PLN',
    pudo: 'Brak (Oczekuje)',
    date: '12.10.2026 18:00',
  },
  {
    id: 'RTN-2026-A41F',
    status: 'rejected',
    email: 'k***@interia.pl',
    productName: 'Kabel USB-C 2m',
    value: '49,00 PLN',
    pudo: 'Magazyn Główny',
    date: '09.10.2026 11:20',
  },
];

const statusBadge: Record<ReturnRow['status'], { label: string; cls: string }> = {
  in_transit: { label: 'W DRODZE', cls: 'bg-badge-transit-bg text-info' },
  received: { label: 'ODEBRANE', cls: 'bg-badge-received-bg text-[#6D28D9]' },
  completed: { label: 'ZAKOŃCZONE', cls: 'bg-badge-completed-bg text-secondary' },
  initiated: { label: 'ZAINICJOWANE', cls: 'bg-badge-initiated-bg text-text-secondary' },
  rejected: { label: 'ODRZUCONE', cls: 'bg-badge-rejected-bg text-error' },
};

export default function ReturnsListPage() {
  return (
    <>
      <Sidebar active="returns" />
      <Topbar title="Zwroty" />
      <main className="ml-[240px] mt-[64px] p-container-padding max-w-[1440px]">
        <div className="flex justify-between items-center mb-xl">
          <h2 className="font-display text-display text-text-primary">Zwroty</h2>
          <button
            type="button"
            className="bg-surface-container-lowest border border-border-base text-text-primary hover:bg-bg-subtle px-lg py-[10px] rounded font-small text-small flex items-center gap-sm h-[44px] transition-colors"
          >
            <MaterialIcon name="download" size={20} />
            Eksportuj
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md mb-lg flex flex-wrap gap-md items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block font-label-caps text-label-caps text-text-secondary mb-xs uppercase">
              Szukaj
            </label>
            <div className="relative">
              <MaterialIcon
                name="search"
                size={20}
                className="absolute left-sm top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                className="w-full h-[44px] pl-[36px] pr-md rounded border border-border-base bg-surface-container-lowest text-text-primary focus:border-success focus:ring-0 text-[15px] font-body transition-colors placeholder:text-text-muted"
                placeholder="RTN ID, Email..."
                type="text"
              />
            </div>
          </div>
          <div className="w-[180px]">
            <label className="block font-label-caps text-label-caps text-text-secondary mb-xs uppercase">
              Status
            </label>
            <select
              defaultValue=""
              className="w-full h-[44px] px-md rounded border border-border-base bg-surface-container-lowest text-text-primary focus:border-success focus:ring-0 text-[15px] font-body transition-colors appearance-none cursor-pointer"
            >
              <option value="">Wszystkie</option>
              <option value="initiated">Zainicjowane</option>
              <option value="in_transit">W drodze</option>
              <option value="received">Odebrane</option>
              <option value="completed">Zakończone</option>
            </select>
          </div>
          <div className="w-[220px]">
            <label className="block font-label-caps text-label-caps text-text-secondary mb-xs uppercase">
              Data
            </label>
            <div className="relative">
              <MaterialIcon
                name="calendar_today"
                size={20}
                className="absolute left-sm top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                className="w-full h-[44px] pl-[36px] pr-md rounded border border-border-base bg-surface-container-lowest text-text-primary focus:border-success focus:ring-0 text-[15px] font-body transition-colors cursor-pointer"
                placeholder="Wybierz zakres"
                type="text"
                defaultValue="Ost. 30 dni"
              />
            </div>
          </div>
          <div className="w-[200px]">
            <label className="block font-label-caps text-label-caps text-text-secondary mb-xs uppercase">
              Punkt PUDO
            </label>
            <select
              defaultValue=""
              className="w-full h-[44px] px-md rounded border border-border-base bg-surface-container-lowest text-text-primary focus:border-success focus:ring-0 text-[15px] font-body transition-colors appearance-none cursor-pointer"
            >
              <option value="">Wszystkie punkty</option>
              <option value="p1">PUDO Warszawa Centrum</option>
              <option value="p2">PUDO Kraków Główny</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-primary text-on-primary px-lg py-[10px] rounded font-small text-small h-[44px] hover:bg-surface-tint transition-colors"
          >
            Filtruj
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border-base">
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    <div className="flex items-center gap-xs">
                      Status
                      <MaterialIcon name="arrow_downward" size={16} className="text-border-base" />
                    </div>
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    <div className="flex items-center gap-xs">
                      RTN ID
                      <MaterialIcon name="arrow_downward" size={16} className="text-border-base" />
                    </div>
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    <div className="flex items-center gap-xs">
                      Klient
                      <MaterialIcon name="arrow_downward" size={16} className="text-border-base" />
                    </div>
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    Produkt
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-xs">
                      Wartość
                      <MaterialIcon name="arrow_downward" size={16} className="text-border-base" />
                    </div>
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    Punkt PUDO
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase whitespace-nowrap">
                    <div className="flex items-center gap-xs">
                      Data
                      <MaterialIcon name="arrow_downward" size={16} className="text-border-base" />
                    </div>
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-text-secondary uppercase text-center w-[48px]">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base">
                {returns.map((r) => {
                  const badge = statusBadge[r.status];
                  return (
                    <tr key={r.id} className="hover:bg-bg-subtle transition-colors group">
                      <td className="py-md px-md whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-[12px] py-[4px] rounded-full text-label-caps font-label-caps ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-md px-md whitespace-nowrap">
                        <Link
                          href={`/returns/${r.id}`}
                          className="font-technical text-technical text-text-primary hover:underline"
                        >
                          {r.id}
                        </Link>
                      </td>
                      <td className="py-md px-md whitespace-nowrap">
                        <span className="font-small text-small text-text-secondary">{r.email}</span>
                      </td>
                      <td className="py-md px-md">
                        <div className="flex items-center gap-sm min-w-[200px]">
                          {r.productImage ? (
                            <div className="w-10 h-10 rounded bg-border-base overflow-hidden border border-border-base shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                alt={r.productName}
                                className="w-full h-full object-cover"
                                src={r.productImage}
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded bg-surface-container-highest overflow-hidden border border-border-base shrink-0 flex items-center justify-center">
                              <MaterialIcon name="inventory_2" size={20} className="text-text-muted" />
                            </div>
                          )}
                          <span className="font-small text-small text-text-primary truncate">
                            {r.productName}
                          </span>
                        </div>
                      </td>
                      <td className="py-md px-md whitespace-nowrap text-right">
                        <span className="font-technical text-technical text-text-primary">
                          {r.value}
                        </span>
                      </td>
                      <td className="py-md px-md whitespace-nowrap">
                        <span className="font-small text-small text-text-secondary">{r.pudo}</span>
                      </td>
                      <td className="py-md px-md whitespace-nowrap">
                        <span className="font-small text-small text-text-secondary">{r.date}</span>
                      </td>
                      <td className="py-md px-md text-center">
                        <button
                          type="button"
                          className="text-text-secondary hover:text-text-primary p-xs rounded hover:bg-surface-container-high transition-colors"
                        >
                          <MaterialIcon name="more_horiz" size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border-base px-md py-sm flex items-center justify-between bg-surface-container-lowest">
            <div className="font-small text-small text-text-secondary">
              Pokazano <span className="font-bold text-text-primary">1-5</span> z{' '}
              <span className="font-bold text-text-primary">124</span> wyników
            </div>
            <div className="flex items-center gap-xs">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-border-base text-text-secondary hover:bg-bg-subtle disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled
              >
                <MaterialIcon name="chevron_left" size={20} />
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-small text-small border border-primary"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-border-base text-text-secondary font-small text-small hover:bg-bg-subtle transition-colors"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-border-base text-text-secondary font-small text-small hover:bg-bg-subtle transition-colors"
              >
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-text-secondary">...</span>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-border-base text-text-secondary font-small text-small hover:bg-bg-subtle transition-colors"
              >
                25
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-border-base text-text-secondary hover:bg-bg-subtle transition-colors"
              >
                <MaterialIcon name="chevron_right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
