import { ButtonEl } from "@/components/ui/Button";
import type { InvoiceRecord } from "./session";

export function CompletionPanel({
  invoice,
  processing,
  onSimulatePayment,
}: {
  invoice: InvoiceRecord;
  processing: boolean;
  onSimulatePayment: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 6 — Completion, Payment and Follow-up</p>
      <h3 className="mt-2 text-xl text-white">The job is complete</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        A completion summary, invoice preview and feedback request have been prepared — see &ldquo;What happened automatically&rdquo; below. A maintenance
        follow-up has also been queued.
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-white/50">Invoice preview</p>
        <p className="mt-2 text-2xl font-heading font-medium text-white">
          ${invoice.amount.toLocaleString("en-US")} <span className="text-sm font-sans text-white/50">{invoice.currency} (fictional)</span>
        </p>
        <span
          className={
            "mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide " +
            (invoice.status === "paid" ? "bg-orange/15 text-orange" : "bg-white/[0.06] text-white/60")
          }
        >
          {invoice.status === "paid" ? "Marked as paid (simulated)" : "Unpaid"}
        </span>

        {invoice.status === "unpaid" && (
          <div className="mt-5">
            <ButtonEl onClick={onSimulatePayment} disabled={processing}>
              {processing ? "Recording payment…" : "Simulate Payment Received"}
            </ButtonEl>
          </div>
        )}
      </div>
    </div>
  );
}
