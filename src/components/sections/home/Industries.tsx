import Link from "next/link";
import { industries } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight, IconBriefcase, IconHome, IconPulse, IconWrench } from "@/components/ui/icons";

const marks = [IconHome, IconWrench, IconPulse, IconBriefcase];

export function Industries() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-dark">{industries.eyebrow}</p>
              <h2 className="mt-3 max-w-xl text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
                {industries.heading}
              </h2>
            </div>
            <Button href={industries.cta.href} variant="secondary" className="flex-none">
              {industries.cta.label}
            </Button>
          </div>

          {/* Uniform, equal-weight grid — add entries to src/content/home.ts to extend it. */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.cards.map((card, i) => {
              const Mark = marks[i % marks.length];
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-navy/8 bg-white p-7 shadow-[0_1px_2px_rgba(19,35,60,0.05)] transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <Mark className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-navy/[0.06] transition-transform duration-500 group-hover:scale-105" />
                  <div className="relative">
                    <h3 className="text-xl font-bold text-navy">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                  </div>
                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    Explore {card.title}
                    <IconArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
