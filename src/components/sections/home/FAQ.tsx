"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faq } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-navy/8 bg-white py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold text-navy">{faq.heading}</h2>
          <div className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
            {faq.items.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={item.question} className="py-5">
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-navy"
                  >
                    {item.question}
                    <span
                      className={cx(
                        "flex h-7 w-7 flex-none items-center justify-center rounded-full border border-navy/15 text-navy transition-transform duration-200",
                        open && "rotate-45",
                      )}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 max-w-xl leading-relaxed text-muted">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
