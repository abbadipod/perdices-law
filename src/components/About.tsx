import Image from "next/image";
import Reveal from "@/components/Reveal";
import CrestMark from "@/components/CrestMark";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative bg-sand px-7 pb-[110px]"
    >
      {/* translate-y is always -size/2, so the badge straddles the Hero/About
          seam evenly regardless of size. */}
      <div className="flex -translate-y-[64px] justify-center">
        <CrestMark size={128} />
      </div>

      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <div className="grid items-start gap-14 border-b border-ink/20 pb-14 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <figure className="m-0">
              {/* A proper studio portrait, so it just needs the 4:5 crop —
                  no background-position gymnastics. */}
              <Image
                src="/portrait.jpg"
                alt="Atty. Jose Mari V. Perdices"
                width={1502}
                height={2048}
                sizes="(min-width: 768px) 300px, 100vw"
                className="block aspect-[4/5] w-full object-cover object-[50%_18%] [filter:grayscale(0.35)_sepia(0.12)_contrast(1.02)]"
                priority
              />
              <figcaption className="mt-3.5 font-display text-[13px] uppercase tracking-[0.12em] text-ink">
                Atty. Jose Mari V. Perdices
                <br />
                <span className="text-ink/70">Attorney at Law</span>
              </figcaption>
            </figure>

            <div className="grid gap-11 sm:grid-cols-2">
              <div>
                <h2 className="mb-[18px] text-xs font-semibold uppercase tracking-[0.28em] text-hudson-bay">
                  About
                </h2>
                <p className="mb-4 text-[15px] leading-[1.75] text-ink">
                  Atty. Jose Mari V. Perdices is a Philippine lawyer with over
                  fifteen years of experience in litigation, appellate research,
                  and legal advisory work. He is admitted to practice in the
                  Philippines and in Washington State.
                </p>
                <p className="text-[15px] leading-[1.75] text-ink/85">
                  He began his career at the Court of Appeals – Mindanao
                  Station as Court Attorney IV, researching appealed cases and
                  drafting decisions and resolutions, and later served as a
                  Public Attorney II in Cagayan de Oro City.
                </p>
              </div>
              <div>
                <h2 className="mb-[18px] text-xs font-semibold uppercase tracking-[0.28em] text-hudson-bay">
                  Approach
                </h2>
                <p className="mb-4 text-[15px] leading-[1.75] text-ink/85">
                  He has since practised in the private sector as a senior
                  associate and later a partner — arguing motions, drafting
                  pleadings and memoranda, reviewing contracts, and appearing
                  before courts and government agencies.
                </p>
                <p className="text-[15px] leading-[1.75] text-ink/85">
                  Several years in non-attorney roles with US firms in
                  Washington State and New York added procedural depth in civil
                  litigation, immigration, and family matters — the background
                  he brings to cross-border concerns. He is fluent in English,
                  Tagalog, and Cebuano.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
