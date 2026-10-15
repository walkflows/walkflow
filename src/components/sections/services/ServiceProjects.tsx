import type { ProjectItem, ServiceSlug } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceProjectCard } from "./ServiceProjectCard";

export function ServiceProjects({
  eyebrow = "Projects",
  heading,
  body,
  items,
  serviceSlug,
  tileAspect,
  showSummary,
  showcase = false,
}: {
  /** Session 26 — defaults to "Projects" so every page except App Development ("App Projects") renders exactly as before. */
  eyebrow?: string;
  heading: string;
  body: string;
  items: ProjectItem[];
  serviceSlug: ServiceSlug;
  /** Session 24, extended Session 26 — see ServiceProjectCard.tsx. Omitted by every page except Email Marketing and App Development, which render exactly as before. */
  tileAspect?: "4/3" | "square" | "16/9";
  showSummary?: boolean;
  /**
   * Business Automation & CRM showcase: lays the cards out exactly like the Web Design project grid (two columns from 640px,
   * one on mobile, gap-6, equal-height cards) and shows each card as thumbnail + industry + name + description only,
   * with no corner label and no tag chips. Every other page keeps its existing grid and cards.
   */
  showcase?: boolean;
}) {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
            <p className="mt-4 leading-relaxed text-white/60">{body}</p>
          </div>
        </Reveal>

        <div className={showcase ? "mt-12 grid gap-6 sm:grid-cols-2" : "mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6"}>
          {items.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} y={24} className={showcase ? "h-full" : undefined}>
              <ServiceProjectCard project={project} serviceSlug={serviceSlug} tileAspect={tileAspect} showSummary={showSummary} fillHeight={showcase} showBadge={!showcase} showTags={!showcase} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
