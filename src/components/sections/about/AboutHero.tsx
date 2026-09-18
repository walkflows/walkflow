import Image from "next/image";
import { aboutHero } from "@/content/about";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,153,28,0.18),transparent)]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {aboutHero.eyebrow}
          </span>
          <h1 className="mt-5 text-balance font-heading text-[clamp(2.75rem,7.2vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-white">
            Meet the <span className="text-orange">Founder</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/65">{aboutHero.intro}</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {aboutHero.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-orange/25 bg-orange/[0.06] px-4 py-2 text-sm font-medium text-orange"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-9">
            <Button href={aboutHero.cta.href}>
              {aboutHero.cta.label}
              <IconArrowRight />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12} scale={0.94}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-16 -z-20 rounded-full bg-orange/15 blur-[110px]"
            />
            <div className="relative aspect-[4/5] w-full">
              {/* Solid orange backdrop shape behind the cutout photo, echoing the reference layout's circular
                  accent — kept inside this image box (not the outer wrapper) so it never reaches the name text below. */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[68%] w-[80%] -translate-x-1/2 rounded-[45%] bg-gradient-to-b from-orange to-orange-hover"
              />
              <Image
                src={aboutHero.photo.src}
                alt={aboutHero.photo.alt}
                fill
                sizes="(min-width: 1024px) 512px, (min-width: 640px) 420px, 88vw"
                className="object-contain object-bottom"
                priority
              />
            </div>
            <p className="mt-4 text-center font-heading text-[clamp(1.5rem,2.6vw,1.9rem)] font-medium leading-none text-white lg:text-left">
              {aboutHero.name.split(" ")[0]} <span className="text-orange">{aboutHero.name.split(" ").slice(1).join(" ")}</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
