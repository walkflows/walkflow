export type Tool = {
  id: string;
  name: string;
  src: string;
  /**
   * Which of the two Platforms and Tools marquee rows this logo belongs to.
   * "automation" = automation, CRM and email marketing tools (row scrolls
   * right to left). "design" = web design and app development tools (row
   * scrolls left to right).
   */
  category: "automation" | "design";
};

/**
 * Platforms and tools WALKFLOW builds with and can connect to. These are
 * not clients, partners or endorsements — see the section copy in
 * `home.ts` (`platformsAndTools`). Add entries here to extend either row.
 */
export const tools: Tool[] = [
  { id: "chatgpt", name: "ChatGPT", src: "/tools/chatgpt.png", category: "automation" },
  { id: "claude", name: "Claude", src: "/tools/claude.png", category: "automation" },
  { id: "gohighlevel", name: "GoHighLevel", src: "/tools/gohighlevel.png", category: "automation" },
  { id: "make", name: "Make", src: "/tools/make.png", category: "automation" },
  { id: "n8n", name: "n8n", src: "/tools/n8n.png", category: "automation" },
  { id: "activecampaign", name: "ActiveCampaign", src: "/tools/activecampaign.png", category: "automation" },
  { id: "brevo", name: "Brevo", src: "/tools/brevo.png", category: "automation" },
  { id: "mailchimp", name: "Mailchimp", src: "/tools/mailchimp.png", category: "automation" },
  { id: "klaviyo", name: "Klaviyo", src: "/tools/klaviyo.png", category: "automation" },

  { id: "framer", name: "Framer", src: "/tools/framer.png", category: "design" },
  { id: "shopify", name: "Shopify", src: "/tools/shopify.png", category: "design" },
  { id: "squarespace", name: "Squarespace", src: "/tools/squarespace.png", category: "design" },
  { id: "wix", name: "Wix", src: "/tools/wix.png", category: "design" },
  { id: "webflow", name: "Webflow", src: "/tools/webflow.png", category: "design" },
  { id: "wordpress", name: "WordPress", src: "/tools/wordpress.png", category: "design" },
  { id: "bubble", name: "Bubble", src: "/tools/bubble.png", category: "design" },
  { id: "expo", name: "Expo", src: "/tools/expo.png", category: "design" },
  { id: "flutter", name: "Flutter", src: "/tools/flutter.png", category: "design" },
  { id: "flutterflow", name: "FlutterFlow", src: "/tools/flutterflow.png", category: "design" },
  { id: "supabase", name: "Supabase", src: "/tools/supabase.png", category: "design" },
];
