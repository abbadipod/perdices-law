"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { credentialStats } from "@/content/site";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      // Distance the hero has travelled up past the top of the viewport.
      const scrolled = -section.getBoundingClientRect().top;
      bg.style.transform = `translate3d(0, ${(scrolled * 0.3).toFixed(1)}px, 0) scale(1.05)`;
    };
    // Throttle to one write per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[88vh] overflow-hidden bg-hudson-bay"
    >
      <div
        ref={bgRef}
        data-testid="hero-bg"
        className="absolute -inset-y-[8%] inset-x-0 bg-hudson-bay will-change-transform"
      >
        {/* Decorative — the headline carries the meaning. `priority` because
            this is the LCP element.

            The photograph is composed right of centre: its detail sits
            between 40% and 90% of the width, centred near 63%, with dead
            haze on the left. Centring the subject means cropping from the
            left, and how far that can go depends on the crop headroom —
            about 25% at desktop widths but 78% on a phone. One value cannot
            serve both, hence the pair. */}
        <Image
          src="/hero.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-[66%_50%] lg:object-[100%_50%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.72] via-ink/50 to-ink/[0.82]" />

      <div className="relative flex min-h-[88vh] flex-col items-center justify-center px-7 pb-[150px] pt-[120px] text-center">
        <h1 className="animate-hero-in max-w-[26ch] text-balance font-display text-[clamp(40px,5.6vw,82px)] font-medium uppercase leading-[1.06] tracking-[0.01em] text-paper [animation-delay:80ms]">
          Practical legal solutions from a{" "}
          <span className="whitespace-nowrap">dual-qualified</span> attorney
        </h1>
        <p className="animate-hero-in mt-7 max-w-[64ch] text-[17px] leading-[1.7] text-paper [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] [animation-delay:160ms]">
          Based in Dumaguete City, Perdices Law provides Philippine legal
          services in appellate and civil litigation, criminal law
          representation, land registration and property transfers, estate
          settlement and planning, transactional law and corporate matters,
          and legal advisory work.
        </p>
        <a
          href="#contact"
          className="animate-hero-in mt-10 bg-gold px-11 py-[19px] text-[12px] font-semibold uppercase tracking-[0.22em] text-ink shadow-lg shadow-black/30 transition-colors [animation-delay:240ms] hover:bg-gold-deep"
        >
          Book a consultation
        </a>

        {/* Same figures as Credentials, surfaced here too — the fold ends
            before a visitor reaches that section, and this is the moment
            they're deciding whether to keep reading. No new claim, just an
            earlier one.

            Grid, not a divided row: below sm there's nothing to divide
            against once it stacks to one column, and dividers on a
            flex-wrap row leave a stray rule beside whichever stat wraps
            onto its own line. Same trade Credentials already made. */}
        <div className="animate-hero-in mt-10 grid grid-cols-1 gap-y-7 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-0 [animation-delay:300ms]">
          {credentialStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-[28px] font-medium text-gold">
                {stat.figure}
              </span>
              <span className="mt-2 text-[10px] uppercase leading-[1.4] tracking-[0.16em] text-sidewalk">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[34px] flex justify-center">
        <div className="h-[52px] w-px bg-gradient-to-b from-transparent to-gold" />
      </div>
    </section>
  );
}
