import Image from "next/image";
import Link from "next/link";
import type { ProjectItem, ServiceSlug } from "@/content/services";
import { cx } from "@/lib/utils";

/**
 * Reusable project tile for the Projects gallery. Every project fed into
 * this component right now is temporary or independent-concept data (see
 * the PLACEHOLDER note on `ProjectItem` in content/services.ts) — the
 * visible badge (`project.classification`, defaulting to "Concept
 * Project") is what keeps a visitor from mistaking this for commissioned
 * client work, reusing the same honesty convention as the homepage's
 * `demoShowcase` ("Concept demonstration").
 *
 * The whole tile is a single `<Link>` to a real, working project-detail
 * route (`/services/<service>/projects/<project>`) — never a dead link or
 * an invented external URL. "VIEW PROJECT" is layered over the image:
 * hidden by default and revealed on hover/focus on devices that actually
 * support hovering (`[@media(hover:hover)]`), but left permanently visible
 * on touch devices (where that media feature is absent) per explicit
 * instruction, so touch users are never required to hover to discover it.
 *
 * `tileAspect` (Session 24, extended Session 26) lets a page ask for
 * near-square tiles (Email Marketing) or wide 16:9 tiles matching the
 * App Development showcase images' real proportions, instead of the
 * default 4:3 — every other page omits it and renders exactly as before.
 * `showSummary` (default true) hides the industry/description/tags block
 * beneath the image when a page wants a shorter card; when false, it now
 * also shows `headline` (Session 26) — a one-line tagline — under the
 * title when the project supplies one, so App Development's cards aren't
 * just a bare title like Email Marketing's.
 */
export function ServiceProjectCard({
  project,
  serviceSlug,
  tileAspect = "4/3",
  showSummary = true,
}: {
  project: ProjectItem;
  serviceSlug: ServiceSlug;
  tileAspect?: "4/3" | "square" | "16/9";
  showSummary?: boolean;
}) {
  return (
    <Link
      href={`/services/${serviceSlug}/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] outline-none transition-all duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-orange/30 hover:bg-white/[0.05] focus-visible:-translate-y-1.5 focus-visible:border-orange/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
    >
      <div
        className={cx(
          "relative w-full overflow-hidden bg-navy",
          tileAspect === "square" ? "aspect-square" : tileAspect === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]",
        )}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/35">Image coming soon</span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-navy-deep/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-orange backdrop-blur">
          {project.classification ?? "Concept Project"}
        </span>

        {/* Dark overlay + label: always visible on touch devices (no `hover` media feature), hover/focus-revealed on devices that support hovering. */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-navy-deep/55 opacity-100 transition-opacity duration-300 ease-out [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
        >
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">View Project</span>
        </div>
      </div>

      {showSummary ? (
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-orange">{project.industry}</p>
          <h3 className="mt-2 text-lg text-white">{project.title}</h3>
          {project.description && <p className="mt-2.5 leading-relaxed text-white/60">{project.description}</p>}

          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 text-center">
          <h3 className="text-base font-semibold text-white">{project.title}</h3>
          {project.headline && <p className="mt-1.5 leading-relaxed text-white/60">{project.headline}</p>}
        </div>
      )}
    </Link>
  );
}
