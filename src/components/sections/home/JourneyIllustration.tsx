import type { JourneyStageId } from "@/content/home";
import { WebsiteIllustration } from "@/components/ui/illustrations";

const rowBase = "flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3.5 py-2.5";

function CaptureMock() {
  return (
    <div className="p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Clinic enquiry form (sample)</p>
      <div className="mt-4 flex flex-col gap-3">
        {[
          { label: "Reason for visit", value: "Annual check-up" },
          { label: "Preferred day", value: "Any weekday morning" },
          { label: "Contact number", value: "07•• ••• •••" },
        ].map((field) => (
          <div key={field.label} className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
            <p className="text-xs text-white/40">{field.label}</p>
            <p className="mt-1 text-sm font-medium text-white/85">{field.value}</p>
          </div>
        ))}
        <div className="mt-1 rounded-full bg-orange px-4 py-2.5 text-center text-sm font-semibold text-navy">
          Send Enquiry
        </div>
      </div>
    </div>
  );
}

function FollowUpMock() {
  return (
    <div className="p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Consulting follow-up (sample)</p>
      <div className="mt-4 flex flex-col gap-2.5">
        <div className={rowBase}>
          <div>
            <p className="text-sm font-semibold text-white">Discovery call</p>
            <p className="text-xs text-white/45">Completed Tuesday</p>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70">Done</span>
        </div>
        <div className={rowBase}>
          <div>
            <p className="text-sm font-semibold text-white">Proposal follow-up</p>
            <p className="text-xs text-white/45">Queued for tomorrow, 9:00</p>
          </div>
          <span className="rounded-full bg-orange/20 px-2.5 py-1 text-xs font-semibold text-orange-light">Scheduled</span>
        </div>
        <div className={rowBase}>
          <div>
            <p className="text-sm font-semibold text-white">Second reminder</p>
            <p className="text-xs text-white/45">Stops automatically if they reply</p>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70">Pending</span>
        </div>
      </div>
    </div>
  );
}

function ServeMock() {
  return (
    <div className="p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Real estate record (sample)</p>
      <div className="mt-4 flex flex-col gap-2.5">
        <div className={rowBase}>
          <div>
            <p className="text-sm font-semibold text-white">Jordan Ellis</p>
            <p className="text-xs text-white/45">Ashcombe Garden House</p>
          </div>
          <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-white">Viewing Requested</span>
        </div>
        <div className={rowBase}>
          <div>
            <p className="text-sm font-semibold text-white">Follow-up prepared</p>
            <p className="text-xs text-white/45">Example email — not sent</p>
          </div>
          <span className="rounded-full bg-orange/20 px-2.5 py-1 text-xs font-semibold text-orange-light">Ready</span>
        </div>
      </div>
    </div>
  );
}

export function JourneyIllustration({ stageId }: { stageId: JourneyStageId }) {
  if (stageId === "attract") return <WebsiteIllustration className="block h-auto w-full" />;
  if (stageId === "capture") return <CaptureMock />;
  if (stageId === "follow-up") return <FollowUpMock />;
  return <ServeMock />;
}
