"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
  scale,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  /** Optional entrance scale (e.g. 0.9 → 1), for elements that want a slightly more cinematic arrival. Omitted entirely when unset, so existing callers are unaffected. */
  scale?: number;
}) {
  // Keep the initial/target values identical between server and client so
  // hydration never mismatches. Only the transition timing (never rendered
  // into static DOM attributes) responds to reduced-motion preference.
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(scale === undefined ? {} : { scale }) }}
      whileInView={{ opacity: 1, y: 0, ...(scale === undefined ? {} : { scale: 1 }) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
