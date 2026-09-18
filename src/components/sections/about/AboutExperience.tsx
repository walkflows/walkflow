import { aboutExperience } from "@/content/about";
import { platformsAndTools } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutExperience() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[20vw] font-medium leading-none tracking-wide text-white/[0.05]"
      >
        {aboutExperience.backgroundWord}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[28rem] -translate-y-1/2 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(255,153,28,0.12),transparent)]"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {aboutExperience.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">{aboutExperience.heading}</h2>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {platformsAndTools.stats.map((stat, i) => (
            <Reveal key={stat.id} delay={0.1 + i * 0.1} y={30} scale={0.92}>
              <div className="flex h-28 w-28 flex-none flex-col items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:h-36 sm:w-36">
                <p className="whitespace-nowrap font-heading text-xl font-medium text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1.5 max-w-[5rem] text-[0.68rem] leading-tight text-white/55 sm:max-w-[6rem] sm:text-[0.75rem]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1 + platformsAndTools.stats.length * 0.1}>
          <p className="mx-auto mt-8 max-w-md text-center text-sm text-white/50">{platformsAndTools.statsCaption}</p>
        </Reveal>
      </Container>
    </section>
  );
}
