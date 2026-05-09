import { MaterialIcon } from '@meest/ui';

export default function Loading() {
  return (
    <>
      <header className="bg-surface border-b border-border-base flat no shadows flex items-center px-container-padding h-11 w-full max-w-[480px] mx-auto top-0 sticky z-40">
        <button className="text-text-primary hover:bg-bg-subtle p-1 rounded-full transition-colors flex items-center justify-center mr-sm">
          <MaterialIcon name="arrow_back" size={24} />
        </button>
        <span className="font-display text-display text-primary flex-1 text-center pr-8">
          Meest&amp;Returns
        </span>
      </header>

      <main className="w-full max-w-[480px] mx-auto pb-[100px] pt-md px-md flex flex-col gap-section-gap">
        <section className="flex flex-col gap-md">
          <div className="h-8 w-1/2 bg-surface-variant rounded-DEFAULT shimmer" />
          <div className="bg-surface border border-border-base rounded-lg p-md flex flex-col gap-md">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-sm w-1/3">
                <div className="h-4 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-6 bg-surface-variant rounded-DEFAULT shimmer" />
              </div>
              <div className="h-6 w-16 bg-surface-variant rounded-full shimmer" />
            </div>
            <div className="h-px bg-border-base w-full my-sm" />
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <div className="h-4 w-1/4 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-4 w-1/3 bg-surface-variant rounded-DEFAULT shimmer" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-1/5 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-4 w-1/4 bg-surface-variant rounded-DEFAULT shimmer" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-1/4 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-4 w-1/2 bg-surface-variant rounded-DEFAULT shimmer" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-md">
          <div className="h-6 w-1/3 bg-surface-variant rounded-DEFAULT shimmer" />
          <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-md p-sm border border-border-base rounded-lg bg-surface">
              <div className="h-16 w-16 bg-surface-variant rounded-DEFAULT shimmer shrink-0" />
              <div className="flex flex-col gap-xs w-full">
                <div className="h-4 w-3/4 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-3 w-1/2 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-4 w-1/4 bg-surface-variant rounded-DEFAULT shimmer mt-sm" />
              </div>
            </div>
            <div className="flex items-center gap-md p-sm border border-border-base rounded-lg bg-surface">
              <div className="h-16 w-16 bg-surface-variant rounded-DEFAULT shimmer shrink-0" />
              <div className="flex flex-col gap-xs w-full">
                <div className="h-4 w-2/3 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-3 w-1/3 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-4 w-1/4 bg-surface-variant rounded-DEFAULT shimmer mt-sm" />
              </div>
            </div>
            <div className="flex items-center gap-md p-sm border border-border-base rounded-lg bg-surface">
              <div className="h-16 w-16 bg-surface-variant rounded-DEFAULT shimmer shrink-0" />
              <div className="flex flex-col gap-xs w-full">
                <div className="h-4 w-4/5 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-3 w-1/2 bg-surface-variant rounded-DEFAULT shimmer" />
                <div className="h-4 w-1/4 bg-surface-variant rounded-DEFAULT shimmer mt-sm" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-surface border-t border-border-base p-md z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="h-[44px] w-full bg-surface-variant rounded-DEFAULT shimmer" />
      </div>
    </>
  );
}
