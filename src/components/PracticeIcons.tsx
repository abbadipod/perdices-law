function PlaneIcon({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={mirrored ? "h-6 w-6 scale-x-[-1]" : "h-6 w-6"}
    >
      <path d="M3 11l18-8-8 18-2-8-8-2z" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h5v-5h2v5h5v-9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="8.5" r="2.5" />
      <path d="M4 19c0-3 2.3-5 5-5s5 2 5 5" />
      <path d="M14 19c.2-2.2 1.6-4.1 4-4.4" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export const practiceIcons = [
  () => <PlaneIcon />,
  () => <PlaneIcon mirrored />,
  HouseIcon,
  ShieldIcon,
  FamilyIcon,
  BriefcaseIcon,
  DocumentIcon,
];
