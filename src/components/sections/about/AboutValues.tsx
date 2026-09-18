import { aboutValues } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutValues() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[26vw] font-medium leading-none tracking-wide text-white/[0.05]"
      >
        {aboutValues.backgroundWord}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[30rem] -translate-y-1/2 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(255,153,28,0.14),transparent)]"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {aboutValues.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">{aboutValues.heading}</h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} y={16}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-heading text-lg font-medium text-orange">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
