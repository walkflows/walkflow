import Image from "next/image";
import Link from "next/link";
import { webDesignClosingCta, webDesignProjects, type WebDesignProject } from "@/content/web-design-projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight, IconArrowUpRight, IconChevronLeft } from "@/components/ui/icons";
import { WebDesignProjectCard } from "./WebDesignProjectCard";
import { WebDesignShowcase } from "./WebDesignShowcase";

/**
 * Shared template for every `/services/web-design/projects/<slug>` page
 * (Session 27) — one data-driven component, six real projects. Structure
 * follows the brief's reference rhythm: intro + big homepage screenshot,
 * split overview/metadata, an image showcase with a "what this means"
 * block breaking it up, then business relevance, related projects and a
 * back link. No invented delivery dates, technologies, budgets or client
 * testimonials anywhere here — only what each project's own supplied copy
 * states.
 */
export function WebDesignProjectDetail({ project }: { project: WebDesignProject }) {
  const order = webDesignProjects;
  const currentIndex = order.findIndex((p) => p.slug === project.slug);
  const related = [order[(currentIndex + 1) % order.length], order[(currentIndex + 2) % order.length]];

  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <Link
            href="/services/web-design#projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 outline-none transition-colors duration-150 hover:text-orange focus-visible:text-orange"
          >
            <IconChevronLeft className="h-4 w-4" />
            Web Design
          </Link>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-orange">{project.category}</p>
          <h1 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.1] text-white">{project.title}</h1>
          <p className="mt-4 max-w-xl leading-relaxed text-white/65">{project.opening}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit Website
              <IconArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
            <Button href="/contact?service=web-design" variant="secondary-on-dark">
              Discuss Your Website
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 w-full overflow-hidden rounded-[2rem] border border-white/10 bg-navy">
            <Image
              src={project.heroScreenshot.src}
              alt={project.heroScreenshot.alt}
              width={project.heroScreenshot.width}
              height={project.heroScreenshot.height}
              sizes="(min-width: 1024px) 768px, 92vw"
              priority
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-lg font-semibold text-white">Overview</h2>
              <p className="mt-3 leading-relaxed text-white/65">{project.overview}</p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-white/50">Project</h2>
              <p className="mt-2 leading-relaxed text-white/70">{project.title}</p>
              <h2 className="mt-5 text-xs font-bold uppercase tracking-wide text-white/50">Design Focus</h2>
              <p className="mt-2 leading-relaxed text-white/70">{project.designFocus}</p>
            </div>
          </div>
        </Reveal>

        <WebDesignShowcase
          large={project.showcaseLarge}
          pair={project.showcasePair}
          extra={project.showcaseExtra}
          mobile={project.showcaseMobile}
          betweenSlot={
            <Reveal>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <h2 className="text-lg font-semibold text-white">What this means for your visitors</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {project.whatThisMeans.map((item) => (
                    <div key={item.title}>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-white/60">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          }
        />

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-white">{webDesignClosingCta.heading}</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-white/65">{project.forBusiness}</p>
            <p className="mt-2 max-w-xl leading-relaxed text-white/65">{webDesignClosingCta.body}</p>
            <div className="mt-6">
              <Button href={webDesignClosingCta.cta.href}>
                {webDesignClosingCta.cta.label}
                <IconArrowRight />
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-lg font-semibold text-white">More Projects</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <WebDesignProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <Link
              href="/services/web-design#projects"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 outline-none transition-colors duration-150 hover:text-orange focus-visible:text-orange"
            >
              <IconChevronLeft className="h-4 w-4" />
              Back to Web Design
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
