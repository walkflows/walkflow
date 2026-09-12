import { demonstration } from "@/content/home";
import { media } from "@/content/media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/illustrations";
import { JourneyPreview } from "./JourneyPreview";

const statusCopy: Record<string, string> = {
  planned: "Coming soon",
  simulated: "Concept demonstration",
  live: "Live",
};

export function Demonstration() {
  const demo = media.realEstateDemoPreview;

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-orange/10 blur-[110px]"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <BrowserFrame>
            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  Attract, capture, convert, follow up
                </p>
                <span className="rounded-full border border-orange/40 bg-orange/15 px-3 py-1 text-xs font-semibold text-orange-light">
                  {statusCopy[demo.status]}
                </span>
              </div>
              <div className="mt-4">
                <JourneyPreview />
              </div>
            </div>
          </BrowserFrame>
          <p className="mt-3 text-xs text-white/35">Illustrative preview — sample data only, no real properties or leads.</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {demonstration.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{demonstration.body}</p>
          <div className="mt-8">
            <Button href={demonstration.cta.href}>{demonstration.cta.label}</Button>
          </div>
          <p className="mt-5 text-sm text-white/55">{demonstration.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
