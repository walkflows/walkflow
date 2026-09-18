import { aboutAccordion, aboutIntro } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AboutAccordion } from "@/components/sections/about/AboutAccordion";

export function AboutIntro() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      {/* Oversized background wordmark — same treatment as the homepage hero. */}
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[30vw] font-medium leading-none tracking-wide text-white/[0.05] sm:text-[23vw]"
      >
        WALKFLOW
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,153,28,0.14),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[22rem] bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(255,153,28,0.1),transparent)]"
      />

      <Container className="relative grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {aboutIntro.eyebrow}
          </span>
          <h2 className="mt-5 text-balance text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-white">
            {aboutIntro.heading}
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {aboutIntro.paragraphs.map((p) => (
              <p key={p} className="leading-relaxed text-white/65">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-7 border-l-2 border-orange/50 pl-4">
            <p className="text-lg font-semibold text-white">{aboutIntro.highlight}</p>
            <p className="mt-1 text-sm text-white/50">{aboutIntro.highlightNote}</p>
          </div>
        </Reveal>

        <AboutAccordion items={aboutAccordion} />
      </Container>
    </section>
  );
}
