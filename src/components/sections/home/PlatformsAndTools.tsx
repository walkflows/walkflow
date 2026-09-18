"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { platformsAndTools } from "@/content/home";
import { tools, type Tool } from "@/content/tools";
import { ButtonEl } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconAutomation, IconChat, IconDocument, IconGear, IconPause, IconPeople, IconPlay, IconSwap } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

type Feature = (typeof platformsAndTools.features)[number];
type Stat = (typeof platformsAndTools.stats)[number];
type Pill = (typeof platformsAndTools.pills)[number];

// Split once, at module scope, since the list itself never changes.
const automationTools = tools.filter((t) => t.category === "automation");
const designTools = tools.filter((t) => t.category === "design");

const featureIcons = { people: IconPeople, document: IconDocument, chat: IconChat };
const pillIcons = { document: IconDocument, gear: IconGear, refresh: IconAutomation, swap: IconSwap };

function ToolCard({ tool, decorative }: { tool: Tool; decorative?: boolean }) {
  return (
    <li
      aria-hidden={decorative || undefined}
      className={cx(
        "group flex h-16 w-52 flex-none items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition-all duration-[350ms] ease-out hover:-translate-y-1.5 hover:border-orange/40 hover:bg-white/[0.07] hover:shadow-[0_0_28px_-6px_rgba(255,153,28,0.4)]",
        decorative && "motion-reduce:hidden",
      )}
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/95 p-1.5 transition-transform duration-300 ease-out group-hover:scale-110">
        <Image
          src={tool.src}
          alt={decorative ? "" : `${tool.name} logo`}
          width={36}
          height={36}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="truncate text-sm font-semibold text-white/85">{tool.name}</span>
    </li>
  );
}

/**
 * Gathered-to-separated reveal: as the row scrolls into view (tracked by
 * its own short, local scroll range via `statsProgress` — not the whole
 * section — so the motion actually plays out over a visible distance
 * instead of being spread thin across the entire, much taller section),
 * each circle starts pulled in toward the centre (heavily overlapping its
 * neighbours) and gently glides out to its resting, evenly-spaced position.
 * Applied on a plain wrapping motion.div, outside Reveal's own motion.div,
 * so the one-off entrance transform and this scroll-linked one never fight
 * over the same element.
 */
function StatCircle({
  stat,
  index,
  total,
  statsProgress,
}: {
  stat: Stat;
  index: number;
  total: number;
  statsProgress: MotionValue<number>;
}) {
  const center = (total - 1) / 2;
  const startOffset = (center - index) * 60;
  const separationX = useTransform(statsProgress, [0, 1], [startOffset, 0]);

  return (
    // Earlier (leftmost) circles render above later ones, so each circle's
    // own text always sits on top rather than being covered by the next
    // overlapping circle's edge.
    <div className="relative" style={{ zIndex: 100 - index }}>
      <motion.div style={{ x: separationX }} className="motion-reduce:!transform-none">
        <Reveal delay={0.3 + index * 0.1} y={40} scale={0.9}>
          <div
            style={
              {
                "--float-delay": `${index * 0.5}s`,
                "--float-duration": "7s",
                "--float-amount": "-6px",
              } as React.CSSProperties
            }
            className="flex h-24 w-24 flex-none animate-float-soft flex-col items-center justify-center overflow-hidden rounded-full border border-white/12 bg-navy-deep/70 px-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-sm motion-reduce:[animation:none] sm:h-36 sm:w-36 lg:h-44 lg:w-44"
          >
            <p className="whitespace-nowrap font-heading text-sm font-medium text-white sm:text-2xl lg:text-3xl">{stat.value}</p>
            <p className="mt-1.5 max-w-[4rem] text-[0.55rem] leading-tight text-white/55 sm:max-w-[5rem] sm:text-[0.68rem] lg:max-w-[7rem] lg:text-[0.78rem]">
              {stat.label}
            </p>
          </div>
        </Reveal>
      </motion.div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = featureIcons[feature.icon];
  return (
    <Reveal delay={0.55 + index * 0.12} y={48} scale={0.97}>
      <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-orange/30 hover:bg-white/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(255,153,28,0.22),transparent)] opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-orange/30 text-orange transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-orange/60 group-hover:shadow-[0_0_18px_-2px_rgba(255,153,28,0.5)]">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-lg text-white">{feature.title}</h3>
        <p className="mt-3 leading-relaxed text-white/60">{feature.body}</p>
      </div>
    </Reveal>
  );
}

function ToolPill({ pill, index }: { pill: Pill; index: number }) {
  const Icon = pillIcons[pill.icon];
  return (
    <Reveal delay={0.85 + index * 0.06} y={16}>
      <div className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-orange/35 hover:shadow-[0_0_16px_-4px_rgba(255,153,28,0.45)]">
        <Icon className="h-4 w-4 flex-none text-orange transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        <span className="whitespace-nowrap text-sm font-medium text-white/80">{pill.label}</span>
      </div>
    </Reveal>
  );
}

export function PlatformsAndTools() {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax on the decorative background typography only —
  // driven by Motion values applied via `style`, not by conditional
  // initial/animate props or class names, so it never touches anything
  // hydration-sensitive. The site-wide prefers-reduced-motion rule can't
  // reach this (it's a JS transform, not a CSS transition/animation), so
  // `motion-reduce:!transform-none` below neutralises it visually instead
  // (Motion applies x/y via the `transform` property, not the native CSS
  // `translate` property, so the override must target `transform`).
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const typographyYFar = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const typographyYNear = useTransform(scrollYProgress, [0, 1], [-36, 36]);

  // Separate, short scroll range just for the stat-circle row (see
  // StatCircle's own comment) — deliberately its own useScroll call rather
  // than reusing scrollYProgress above, since that one spans the entire,
  // much taller section and would make the circles' movement imperceptible.
  const statsRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statsProgress } = useScroll({ target: statsRowRef, offset: ["start 95%", "start 45%"] });

  // Extremely subtle cursor-follow on one ambient light layer. Skipped
  // entirely under reduced motion (a runtime early-return, not a render
  // branch), and smoothed with a spring for an unhurried, elegant lag.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothY = useSpring(cursorY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      cursorX.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
      cursorY.set(((e.clientY - rect.top) / rect.height - 0.5) * 16);
    }
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduceMotion, cursorX, cursorY]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-navy-deep py-20 sm:py-28">
      {/* Ambient atmosphere: huge low-opacity typography + slow-drifting
          blurred orange light. Purely decorative, aria-hidden, and never
          intercepts pointer events or reading order. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.p
          style={{ y: typographyYFar }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[22vw] font-medium leading-none tracking-wide text-white/[0.05] motion-reduce:!transform-none"
        >
          PLATFORMS
        </motion.p>
        <motion.p
          style={{ y: typographyYNear }}
          className="absolute top-[60%] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[17vw] font-medium leading-none tracking-wide text-white/[0.045] motion-reduce:!transform-none"
        >
          EXPERIENCE
        </motion.p>

        <div className="absolute -left-32 top-10 h-[26rem] w-[26rem] animate-drift-a rounded-full bg-[radial-gradient(closest-side,rgba(255,153,28,0.16),transparent)] blur-3xl" />
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute right-[-8rem] top-[38%] h-[30rem] w-[30rem] animate-drift-b rounded-full bg-[radial-gradient(closest-side,rgba(255,153,28,0.15),transparent)] blur-3xl motion-reduce:!transform-none"
        />
        <div className="absolute bottom-[-10rem] left-1/4 h-[28rem] w-[28rem] animate-drift-c rounded-full bg-[radial-gradient(closest-side,rgba(255,153,28,0.14),transparent)] blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center rounded-full border border-orange/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {platformsAndTools.eyebrow}
            </span>
            <h2 className="max-w-2xl text-[clamp(2rem,4.2vw,3rem)] text-white">{platformsAndTools.heading}</h2>
            <p className="max-w-xl leading-relaxed text-white/60">{platformsAndTools.body}</p>
            {/*
              motion-reduce:hidden — under prefers-reduced-motion the strip
              below is a static grid (also via motion-reduce:), so there's
              nothing left to pause. A plain CSS variant, not a JS branch on
              useReducedMotion(), so server and client always render the same
              markup and hydration can never mismatch here.
            */}
            <ButtonEl
              variant="secondary-on-dark"
              size="sm"
              className="motion-reduce:hidden"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <IconPlay /> : <IconPause />}
              {paused ? platformsAndTools.resume : platformsAndTools.pause}
            </ButtonEl>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-4">
            {/* Automation, CRM and email marketing tools — right to left. */}
            <div className="relative overflow-x-clip motion-reduce:overflow-visible [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
              <ul
                className="flex w-max animate-marquee gap-4 motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              >
                {automationTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
                {automationTools.map((tool) => (
                  <ToolCard key={`${tool.id}-dup`} tool={tool} decorative />
                ))}
              </ul>
            </div>

            {/* Web design and app development tools — left to right. */}
            <div className="relative overflow-x-clip motion-reduce:overflow-visible [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
              <ul
                className="flex w-max animate-marquee-reverse gap-4 motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              >
                {designTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
                {designTools.map((tool) => (
                  <ToolCard key={`${tool.id}-dup`} tool={tool} decorative />
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center">
          <div ref={statsRowRef} className="flex -space-x-2 sm:-space-x-3 lg:-space-x-4">
            {platformsAndTools.stats.map((stat, i) => (
              <StatCircle
                key={stat.id}
                stat={stat}
                index={i}
                total={platformsAndTools.stats.length}
                statsProgress={statsProgress}
              />
            ))}
          </div>
          <Reveal delay={0.3 + platformsAndTools.stats.length * 0.1}>
            <p className="mt-8 max-w-md text-center text-sm text-white/50">{platformsAndTools.statsCaption}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {platformsAndTools.features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {platformsAndTools.pills.map((pill, i) => (
            <ToolPill key={pill.id} pill={pill} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
