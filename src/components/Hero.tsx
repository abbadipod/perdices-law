"use client";

import { useEffect, useRef } from "react";

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
        className="absolute -inset-y-[8%] inset-x-0 bg-hudson-bay bg-[url('/hero.svg')] bg-cover bg-center will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.72] via-ink/50 to-ink/[0.82]" />

      <div className="relative flex min-h-[88vh] flex-col items-center justify-center px-7 pb-[150px] pt-[120px] text-center">
        <p className="animate-hero-in mb-[22px] text-[11px] uppercase tracking-[0.34em] text-sidewalk">
          Dual-Qualified Attorney — US &amp; Philippines
        </p>
        <h1 className="animate-hero-in max-w-[15ch] text-balance font-display text-[clamp(40px,5.6vw,82px)] font-medium uppercase leading-[1.06] tracking-[0.01em] text-paper [animation-delay:80ms]">
          Practical legal solutions, across two countries.
        </h1>
        <p className="animate-hero-in mt-7 max-w-[46ch] text-[17px] leading-[1.7] text-sidewalk [animation-delay:160ms]">
          Philippine immigration, real estate, and litigation counsel for
          clients with lives in both countries.
        </p>
        <a
          href="#contact"
          className="animate-hero-in mt-10 border border-gold px-[34px] py-[15px] text-[11px] uppercase tracking-[0.26em] text-paper transition-colors [animation-delay:240ms] hover:bg-gold hover:text-ink"
        >
          Book a consultation
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-[34px] flex justify-center">
        <div className="h-[52px] w-px bg-gradient-to-b from-transparent to-gold" />
      </div>
    </section>
  );
}
