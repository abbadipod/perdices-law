import { practiceAreas } from "@/content/site";
import Reveal from "@/components/Reveal";
import { practiceIcons } from "@/components/PracticeIcons";

export default function PracticeAreas() {
  return (
    <section
      id="practice-areas"
      aria-label="Practice areas"
      className="bg-paper px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            What We Handle
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Practice Areas
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => {
            const Icon = practiceIcons[index];
            return (
              <Reveal key={area.title} delay={index * 0.05}>
                <article className="h-full border border-comet/40 p-6">
                  <div className="text-gold">
                    <Icon />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-hudson-bay">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">
                    {area.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
