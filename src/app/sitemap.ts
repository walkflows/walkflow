import type { MetadataRoute } from "next";
import { servicePages } from "@/content/services";
import { privacyOpenItems } from "@/content/privacy";

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
 * real assets before it makes sense to ask Google to index them.
 */
function projectRoutes(): string[] {
  return Object.values(servicePages).flatMap((service) =>
    service.projects.items.filter((item) => !item.devNote).map((item) => `/services/${service.slug}/projects/${item.slug}`),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...projectRoutes()];
  // /privacy is included only once its draft review banner is cleared —
  // the page sets its own noindex until then (src/app/privacy/page.tsx), so
  // this keeps the sitemap consistent with that rather than contradicting it.
  if (privacyOpenItems.length === 0) routes.push("/privacy");

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
