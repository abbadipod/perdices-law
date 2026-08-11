import { credentials } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Credentials() {
  return (
    <section
      id="credentials"
      aria-label="Credentials and bar admissions"
      className="bg-ink px-7 py-[104px]"
    >
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.28em] text-gold">
            Credentials
          </p>
          <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.1] text-paper">
            Bar Admissions &amp; Standing
          </h2>
        </Reveal>

        <dl className="mt-[46px] border-t border-comet/30">
          {credentials.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <div className="grid items-baseline gap-3 border-b border-comet/30 py-[26px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-7">
                <dt className="font-display text-[17px] uppercase tracking-[0.04em] text-paper">
                  {item.label}
                </dt>
                <dd className="m-0 text-sm leading-[1.7] text-sidewalk">
                  {item.detail}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
