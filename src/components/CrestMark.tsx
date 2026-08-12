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
  size: number;
  className?: string;
}) {
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
        width={size}
        height={size}
        // Small, fixed-size mark; skip the intrinsic-size warning path.
        style={{ width: size, height: size, objectFit: "contain" }}
        priority
      />
    </span>
  );
}
