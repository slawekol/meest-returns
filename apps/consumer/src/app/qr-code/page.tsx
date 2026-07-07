'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MaterialIcon } from '@meest/ui';
import QRCode from 'qrcode';
import { getFlow } from '../../lib/flow';
import type { CreatedReturn } from '../../lib/api';

export default function QrCodePage() {
  const router = useRouter();
  const [created, setCreated] = useState<CreatedReturn | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const f = getFlow();
    if (!f.created) {
      router.replace('/');
      return;
    }
    setCreated(f.created);
    QRCode.toDataURL(f.created.returnId, { width: 560, margin: 1 }).then(setQrDataUrl);
  }, [router]);

  if (!created) return null;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-border-base transition-colors duration-200">
        <div className="flex items-center justify-between px-md h-11 w-full max-w-[480px] mx-auto">
          <Link href="/" className="text-text-secondary hover:bg-bg-subtle p-sm rounded-full transition-colors">
            <MaterialIcon name="home" />
          </Link>
          <h1 className="font-h1 text-h1 font-bold text-primary">Meest&amp;Returns</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="pt-[80px] px-container-padding max-w-[480px] mx-auto flex flex-col gap-lg">
        <div className="text-center">
          <h2 className="font-display text-display text-text-primary mb-sm">Twój kod QR</h2>
          <p className="font-body text-body text-text-secondary">
            Pokaż kod w punkcie. Operator zeskanuje i przyjmie paczkę.
          </p>
        </div>

        <div className="flex flex-col items-center gap-sm bg-surface-container-lowest p-lg rounded-xl border border-border-base shadow-sm mx-auto w-full max-w-[340px]">
          <div className="w-[280px] h-[280px] bg-white border border-border-base rounded-lg p-sm flex items-center justify-center">
            {qrDataUrl ? (
              <img alt="Kod QR" className="w-full h-full object-contain" src={qrDataUrl} />
            ) : (
              <span className="font-small text-small text-text-secondary">Generuję…</span>
            )}
          </div>
          <p className="font-technical text-technical text-text-primary tracking-widest mt-md">
            {created.returnId}
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-lg p-md">
          <div className="flex justify-between items-start">
            <div className="flex gap-sm">
              <div className="text-success mt-xs">
                <MaterialIcon name="storefront" filled />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary">{created.pudoPoint.name}</h3>
                <p className="font-body text-body text-text-secondary">
                  {created.pudoPoint.address}, {created.pudoPoint.city}
                </p>
              </div>
            </div>
            <div className="font-small text-small text-text-secondary font-medium">
              {created.pudoPoint.code}
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-border-base rounded-lg overflow-hidden">
          <div className="px-md py-sm border-b border-border-base bg-bg-subtle flex justify-between">
            <h3 className="font-small text-small text-text-primary font-semibold">Twoje produkty</h3>
            <span className="font-small text-small text-text-secondary">
              zwrot: {created.refundAmount} zł
            </span>
          </div>
          <div className="p-md flex flex-col gap-md">
            {created.items.map((item) => (
              <div key={item.sku} className="flex items-center gap-md">
                <img
                  alt={item.name}
                  className="w-[48px] h-[48px] rounded object-cover border border-border-base"
                  src={item.imageUrl}
                />
                <div className="flex-1">
                  <p className="font-body text-body text-text-primary font-medium">{item.name}</p>
                </div>
                <span className="font-small text-small text-text-secondary">{item.price} zł</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-small text-small text-text-muted mt-sm">
          Kod jest ważny do {new Date(created.qrExpiresAt).toLocaleDateString('pl-PL')}
        </p>

        <Link
          href={`/tracking?id=${created.returnId}`}
          className="text-center font-label-caps text-label-caps text-text-muted hover:text-text-primary transition-colors mb-xl"
        >
          Sprawdź status zwrotu →
        </Link>
      </main>
    </>
  );
}
