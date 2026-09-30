import Image from "next/image";
import { aboutHero } from "@/content/about";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight, IconLinkedin } from "@/components/ui/icons";

export function AboutHero() {
  return (
    <section className="overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {aboutHero.eyebrow}
          </span>
          <h2 className="mt-5 text-balance font-heading text-[clamp(2.75rem,7.2vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-white">
            Meet the <span className="text-orange">Founder</span>
          </h2>
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
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-orange/20 blur-[100px]"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-white/10">
              <Image
                src={aboutHero.photo.src}
                alt={aboutHero.photo.alt}
                fill
                sizes="(min-width: 1024px) 512px, (min-width: 640px) 420px, 88vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <p className="text-center font-heading text-[clamp(1.5rem,2.6vw,1.9rem)] font-medium leading-none text-white lg:text-left">
                {aboutHero.name.split(" ")[0]} <span className="text-orange">{aboutHero.name.split(" ").slice(1).join(" ")}</span>
              </p>
              {aboutHero.linkedinUrl ? (
                <a
                  href={aboutHero.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${aboutHero.name} on LinkedIn`}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/15 text-white/75 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-orange hover:text-orange"
                >
                  <IconLinkedin className="h-4 w-4" />
                </a>
              ) : (
                <span
                  aria-label="LinkedIn profile link coming soon"
                  className="flex h-9 w-9 flex-none cursor-not-allowed items-center justify-center rounded-full border border-white/10 text-white/25"
                >
                  <IconLinkedin className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
