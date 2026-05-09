import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

type NavKey = 'dashboard' | 'returns' | 'points' | 'analytics' | 'settings' | 'billing';

const items: Array<{
  key: NavKey;
  href: string;
  icon: string;
  label: string;
}> = [
  { key: 'dashboard', href: '/dashboard', icon: 'dashboard', label: 'Pulpit' },
  { key: 'returns', href: '/returns', icon: 'assignment_return', label: 'Zwroty' },
  { key: 'points', href: '/returns', icon: 'location_on', label: 'Punkty' },
  { key: 'analytics', href: '/analytics', icon: 'bar_chart', label: 'Analytics' },
  { key: 'settings', href: '/dashboard', icon: 'settings', label: 'Ustawienia' },
  { key: 'billing', href: '/dashboard', icon: 'account_balance_wallet', label: 'Rozliczenia' },
];

export function Sidebar({ active }: { active: NavKey }) {
  return (
    <nav className="bg-surface-container-lowest border-r border-border-base w-[240px] h-screen fixed left-0 top-0 flex flex-col py-lg px-md z-20">
      <div className="mb-xxl flex items-center gap-md px-sm">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary font-h2 text-h2 font-bold">
          L
        </div>
        <div>
          <h1 className="font-h1 text-h1 font-bold text-text-primary">Logistics Pro</h1>
          <p className="font-small text-small text-text-secondary">Merchant Portal</p>
        </div>
      </div>
      <ul className="flex-1 flex flex-col gap-xs">
        {items.map((item) => {
          const isActive = item.key === active;
          const className = isActive
            ? 'flex items-center gap-sm px-md py-sm rounded-lg text-text-primary font-bold border-r-2 border-primary bg-bg-subtle transition-colors duration-200 ease-in-out'
            : 'flex items-center gap-sm px-md py-sm rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors duration-200 ease-in-out';
          return (
            <li key={`${item.key}-${item.label}`}>
              <Link href={item.href} className={className}>
                <MaterialIcon name={item.icon} size={24} filled={isActive} />
                <span className="font-body text-body">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto border-t border-border-base pt-md flex flex-col gap-sm">
        <div className="flex items-center gap-sm px-sm">
          <div className="w-8 h-8 rounded bg-surface-tint text-on-primary flex items-center justify-center font-small text-small font-bold">
            M
          </div>
          <div className="truncate">
            <div className="font-small text-small font-bold text-text-primary truncate">Modivo S.A.</div>
            <div className="font-label-caps text-label-caps text-text-secondary">Merchant</div>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-sm px-md py-sm rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors duration-200 ease-in-out"
        >
          <MaterialIcon name="logout" size={24} />
          <span className="font-body text-body">Wyloguj</span>
        </Link>
      </div>
    </nav>
  );
}
