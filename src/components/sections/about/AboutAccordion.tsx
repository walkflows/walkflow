"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

type Item = { index: string; title: string; body: string };

export function AboutAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <Reveal key={item.title} delay={i * 0.06} y={20}>
            <div
              className={cx(
                "rounded-3xl border bg-white/[0.03] px-6 py-5 transition-colors duration-300 sm:px-7 sm:py-6",
                open ? "border-orange/30" : "border-white/10",
              )}
            >
              <button
                type="button"
                id={`about-trigger-${i}`}
                aria-expanded={open}
                aria-controls={`about-panel-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="text-sm font-bold text-orange">{item.index}.</span>
                  <span className="text-base font-semibold text-white sm:text-lg">{item.title}</span>
                </span>
                <span
                  className={cx(
                    "flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-orange text-navy-deep transition-transform duration-300 ease-out",
                    open && "rotate-180",
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M2.5 5 7 9.5 11.5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`about-panel-${i}`}
                    role="region"
                    aria-labelledby={`about-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 leading-relaxed text-white/60">{item.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
