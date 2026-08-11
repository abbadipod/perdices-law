"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Timing mirrors the design comp: 700ms, CSS `ease`, an 18px rise, and a
// trigger 8% up from the bottom of the viewport.
const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  // globals.css neutralises CSS transitions under prefers-reduced-motion, but
  // Framer animates in JS and never sees that rule — so opt out explicitly.
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.08 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
