import Image from "next/image";
import { industriesDirectory } from "@/content/industries";
import { Container } from "@/components/ui/Container";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { Reveal } from "@/components/ui/Reveal";

/** Same image-card visual as the homepage's Industries section, expanded with a lead line + body paragraph for this dedicated directory page. */
export function IndustryDirectoryCards() {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {industriesDirectory.cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.1} y={36}>
              <div className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={card.image}
                    alt={`${card.title} — a WALKFLOW industry solution`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  />
                </div>
                <div className="relative z-10 -mt-8 mx-4 rounded-2xl border border-white/10 bg-navy p-6 shadow-[var(--shadow-card)] transition-colors duration-300 group-hover:border-orange/25">
                  <h3 className="text-xl text-white">{card.title}</h3>
                  <p className="mt-2.5 text-sm font-semibold text-orange">{card.lead}</p>
                  <p className="mt-2.5 leading-relaxed text-white/60">{card.body}</p>
                  <div className="mt-5">
                    <ExploreLink href={card.href}>{card.ctaLabel}</ExploreLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
