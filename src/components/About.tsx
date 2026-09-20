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

            <div className="grid gap-11 lg:grid-cols-2">
              <div>
                <h2 className="mb-[18px] text-xs font-semibold uppercase tracking-[0.28em] text-hudson-bay">
                  About
                </h2>
                <p className="mb-4 text-[15px] leading-[1.75] text-ink">
                  Atty. Jose Mari V. Perdices is a Philippine lawyer with over
                  six years of active legal practice in the Philippines. He is
                  admitted to practice law in the Philippines and is also a
                  member of the Washington State Bar.
                </p>
                <p className="text-[15px] leading-[1.75] text-ink/85">
                  He began his career at the Court of Appeals – Mindanao
                  Station as Court Attorney IV, researching appealed cases and
                  drafting decisions and resolutions, and later served as a
                  Public Attorney II in Cagayan de Oro City.
                </p>
              </div>
              <div>
                <p className="mb-4 text-[15px] leading-[1.75] text-ink/85">
                  He later practiced in the private sector as a senior
                  associate and partner, handling motion practice, drafting
                  pleadings and legal memoranda, reviewing contracts, and
                  appearing before courts and government agencies. He is now
                  the founder and principal lawyer of Perdices Law.
                </p>
                <p className="text-[15px] leading-[1.75] text-ink/85">
                  His several years of experience as a paralegal with U.S. law
                  firms in Washington State and New York broadened his
                  professional perspective and sharpened his approach to
                  legal research, drafting, case management, and client
                  service. Although performed in a paralegal capacity, this
                  experience complements and strengthens his practice of
                  Philippine law by bringing valuable exposure to U.S. legal
                  systems and professional standards.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
