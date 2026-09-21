import Image from "next/image";
import Link from "next/link";
import type { ProjectItem, ServicePageContent } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight, IconChevronLeft } from "@/components/ui/icons";
import { EmailDesignGallery } from "./EmailDesignGallery";

/**
 * Shared project-detail page body, reused by every service's
 * `/services/<service>/projects/<project>` route. Renders only what the
 * project actually has: the video block is skipped entirely when there's
 * no real `videoSrc` (never a poster-only player with nothing to play),
 * and the external-link button is skipped when there's no real
 * `externalHref` — per explicit instruction, never a dead link or an
 * invented URL. Session 24: a project with real `designs` (the Email
 * Marketing gallery) shows both full designs via `EmailDesignGallery`
 * instead of the single hero image + features block every other service's
 * concept projects use.
 */
export function ProjectDetail({ project, service }: { project: ProjectItem; service: ServicePageContent }) {
  const hasDesigns = Boolean(project.designs && project.designs.length > 0);

  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <Link
            href={`/services/${service.slug}#projects`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 outline-none transition-colors duration-150 hover:text-orange focus-visible:text-orange"
          >
            <IconChevronLeft className="h-4 w-4" />
            Back to {service.hero.eyebrow}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {project.classification ?? "Concept Project"}
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50">{project.industry}</span>
          </div>
          <h1 className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.1] text-white">{project.title}</h1>
          {(project.intro || project.description) && (
            <p className="mt-4 max-w-xl leading-relaxed text-white/65">{project.intro ?? project.description}</p>
          )}

          {project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-orange/25 bg-orange/[0.06] px-4 py-2 text-sm font-medium text-orange">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        {hasDesigns ? (
          <EmailDesignGallery designs={project.designs!} />
        ) : (
          <>
            <Reveal delay={0.08}>
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-navy">
                {project.image ? (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1024px) 768px, 92vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
                    <span className="text-sm font-semibold uppercase tracking-wide text-white/35">Image coming soon</span>
                  </div>
                )}
              </div>
            </Reveal>

            {project.features.length > 0 && (
              <Reveal delay={0.12}>
                <div className="mt-10">
                  <h2 className="text-lg font-semibold text-white">What this concept covers</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3 leading-relaxed text-white/70">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </>
        )}

        {project.videoSrc && (
          <Reveal delay={0.16}>
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-white">Walkthrough</h2>
              <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-navy">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={project.videoPoster?.src}
                  className="h-full w-full object-cover"
                >
                  <source src={project.videoSrc} />
                </video>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-10">
            {project.externalHref && (
              <Button href={project.externalHref} variant="secondary-on-dark">
                Visit the live project
              </Button>
            )}
            <Button href={`/contact?service=${service.slug}`}>
              Request a Call
              <IconArrowRight />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
