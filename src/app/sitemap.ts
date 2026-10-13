import type { MetadataRoute } from "next";
import { servicePages } from "@/content/services";
import { privacyOpenItems } from "@/content/privacy";
import { webDesignProjects } from "@/content/web-design-projects";

const BASE = "https://walkflow.tech";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/industries",
  "/industries/real-estate",
  "/industries/home-services",
  "/industries/clinics",
  "/industries/consulting",
  "/demos/real-estate",
  "/demos/home-services",
  "/demos/clinics",
  "/demos/consulting",
  "/services/business-automation-crm",
  "/services/email-marketing",
  "/services/web-design",
  "/services/mobile-app-development",
];

/**
 * Only service project pages WITHOUT a `devNote` ("PLACEHOLDER — REPLACE
 * BEFORE PUBLISHING" in content/services.ts) are listed — those still need
 * real assets before it makes sense to ask Google to index them (the same
 * pages are also marked noindex, see the project page's generateMetadata).
 * Web design has its own route and its own content file; every case study
 * there is a finished page, so all are listed.
 */
function projectRoutes(): string[] {
  const generic = Object.values(servicePages)
    .filter((service) => service.slug !== "web-design")
    .flatMap((service) => service.projects.items.filter((item) => !item.devNote).map((item) => `/services/${service.slug}/projects/${item.slug}`));
  const webDesign = webDesignProjects.map((project) => `/services/web-design/projects/${project.slug}`);
  return [...generic, ...webDesign];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...projectRoutes()];
  // /privacy is included only once its draft review banner is cleared —
  // the page sets its own noindex until then (src/app/privacy/page.tsx), so
  // this keeps the sitemap consistent with that rather than contradicting it.
  if (privacyOpenItems.length === 0) routes.push("/privacy");

  // No lastModified on purpose: a build-time timestamp on every URL is not a real
  // "last changed" date and search engines learn to ignore it.
  return routes.map((path) => ({ url: `${BASE}${path}` }));
}
