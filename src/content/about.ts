/**
 * About page copy, sourced from `about us/walkflow-about-us.md` (approved
 * content pack) with no invented facts, metrics or claims added. Exceptions,
 * all flagged in SESSION-NOTES.md as needing sign-off rather than treated as
 * approved verbatim copy:
 *  - `aboutHero.tags` are short factual descriptors derived from the
 *    approved bio (mechanical engineering, content writing, web design,
 *    automation). One entry, "Certified Web Designer", was dictated verbatim
 *    by Joshua — flagged because CLAUDE.md's copy rules call out inventing
 *    certifications specifically, and nothing in the approved bio names an
 *    actual certification. Left as instructed (an explicit, specific
 *    instruction from Joshua), not silently softened — confirm there's a
 *    real credential behind this before publishing, or reword it.
 *  - `aboutValues.items` pairs two lists Joshua sent together in the same
 *    message (8 short words + 8 conversational lines) by position — he
 *    didn't specify the pairing, so this is a judgment call, not verified
 *    1:1 intent. Worth a quick sanity check against his intended pairing.
 *  - `aboutTeam.members` — real names, roles and photos supplied by Joshua
 *    in the `Team members/` folder (`team information.txt` plus one photo
 *    per person), copied into `public/team/`. Role/body copy is used
 *    verbatim from that file; nothing invented.
 */

export const aboutSeo = {
  title: "About WALKFLOW",
  description:
    "WALKFLOW builds websites, writes the words that go on them, and wires up the automation behind them — so business owners can focus on the actual business.",
};

export const aboutIntro = {
  eyebrow: "Who We Are",
  heading: "Welcome to WALKFLOW",
  paragraphs: [
    "We're not a marketing agency pretending to know tech, and we're not a dev shop that forgot marketing exists. We're WALKFLOW — a team that builds websites, writes the words that go on them, and wires up the automation that runs quietly behind them so business owners can focus on the actual business.",
    "Our name says what we do. WALK is the steps — the process, the learning, the groundwork. FLOW is what happens once the systems are in place and things just... move.",
  ],
  highlight: "Take the steps. Build the flow.",
  highlightNote: "That's the whole philosophy in five words.",
};

export const aboutAccordion = [
  {
    index: "01",
    title: "Our History",
    body: "WALKFLOW didn't start as a company. It started as one person figuring things out. It began in 2017, in a mechanical engineering lecture hall — not a computer science one. But every time a cross-course class put me next to computer science students, I noticed how much more they understood about the digital world, and how much I didn't. That gap stuck with me. By 2019, a year before COVID hit, I'd started learning content writing and ghostwriting — helping people put their ideas into words, eventually writing books on NFTs. When the world shut down in 2020, I used the time everyone else spent waiting out the pandemic to learn no-code web design: WordPress, Wix, Squarespace, Shopify — different tools, same underlying logic. I ran that alongside the writing work. Graduation came in 2023, and so did the next shift — not planned, just necessary. A web design client asked if I could add automation to what I'd built for them. I didn't know how yet. So I learned it, because that's what the work needed. By 2025, what started as one person stacking skills had become a team — content writing, web design, AI automation, and app development, all under one roof. WALKFLOW is that team, formalized, with one job: make it easier for customers to choose you. We handle the steps. We build the flow.",
  },
  {
    index: "02",
    title: "Our Mission",
    body: "To make it easier for people to say yes to your business. Every website, every automation, every workflow we build exists to remove friction between a customer noticing you and a customer choosing you. We're not here to sell you tools you don't need — we're here to build the path.",
  },
  {
    index: "03",
    title: "Our Vision",
    body: "To be the team businesses call before they even know they need automation — the ones who show up, learn what the client actually needs (the way we've always had to), and build a system that keeps working long after the project ends.",
  },
];

export const aboutHero = {
  eyebrow: "About Founder",
  heading: "Meet the Founder",
  intro:
    "Joshua Ayomide didn't set out to run an automation agency. He studied mechanical engineering, taught himself content writing, picked up web design during lockdown, and learned automation because a client needed it. WALKFLOW is what happens when you keep saying yes to the next skill the work demands — until one day you've built a team instead of just a career.",
  name: "Joshua Ayomide",
  tags: ["Mech Engineering Grad", "Content Writer", "Certified Web Designer", "AI Automation Consultant"],
  cta: { label: "Request a Call", href: "/contact" },
  photo: {
    src: "/about/founder-business.png",
    alt: "Joshua Ayomide, founder of WALKFLOW",
  },
};

export const aboutTeam = {
  eyebrow: "The Team",
  heading: "Meet the Team",
  body: "The people behind the steps and the flow.",
  members: [
    {
      name: "Boluwatife A.",
      role: "AI Automation Specialist",
      body: "Builds and optimizes the automation systems that keep your business running efficiently, from lead capture to follow-up.",
      photo: { src: "/team/boluwatife.jpg", alt: "Boluwatife A., AI Automation Specialist at WALKFLOW" },
    },
    {
      name: "Bukola M.",
      role: "Web Designer & UI/UX Expert",
      body: "Designs clean, user-friendly websites and interfaces that turn visitors into customers.",
      photo: { src: "/team/bukola.png", alt: "Bukola M., Web Designer & UI/UX Expert at WALKFLOW" },
    },
    {
      name: "Samuel B.",
      role: "App Developer",
      body: "Builds custom apps tailored to your business needs, from concept to launch.",
      photo: { src: "/team/samuel.png", alt: "Samuel B., App Developer at WALKFLOW" },
    },
  ],
};

export const aboutValues = {
  eyebrow: "What We Stand For",
  heading: "Our Values",
  backgroundWord: "VALUES",
  items: [
    { title: "Automation", description: "We'll figure it out with you." },
    { title: "Innovation", description: "No jargon, just answers." },
    { title: "Reliability", description: "Easy to say yes to." },
    { title: "Trust", description: "We walk you through it." },
    { title: "Efficiency", description: "Systems that keep working after we're gone." },
    { title: "Partnership", description: "One team handling everything." },
    { title: "Scalability", description: "We tell you the truth upfront." },
    { title: "Results", description: "Built to launch, not to sit on a shelf." },
  ],
};

/**
 * Reuses `platformsAndTools.stats`/`statsCaption` from the homepage
 * (src/content/home.ts) rather than duplicating the numbers here — same
 * UNVERIFIED PLACEHOLDER figures flagged there (7 Years / 200+ Projects /
 * 100+ Clients / 150+ Reviews), not new claims. Positioned after "What We
 * Stand For" (Values) per explicit instruction.
 */
export const aboutExperience = {
  heading: "Experience & Results",
  backgroundWord: "EXPERIENCE",
};

export const aboutCta = {
  heading: "Have a project in mind?",
  body: "Tell us what you're working on and we'll reply by email to arrange a call.",
  cta: { label: "Request a Call", href: "/contact" },
};
