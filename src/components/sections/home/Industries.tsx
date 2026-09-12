import Link from "next/link";
import { industries } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight, IconBriefcase, IconHome, IconPulse, IconWrench } from "@/components/ui/icons";

const spans = ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "lg:col-span-1", "lg:col-span-1"];
const marks = [IconHome, IconWrench, IconPulse, IconBriefcase];

export function Industries() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="max-w-xl text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              {industries.heading}
            </h2>
            <Button href={industries.cta.href} variant="secondary" className="flex-none">
              {industries.cta.label}
            </Button>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4 lg:grid-rows-2">
            {industries.cards.map((card, i) => {
              const Mark = marks[i];
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-navy/8 bg-white p-8 shadow-[0_1px_2px_rgba(19,35,60,0.05)] transition-shadow hover:shadow-[var(--shadow-card)] ${spans[i]}`}
                >
                  <Mark
                    className={
                      i === 0
                        ? "pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 text-navy/[0.05] transition-transform duration-500 group-hover:scale-105"
                        : "pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-navy/[0.06] transition-transform duration-500 group-hover:scale-105"
                    }
                  />
                  <div className="relative">
                    <h3 className={i === 0 ? "text-3xl font-bold text-navy" : "text-xl font-bold text-navy"}>
                      {card.title}
                    </h3>
                    <p className={`mt-3 leading-relaxed text-muted ${i === 0 ? "max-w-xs text-base" : "text-sm"}`}>
                      {card.body}
                    </p>
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
