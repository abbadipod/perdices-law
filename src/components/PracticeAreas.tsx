"use client";

import { useState } from "react";
import { practiceAreas, practiceIntro } from "@/content/site";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import { practiceIcons } from "@/components/PracticeIcons";

export default function PracticeAreas() {
  // Single-open, matching the FAQ accordion. Letting several cards expand at
  // once makes the grid jump around as rows resize.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              <Eyebrow>What we handle</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.1] text-ink">
                Practice Areas
              </h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-[1.7] text-ink/70">
              {practiceIntro}
            </p>
          </div>
        </Reveal>

        {/* items-start, not auto-rows-fr: fr tracks equalise every row in
            the grid to the tallest one, not just the row a card sits in —
            so toggling auto-rows-fr on and off at the grid level made an
            open card's own row stop stretching its neighbours, but also
            reset every OTHER row's height at the same time, since the whole
            grid lost its row-equalising track sizing the moment anything
            was open. Measured: opening card one shrank cards four, five,
            and six too, though nothing about them had changed.

            min-h-[286px] instead gets the same "every closed card matches"
            look without touching row sizing at all: 286px is the natural
            height of the tallest closed card's own content (Criminal Law &
            Preliminary Investigation), so it pads the shorter ones up to
            match without needing the grid to coordinate row heights across
            cards that aren't related to whichever one is open. Only from
            md up: in a single column there is nothing to align to, so
            forcing a minimum height would just pad the short cards with
            dead space for no compositional benefit.

            min(300px,100%) rather than a bare 300px: below ~356px viewport the
            container is narrower than the track floor, and a bare 300px would
            overflow the page horizontally. */}
        <div className="mt-11 grid items-start gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {practiceAreas.map((area, index) => {
            const Icon = practiceIcons[index];
            const isOpen = openIndex === index;
            const detailId = `practice-detail-${index}`;

            return (
              <Reveal key={area.title} delay={(index % 3) * 0.06}>
                {/* group/before: a gold rule draws across the top edge on
                    hover, so the card has an accent moment of its own rather
                    than only a border colour change. */}
                <article className="group relative flex flex-col border border-comet/50 bg-white px-7 pb-[34px] pt-[30px] transition-[border-color,transform] duration-300 before:absolute before:inset-x-0 before:-top-px before:h-0.5 before:origin-left before:scale-x-0 before:bg-gold before:transition-transform before:duration-300 before:content-[''] hover:-translate-y-1 hover:border-gold hover:before:scale-x-100 md:min-h-[286px]">
                  <div className="flex items-center justify-between">
                    <span className="text-gold">
                      <Icon />
                    </span>
                    {/* Ordinal decoration — the title carries the meaning, so
                        it is hidden from screen readers rather than read out
                        before every card. Navy at 80% rather than the gold the
                        handoff specifies: gold on white measures 2.32:1, and
                        no gold light enough to still read as gold reaches the
                        4.5:1 this needs as text. The icon above keeps the
                        gold accent on the card. */}
                    <span
                      aria-hidden="true"
                      className="font-display text-[13px] tracking-[0.1em] text-hudson-bay/80"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-3 mt-[22px] font-display text-[19px] font-medium uppercase leading-[1.3] text-hudson-bay">
                    {area.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-ink/[0.78]">
                    {area.description}
                  </p>

                  <div
                    id={detailId}
                    hidden={!isOpen}
                    className="mt-4 border-t border-comet/40 pt-4 text-sm leading-[1.75] text-ink/[0.78]"
                  >
                    {area.detail}
                  </div>

                  {/* mt-auto pins the control to the bottom so it lines up
                      across cards of differing text length. */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="mt-auto flex items-center gap-2 self-start pt-5 text-[11px] uppercase tracking-[0.2em] text-hudson-bay transition-colors hover:text-ink"
                  >
                    <span className="border-b border-gold pb-1">
                      {isOpen ? "Show less" : "What this covers"}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-gold-deep transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
