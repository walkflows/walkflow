"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { platformsAndTools } from "@/content/home";
import { tools, type Tool } from "@/content/tools";
import { ButtonEl } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconPause, IconPlay } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

// Split once, at module scope, since the list itself never changes.
const automationTools = tools.filter((t) => t.category === "automation");
const designTools = tools.filter((t) => t.category === "design");

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
 * Session 29: this section used to also carry "why work with WALKFLOW"
 * reassurance content (stat circles, feature cards, benefit pills) — that's
 * now its own `WhyWalkflow.tsx` section, per the required homepage section
 * order. This component is back to just what its name says: the eyebrow/
 * heading/body, a pause control, and the two logo marquee rows.
 */
export function PlatformsAndTools() {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

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
      {/*
        Session 30: removed the giant "PLATFORMS"/"EXPERIENCE" background
        watermarks per explicit instruction — the section is plain now,
        keeping only the slow-drifting blurred orange glow ("the orange
        shadow"). No `border-t` either, so this section blends straight into
        Process above and FAQ below instead of showing a hard seam.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
      </Container>
    </section>
  );
}
