import { MaterialIcon } from '@meest/ui';

export function Topbar({ title = 'Merchant Dashboard' }: { title?: string }) {
  return (
    <header className="bg-surface border-b border-border-base h-[64px] fixed top-0 right-0 left-[240px] z-10 flex justify-between items-center px-lg">
      <div className="font-h2 text-h2 text-primary">{title}</div>
      <div className="flex items-center gap-md text-text-secondary">
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-subtle hover:text-primary transition-colors"
        >
          <MaterialIcon name="notifications" size={24} />
        </button>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-subtle hover:text-primary transition-colors"
        >
          <MaterialIcon name="help_outline" size={24} />
        </button>
        <div className="w-8 h-8 rounded-full bg-border-base overflow-hidden ml-sm border border-border-base flex items-center justify-center">
          <MaterialIcon name="account_circle" size={28} className="text-text-muted" />
        </div>
      </div>
    </header>
  );
}
