import Image from "next/image";
import Link from "next/link";
import type { ProjectItem, ServicePageContent } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight, IconChevronLeft } from "@/components/ui/icons";

/**
 * Detail page for a Business Automation & CRM showcase project. Fixed content order:
 * title + introduction, project images, The Problem, The Solution, video (only when a real
 * `videoSrc` exists), then the consultation button. Everything shares one left content edge.
 *
 * The card thumbnail (`project.image`) is used on the showcase card only; this page shows the
 * project's own `automation.gallery` images instead. Each keeps its real proportions (width/height
 * come from the file) and opens full size in a new tab, because screenshots are small at grid width.
 * The video is never rendered without a source, never autoplays and does not preload.
 */
export function AutomationDetail({
  project,
  service,
}: {
  project: ProjectItem;
  service: ServicePageContent;
}) {
  const { automation } = project;
  if (!automation) return null;
  const gallery = automation.gallery ?? [];

  return (
    <section className="bg-navy-deep py-16 sm:py-24">
      <Container className="max-w-4xl">
        <Reveal eager>
          <Link
            href={`/services/${service.slug}#projects`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white/60 outline-none transition-colors duration-150 hover:text-orange focus-visible:text-orange"
          >
            <IconChevronLeft className="h-4 w-4" />
            Back to {service.hero.eyebrow}
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {project.classification ?? "Demo Project"}
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-white/50">{project.industry}</span>
          </div>
          <h1 className="mt-4 text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-white">{project.title}</h1>
          {project.intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{project.intro}</p>}
        </Reveal>

        {gallery.length > 0 && (
          <Reveal eager delay={0.08}>
            <ul className="mt-10 grid items-start gap-x-6 gap-y-8 sm:grid-cols-2">
              {gallery.map((img, i) => (
                <li key={img.src}>
                  <figure>
                    <a
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-xl border border-white/10 bg-navy outline-none transition-colors duration-150 hover:border-orange/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1280px) 540px, (min-width: 640px) 46vw, 92vw"
                        priority={i < 2}
                        className="h-auto w-full"
                      />
                      <span className="sr-only"> (opens the full-size image in a new tab)</span>
                    </a>
                    <figcaption className="mt-2.5 text-sm leading-relaxed text-white/60">{img.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <div className="mt-14 max-w-3xl sm:mt-20">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] leading-tight text-white">The Problem</h2>
            <p className="mt-4 leading-relaxed text-white/70">{automation.problem}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-12 text-[clamp(1.5rem,3vw,2rem)] leading-tight text-white sm:mt-16">The Solution</h2>
            <p className="mt-4 leading-relaxed text-white/70">{automation.solution}</p>
            <ol className="mt-6 flex flex-col gap-4">
              {automation.steps.map((step, i) => (
                <li key={step} className="flex gap-4 leading-relaxed text-white/75">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-orange/15 text-sm font-bold text-orange"
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {project.videoSrc && (
          <Reveal delay={0.05}>
            <div id="walkthrough" className="mt-12 scroll-mt-24 sm:mt-16">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] leading-tight text-white">
                {automation.videoHeading ?? "Watch the walkthrough"}
              </h2>
              <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-navy">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={project.videoPoster?.src}
                  aria-label={`${project.title} walkthrough video`}
                  className="h-full w-full object-contain"
                >
                  <source src={project.videoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <div className="mt-14 border-t border-white/10 pt-12 sm:mt-20 sm:pt-16">
            <h2 className="max-w-xl text-balance text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight text-white">
              Want something like this for your business?
            </h2>
            <Button href={`/contact?service=${service.slug}`} className="mt-7 uppercase tracking-[0.08em]">
              Book a Consultation
              <IconArrowRight />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
