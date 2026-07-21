export default function CrestFlourish({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <path d="M4 44 V12 H36" />
      <path d="M4 26 Q4 4 26 4" />
      <circle cx="4" cy="44" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
