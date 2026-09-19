"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { TitleBody } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

function ProcessStep({ step, index, total }: { step: TitleBody; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // "In view" here means "currently crossing the vertical centre of the
  // viewport" (a tight margin band), not merely "visible" — that's what
  // gives the timeline its one-step-at-a-time emphasis while scrolling.
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <li ref={ref} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
      {index < total - 1 && (
        <span aria-hidden className="absolute left-6 top-14 h-[calc(100%-2rem)] w-px bg-white/10 sm:left-8" />
      )}
      <div className="flex w-12 flex-none justify-center sm:w-16">
        <span
          className={cx(
            "font-heading text-3xl font-medium leading-none transition-colors duration-300 sm:text-4xl lg:text-5xl",
            active ? "text-orange" : "text-white/20",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div
        className={cx(
          "flex-1 rounded-2xl border p-6 transition-colors duration-300 ease-out sm:p-7",
          active ? "border-orange/30 bg-white/[0.05]" : "border-white/10 bg-white/[0.03]",
        )}
      >
        <h3 className="text-lg text-white">{step.title}</h3>
        <p className="mt-2 leading-relaxed text-white/60">{step.body}</p>
      </div>
    </li>
  );
}

export function ServiceProcess({ heading, steps }: { heading: string; steps: TitleBody[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              How We Work
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
          </div>
        </Reveal>

        <ol className="mt-12">
          {steps.map((step, i) => (
            <ProcessStep key={step.title} step={step} index={i} total={steps.length} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
