import Image from "next/image";
import { aboutFounder } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutFounder() {
  return (
    <section className="border-t border-white/10 bg-navy py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {aboutFounder.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">{aboutFounder.heading}</h2>
            <p className="mt-5 leading-relaxed text-white/60">{aboutFounder.intro}</p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-center sm:gap-14">
          <Reveal delay={0.1} scale={0.94}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-orange/25 blur-[70px]"
              />
              <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-[2rem] border border-white/10 sm:w-72">
                <Image
                  src={aboutFounder.photo.src}
                  alt={aboutFounder.photo.alt}
                  fill
                  sizes="(min-width: 640px) 288px, 256px"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18} y={20}>
            <div className="max-w-sm text-center sm:text-left">
              <p className="font-heading text-[clamp(1.75rem,3.2vw,2.25rem)] font-medium leading-none text-white">
                {aboutFounder.name.split(" ")[0]}{" "}
                <span className="text-orange">{aboutFounder.name.split(" ").slice(1).join(" ")}</span>
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                {aboutFounder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-orange/25 bg-orange/[0.06] px-4 py-2 text-sm font-medium text-orange"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
