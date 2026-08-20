import Reveal from "@/components/Reveal";
import CrestMark from "@/components/CrestMark";

/**
 * A dark full-bleed beat between About and Practice Areas.
 *
 * Those two sections share the sand surface, which ran to 1723px unbroken —
 * a third of the page reading as one block. This splits them into two
 * normal-length sections and brings back the crest, which otherwise appears
 * as a transition device only once, at the top of the page.
 */
export default function PullQuote() {
  return (
    <section aria-label="Practice philosophy" className="bg-ink px-7 py-[90px]">
      <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
        <Reveal>
          <CrestMark size={56} />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 text-balance font-display text-[clamp(26px,3.2vw,40px)] font-medium uppercase leading-[1.22] text-paper">
            Two legal systems.
            <br />
            One point of contact.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <span aria-hidden="true" className="mt-8 block h-px w-16 bg-gold" />
        </Reveal>
      </div>
    </section>
  );
}
