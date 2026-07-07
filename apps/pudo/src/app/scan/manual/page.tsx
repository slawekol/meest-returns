'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { api } from '../../../lib/api';

export default function ManualEntryPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const full = `RTN-2026-${code}`;

  async function submit() {
    if (code.length < 4) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.verify(full);
      router.push(`/verify/${data.returnId}`);
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  const press = (ch: string) => setCode((c) => (c.length < 4 ? c + ch : c));
  const back = () => setCode((c) => c.slice(0, -1));

  const KEYS = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','2','3','4','5','6','7','8','9'];

  return (
    <div className="bg-background text-on-background min-h-screen font-body antialiased">
      <header className="fixed top-0 w-full z-50 border-b border-border-base bg-surface flex items-center justify-between px-md h-11 max-w-[768px] mx-auto left-1/2 -translate-x-1/2">
        <Link
          href="/scan"
          aria-label="Wróć"
          className="text-text-secondary hover:bg-bg-subtle transition-colors duration-200 p-unit rounded-full flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" />
        </Link>
        <span className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns</span>
        <div className="w-10" />
      </header>

      <main className="pt-[60px] pb-lg px-container-padding max-w-[768px] mx-auto min-h-screen flex flex-col">
        <div className="mt-md mb-xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-badge-initiated-bg rounded-full flex items-center justify-center mb-md">
            <MaterialIcon name="dialpad" className="text-text-primary" />
          </div>
          <h1 className="font-display text-display text-text-primary">Wpisz kod zwrotu</h1>
          <p className="font-body text-body text-text-secondary mt-sm max-w-[280px]">
            Wprowadź 4 ostatnie znaki kodu RTN z aplikacji klienta.
          </p>
        </div>

        <div className="mb-xl w-full">
          <div className="w-full border-2 border-success bg-surface-container-lowest rounded-lg h-[64px] flex items-center justify-center px-lg shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all">
            <span className="font-technical text-h1 text-text-muted mr-sm tracking-widest">RTN-2026-</span>
            <span className="font-technical text-h1 text-text-primary tracking-widest">{code}</span>
            <span className="w-[2px] h-[28px] bg-success ml-unit animate-pulse" />
          </div>
          <div className="mt-sm flex justify-between px-xs">
            <span className="font-small text-small text-text-muted">Format: RTN-2026-XXXX</span>
            <span className="font-small text-small text-text-secondary">{code.length} / 4</span>
          </div>
          {error && <p className="font-small text-small text-error mt-sm text-center">{error}</p>}
        </div>

        <div className="w-full max-w-[420px] mx-auto grid grid-cols-8 gap-xs mb-xl">
          {KEYS.map((n) => (
            <button
              key={n}
              onClick={() => press(n)}
              className="h-[44px] flex items-center justify-center bg-surface-container-lowest border border-border-base rounded-lg font-technical text-body text-text-primary hover:bg-bg-subtle active:scale-95 transition-all"
            >
              {n}
            </button>
          ))}
          <button
            onClick={back}
            className="h-[44px] col-span-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-subtle active:scale-95 transition-all border border-border-base"
          >
            <MaterialIcon name="backspace" size={24} />
          </button>
        </div>

        <div className="mt-auto pt-md w-full">
          <button
            onClick={submit}
            disabled={code.length < 4 || loading}
            className="w-full bg-success text-on-primary font-h2 text-h2 py-[12px] px-[24px] min-h-[48px] rounded-lg flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? 'Sprawdzam…' : 'Zatwierdź'}
          </button>
        </div>
      </main>
    </div>
  );
}
