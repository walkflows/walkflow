export const clinicsDemoSeo = {
  title: "Clinics Website Demo & Appointment Journey",
  description:
    "Explore a sample clinic website and the intended appointment-request-to-follow-up journey. A WALKFLOW concept demonstration, not a live practice.",
};

export const clinicsDemoHero = {
  eyebrow: "Concept Demonstration",
  heading: "Make every appointment easier to manage.",
  body: "Explore how an appointment request can move through staff confirmation, reminders, rescheduling and follow-up — with a clear next step for the patient and the clinic.",
  cta: { label: "Book a Consultation", href: "/contact" },
  notice: "Fictional patients, staff and appointments. No real care, appointment or payment is arranged through this demo.",
};

export const clinicsDemoProblem = {
  heading: "The business problem",
  body: "Appointment requests, changes and reminders can take up much of the reception team's day. When details are scattered across calls and messages, patients may be unsure whether their appointment is confirmed, and cancelled slots can go unfilled. A connected process gives each request an owner and a clear next action.",
};

export const clinicsDemoJourney = {
  heading: "The intended journey",
  steps: [
    { title: "Share appointment needs", body: "A short form captures the service, preferred time and fictional contact details — no back-and-forth needed." },
    { title: "Assign staff and review the request", body: "A reception owner and suitable provider are assigned using documented service-category rules." },
    { title: "Confirm a suitable appointment", body: "A future slot is requested, then confirmed by reception before it's treated as booked." },
    { title: "Prepare reminders and manage changes", body: "Confirmation and reminder previews are prepared, and the patient can reschedule, cancel or ask a question." },
    { title: "Record attendance and offer cancelled slots", body: "Staff record what happened on the day, and a released slot can be offered to a waiting-list patient." },
    { title: "Organise the next follow-up", body: "A neutral feedback preview and any staff-specified follow-up are prepared after attendance." },
  ],
};

export const clinicsDemoExplainer = {
  heading: "What is being demonstrated",
  body: "This demo shows how a clinic can organise appointment requests, staff confirmations, reminders, cancellations and follow-up. Preview Mode uses fictional records and message previews. The same interface is being prepared for a later n8n connection.",
};

export const clinicsDemoFinalCta = {
  heading: "What would this journey look like for your clinic?",
  cta: { label: "Book a Consultation", href: "/contact" },
};

export const previewModeBanner = {
  pill: "Preview Mode",
  notice:
    "This demo runs entirely in your browser. No emails, texts, calendar bookings or payments are created, and nothing is sent to n8n or Supabase yet. All names, staff and appointment times are fictional.",
};

export const journeyStageLabels = ["Request", "Assignment", "Confirm", "Reminders", "Attendance", "Follow-up"] as const;

export const automationPanelHeading = "What happened automatically";

export const conversionPrompt = {
  heading: "Want this working for your clinic?",
  cta: { label: "Book a Consultation", href: "/contact?service=business-automation-crm" },
};

export const clinicViewToggleLabels = {
  open: "See the clinic's view",
  close: "Hide the clinic's view",
};

export const previewReminderLabel = "Preview Reminder";

export const demoStrings = {
  restartDemo: "Restart Demo",
  sampleMessageLabel: "Example message — not sent",
  sampleReminderLabel: "Example reminder — not sent",
};
