import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages, type ServiceSlug } from "@/content/services";
import { ProjectDetail } from "@/components/sections/services/ProjectDetail";

const serviceSlugs = Object.keys(servicePages) as ServiceSlug[];

type Params = { slug: string; project: string };

export function generateStaticParams() {
  return serviceSlugs.flatMap((slug) =>
    servicePages[slug].projects.items.map((project) => ({ slug, project: project.slug })),
  );
}

function getContent(slug: string, project: string) {
  if (!serviceSlugs.includes(slug as ServiceSlug)) return null;
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
