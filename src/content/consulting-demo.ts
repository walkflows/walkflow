export const consultingDemoSeo = {
  title: "Consulting Firm Website Demo & Engagement Journey",
  description:
    "Explore a sample consulting website and the intended enquiry-to-engagement journey. A WALKFLOW concept demonstration, not a live firm.",
};

export const consultingDemoHero = {
  eyebrow: "Concept Demonstration",
  heading: "Turn a business enquiry into a clearly managed engagement.",
  body: "Explore how a consulting enquiry can move through qualification, scheduling, proposals and follow-up — with a clear next step for the client and the firm.",
  cta: { label: "Book a Consultation", href: "/contact" },
  notice: "Fictional clients, consultants and engagements. No real session, proposal or payment is arranged through this demo.",
};

export const consultingDemoProblem = {
  heading: "The business problem",
  body: "High-value enquiries can go cold while manual scheduling and proposal work competes with client delivery. Standard sessions and larger projects need different handling, and without a system, follow-up either stops too soon or never stops at all. A connected process gives each enquiry an owner, the right path, and a clear next action.",
};

export const consultingDemoJourney = {
  heading: "The intended journey",
  steps: [
    { title: "Share enquiry details", body: "A short form captures the service or project, preferred time and fictional contact details — no back-and-forth needed." },
    { title: "Assign a consultant", body: "The enquiry is routed to a suitable consultant using documented service rules." },
    { title: "Schedule or scope the work", body: "A standard session is scheduled directly; a larger project moves to a proposal instead." },
    { title: "Confirm the engagement", body: "A session is confirmed after sample payment; a proposal is accepted, declined or revised." },
    { title: "Deliver the session or project", body: "Attendance and a written summary are recorded for sessions; a kickoff is scheduled for projects." },
    { title: "Run a limited follow-up", body: "A short, finite follow-up sequence runs until the client responds, cancels or opts out — never indefinitely." },
  ],
};

export const consultingDemoExplainer = {
  heading: "What is being demonstrated",
  body: "This demo shows how a consulting firm can qualify enquiries, schedule standard sessions or scope larger projects, and run a bounded follow-up sequence. Preview Mode uses fictional records and message previews. The same interface is being prepared for a later n8n connection.",
};

export const consultingDemoFinalCta = {
  heading: "What would this journey look like for your firm?",
  cta: { label: "Book a Consultation", href: "/contact" },
};

export const previewModeBanner = {
  pill: "Preview Mode",
  notice:
    "This demo runs entirely in your browser. No emails, payments or calendar bookings are created, and nothing is sent to n8n or Supabase yet. All names, consultants and session times are fictional.",
};

export const journeyStageLabels = ["Request", "Assignment", "Scope & Schedule", "Confirm", "Delivery", "Follow-up"] as const;

export const automationPanelHeading = "What happened automatically";

export const conversionPrompt = {
  heading: "Want this working for your firm?",
  cta: { label: "Book a Consultation", href: "/contact?service=business-automation-crm" },
};

export const firmViewToggleLabels = {
  open: "See the firm's view",
  close: "Hide the firm's view",
};

export const previewNextTouchLabel = "Preview Next Touch";

export const demoStrings = {
  restartDemo: "Restart Demo",
  sampleMessageLabel: "Example message — not sent",
  sampleReminderLabel: "Example reminder — not sent",
};
