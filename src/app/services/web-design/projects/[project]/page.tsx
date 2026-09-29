import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { webDesignProjects } from "@/content/web-design-projects";
import { WebDesignProjectDetail } from "@/components/sections/services/WebDesignProjectDetail";

type Params = { project: string };

export function generateStaticParams() {
  return webDesignProjects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { project } = await params;
  const found = webDesignProjects.find((p) => p.slug === project);
  if (!found) return {};
  return {
    title: `${found.title} — Web Design`,
    description: found.cardDescription,
  };
}

export default async function WebDesignProjectPage({ params }: { params: Promise<Params> }) {
  const { project } = await params;
  const found = webDesignProjects.find((p) => p.slug === project);
  if (!found) notFound();

  return <WebDesignProjectDetail project={found} />;
}
