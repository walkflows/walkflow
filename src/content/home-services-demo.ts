export const homeServicesDemoSeo = {
  title: "Home Services Website Demo & Job Journey",
  description:
    "Explore a sample roofing website and the intended enquiry-to-completion job journey. A WALKFLOW concept demonstration, not a live roofing business.",
};

export const homeServicesDemoHero = {
  eyebrow: "Concept Demonstration",
  heading: "Turn a roofing enquiry into a clearly managed job.",
  body: "Explore how a service request can move through inspection, estimate approval, crew scheduling and follow-up — with a clear next step for the customer and the team.",
  cta: { label: "Book a Consultation", href: "/contact" },
  notice: "Fictional requests, crews and appointments. No real inspection, roofing work or payment is arranged through this demo.",
};

export const homeServicesDemoProblem = {
  heading: "The business problem",
  body: "Roofing enquiries can arrive with missing details while the team is busy on site. Inspection requests, estimates and job updates can become scattered across calls, messages and notes. A connected process gives each request an owner and a clear next action.",
};

export const homeServicesDemoJourney = {
  heading: "The intended journey",
  steps: [
    { title: "Capture the request", body: "A short form captures the service needed, the property and the issue — no back-and-forth needed." },
    { title: "Review and assign", body: "The service area and urgency are checked, then a suitable crew is assigned and an inspection task created." },
    { title: "Arrange an inspection", body: "A future inspection slot is requested, then confirmed by a coordinator before it's treated as booked." },
    { title: "Prepare and approve an estimate", body: "After the inspection, a written estimate is prepared and approved internally before the customer sees it." },
    { title: "Schedule and manage the job", body: "Once the estimate is accepted, a crew and job date are set, with progress tracked through to completion." },
    { title: "Completion, payment and follow-up", body: "A completion summary and invoice preview are generated, with a review request and a maintenance check offered after." },
  ],
};

export const homeServicesDemoExplainer = {
  heading: "What is being demonstrated",
  body: "This demo shows how a roofing request can move from the first enquiry to inspection, estimate approval, crew scheduling and follow-up. Preview Mode uses fictional records and message previews. The same interface is being prepared for a later n8n connection.",
};

export const homeServicesDemoFinalCta = {
  heading: "What would this journey look like for your business?",
  cta: { label: "Book a Consultation", href: "/contact" },
};

export const previewModeBanner = {
  pill: "Preview Mode",
  notice:
    "This demo runs entirely in your browser. No emails, texts, calendar bookings or payments are created, and nothing is sent to n8n or Supabase yet. All names, crews and appointment times are fictional.",
};

export const journeyStageLabels = ["Request", "Review & Assign", "Inspection", "Estimate", "Job", "Completion"] as const;

export const automationPanelHeading = "What happened automatically";

export const conversionPrompt = {
  heading: "Want this working for your business?",
  cta: { label: "Book a Consultation", href: "/contact?service=business-automation-crm" },
};

export const businessViewToggleLabels = {
  open: "See the business view",
  close: "Hide the business view",
};

export const previewNextDayLabel = "Preview the next day";

export const demoStrings = {
  restartDemo: "Restart Demo",
  sampleMessageLabel: "Example email — not sent",
  sampleReminderLabel: "Example reminder — not sent",
};
