"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

/** Same accordion pattern and styling as the homepage FAQ.tsx, prop-driven so it can hold industry-specific questions. */
export function IndustryFAQ({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-4xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              FAQ
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">Quick answers</h2>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 0.06} y={20}>
                <div
                  className={cx(
                    "rounded-3xl border bg-white/[0.03] px-6 py-5 transition-colors duration-300 sm:px-8 sm:py-6",
                    open ? "border-orange/30" : "border-white/10",
                  )}
                >
                  <button
                    type="button"
                    id={`industry-faq-trigger-${i}`}
                    aria-expanded={open}
                    aria-controls={`industry-faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">{item.question}</span>
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
                        id={`industry-faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`industry-faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pt-4 leading-relaxed text-white/60">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
