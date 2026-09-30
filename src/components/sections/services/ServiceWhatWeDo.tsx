import type { TitleBody } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck, IconDocument, IconGear, IconPeople, IconSchedule, IconSwap } from "@/components/ui/icons";

// Cycled across each page's six items — the content brief doesn't assign a specific icon per line, so this reuses the same approved sitewide icon set in a fixed rotation, matching ServiceWhyWalkflow's convention.
const icons = [IconGear, IconDocument, IconPeople, IconSchedule, IconCheck, IconSwap];

/**
 * Session 29: converted from a single-column divided list into a compact
 * two-column card grid (one column on mobile), per explicit instruction —
 * "What We Can Build" (Web Design) / "What We Can Automate" / "What We Can
 * Build" (Mobile App) / "What We Can Deliver" (Email Marketing) now share
 * one card treatment across all four pages, matching `ServiceWhyWalkflow`'s
 * icon-card style.
 */
export function ServiceWhatWeDo({ heading, body, items }: { heading: string; body: string; items: TitleBody[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
            <p className="mt-5 leading-relaxed text-white/60">{body}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.06} y={20}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/30 hover:bg-white/[0.05]">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-orange/20 bg-orange/10">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/60">{item.body}</p>
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
