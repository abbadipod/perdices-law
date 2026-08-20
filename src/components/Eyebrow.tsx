/**
 * Section eyebrow with a short gold rule beneath.
 *
 * The rule is where the gold accent lives in these headers — as a rule
 * rather than as text, since gold as small text does not clear contrast on
 * the light sections.
 */
export default function Eyebrow({
  children,
  tone = "dark",
  align = "left",
}: {
  children: React.ReactNode;
  /** `dark` for text on light surfaces, `light` for text on ink/navy. */
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "flex flex-col items-center" : ""}>
      <p
        className={`text-[11px] uppercase tracking-[0.28em] ${
          tone === "dark" ? "text-hudson-bay" : "text-sidewalk"
        }`}
      >
        {children}
      </p>
      <span aria-hidden="true" className="mt-3 block h-px w-10 bg-gold" />
    </div>
  );
}
