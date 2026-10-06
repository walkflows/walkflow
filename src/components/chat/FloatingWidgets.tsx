import { WebsiteChatWidget } from "@/components/chat/WebsiteChatWidget";
import { WhatsAppWidget } from "@/components/chat/WhatsAppWidget";
import { getWhatsAppHref } from "@/lib/whatsapp";

export function FloatingWidgets() {
  const whatsAppHref = getWhatsAppHref();
  return <WebsiteChatWidget whatsApp={whatsAppHref ? <WhatsAppWidget href={whatsAppHref} /> : null} />;
}
