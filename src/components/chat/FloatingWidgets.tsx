import { WebsiteChatWidget } from "@/components/chat/WebsiteChatWidget";
import { WhatsAppWidget } from "@/components/chat/WhatsAppWidget";
import { getWhatsAppHref } from "@/lib/whatsapp";

/**
 * The two floating controls are independent, fixed widgets on opposite
 * corners (WhatsApp bottom-left, Ask WALKFLOW bottom-right) — not nested, so
 * neither one's stacked height affects the other's layout or max-height.
 */
export function FloatingWidgets() {
  const whatsAppHref = getWhatsAppHref();
  return (
    <>
      {whatsAppHref && <WhatsAppWidget href={whatsAppHref} />}
      <WebsiteChatWidget />
    </>
  );
}
