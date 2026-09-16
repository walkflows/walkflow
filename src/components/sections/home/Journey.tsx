"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { journey, type JourneyStageId } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TabList } from "@/components/ui/Tabs";
import { BrowserFrame } from "@/components/ui/illustrations";
import { JourneyIllustration } from "./JourneyIllustration";

const tabs = journey.stages.map((s) => ({ id: s.id, label: s.label }));

export function Journey() {
  const [active, setActive] = useState<JourneyStageId>("attract");
  const reduceMotion = useReducedMotion();
  const stage = journey.stages.find((s) => s.id === active)!;

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8rem] top-1/3 h-96 w-96 rounded-full bg-orange/10 blur-[110px]"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-light">{journey.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-white">
              {journey.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">{journey.body}</p>
          </div>

          <TabList
            label="Business journey stages"
            tabs={tabs}
            activeId={active}
            onChange={(id) => setActive(id as JourneyStageId)}
            idPrefix="journey-"
            className="mt-10 flex flex-wrap justify-center gap-2.5"
            tabClassName="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/60 hover:text-white"
            activeTabClassName="border-orange! bg-orange! text-navy!"
          />

          <div
            role="tabpanel"
            id={`journey-panel-${active}`}
            aria-labelledby={`journey-tab-${active}`}
            tabIndex={0}
            className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${stage.id}-text`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
              >
                <p className="text-sm font-semibold text-orange-light">Example: {stage.industry}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{stage.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-white/65">{stage.body}</p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${stage.id}-illustration`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
              >
                <BrowserFrame contentClassName="min-h-64 flex flex-col justify-center">
                  <JourneyIllustration stageId={stage.id} />
                </BrowserFrame>
                <p className="mt-3 text-center text-xs text-white/35 lg:text-left">
                  Illustrative interface — concept only, not a live product screen.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
