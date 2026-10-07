import Image from "next/image";
import Link from "next/link";
import { consultationCta } from "@/content/navigation";
import { industries } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight } from "@/components/ui/icons";

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-24 border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {industries.eyebrow}
            </span>
            <h2 className="mt-4 text-balance text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">
              {industries.headingLines.map((line, index, lines) => (
                <span key={line} className="min-[1200px]:block min-[1200px]:whitespace-nowrap">
                  {line}
                  {index < lines.length - 1 ? " " : null}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/60">{industries.supportingLine}</p>
          </div>
        </Reveal>

        {/* Uniform, equal-weight grid — add entries to src/content/home.ts to extend it. */}
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {industries.cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.1} y={36} className="h-full">
              <div className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={card.image}
                    alt={`${card.title} — a WALKFLOW industry solution`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  />
                </div>
                <div className="relative z-10 -mt-8 mx-4 flex flex-1 flex-col rounded-2xl border border-white/10 bg-navy p-6 shadow-[var(--shadow-card)] transition-colors duration-300 group-hover:border-orange/25">
                  <h3 className="text-xl text-white">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">{card.body}</p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
                    {card.workflow.map((step, index) => (
                      <span key={step} className="whitespace-nowrap">
                        {step}
                        {index < card.workflow.length - 1 && (
                          <span aria-hidden className="ml-2 text-orange/70">
                            →
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-5">
                    <ExploreLink href={card.href}>
                      Explore Solution
                      <span className="sr-only"> for {card.title}</span>
                    </ExploreLink>
                    <Button href={card.demoHref} size="sm" className="flex-none">
                      View Demo
                      <span className="sr-only"> for {card.title}</span>
                      <IconArrowUpRight />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center text-sm text-white/60">
            {industries.bottomLead}{" "}
            <Link
              href={consultationCta.href}
              className="font-semibold text-orange underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              {consultationCta.label} →
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
