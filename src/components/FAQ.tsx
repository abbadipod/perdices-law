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
      className="bg-paper px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            Common Questions
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <dl className="mt-10 divide-y divide-comet/30 border-y border-comet/30">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-display text-lg text-hudson-bay">
                      {item.question}
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-gold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${index}`}
                  hidden={!isOpen}
                  className="pb-5 text-sm leading-relaxed text-ink/80"
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
