import { credentials, credentialStats } from "@/content/site";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

export default function Credentials() {
  return (
    <section
      id="credentials"
      aria-label="Credentials and bar admissions"
      className="bg-ink px-7 py-[104px]"
    >
      <div className="mx-auto max-w-[1000px]">
        {/* Centred here — the other sections lead left, so this one reads as
            its own moment rather than another row in the same rhythm. */}
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Eyebrow tone="light" align="center">
              Credentials
            </Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.1] text-paper">
              Bar Admissions &amp; Standing
            </h2>
          </div>
        </Reveal>

        {/* The three facts worth reading at a glance. */}
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {credentialStats.map((stat, index) => (
            <Reveal key={stat.figure} delay={index * 0.08}>
              <div className="flex flex-col items-center text-center">
                <span className="font-display text-[clamp(44px,5vw,64px)] font-medium leading-none text-gold">
                  {stat.figure}
                </span>
                <span className="mt-3 text-[11px] uppercase tracking-[0.2em] text-sidewalk">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <dl className="mt-16 border-t border-comet/30">
          {credentials.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <div className="grid items-baseline gap-3 border-b border-comet/30 py-[26px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-7">
                <dt className="font-display text-[17px] uppercase tracking-[0.04em] text-paper">
                  {item.label}
                </dt>
                <dd className="m-0 text-sm leading-[1.7] text-sidewalk">
                  {Array.isArray(item.detail) ? (
                    // Multi-entry credentials (education) get a line each.
                    <span className="flex flex-col gap-2">
                      {item.detail.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  ) : (
                    item.detail
                  )}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
