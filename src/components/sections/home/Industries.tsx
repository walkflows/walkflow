import Image from "next/image";
import { industries } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { Reveal } from "@/components/ui/Reveal";

export function Industries() {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
                {industries.eyebrow}
              </span>
              <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">
                {industries.headingLines.map((line) => (
                  <span key={line} className="block sm:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <Button href={industries.cta.href} variant="secondary-on-dark" className="flex-none">
              {industries.cta.label}
            </Button>
          </div>
        </Reveal>

        {/* Uniform, equal-weight grid — add entries to src/content/home.ts to extend it. */}
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {industries.cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.1} y={36}>
              <div className="group">
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
                <div className="relative z-10 -mt-8 mx-4 rounded-2xl border border-white/10 bg-navy p-6 shadow-[var(--shadow-card)] transition-colors duration-300 group-hover:border-orange/25">
                  <h3 className="text-xl text-white">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">{card.body}</p>
                  <div className="mt-5">
                    <ExploreLink href={card.href}>{`Explore ${card.title}`}</ExploreLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
