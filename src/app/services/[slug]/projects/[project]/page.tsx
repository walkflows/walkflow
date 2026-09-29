import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages, type ServiceSlug } from "@/content/services";
import { ProjectDetail } from "@/components/sections/services/ProjectDetail";

// Session 27: "web-design" now has its own dedicated route at
// /services/web-design/projects/[project] (a real WebDesignProject template,
// not a generic ProjectItem) — that static segment already wins routing
// precedence over this dynamic [slug] route for that path, and excluding it
// here too keeps generateStaticParams/getContent from also trying to build
// pages for it under this generic template.
const serviceSlugs = (Object.keys(servicePages) as ServiceSlug[]).filter((slug) => slug !== "web-design");

type Params = { slug: string; project: string };

export function generateStaticParams() {
  return serviceSlugs.flatMap((slug) =>
    servicePages[slug].projects.items.map((project) => ({ slug, project: project.slug })),
  );
}

function getContent(slug: string, project: string) {
  if (!serviceSlugs.includes(slug as (typeof serviceSlugs)[number])) return null;
  const service = servicePages[slug as ServiceSlug];
  const projectItem = service.projects.items.find((p) => p.slug === project);
  if (!projectItem) return null;
  return { service, projectItem };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, project } = await params;
  const found = getContent(slug, project);
  if (!found) return {};
  return {
    title: `${found.projectItem.title} — ${found.service.seo.title}`,
    description: found.projectItem.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug, project } = await params;
  const found = getContent(slug, project);
  if (!found) notFound();

  return <ProjectDetail project={found.projectItem} service={found.service} />;
}
