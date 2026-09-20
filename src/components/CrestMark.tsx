import Image from "next/image";

/**
 * The circular crest, on its navy disc.
 *
 * Uses the pre-keyed transparent crest from the design handoff, so the navy
 * disc behind it is a real background rather than part of the image — no
 * CSS cropping of the full logo lockup.
 */
export default function CrestMark({
  size,
  className = "",
}: {
  // A plain number for a fixed mark (About, Footer); a CSS length string
  // (e.g. a clamp()) for one that should grow with viewport width (Nav).
  size: number | string;
  className?: string;
}) {
  // next/image wants a numeric intrinsic size regardless — this only sets
  // the resolution fetched, since the style below always wins for layout.
  // 64 covers the largest size any caller currently clamps up to.
  const intrinsicSize = typeof size === "number" ? size : 64;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/crest.png"
        // Decorative in every usage: the nav and footer pair it with the
        // wordmark, and the About badge is pure ornament. Labelling it would
        // make screen readers announce the firm name twice per link.
        alt=""
        width={intrinsicSize}
        height={intrinsicSize}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        priority
      />
    </span>
  );
}
