import Image from "next/image";
import type { ProjectCard } from "@/content/services";
import { Button } from "@/components/ui/Button";

/**
 * Reusable project card for the Selected Projects section. Every project
 * fed into this component right now is temporary concept data (see the
 * PLACEHOLDER note on `ProjectCard` in content/services.ts) — the visible
 * "Concept Project" badge is what keeps a visitor from mistaking this for
 * real client work, reusing the same honesty convention as the homepage's
 * `demoShowcase` ("Concept demonstration"). `projectHref`/`videoHref` are
 * `null` until real links exist, so "View Project" renders disabled rather
 * than as a dead or fake link — swap in a real href here later and it
 * becomes a working button with no other code changes needed.
 */
export function ServiceProjectCard({ project }: { project: ProjectCard }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-orange/30 hover:bg-white/[0.05]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-[420ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/35">Image coming soon</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-navy-deep/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-orange backdrop-blur">
          Concept Project
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-orange">{project.industry}</p>
        <h3 className="mt-2 text-lg text-white">{project.title}</h3>
        <p className="mt-2.5 leading-relaxed text-white/60">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          {project.projectHref ? (
            <Button href={project.projectHref} size="sm" variant="secondary-on-dark">
              View Project
            </Button>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/35"
            >
              View Project
              <span className="text-xs font-normal normal-case text-white/25">(coming soon)</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
