import CrestFlourish from "@/components/CrestFlourish";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-hudson-bay px-6 pt-24"
    >
      <CrestFlourish className="pointer-events-none absolute left-6 top-24 h-16 w-16 text-gold/50" />
      <CrestFlourish className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 rotate-180 text-gold/50" />

      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-sidewalk">
          Dual-Qualified Attorney — US &amp; Philippines
        </p>
        <h1 className="font-display text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl">
          Practical legal solutions, across two countries.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-sidewalk sm:text-lg">
          Immigration, real estate, and litigation counsel for clients moving
          between the United States and the Philippines.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block border border-gold px-7 py-3 text-sm tracking-wide text-sidewalk transition-colors hover:bg-gold hover:text-ink"
        >
          BOOK A CONSULTATION
        </a>
      </div>
    </section>
  );
}
