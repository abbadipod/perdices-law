import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" aria-label="About" className="bg-paper px-6 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-[200px_1fr]">
        <Reveal>
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-gold text-3xl font-display text-hudson-bay md:mx-0">
            JP
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            About Atty. Perdices
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
            Atty. Jose Mari Perdices is a dual-qualified attorney admitted to
            practice law in the United States and the Philippines. His
            practice is built around a simple idea: clients whose lives span
            both countries need one lawyer who understands both legal systems
            — not a referral chain between separate firms on each side of the
            Pacific. Over more than a decade of practice, he has guided
            individuals, families, and small businesses through immigration
            petitions, property transactions, and disputes that cross
            borders, combining US and Philippine legal training into a
            single, practical point of contact.
          </p>
          <p className="mt-6 border-l-2 border-gold pl-4 font-display text-xl text-hudson-bay">
            Two legal systems. One point of contact.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
