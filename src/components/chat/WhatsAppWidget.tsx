import { IconWhatsappBrand } from "@/components/ui/icons";

export function WhatsAppWidget({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WALKFLOW on WhatsApp (opens in a new tab)"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[var(--shadow-card)] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
    >
      <IconWhatsappBrand className="h-7 w-7" />
    </a>
  );
}
