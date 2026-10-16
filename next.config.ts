import type { NextConfig } from "next";

/**
 * Security headers (SECURITY-REVIEW F-04). The site loads everything from its
 * own origin (self-hosted fonts, local images/video, no third-party scripts,
 * embeds), so the policy can be tight. The ONE exception is Google Analytics 4 (gtag.js), which
 * only loads after a visitor accepts analytics on walkflow.tech (src/components/analytics):
 * its script and data endpoints are the only extra origins allowed below. Two deliberate looseness:
 *  - script-src needs 'unsafe-inline' because Next.js emits inline bootstrap
 *    scripts; a nonce-based policy would force every page to render
 *    dynamically. Revisit if that trade-off changes.
 *  - style-src needs 'unsafe-inline' for inline style attributes (Motion, Next).
 * Development also needs 'unsafe-eval' (React dev tooling); production does not.
 * If another third-party script, embed, image host or analytics SDK is added later,
 * its origin must be added here or the browser will block it.
 */
const isDev = process.env.NODE_ENV !== "production";

// Google Analytics 4: script host, plus the endpoints it reports to (regional hosts are subdomains).
const GA_SCRIPT = "https://www.googletagmanager.com";
const GA_CONNECT = "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com";
const GA_IMG = "https://*.google-analytics.com https://*.googletagmanager.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${GA_SCRIPT}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${GA_IMG}`,
  "media-src 'self'",
  "font-src 'self'",
  `connect-src 'self' ${GA_CONNECT}${isDev ? " ws: http://localhost:* http://127.0.0.1:*" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Only meaningful over HTTPS; browsers ignore it on http://localhost.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Self-hosted Docker build (deploy/vps/build.sh sets BUILD_STANDALONE=1). Unset on Vercel, so
  // the Vercel build is unchanged.
  ...(process.env.BUILD_STANDALONE === "1" ? { output: "standalone" as const } : {}),
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Images, videos and brand files in /public keep their names between releases, so they cannot be cached "forever" like
      // the fingerprinted /_next/static files. One day (plus a week of background refresh) stops every repeat visit re-checking
      // 160 MB of media, while a replaced file still reaches visitors within a day. Rename a file to publish it instantly.
      {
        source: "/(about|brand|clinics-demo|consulting-demo|demo-visuals|home-services-demo|images|industries|real-estate-demo|team|tools|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      // The Vercel standby/preview copies (*.vercel.app) must never compete with walkflow.tech in search results.
      // Keyed on the request host, so walkflow.tech stays indexable even if DNS is ever pointed back at Vercel.
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
