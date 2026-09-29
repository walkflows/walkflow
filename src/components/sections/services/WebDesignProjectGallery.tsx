import { webDesignGallery, webDesignProjects } from "@/content/web-design-projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WebDesignProjectCard } from "./WebDesignProjectCard";

/**
 * Replaces the old placeholder `<ServiceProjects>` block on `/services/web-design`
 * (Session 27) with the six real projects. Kept as its own section (rather
 * than reusing `ServiceProjects`/`ServiceProjectCard`) since the card
 * treatment genuinely differs — full mockup via `object-contain`, a static
 * "Explore Project" label instead of a hover overlay, and no hover-only
 * discovery — see `WebDesignProjectCard.tsx`. Still keeps the `#projects`
 * anchor id so the hero's existing "View Projects" button keeps working
 * unchanged.
 */
export function WebDesignProjectGallery() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {webDesignGallery.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{webDesignGallery.heading}</h2>
            <p className="mt-4 leading-relaxed text-white/60">{webDesignGallery.intro}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {webDesignProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06} y={24}>
              <WebDesignProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
