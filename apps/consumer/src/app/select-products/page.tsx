'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import { getFlow, setFlow, type FlowState } from '../../lib/flow';

export default function SelectProductsPage() {
  const router = useRouter();
  const [flow, setLocal] = useState<FlowState | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const f = getFlow();
    if (!f.order) {
      router.replace('/');
      return;
    }
    setLocal(f);
    setSelected(f.selectedSkus.length ? f.selectedSkus : f.order.items.map((i) => i.sku));
  }, [router]);

  if (!flow?.order) return null;
  const { order } = flow;

  const toggle = (sku: string) =>
    setSelected((s) => (s.includes(sku) ? s.filter((x) => x !== sku) : [...s, sku]));

  const total = order.items.filter((i) => selected.includes(i.sku)).reduce((s, i) => s + i.price, 0);

  const next = () => {
    setFlow({ selectedSkus: selected });
    router.push('/return-reason');
  };

  return (
    <div className="w-full max-w-[480px] bg-bg-light min-h-screen relative pb-32 mx-auto">
      <header className="bg-surface fixed top-0 w-full z-50 border-b border-border-base transition-colors duration-200">
        <div className="flex items-center justify-between px-md h-11 w-full max-w-[480px] mx-auto">
          <Link
            href="/"
            className="text-text-secondary hover:bg-bg-subtle p-1 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <MaterialIcon name="arrow_back" size={24} />
          </Link>
          <div className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns</div>
          <div className="w-8" />
        </div>
      </header>

      <main className="pt-[68px] px-md flex flex-col gap-xl">
        <section className="bg-surface border border-border-base rounded-lg p-md">
          <div className="flex justify-between items-center mb-sm">
            <span className="font-small text-small text-text-secondary">Nr zamówienia</span>
            <span className="font-technical text-technical text-text-secondary">
              {new Date(order.placedAt).toLocaleDateString('pl-PL')}
            </span>
          </div>
          <div className="font-h2 text-h2 text-text-primary">#{order.orderNumber}</div>
          {order.merchant && (
            <div className="font-small text-small text-text-secondary mt-xs">{order.merchant.name}</div>
          )}
        </section>

        <section className="flex flex-col gap-md">
          <h2 className="font-h2 text-h2 text-text-primary">Wybierz produkty do zwrotu</h2>
          <div className="flex flex-col gap-sm">
            {order.items.map((item) => {
              const isSel = selected.includes(item.sku);
              return (
                <label
                  key={item.sku}
                  className={`relative bg-surface rounded-lg p-sm flex items-center gap-md cursor-pointer transition-colors hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] group ${
                    isSel ? 'border-[2px] border-success' : 'border border-border-base'
                  }`}
                >
                  <div
                    className="w-16 h-20 bg-bg-subtle rounded flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body text-body font-semibold text-text-primary truncate">
                      {item.name}
                    </h3>
                    <p className="font-small text-small text-text-secondary mt-xs">
                      Rozmiar: {item.size} • Kolor: {item.color}
                    </p>
                    <div className="font-body text-body font-semibold mt-1">{item.price} zł</div>
                  </div>
                  {isSel ? (
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-success text-on-secondary">
                      <MaterialIcon name="check" size={16} filled />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-border-base group-hover:border-outline" />
                  )}
                  <input
                    checked={isSel}
                    onChange={() => toggle(item.sku)}
                    className="absolute opacity-0 w-0 h-0"
                    type="checkbox"
                  />
                </label>
              );
            })}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-surface border-t border-border-base p-md z-40 flex flex-col gap-sm">
        <div className="flex justify-between items-center px-xs">
          <span className="font-body text-body text-text-secondary">
            Zwracasz: {selected.length} {selected.length === 1 ? 'produkt' : 'produkty'}
          </span>
          <span className="font-body text-body font-semibold text-text-primary">{total} zł</span>
        </div>
        <button
          onClick={next}
          disabled={selected.length === 0}
          className="w-full min-h-[44px] px-[24px] py-[12px] bg-success text-on-secondary font-body text-body font-medium rounded flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          Dalej
        </button>
      </div>
    </div>
  );
}
