import type { ProjectItem, ServiceSlug } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceProjectCard } from "./ServiceProjectCard";

export function ServiceProjects({
  heading,
  body,
  items,
  serviceSlug,
}: {
  heading: string;
  body: string;
  items: ProjectItem[];
  serviceSlug: ServiceSlug;
}) {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              Projects
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
            <p className="mt-4 leading-relaxed text-white/60">{body}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} y={24}>
              <ServiceProjectCard project={project} serviceSlug={serviceSlug} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
