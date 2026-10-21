import { servicePages, type ServiceSlug } from "@/content/services";

const BASE = "https://walkflow.tech";

/**
 * schema.org Service for a service page, built only from what the page already
 * says (its name, search description and address) plus the business name and
 * website that the homepage's Organization data already uses. Deliberately no
 * prices, ratings, reviews, address, phone or service-area claims.
 */
export function serviceSchema(slug: ServiceSlug) {
  const { seo } = servicePages[slug];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: seo.title,
    serviceType: seo.title,
    description: seo.description,
    url: `${BASE}/services/${slug}`,
    provider: { "@type": "Organization", name: "WALKFLOW", url: BASE },
  };
}
