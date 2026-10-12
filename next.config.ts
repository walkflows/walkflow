import type { NextConfig } from "next";

/**
 * Security headers (SECURITY-REVIEW F-04). The site loads everything from its
 * own origin (self-hosted fonts, local images/video, no third-party scripts,
 * embeds or analytics), so the policy can be tight. Two deliberate looseness:
 *  - script-src needs 'unsafe-inline' because Next.js emits inline bootstrap
 *    scripts; a nonce-based policy would force every page to render
 *    dynamically. Revisit if that trade-off changes.
 *  - style-src needs 'unsafe-inline' for inline style attributes (Motion, Next).
 * Development also needs 'unsafe-eval' (React dev tooling); production does not.
 * If a third-party script, embed, image host or analytics SDK is added later,
 * its origin must be added here or the browser will block it.
 */
const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: http://localhost:* http://127.0.0.1:*" : ""}`,
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
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
