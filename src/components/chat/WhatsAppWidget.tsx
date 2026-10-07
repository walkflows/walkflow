import { IconWhatsappBrand } from "@/components/ui/icons";

/**
 * Floating WhatsApp launcher, fixed to the bottom-LEFT corner — the opposite
 * side from the Ask WALKFLOW chat (bottom-right), so the two never stack in
 * the same column or compete for the same space. Same offsets as the chat's
 * own container (1rem / 1.5rem from sm) so both sit at a matching height.
 */
export function WhatsAppWidget({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WALKFLOW on WhatsApp (opens in a new tab)"
      className="fixed bottom-4 left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[var(--shadow-card)] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:bottom-6 sm:left-6"
    >
      <IconWhatsappBrand className="h-7 w-7" />
    </a>
  );
}
