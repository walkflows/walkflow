import { demoShowcase } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function DemoShowcase() {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {demoShowcase.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">{demoShowcase.heading}</h2>
            <p className="mt-5 leading-relaxed text-white/60">{demoShowcase.body}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {demoShowcase.items.map((item, i) => {
            const isLive = item.status === "simulated";
            return (
              <Reveal key={item.id} delay={i * 0.1} y={32}>
                <div
                  className={cx(
                    "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1",
                    isLive
                      ? "border-orange/30 bg-orange/[0.05] hover:border-orange/50 hover:shadow-[0_0_28px_-8px_rgba(255,153,28,0.45)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                >
                  <span
                    className={cx(
                      "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
                      isLive ? "bg-orange/15 text-orange" : "bg-white/[0.06] text-white/55",
                    )}
                  >
                    {item.statusLabel}
                  </span>
                  <h3 className="mt-4 text-lg text-white">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
                  <div className="mt-auto pt-6">
                    <ExploreLink href={item.href}>{item.cta}</ExploreLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
