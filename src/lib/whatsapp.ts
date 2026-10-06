const ALLOWED_PREFIXES = ["https://wa.me/", "https://api.whatsapp.com/"];

/**
 * Returns the WhatsApp chat link set in NEXT_PUBLIC_WHATSAPP_URL, or null
 * when it is unset or is not a WhatsApp link. The WhatsApp button renders
 * nothing when this returns null, so no placeholder number ever reaches a page.
 */
export function getWhatsAppHref(): string | null {
  const value = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() ?? "";
  return ALLOWED_PREFIXES.some((prefix) => value.startsWith(prefix)) ? value : null;
}
