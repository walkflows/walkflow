import type { ServiceSlug } from "@/content/services";
import { serviceSchema } from "@/lib/seo/service-schema";

/** Renders a service page's structured data. Invisible; "<" is escaped so the JSON can never close the script tag. */
export function ServiceJsonLd({ slug }: { slug: ServiceSlug }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(slug)).replace(/</g, "\\u003c") }}
    />
  );
}
