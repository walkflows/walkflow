/**
 * Privacy Policy copy (/privacy). Approved by Joshua 8 Oct 2026 and linked
 * from the footer. Every statement is grounded in what the website code and
 * the WALKFLOW n8n workflows actually do (checked 8 Oct 2026, including the
 * automation repo's own docs — no automatic data-deletion job exists there,
 * which is why "How long we keep information" below doesn't claim one).
 * `privacyOpenItems` stays exported (and empty) so the page's own
 * draft-banner/noindex logic keeps working if a future change needs it again.
 *
 * Text format: paragraphs are plain strings. Lists are `{ list: string[] }`.
 */
export type PrivacyBlock = string | { list: string[] };
export type PrivacySection = { id: string; heading: string; blocks: PrivacyBlock[] };

export const privacySeo = {
  title: "Privacy Policy",
  description:
    "How WALKFLOW handles the information you share through our website and how our automations use Google Gmail, Sheets, Drive and Calendar data.",
};

export const privacyIntro = {
  eyebrow: "Privacy",
  heading: "Privacy Policy",
  lastUpdated: "8 October 2026",
  summary:
    "This policy explains what information WALKFLOW collects through this website and our enquiry process, how our own automation tools use it, including Google Gmail, Sheets, Drive and Calendar, and the choices you have.",
};

/** Business details still needed before publication. Shown as a review banner while non-empty. */
export const privacyOpenItems: string[] = [];

export const privacyContactEmail = "hello@walkflow.tech";

export const privacySections: PrivacySection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      "WALKFLOW provides web design and practical automation for businesses, based in Ikeja, Lagos, Nigeria. WALKFLOW is run by Joshua (Ayomide Joshua).",
      `For any privacy question or request, email ${privacyContactEmail}.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    blocks: [
      "Enquiry form. When you send an enquiry, we receive what you enter: your name, email address, business name, role, website (if given), the service and industry you are interested in, your preferred start time, your message, how you prefer to be contacted, and a WhatsApp number if you choose WhatsApp. A random reference is created so a repeated submission is not saved twice.",
      "Discovery call bookings. If you book a call through our Google Calendar booking page, Google shares the booking details with WALKFLOW’s calendar: your name, email address, the appointment time and any notes you add.",
      "Emails you send us. When you email WALKFLOW, the message arrives in our Gmail inbox like any email.",
      "Ask WALKFLOW assistant. Questions you type are answered on our own website server using WALKFLOW’s published website content. They are not sent to any outside AI service and are not stored after your visit. The conversation exists only in your browser tab.",
      "WhatsApp and booking links. These take you to WhatsApp or Google. Their own privacy policies apply there.",
      "Website hosting. Our website is hosted by Vercel, which keeps standard technical logs (such as IP address, time and page requested) to run and protect the service. We do not use analytics, advertising or tracking cookies on this website.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    blocks: [
      {
        list: [
          "To reply to your enquiry and arrange a conversation about your project.",
          "To send you an email confirming we received your enquiry, and a small number of follow-up emails about your enquiry or a proposal we sent you. Follow-ups stop when you reply, when the enquiry is closed, or when you ask us to stop.",
          "To keep a private record of enquiries and bookings so nothing is missed.",
          "To notify WALKFLOW internally (by email or Telegram) that something needs attention.",
        ],
      },
      "We do not sell your information, use it for advertising, or use your enquiry for marketing unless you separately agree to that.",
    ],
  },
  {
    id: "google-data",
    heading: "How our automations use Google data",
    blocks: [
      "WALKFLOW uses its own automation server (n8n, run privately by WALKFLOW) connected to WALKFLOW’s own Google account. Website visitors do not sign in with Google on this website, and we do not access anyone else’s Google account. The connection is used only as follows:",
      {
        list: [
          "Gmail: to send emails from WALKFLOW’s Gmail account (enquiry confirmations, follow-ups and internal alerts), and to check new messages arriving in WALKFLOW’s inbox. For each new message the automation looks only at the sender’s address and the subject, to recognise when someone who made an enquiry has replied, so follow-up emails stop. It does not copy or store the content of emails.",
          "Google Sheets: to save and update enquiries, bookings, scheduled emails and problem reports in WALKFLOW’s own private business spreadsheet.",
          "Google Drive: only the limited file access that comes with the Google Sheets connection, used to open WALKFLOW’s own spreadsheet. We do not browse, read or change other files in Google Drive.",
          "Google Calendar: read-only, to see discovery-call bookings in WALKFLOW’s own calendar and record them in the spreadsheet. The automation never creates, changes or deletes calendar events.",
        ],
      },
      "Information received from Google is used only to provide these features for WALKFLOW. It is not sold, not used for advertising, not used to train AI models, and not shared with anyone except as described in this policy or required by law. People at WALKFLOW only look at it when needed to handle an enquiry, a booking or a problem.",
      "WALKFLOW’s use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
    ],
  },
  {
    id: "business-research",
    heading: "Business contact research",
    blocks: [
      "To find businesses that may benefit from our services, WALKFLOW researches publicly available business information, such as business name, website, phone number, general business email and the name and role of an owner or manager where a business lists them publicly. We use the research services Outscraper and Hunter for this and keep the results in a private database. Any contact is made personally by WALKFLOW, never by automated messages. If you would like your business details removed, email us and we will delete them.",
    ],
  },
  {
    id: "sharing",
    heading: "Who we share information with",
    blocks: [
      "We use these service providers to run our website and tools. Each handles information only to provide its service to us:",
      {
        list: [
          "Vercel: hosts this website.",
          "Hostinger: hosts WALKFLOW’s private automation server.",
          "Google: Gmail, Google Sheets, Google Drive and Google Calendar, as described above.",
          "Supabase: private databases for business research and our demo tools.",
          "Telegram: private notifications to WALKFLOW about new activity or problems.",
          "Outscraper and Hunter: business contact research, as described above.",
        ],
      },
      "We may also disclose information if the law requires it.",
    ],
  },
  {
    id: "security",
    heading: "How we protect information",
    blocks: [
      "Our automation server is reachable only through encrypted connections. Its administration area is not publicly accessible, server access requires security keys rather than passwords, and the connections to Google and other services are stored encrypted on the server. Website forms are checked on the server, and secret keys are never sent to your browser. No system is perfectly secure, but we take care to limit who and what can access your information.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep information",
    blocks: [
      "Enquiries, bookings and business research records are kept in WALKFLOW's private systems until we delete them. There is currently no automatic deletion after a fixed period — records are removed when you ask us to (see \"Your choices and rights\" below) or when WALKFLOW otherwise decides they are no longer needed. If we introduce automatic deletion after a set time in future, we will describe it here accurately rather than in advance of it existing.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your choices and rights",
    blocks: [
      `You can ask us what information we hold about you, ask us to correct or delete it, or ask us to stop sending follow-up emails, by emailing ${privacyContactEmail}. Depending on where you live, you may have further rights under local law, including the right to complain to your data protection authority.`,
      "WALKFLOW can disconnect its own Google account from its automation server at any time in its Google account settings.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      "If we change how we use information, we will update this page and the date at the top.",
    ],
  },
];
