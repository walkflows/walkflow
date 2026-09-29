import Image from "next/image";
import Link from "next/link";
import type { WebDesignProject } from "@/content/web-design-projects";
import { IconArrowUpRight } from "@/components/ui/icons";

/**
 * Gallery card for the Web Design portfolio (Session 27). Unlike
 * `ServiceProjectCard` (used by the other three services), the mockup is
 * shown in full via `object-contain` rather than cropped with
 * `object-cover` — every supplied mockup is already a 4:3 image, so this
 * never letterboxes in practice, but `contain` is used anyway per the
 * brief's explicit instruction not to risk cutting off mockup devices/text.
 * The whole card is one link (no nested links) to the WALKFLOW detail page
 * — never straight to the live site — and "Explore Project" is a plain
 * always-visible label under the copy, not a hover-reveal overlay, since
 * the brief wants all six projects easy to discover without hovering.
 */
export function WebDesignProjectCard({ project }: { project: WebDesignProject }) {
  return (
    <Link
      href={`/services/web-design/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] outline-none transition-all duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-orange/30 hover:bg-white/[0.05] focus-visible:-translate-y-1.5 focus-visible:border-orange/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.03]">
        <Image
          src={project.mockup.src}
          alt={project.mockup.alt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 92vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-orange">{project.category}</p>
        <h3 className="mt-2 text-lg text-white">{project.title}</h3>
        <p className="mt-2.5 leading-relaxed text-white/60">{project.cardDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-orange">
          Explore Project
          <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
