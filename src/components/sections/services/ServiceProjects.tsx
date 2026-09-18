import type { ProjectCard } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceProjectCard } from "./ServiceProjectCard";

export function ServiceProjects({ heading, items }: { heading: string; items: ProjectCard[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08} y={24}>
              <ServiceProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
