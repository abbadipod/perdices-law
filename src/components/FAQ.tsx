"use client";

import { useState } from "react";
import { faqItems } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="bg-paper px-7 py-[104px]"
    >
      <div className="mx-auto max-w-[840px]">
        <Reveal>
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.28em] text-hudson-bay">
            Common questions
          </p>
          <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.1] text-ink">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <dl className="mt-10 border-t border-comet/40">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-comet/40">
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    // On paper, so the global gold ring would not clear 3:1.
                    className="flex w-full items-baseline justify-between gap-6 py-[22px] text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-display text-[17px] font-normal leading-[1.4] text-hudson-bay">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-xl text-gold-deep transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${index}`}
                  hidden={!isOpen}
                  className="m-0 max-w-[66ch] pb-6 text-[15px] leading-[1.75] text-ink/80"
                >
                  {item.answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
