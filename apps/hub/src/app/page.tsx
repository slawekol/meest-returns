import { MaterialIcon } from '@meest/ui';

export default function HubLandingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-container-padding">
      <div className="max-w-[480px] w-full text-center flex flex-col items-center gap-md">
        <MaterialIcon
          name="warehouse"
          size={48}
          className="text-text-secondary"
        />
        <h1 className="font-h1 text-h1 text-text-primary">Hub Dębica</h1>
        <p className="font-body text-body text-text-secondary">
          Konsola sortowania i kontroli. Wkrótce dostępna.
        </p>
        <span className="font-label-caps text-label-caps text-text-muted">
          Build skeleton — uzupełniany w kolejnym etapie
        </span>
      </div>
    </div>
  );
}
