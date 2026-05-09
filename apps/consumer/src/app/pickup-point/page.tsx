import Link from 'next/link';
import { MaterialIcon } from '@meest/ui';

export default function PickupPointPage() {
  return (
    <div className="w-full max-w-[480px] bg-surface min-h-screen relative shadow-sm overflow-hidden flex flex-col mx-auto">
      <header className="flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto bg-surface border-b border-border-base z-10 shrink-0">
        <Link
          href="/return-reason"
          className="mr-md text-text-primary hover:bg-bg-subtle p-xs rounded-full transition-colors flex items-center justify-center"
        >
          <MaterialIcon name="arrow_back" size={24} />
        </Link>
        <h1 className="font-h1 text-h1 text-text-primary">Wybierz punkt odbioru</h1>
      </header>

      <div className="w-full h-[353px] bg-surface-container-high relative shrink-0">
        <img
          alt="Map view"
          className="w-full h-full object-cover"
          src="/placeholder-product.svg"
        />
        <div className="absolute top-md left-md right-md z-10">
          <div className="relative bg-surface rounded-lg shadow-sm border border-border-base flex items-center px-md h-[44px]">
            <MaterialIcon name="search" className="text-text-secondary mr-sm" />
            <input
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-body font-body text-text-primary placeholder:text-text-secondary h-full py-0"
              placeholder="Szukaj adresu lub kodu pocztowego"
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-surface overflow-y-auto pb-[88px] px-md pt-md space-y-sm">
        <div className="bg-surface rounded-lg border-2 border-success p-md cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-badge-completed-bg text-success p-sm rounded-full mr-md flex-shrink-0 mt-xs">
                <MaterialIcon name="location_on" />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary mb-xs">Sklep Żabka</h3>
                <p className="font-body text-body text-text-secondary mb-xs">ul. Marszałkowska 10</p>
                <div className="flex items-center space-x-md">
                  <span className="font-small text-small text-success flex items-center">
                    <MaterialIcon name="schedule" size={16} className="mr-xs" />
                    Otwarte do 22:00
                  </span>
                </div>
              </div>
            </div>
            <span className="font-technical text-technical text-text-secondary whitespace-nowrap bg-bg-subtle px-sm py-xs rounded-full">
              240 m
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border-base p-md cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-bg-subtle text-text-secondary p-sm rounded-full mr-md flex-shrink-0 mt-xs">
                <MaterialIcon name="location_on" />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary mb-xs">InPost Paczkomat</h3>
                <p className="font-body text-body text-text-secondary mb-xs">ul. Hoża 35</p>
                <div className="flex items-center space-x-md">
                  <span className="font-small text-small text-success flex items-center">
                    <MaterialIcon name="schedule" size={16} className="mr-xs" />
                    24/7
                  </span>
                </div>
              </div>
            </div>
            <span className="font-technical text-technical text-text-secondary whitespace-nowrap bg-bg-subtle px-sm py-xs rounded-full">
              450 m
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border-base p-md cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-bg-subtle text-text-secondary p-sm rounded-full mr-md flex-shrink-0 mt-xs">
                <MaterialIcon name="location_on" />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary mb-xs">Sklep Żabka</h3>
                <p className="font-body text-body text-text-secondary mb-xs">ul. Krucza 50</p>
                <div className="flex items-center space-x-md">
                  <span className="font-small text-small text-success flex items-center">
                    <MaterialIcon name="schedule" size={16} className="mr-xs" />
                    Otwarte do 23:00
                  </span>
                </div>
              </div>
            </div>
            <span className="font-technical text-technical text-text-secondary whitespace-nowrap bg-bg-subtle px-sm py-xs rounded-full">
              600 m
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border-base p-md cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-bg-subtle text-text-secondary p-sm rounded-full mr-md flex-shrink-0 mt-xs">
                <MaterialIcon name="location_on" />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary mb-xs">Poczta Polska</h3>
                <p className="font-body text-body text-text-secondary mb-xs">ul. Świętokrzyska 31</p>
                <div className="flex items-center space-x-md">
                  <span className="font-small text-small text-warning flex items-center">
                    <MaterialIcon name="schedule" size={16} className="mr-xs" />
                    Zamyka o 18:00
                  </span>
                </div>
              </div>
            </div>
            <span className="font-technical text-technical text-text-secondary whitespace-nowrap bg-bg-subtle px-sm py-xs rounded-full">
              850 m
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border-base p-md cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-bg-subtle text-text-secondary p-sm rounded-full mr-md flex-shrink-0 mt-xs">
                <MaterialIcon name="location_on" />
              </div>
              <div>
                <h3 className="font-h2 text-h2 text-text-primary mb-xs">Sklep Carrefour Express</h3>
                <p className="font-body text-body text-text-secondary mb-xs">Al. Jerozolimskie 54</p>
                <div className="flex items-center space-x-md">
                  <span className="font-small text-small text-success flex items-center">
                    <MaterialIcon name="schedule" size={16} className="mr-xs" />
                    Otwarte do 23:00
                  </span>
                </div>
              </div>
            </div>
            <span className="font-technical text-technical text-text-secondary whitespace-nowrap bg-bg-subtle px-sm py-xs rounded-full">
              1.2 km
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-md bg-surface border-t border-border-base z-20">
        <Link
          href="/packaging"
          className="w-full bg-[#0F172A] text-on-secondary font-h2 text-h2 py-sm px-lg rounded flex items-center justify-center min-h-[44px] hover:opacity-90 transition-opacity"
        >
          Wybieram ten punkt
        </Link>
      </div>
    </div>
  );
}
