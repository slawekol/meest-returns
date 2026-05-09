import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function PhotoCapturePage() {
  return (
    <div className="bg-primary text-on-primary font-body antialiased min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-[768px] h-[1024px] flex flex-col relative overflow-hidden bg-[#0F172A]">
        <header className="flex items-center justify-between p-lg z-10 bg-gradient-to-b from-[#0F172A] to-transparent">
          <Link
            href="/verify/RTN-2026-A41B"
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
          >
            <MaterialIcon name="close" className="text-on-primary" />
          </Link>
          <div className="flex space-x-sm">
            <MaterialIcon name="flash_off" className="text-on-primary" />
          </div>
        </header>

        <div className="px-lg pt-sm pb-xl z-10 text-center">
          <h1 className="font-h1 text-h1 text-on-primary mb-xs">Zrób zdjęcie paczki</h1>
          <p className="font-body text-body text-outline-variant">Pokazuje stan paczki przy przyjęciu</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-lg relative z-0">
          <div className="w-full max-w-[400px] aspect-square relative rounded-lg overflow-hidden border border-outline/30 shadow-2xl">
            <img
              alt="Podgląd kamery"
              className="w-full h-full object-cover grayscale-[20%]"
              src="/placeholder-product.svg"
            />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-success m-md rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-success m-md rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-success m-md rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-success m-md rounded-br-sm" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-success rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-lg pb-xxxl bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent z-10 flex flex-col space-y-xl">
          <div className="flex items-center justify-between px-md">
            <div className="w-[56px] h-[56px] rounded border-2 border-outline-variant overflow-hidden bg-surface-container relative">
              <img
                alt="Miniatura"
                className="w-full h-full object-cover"
                src="/placeholder-product.svg"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-[#0F172A]" />
            </div>
            <button className="w-[80px] h-[80px] rounded-full border-4 border-outline-variant flex items-center justify-center hover:scale-95 transition-transform active:bg-white/10 group">
              <div className="w-[64px] h-[64px] bg-white rounded-full group-hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </button>
            <div className="w-[56px] h-[56px]" />
          </div>

          <div className="flex flex-col sm:flex-row gap-form-gap mt-md pt-lg border-t border-outline/20">
            <button className="flex-1 min-h-[56px] px-lg py-[12px] bg-transparent border border-outline-variant text-on-primary font-h2 text-h2 rounded hover:bg-white/5 transition-colors flex items-center justify-center space-x-sm">
              <MaterialIcon name="refresh" />
              <span>Zrób ponownie</span>
            </button>
            <Link
              href="/verify/RTN-2026-A41B/confirmed"
              className="flex-1 min-h-[56px] px-lg py-[12px] bg-success text-on-primary font-h2 text-h2 font-semibold rounded hover:bg-success/90 transition-colors shadow-[0_4px_12px_rgba(16,185,129,0.2)] flex items-center justify-center space-x-sm"
            >
              <MaterialIcon name="check_circle" />
              <span>Użyj zdjęcia</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
