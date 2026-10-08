import type { MetadataRoute } from "next";

/**
 * Allows indexing of all published public routes once walkflow.tech is
 * live. Nothing here needs to change when the domain connects — Next
 * resolves the sitemap URL from `metadataBase` (src/app/layout.tsx).
 * The draft /privacy page stays out of search on its own (it sets its own
 * noindex while privacyOpenItems is non-empty — see src/app/privacy/page.tsx).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://walkflow.tech/sitemap.xml",
  };
}
