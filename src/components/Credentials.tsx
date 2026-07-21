import { credentials } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Credentials() {
  return (
    <section
      id="credentials"
      aria-label="Credentials and bar admissions"
      className="bg-sidewalk/40 px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            Credentials
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Bar Admissions &amp; Standing
          </h2>
        </Reveal>
        <dl className="mt-12 divide-y divide-comet/40 border-y border-comet/40">
          {credentials.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="font-display text-lg text-hudson-bay">
                  {item.label}
                </dt>
                <dd className="text-sm text-ink/80 sm:text-right">
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
