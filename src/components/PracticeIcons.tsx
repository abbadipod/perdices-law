// Thin-line marks in the crest's style, one per practice area.

// Appellate: a courthouse colonnade — the reviewing court above the trial one.
function PillarsIcon() {
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
      <path d="M3 9 12 4l9 5" />
      <path d="M5 9v9M10 9v9M14 9v9M19 9v9" />
      <path d="M3 21h18" />
    </svg>
  );
}

// Civil litigation: scales — the balancing of competing claims.
function ScalesIcon() {
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
      <path d="M12 4v16" />
      <path d="M7 20h10" />
      <path d="M4 8h16" />
      <path d="M4 8 1.5 14a3 3 0 0 0 5 0z" />
      <path d="M20 8l-2.5 6a3 3 0 0 0 5 0z" />
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

// Estate settlement: heirs and succession.
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

// Order matches `practiceAreas` in site.ts.
export const practiceIcons = [
  PillarsIcon, // Appellate Litigation
  ScalesIcon, // Civil Litigation
  ShieldIcon, // Criminal Law & Preliminary Investigation
  HouseIcon, // Land Registration & Property
  FamilyIcon, // Estate Settlement & Planning
  BriefcaseIcon, // Transactional & Corporate
];
