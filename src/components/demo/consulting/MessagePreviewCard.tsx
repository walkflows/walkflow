import { IconMail } from "@/components/ui/icons";
import type { MessagePreview } from "./session";

export function MessagePreviewCard({ message }: { message: MessagePreview }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-orange">
        <IconMail className="h-3.5 w-3.5" />
        {message.label}
      </div>
      <p className="mt-2 text-sm text-white/50">To: {message.to || "sample recipient"}</p>
      <p className="mt-1 font-semibold text-white">{message.subject}</p>
      <p className="mt-1 text-sm leading-relaxed text-white/60">{message.body}</p>
    </div>
  );
}
