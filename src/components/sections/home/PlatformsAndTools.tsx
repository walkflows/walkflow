"use client";

import { useState } from "react";
import Image from "next/image";
import { platformsAndTools } from "@/content/home";
import { tools, type Tool } from "@/content/tools";
import { ButtonEl } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconPause, IconPlay } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

function ToolCard({ tool, decorative }: { tool: Tool; decorative?: boolean }) {
  return (
    <li
      aria-hidden={decorative || undefined}
      className={cx(
        "flex h-28 w-40 flex-none items-center justify-center rounded-2xl border border-navy/8 bg-white p-5 shadow-[0_1px_2px_rgba(19,35,60,0.05)]",
        decorative && "motion-reduce:hidden",
      )}
    >
      <Image
        src={tool.src}
        alt={decorative ? "" : `${tool.name} logo`}
        width={112}
        height={112}
        className="h-full w-full object-contain"
      />
    </li>
  );
}

export function PlatformsAndTools() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="border-y border-navy/8 bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold tracking-tight text-navy">
                {platformsAndTools.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{platformsAndTools.body}</p>
            </div>
            {/*
              motion-reduce:hidden — under prefers-reduced-motion the strip
              below is a static grid (also via motion-reduce:), so there's
              nothing left to pause. A plain CSS variant, not a JS branch on
              useReducedMotion(), so server and client always render the same
              markup and hydration can never mismatch here.
            */}
            <ButtonEl
              variant="secondary"
              size="sm"
              className="flex-none motion-reduce:hidden"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <IconPlay /> : <IconPause />}
              {paused ? platformsAndTools.resume : platformsAndTools.pause}
            </ButtonEl>
          </div>

          <div className="relative mt-12 overflow-hidden motion-reduce:overflow-visible [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
            <ul
              className="flex w-max animate-marquee gap-5 motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
              style={{ animationPlayState: paused ? "paused" : "running" }}
            >
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
              {tools.map((tool) => (
                <ToolCard key={`${tool.id}-dup`} tool={tool} decorative />
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
