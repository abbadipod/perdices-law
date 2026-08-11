"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Trigger point: reveal once the element's top crosses 90% of the viewport.
const TRIGGER_RATIO = 0.9;

// useLayoutEffect would warn during SSR; effects never run on the server
// anyway, so fall back to useEffect there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fades content up 18px as it scrolls into view.
 *
 * Deliberately renders *visible* and only hides itself on mount, and only
 * when it is still below the fold. If JS never runs the page still reads
 * normally rather than blanking out.
 */
export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  /** Stagger, in seconds, to offset this item within its group. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  // Hide before paint so nothing flashes in and then back out.
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top > window.innerHeight * TRIGGER_RATIO) {
      setHidden(true);
    }
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const check = () => {
      frame = 0;
      if (el.getBoundingClientRect().top <= window.innerHeight * TRIGGER_RATIO) {
        setHidden(false);
      }
    };
    // Throttle to one measurement per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hidden]);

  return (
    <div
      ref={ref}
      data-reveal={hidden ? "hidden" : "shown"}
      className="transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none"
      style={
        hidden
          ? { opacity: 0, transform: "translateY(18px)" }
          : { transitionDelay: `${delay}s` }
      }
    >
      {children}
    </div>
  );
}
