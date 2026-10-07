const WHATSAPP_LINK = /^https:\/\/(wa\.me\/\d{8,15}|api\.whatsapp\.com\/send\?phone=\d{8,15})$/;

/**
 * Returns the link in NEXT_PUBLIC_WHATSAPP_URL when it is a WhatsApp link
 * with a digits-only phone number (https://wa.me/<country code and number>),
 * otherwise null. WhatsAppWidget is not rendered on null, so placeholder
 * text never reaches a page.
 */
export function getWhatsAppHref(): string | null {
  const value = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() ?? "";
  return WHATSAPP_LINK.test(value) ? value : null;
}
