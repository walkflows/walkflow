"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  // Keep the initial/target values identical between server and client so
  // hydration never mismatches. Only the transition timing (never rendered
  // into static DOM attributes) responds to reduced-motion preference.
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
