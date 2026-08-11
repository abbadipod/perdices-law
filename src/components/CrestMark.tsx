// The source asset is the full 1080x1080 logo (crest + wordmark). These values crop
// to just the circular emblem so it stays legible at small sizes.
const EMBLEM_ZOOM = "174%";
const EMBLEM_FOCUS = "50% 20%";

export default function CrestMark({
  size,
  className = "",
}: {
  size: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label="Perdices Law crest"
      className={`inline-block shrink-0 rounded-full bg-ink bg-no-repeat ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: "url(/crest.jpg)",
        backgroundSize: EMBLEM_ZOOM,
        backgroundPosition: EMBLEM_FOCUS,
      }}
    />
  );
}
