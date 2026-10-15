"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
  scale,
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  /** Optional entrance scale (e.g. 0.9 → 1), for elements that want a slightly more cinematic arrival. Omitted entirely when unset, so existing callers are unaffected. */
  scale?: number;
  /**
   * For content on the first screen: plays a rise-only entrance as plain CSS at first paint (see `.enter-rise` in globals.css), so the
   * content is fully visible in the server HTML instead of waiting for JavaScript to hydrate. Everything further down the page
   * keeps the scroll-triggered Motion reveal.
   */
  eager?: boolean;
}) {
  // Keep the initial/target values identical between server and client so
  // hydration never mismatches. Only the transition timing (never rendered
  // into static DOM attributes) responds to reduced-motion preference.
  const reduceMotion = useReducedMotion();

  if (eager) {
    return (
      <div className={cx("enter-rise", className)} style={{ "--enter-delay": `${delay}s`, "--enter-y": `${y}px`, ...(scale === undefined ? {} : { "--enter-scale": scale }) } as CSSProperties}>
        {children}
      </div>
    );
  }

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
