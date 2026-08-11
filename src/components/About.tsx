import Reveal from "@/components/Reveal";
import CrestMark from "@/components/CrestMark";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative bg-cream px-7 pb-[110px]"
    >
      <div className="flex -translate-y-[46px] justify-center">
        <CrestMark size={104} />
      </div>

      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <div className="grid items-start gap-14 border-b border-ink/20 pb-14 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <figure className="m-0">
              {/* Source is a wide near-square shot; these crop to the subject
                  so the 4/5 frame isn't mostly background. */}
              <div
                role="img"
                aria-label="Atty. Jose Mari Perdices"
                className="block aspect-[4/5] w-full bg-comet/20 bg-no-repeat [filter:grayscale(0.35)_sepia(0.12)_contrast(1.02)]"
                style={{
                  backgroundImage: "url(/portrait.jpg)",
                  backgroundSize: "240%",
                  backgroundPosition: "53% 94%",
                }}
              />
              <figcaption className="mt-3.5 font-display text-[13px] uppercase tracking-[0.12em] text-ink">
                Atty. Jose Mari Perdices
                <br />
                <span className="text-ink/60">Attorney at Law</span>
              </figcaption>
            </figure>

            <div className="grid gap-11 sm:grid-cols-2">
              <div>
                <h2 className="mb-[18px] text-xs font-semibold uppercase tracking-[0.28em] text-hudson-bay">
                  About
                </h2>
                <p className="mb-4 text-[15px] leading-[1.75] text-ink">
                  Atty. Jose Mari Perdices is a dual-qualified attorney admitted
                  to practice law in the United States and the Philippines.
                </p>
                <p className="text-[15px] leading-[1.75] text-ink/85">
                  His practice is built around a simple idea: clients whose lives
                  span both countries need one lawyer who understands both legal
                  systems — not a referral chain between separate firms on each
                  side of the Pacific.
                </p>
              </div>
              <div>
                <h2 className="mb-[18px] text-xs font-semibold uppercase tracking-[0.28em] text-hudson-bay">
                  Approach
                </h2>
                <p className="mb-4 text-[15px] leading-[1.75] text-ink/85">
                  Over more than a decade of practice, he has guided individuals,
                  families, and small businesses through immigration petitions,
                  property transactions, and disputes that cross borders.
                </p>
                <p className="text-[15px] leading-[1.75] text-ink/85">
                  US and Philippine legal training combine into a single,
                  practical point of contact — plain answers, agreed fees, no
                  hidden charges.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mx-auto mt-14 max-w-[24ch] text-balance text-center font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.2] text-hudson-bay">
            Two legal systems.
            <br />
            One point of contact.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
