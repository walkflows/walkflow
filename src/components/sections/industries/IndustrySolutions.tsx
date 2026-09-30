import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Session 29: replaced the old long grid of small chip-style solution boxes
 * with exactly three full cards (title + complete description) per
 * industry, per explicit instruction — "Do not keep the old long solution
 * list underneath." Top padding is intentionally smaller than the section's
 * own bottom padding (`pt-14 sm:pt-20` vs `pb-20 sm:pb-28`), tightening the
 * gap to the Problem section directly above without touching any other
 * section's spacing.
 */
export function IndustrySolutions({
  heading,
  body,
  cards,
}: {
  heading: string;
  body: string;
  cards: { title: string; body: string }[];
}) {
  return (
    <section className="bg-navy-deep pb-20 pt-14 sm:pb-28 sm:pt-20">
      <Container className="max-w-4xl">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/60">{body}</p>
        </Reveal>

        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08} y={20}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/30 hover:bg-white/[0.05]">
                <h3 className="text-lg text-white">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
