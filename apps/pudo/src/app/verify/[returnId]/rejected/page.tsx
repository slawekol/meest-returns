import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function RejectedConfirmationPage() {
  return (
    <main className="w-full max-w-[768px] min-h-screen mx-auto bg-surface flex flex-col items-center justify-center p-xxl text-center relative border border-border-base md:shadow-sm">
      <div className="w-xxxl h-xxxl rounded-full bg-badge-rejected-bg flex items-center justify-center mb-xl">
        <MaterialIcon name="block" filled size={32} className="text-error" />
      </div>

      <h1 className="font-display text-display text-primary mb-sm">Odrzucono</h1>
      <p className="font-body text-body text-text-secondary mb-xxl max-w-md">
        Klient otrzymał wyjaśnienie SMS-em
      </p>

      <Link
        href="/dashboard"
        className="bg-primary text-on-primary h-[56px] px-xxl rounded-lg font-h2 text-h2 flex items-center justify-center w-full max-w-sm hover:bg-surface-tint active:scale-[0.98] transition-all"
      >
        Wróć do pulpitu
      </Link>
    </main>
  );
}
