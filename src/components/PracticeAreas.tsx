import { practiceAreas, practiceIntro } from "@/content/site";
import Reveal from "@/components/Reveal";
import { practiceIcons } from "@/components/PracticeIcons";

export default function PracticeAreas() {
  return (
    <section
      id="practice-areas"
      aria-label="Practice areas"
      className="bg-sand px-7 pb-[110px] pt-5"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-ink/20 pb-[26px] md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="mb-2.5 text-[11px] uppercase tracking-[0.28em] text-hudson-bay">
                What we handle
              </p>
              <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.1] text-ink">
                Practice Areas
              </h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-[1.7] text-ink/70">
              {practiceIntro}
            </p>
          </div>
        </Reveal>

        {/* auto-rows-fr keeps every card the same height, not just the ones
            sharing a row — otherwise a title that wraps to two lines makes
            its whole row taller than the rest of the grid. Only from md up:
            in a single column there is nothing to align to, so equal heights
            would just pad the short cards with dead space. */}
        <div className="mt-11 grid gap-[22px] md:auto-rows-fr [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {practiceAreas.map((area, index) => {
            const Icon = practiceIcons[index];
            return (
              <Reveal key={area.title} delay={(index % 3) * 0.06}>
                <article className="h-full border border-comet/50 bg-white px-7 pb-[34px] pt-[30px] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold">
                  <div className="flex items-center justify-between">
                    <span className="text-gold">
                      <Icon />
                    </span>
                    <span className="font-display text-[13px] tracking-[0.1em] text-gold/95">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-3 mt-[22px] font-display text-[19px] font-medium uppercase leading-[1.3] text-hudson-bay">
                    {area.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-ink/[0.78]">
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
