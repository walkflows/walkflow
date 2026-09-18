export type IndustryDemoStep = { title: string; body: string };

export type IndustryDemoContent = {
  slug: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    notice: string;
  };
  problem: { heading: string; points: string[] };
  solution: { heading: string; body: string; components: string[] };
  steps: { heading: string; items: IndustryDemoStep[] };
  visual: { heading: string; body: string };
  results: { heading: string; body: string; outcomes: string[] };
  interactiveDemo: {
    customerTabLabel: string;
    businessTabLabel: string;
    introText: string;
    disclaimer: string;
    slotLabel: string;
    slots: string[];
    issueLabel: string;
    issuePlaceholder: string;
    submitLabel: string;
    confirmationHeading: string;
    businessSteps: IndustryDemoStep[];
    emptyStateBody: string;
  };
  finalCta: { heading: string; cta: { label: string; href: string } };
};

/**
 * Three concept demonstrations built to the same pattern as
 * /demos/real-estate (Session 10) — same section order, styling and
 * interactive-demo mechanism (a customer-facing form + a business-side
 * view of the resulting record), with only copy, labels and sample data
 * changed per industry, per explicit instruction. All "results" figures
 * are outcome descriptions, not invented metrics — no numbers are stated.
 */
export const industryDemos: Record<"home-services" | "clinics" | "consulting", IndustryDemoContent> = {
  "home-services": {
    slug: "home-services",
    seo: {
      title: "Home Services Website Demo & Callout Journey",
      description:
        "Explore a sample home services website and the intended callout-to-job journey. A WALKFLOW concept demonstration, not a live business.",
    },
    hero: {
      eyebrow: "Concept Demonstration",
      heading: "Home Services",
      subheading: "Missed calls and slow follow-up lose jobs to competitors.",
      primaryCta: { label: "Start Sample Journey", href: "#interactive-demo" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
      notice:
        "Sample requests and demonstration content. This is not a live home services business. No real callout or job is arranged through this demo.",
    },
    problem: {
      heading: "The business problem",
      points: [
        "Missed calls and slow follow-up lose jobs to competitors.",
        "Scheduling is manual and chaotic, with details spread across calls, texts and paper notes.",
        "There's no system to capture leads after hours, when many callouts actually come in.",
      ],
    },
    solution: {
      heading: "What WALKFLOW builds",
      body: "A website with instant lead capture, automated follow-up and a booking system that works around the clock — so a callout request never just sits in a voicemail.",
      components: ["Instant lead capture", "Automated SMS/email follow-up", "24/7 appointment booking"],
    },
    steps: {
      heading: "The intended journey",
      items: [
        { title: "Visitor submits a request", body: "A short form or call captures the job details, no back-and-forth needed." },
        { title: "Automated system responds instantly", body: "The visitor gets an immediate acknowledgement, even outside business hours." },
        { title: "Appointment auto-scheduled", body: "A callout slot is booked against the team's availability." },
        { title: "Reminders sent automatically", body: "Both the customer and the team get a reminder ahead of the job." },
        { title: "Job completed, follow-up triggered", body: "A review or referral request goes out once the work is done." },
      ],
    },
    visual: {
      heading: "What the live site could look like",
      body: "Screenshots of the actual booking flow and service pages go here once supplied — shown as a placeholder for now.",
    },
    results: {
      heading: "What this solves",
      body: "Faster response times, more booked appointments and less time spent on manual scheduling.",
      outcomes: ["Faster response to new enquiries", "More jobs booked without back-and-forth", "Less admin time spent scheduling"],
    },
    interactiveDemo: {
      customerTabLabel: "Request a Callout",
      businessTabLabel: "Business View",
      introText:
        "Browse available service slots, describe your issue as a customer would, request a callout, then switch to Business View to see how the same request would appear to the business.",
      disclaimer:
        "This demonstration is a website prototype. Automated responses, scheduling and reminders are planned capabilities unless explicitly marked as tested live integrations. For a client build, the service area, calendar availability and communication process are configured and tested for that business.",
      slotLabel: "Preferred callout time",
      slots: ["Today 16:00", "Tomorrow 09:00", "Tomorrow 13:30", "Thursday 10:00"],
      issueLabel: "Describe your issue",
      issuePlaceholder: "e.g. No hot water since this morning",
      submitLabel: "Request Callout",
      confirmationHeading: "Want a version of this for your business?",
      businessSteps: [
        { title: "Incoming request received", body: "The job details land in one place, not spread across calls and texts." },
        { title: "Automated response sent", body: "The customer is acknowledged immediately, day or night." },
        { title: "Job scheduled on the calendar", body: "The callout is slotted against real team availability." },
        { title: "Reminder triggered", body: "A reminder goes out ahead of the visit automatically." },
      ],
      emptyStateBody: "No demo requests yet. Use “Request a Callout” to see how a record appears here.",
    },
    finalCta: {
      heading: "What would this journey look like for your business?",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },

  clinics: {
    slug: "clinics",
    seo: {
      title: "Clinic Website Demo & Booking Journey",
      description:
        "Explore a sample clinic website and the intended booking-to-visit journey. A WALKFLOW concept demonstration, not a live practice.",
    },
    hero: {
      eyebrow: "Concept Demonstration",
      heading: "Clinics",
      subheading: "Patients struggle to book, and no-shows cost the practice time and revenue.",
      primaryCta: { label: "Start Sample Journey", href: "#interactive-demo" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
      notice:
        "Sample bookings and demonstration content. This is not a live clinic or medical practice. No real appointment is arranged through this demo.",
    },
    problem: {
      heading: "The business problem",
      points: [
        "Patients struggle to book appointments outside a phone call during office hours.",
        "No-shows are costly, and easy to reduce with a simple reminder sequence.",
        "Front-desk staff are overwhelmed with repetitive scheduling calls that a system could handle.",
      ],
    },
    solution: {
      heading: "What WALKFLOW builds",
      body: "A website with online booking, automated appointment reminders and patient follow-up sequences — reducing no-shows and admin load on reception.",
      components: ["Online booking", "Automated appointment reminders", "Patient follow-up sequences"],
    },
    steps: {
      heading: "The intended journey",
      items: [
        { title: "Patient books online", body: "Available slots are visible without a phone call." },
        { title: "Automated confirmation sent", body: "The patient receives an immediate booking confirmation." },
        { title: "Reminder sequence before appointment", body: "Timed reminders reduce avoidable no-shows." },
        { title: "Post-visit follow-up", body: "A follow-up or review request goes out after the visit." },
        { title: "Re-engagement for recurring care", body: "Patients due a check-up are prompted to rebook." },
      ],
    },
    visual: {
      heading: "What the live site could look like",
      body: "Screenshots of the actual booking flow and clinic pages go here once supplied — shown as a placeholder for now.",
    },
    results: {
      heading: "What this solves",
      body: "Fewer no-shows, a lighter front-desk workload and patients who stay engaged between visits.",
      outcomes: ["Fewer missed appointments", "Less reception time on the phone", "Patients who return for recurring care"],
    },
    interactiveDemo: {
      customerTabLabel: "Book an Appointment",
      businessTabLabel: "Clinic View",
      introText:
        "Browse available appointment slots, share your visit reason as a patient would, book an appointment, then switch to Clinic View to see how the same booking would appear to staff.",
      disclaimer:
        "This demonstration is a website prototype. Appointment confirmations, reminders and follow-ups are planned capabilities unless explicitly marked as tested live integrations. For a client build, the appointment types, provider availability and communication process are configured and tested for that practice.",
      slotLabel: "Preferred appointment time",
      slots: ["Tomorrow 09:30", "Tomorrow 11:00", "Wednesday 14:00", "Friday 10:30"],
      issueLabel: "Reason for visit",
      issuePlaceholder: "e.g. Annual check-up",
      submitLabel: "Book Appointment",
      confirmationHeading: "Want a version of this for your practice?",
      businessSteps: [
        { title: "Incoming booking received", body: "The appointment appears in one place, with the reason for visit attached." },
        { title: "Automated confirmation sent", body: "The patient gets an immediate confirmation." },
        { title: "Reminder sequence scheduled", body: "Reminders are queued ahead of the appointment." },
        { title: "Post-visit follow-up queued", body: "A follow-up message is queued to send after the visit." },
      ],
      emptyStateBody: "No demo bookings yet. Use “Book an Appointment” to see how a record appears here.",
    },
    finalCta: {
      heading: "What would this journey look like for your practice?",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },

  consulting: {
    slug: "consulting",
    seo: {
      title: "Consulting Firm Website Demo & Enquiry Journey",
      description:
        "Explore a sample consulting website and the intended enquiry-to-call journey. A WALKFLOW concept demonstration, not a live firm.",
    },
    hero: {
      eyebrow: "Concept Demonstration",
      heading: "Consulting Firms",
      subheading: "High-value leads go cold while manual follow-up slows deals down.",
      primaryCta: { label: "Start Sample Journey", href: "#interactive-demo" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
      notice:
        "Sample enquiries and demonstration content. This is not a live consulting firm. No real proposal or engagement is arranged through this demo.",
    },
    problem: {
      heading: "The business problem",
      points: [
        "High-value leads go cold due to slow response times.",
        "Manual proposal and follow-up processes lose deals that a timely nudge could have saved.",
        "There's no system for nurturing the long sales cycles consulting engagements often need.",
      ],
    },
    solution: {
      heading: "What WALKFLOW builds",
      body: "A website with lead qualification forms, automated nurture sequences and a booking system for discovery calls — keeping prospects engaged until they're ready to convert.",
      components: ["Lead qualification forms", "Automated nurture sequences", "Discovery call booking"],
    },
    steps: {
      heading: "The intended journey",
      items: [
        { title: "Prospect fills a qualification form", body: "Project needs and budget signals are captured upfront." },
        { title: "Automated scoring and routing", body: "Enquiries are routed to the right person based on fit." },
        { title: "Discovery call auto-scheduled", body: "A call slot is booked without an email back-and-forth." },
        { title: "Nurture sequence during decision period", body: "Useful, timed messages keep the firm top of mind." },
        { title: "Proposal follow-up automated", body: "Follow-up continues until the prospect responds." },
      ],
    },
    visual: {
      heading: "What the live site could look like",
      body: "Screenshots of the actual enquiry flow and firm pages go here once supplied — shown as a placeholder for now.",
    },
    results: {
      heading: "What this solves",
      body: "Faster response to high-value leads, fewer deals lost to slow follow-up, and consistent nurture through long sales cycles.",
      outcomes: ["Faster response to new enquiries", "Fewer deals lost to slow follow-up", "Consistent nurture through long sales cycles"],
    },
    interactiveDemo: {
      customerTabLabel: "Request a Discovery Call",
      businessTabLabel: "Firm View",
      introText:
        "Browse service offerings, share your project needs as a prospective client would, request a discovery call, then switch to Firm View to see how the same request would appear to the consulting team.",
      disclaimer:
        "This demonstration is a website prototype. Lead scoring, scheduling and nurture sequences are planned capabilities unless explicitly marked as tested live integrations. For a client build, the qualification criteria, team availability and communication process are configured and tested for that firm.",
      slotLabel: "Preferred call time",
      slots: ["Tomorrow 10:00", "Tomorrow 15:00", "Thursday 11:30", "Friday 09:00"],
      issueLabel: "Tell us about your project",
      issuePlaceholder: "e.g. We need help streamlining our onboarding process",
      submitLabel: "Request Discovery Call",
      confirmationHeading: "Want a version of this for your firm?",
      businessSteps: [
        { title: "Incoming inquiry received", body: "The project details and contact are captured in one place." },
        { title: "Automated qualification and scoring", body: "The enquiry is scored and routed based on fit." },
        { title: "Discovery call scheduled", body: "A call slot is booked against real availability." },
        { title: "Nurture sequence triggered", body: "Follow-up messages are queued for the decision period." },
      ],
      emptyStateBody: "No demo enquiries yet. Use “Request a Discovery Call” to see how a record appears here.",
    },
    finalCta: {
      heading: "What would this journey look like for your firm?",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },
};
