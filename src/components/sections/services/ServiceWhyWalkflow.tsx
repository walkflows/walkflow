import type { TitleBody } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck, IconDocument, IconGear, IconPeople, IconSchedule, IconSwap } from "@/components/ui/icons";

// Cycled across each page's six cards — the content brief doesn't assign a specific icon per item, so this reuses the same approved sitewide icon set in a fixed rotation rather than inventing new iconography per line.
const icons = [IconGear, IconPeople, IconCheck, IconDocument, IconSchedule, IconSwap];

export function ServiceWhyWalkflow({ heading, items }: { heading: string; items: TitleBody[] }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[24rem] bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(255,153,28,0.1),transparent)]"
      />
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.06} y={20}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/30 hover:bg-white/[0.05]">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-orange/20 bg-orange/10">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
