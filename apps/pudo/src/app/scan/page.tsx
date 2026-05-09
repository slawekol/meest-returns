import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function ScanPage() {
  return (
    <div className="bg-background text-text-primary antialiased h-screen w-full overflow-hidden flex flex-col md:flex-row relative">
      <main className="flex-1 relative w-full h-full flex flex-col bg-inverse-surface">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            alt="Retail counter point of view"
            className="w-full h-full object-cover opacity-60"
            src="/placeholder-product.svg"
          />
        </div>
        <div className="absolute inset-0 w-full h-full z-10 flex flex-col pointer-events-none">
          <div className="w-full p-md flex justify-between items-start pointer-events-auto z-20">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-sm px-md h-[44px] rounded-lg text-on-secondary bg-transparent border border-transparent hover:bg-white/10 transition-colors"
            >
              <MaterialIcon name="close" />
              <span className="font-body text-body">Anuluj</span>
            </Link>
            <div className="flex items-center gap-sm">
              <button className="flex items-center justify-center w-[44px] h-[44px] rounded-full text-on-secondary bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors border border-white/20">
                <MaterialIcon name="flashlight_on" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative px-lg">
            <div className="absolute top-[10%] w-full text-center z-20">
              <h2 className="font-h2 text-h2 text-on-secondary drop-shadow-md">
                Skieruj aparat na kod QR
              </h2>
            </div>
            <div
              className="relative w-[240px] h-[240px] flex items-center justify-center"
              style={{
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.85)',
                borderRadius: '12px',
              }}
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-success rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-success rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-success rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-success rounded-br-lg" />
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-success opacity-80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            <div className="mt-xl text-center z-20">
              <p className="font-technical text-technical text-on-secondary/80 tracking-wider">
                Kod automatycznie wykryty
              </p>
            </div>
          </div>

          <div className="w-full p-md flex flex-col gap-sm pointer-events-auto z-20">
            <Link
              href="/verify/RTN-2026-A41B"
              className="w-full h-[56px] bg-success text-on-primary font-h2 text-h2 rounded-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-transform"
            >
              <MaterialIcon name="check_circle" size={24} filled />
              Symuluj wykrycie kodu
            </Link>
            <Link
              href="/scan/manual"
              className="w-full h-[56px] bg-transparent border border-white/30 text-on-secondary font-h2 text-h2 rounded-lg flex items-center justify-center gap-sm hover:bg-white/10 transition-colors"
            >
              <MaterialIcon name="dialpad" size={24} />
              Wpisz kod ręcznie
            </Link>
          </div>

          <div className="h-[64px] md:h-0 w-full" />
        </div>
      </main>
    </div>
  );
}
