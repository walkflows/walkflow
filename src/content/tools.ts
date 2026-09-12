export type Tool = {
  id: string;
  name: string;
  src: string;
};

/**
 * Platforms and tools WALKFLOW builds with and can connect to. These are
 * not clients, partners or endorsements — see the section copy in
 * `home.ts` (`platformsAndTools`). Add entries here to extend the strip.
 */
export const tools: Tool[] = [
  { id: "chatgpt", name: "ChatGPT", src: "/tools/chatgpt.png" },
  { id: "claude", name: "Claude", src: "/tools/claude.png" },
  { id: "framer", name: "Framer", src: "/tools/framer.png" },
  { id: "gohighlevel", name: "GoHighLevel", src: "/tools/gohighlevel.png" },
  { id: "make", name: "Make", src: "/tools/make.png" },
  { id: "n8n", name: "n8n", src: "/tools/n8n.png" },
  { id: "shopify", name: "Shopify", src: "/tools/shopify.png" },
  { id: "squarespace", name: "Squarespace", src: "/tools/squarespace.png" },
  { id: "wix", name: "Wix", src: "/tools/wix.png" },
];
