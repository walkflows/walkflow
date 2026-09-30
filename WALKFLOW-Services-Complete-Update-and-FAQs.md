# WALKFLOW — Complete Service Pages Update & Approved FAQs

## Task

Update the four existing WALKFLOW service pages in this project:

1. Web Design
2. Business Automation & CRM
3. Mobile App Development
4. Email Marketing

The main goal is to show relevant work immediately after each hero, then explain the service and guide visitors towards a consultation. Implement the changes in the existing project, preserving WALKFLOW's established visual identity and working functionality.

This is the consolidated replacement brief. Use this file instead of earlier service-page update briefs. Preserve already-completed changes and implement what remains.

Latest requirements (these supersede earlier versions of this brief):

- All call-to-action buttons on these four pages must use the exact visible label "Book a Consultation".
- Add a Platforms & Tools showcase to Web Design and Business Automation & CRM, following the existing Email Marketing and Mobile App Development platform sections in layout, structure and styling.
- Give all four pages one consistent design layout and section order. Use service-specific content and media within that shared structure.
- Replace the Web Design and Business Automation & CRM FAQs with the exact 10 question-and-answer pairs per page supplied below. Do not append them to old FAQs.
- If earlier changes are already implemented, preserve them and complete only the remaining changes and necessary consistency fixes.

Confirmed Web Design reference: https://walkflow-phi.vercel.app/services/web-design

Inspect the repository to locate the other three service routes, their components, content and assets. Preserve existing URLs. Do not create duplicate service pages or guess new routes.

## Basis and scope

This brief follows a review of three supplied Web Design screenshots. The live page could not be independently inspected during that review. The other three service pages were not visually reviewed; inspect their current implementation before adapting these instructions.

The Web Design screenshots show three explanatory sections before the portfolio. They also show overlapping process numbers and an obscured second step. Confirm these issues in the local implementation and resolve them.

Work on these four service pages and the shared components necessary for them. Preserve unrelated homepage, industry, demo, contact and project-detail content. Do not rebuild the site or add CRM, email sending, payments or automation backends as part of this layout update. Do not push or deploy unless separately instructed.

## Required section order across all four pages

| Order | Section | Purpose |
| --- | --- | --- |
| 1 | Hero | Explain the service and its value, with a Book a Consultation button. |
| 2 | Selected Work / Showcase | Immediately display relevant projects, designs, app screens or automation demonstrations. |
| 3 | What We Can Build / Deliver | Explain the available work and deliverables clearly. |
| 4 | Why WALKFLOW | Combine benefits and reassurance into one concise section. |
| 5 | How We Work | Explain four clear steps appropriate to the service. |
| 6 | Platforms & Tools | Use the same platform showcase layout across all four pages, with relevant logos for each service. |
| 7 | FAQs | Answer practical questions about that service. |
| 8 | Final CTA | Invite a consultation using Book a Consultation. |
| 9 | Existing Footer | Retain the footer layout and legitimate working links. |

Do not place a separate benefits section, tools strip, process section or long introduction between the hero and showcase. Do not duplicate the showcase further down the page.

## Shared design and interaction requirements

- Reuse the current colours, typography, containers, buttons, borders and component styles. Preserve WALKFLOW orange (#FF991C), near-black (#0A0A0A) and white. Follow the project's actual font configuration; do not introduce replacement fonts.
- Keep heroes concise. Retain existing service headlines where they work well. Give each hero one H1, a short explanation and one "Book a Consultation" button. Remove the secondary showcase CTA button; the showcase is directly below the hero.
- Use the same hero alignment, content width, heading scale, section heading treatment, card styling, process layout, FAQ layout and final CTA treatment across all four pages. Reuse a shared service-page structure where practical, with appropriate media rendering for websites, workflows, apps and emails.
- Standardise consultation button height, padding, radius, typography, icon spacing and hover/focus treatment. Let width respond naturally on mobile without clipping text.
- Use consistent spacing across all four pages. Keep the showcase introduction short so its first examples are reached quickly. Avoid oversized empty gaps.
- Use a two-column showcase grid on desktop and one column on mobile where suitable. Keep meaningful image details legible and avoid cropping important content.
- Give cards consistent image proportions, internal spacing and visible actions. Use semantic links and clear keyboard focus. Avoid nested links or making an entire interactive video card a link.
- Reuse existing project links, videos, image assets and detail pages. Inspect assets before assigning them. Do not invent projects, testimonials, performance statistics, client relationships or unsupported functionality.
- Preserve the difference between real client work, independent concepts, redesign concepts and simulated demonstrations. Label concepts or simulations accurately using the project's known status. If status is unknown, report it rather than claiming verified client work.
- Keep animations subtle and consistent. Content must remain readable when reduced motion is enabled or animations fail. Do not require scrolling through hidden/pinned content to read basic service information.
- Preserve mobile navigation, footer links, metadata and existing integrations. Anchor targets must remain visible below the sticky header.

## 1. Web Design page

### Hero

Retain the current headline: "Make your website a reason to choose you."

Keep a concise supporting paragraph and a single "Book a Consultation" button leading to the established consultation destination.

### Selected Websites — move directly below the hero

Use this heading: "Explore our website projects."

Suggested supporting line: "Explore websites designed to make each business clear, credible and easy to contact."

Retain all six existing project cards in this exact order:

1. FORMERA
2. QUES Consulting
3. Happy Clinics
4. ROOFORA
5. ZOOM
6. Youghall Beach Co.

Retain the existing mockups and accurate project descriptions. Each card should include the mockup, industry, project name and short description. Make the image and project title link to its existing individual project page using accessible markup. Remove separate "Explore Project" CTA buttons; preserve access through the image/title rather than relabelling a project link as a consultation.

Keep the full six-project grid visible without an automatically moving carousel. Retain existing live-site links on detail pages. Do not replace the project-detail route with an external website link.

### What We Can Build

Move "Everything your website needs to tell the right story" after the showcase. Convert its narrow vertical list into a compact two-column desktop layout and one-column mobile layout, with these existing categories:

- Business Websites
- Website Redesigns
- Landing Pages
- Online Stores
- Forms & Integrations
- Launch Essentials

Use short descriptions and restrained icons or simple visual markers consistent with the current site.

### Why WALKFLOW

Combine the existing "You've worked hard on your business. Your website should show it" and "A website you can feel confident sending people to" sections into one concise section. Retain their useful ideas without repeating them elsewhere:

- Clear messaging and navigation
- Mobile usability
- Practical enquiry and booking paths
- Collaborative review stages
- Useful handover and agreed support

Do not add guaranteed lead, sales or search-ranking claims.

### How We Work

Show four distinct, readable steps:

1. Understand the business — goals, customers, existing website and requirements.
2. Plan the structure and design — page structure, content and visual direction.
3. Build and refine — implementation and feedback at agreed stages.
4. Test and launch — key journeys, responsive checks and agreed handover.

Fix the observed overlap between 02 and 03 and ensure step 02 is visible. Prefer a straightforward responsive timeline or stacked cards if the existing animation causes content collisions.

### FAQs and final CTA

Replace this page's existing FAQs with the exact 10 Web Design FAQs in the approved copy section below. Preserve their wording and order.

Retain the final heading "Ready for a website that reflects your business?" and align its button with the contact rules below.

## 2. Business Automation & CRM page

### Showcase directly below the hero

Suggested heading: "See business automation in action."

Suggested supporting line: "Explore how everyday enquiries and tasks can move through a clearer, connected process."

Move existing automation videos, workflow examples and CRM demonstrations here. Lead with demonstrations visitors can understand without knowing n8n or CRM terminology.

Each example should include:

- A clear workflow name and business problem.
- A video thumbnail with a visible play button, or an existing interactive demonstration.
- A short explanation of the trigger, actions and outcome.
- An accurate status such as working demonstration or simulated preview, where relevant.
- Functional video playback controls, and a linked workflow title when an existing detail page is available. Remove separate promotional "Watch Demo" or "Explore Workflow" CTA buttons.

For example, an existing enquiry workflow can be described as: "Enquiry submitted → contact saved → team notified → booking link sent." This is an illustrative content pattern, not permission to claim the workflow exists. Use only available, supported examples.

Do not make visitors enter personal details simply to watch a demonstration. Keep video viewing on the service page where possible. Use click-to-play, captions where available and no autoplay audio. Do not expose credentials or real customer data in demos.

### What We Can Automate

Organise the existing supported offerings into clear groups, such as enquiry capture, CRM pipelines, follow-up, booking/reminders, internal notifications and tool integrations. Include only services WALKFLOW actually offers; do not add unbuilt voice-agent or AI capabilities as completed work.

### Why WALKFLOW and process

Explain practical benefits using restrained language: clearer lead ownership, fewer repeated tasks, consistent follow-up and visibility into enquiries. Avoid invented hours saved or conversion increases.

Use this process: Map the process → Design the workflow → Build and test → Launch and hand over.

Replace this page's existing FAQs with the exact 10 Business Automation & CRM FAQs in the approved copy section below. Preserve their wording and order.

Suggested final CTA heading: "Ready to simplify the work behind your business?"

## 3. Mobile App Development page

### Showcase directly below the hero

Suggested heading: "Explore our app projects."

Suggested supporting line: "See the screens, interactions and user journeys behind our app work."

Move existing app screenshots, case studies and walkthroughs here. Use the actual project assets and names in the repository. Do not invent new app projects.

Each showcase card should identify the app's purpose, its main user journey and an accurate project status. Link the image/title to its existing detail page and retain video playback controls for available walkthroughs. Remove separate "Explore App Project" or "Watch Walkthrough" CTA buttons.

Keep screen text readable. Avoid stuffing many tiny screens into one card. Distinguish interface concepts and prototypes from functioning or published apps. Do not add App Store or Google Play badges without verified listings.

### What We Can Build

Organise existing services into concise groups based on the actual page content, for example MVPs, customer apps, booking experiences or business tools. Mention accounts, payments, notifications or integrations only when supported by WALKFLOW's offering; do not imply every feature is included in every project.

### Why WALKFLOW and process

Focus on clear user journeys, prioritised features, feedback and practical handover.

Use this process: Define the requirements → Design the experience → Build and test → Release and hand over.

Retain the existing Mobile App Development FAQ content, while aligning its visual layout with the shared FAQ component. No replacement FAQ copy is supplied for this page.

Suggested final CTA heading: "Have an app idea? Let's shape the next step."

## 4. Email Marketing page

### Showcase directly below the hero

Suggested heading: "Explore our email designs and campaigns."

Suggested supporting line: "See how layout, messaging and clear calls to action come together in our email work."

Move existing email designs and campaign examples here. Prioritise readable full email designs, not decorative device mockups. Use a well-composed card preview that opens the complete design in an accessible modal or an existing detail page.

Each card should include the existing brand/project name, campaign type and a brief purpose. Let the preview image/title open the complete design; remove separate "View Email Design" CTA buttons. Where supported, identify examples such as welcome emails, promotional campaigns, product launches or follow-up sequences.

Do not crop the only available view of the email. Full previews must allow scrolling, zoom/readability where appropriate, keyboard operation, an obvious close control and focus return when a modal closes. Label concept designs accurately. Do not fabricate open rates, revenue or campaign results.

### What We Can Deliver

Use existing offerings to explain email design, campaign planning, welcome sequences, follow-up sequences, segmentation or platform setup where applicable. Do not advertise integrations not actually offered.

### Why WALKFLOW and process

Focus on readable layouts, consistent brand presentation, relevant messaging and a clear next action.

Use this process: Understand the audience → Plan and design → Set up and test → Launch and review.

Retain the existing Email Marketing FAQ content, while aligning its visual layout with the shared FAQ component. No replacement FAQ copy is supplied for this page. This page update itself must not send campaigns or subscribe visitors.

Suggested final CTA heading: "Ready for emails that reflect your brand?"

## Platforms & Tools — required on all four pages

Inspect the existing platform sections on Email Marketing and Mobile App Development first. Reuse their established component or design pattern. If they differ, use Email Marketing as the structural baseline, preserve useful existing behaviour, and align the App Development version to the same structure.

Add matching sections to Web Design and Business Automation & CRM. Keep or refactor the existing Email Marketing and App Development sections so all four share:

- The same position: after How We Work and before FAQs.
- The same eyebrow, heading hierarchy, alignment and content width.
- The same logo container dimensions, spacing, borders, background and logo-label treatment.
- The same row/grid structure, responsive behaviour and animation pattern as the reference section.
- Comparable visual logo sizes while preserving each logo's aspect ratio.

Use the heading "Platforms & Tools" consistently, with a short service-specific introduction. Do not create a different platform-section design for each page. Do not turn an existing static grid into a marquee unless that is already the reference pattern. If it is a marquee, retain keyboard-accessible pause behaviour and provide a static reduced-motion layout.

Populate each section only with platforms supported by the current project content, supplied assets and actual service offering:

- Web Design: relevant website-building, ecommerce, development or hosting platforms.
- Business Automation & CRM: relevant automation, CRM and integration platforms.
- Mobile App Development: retain verified app-development tools already presented.
- Email Marketing: retain verified email-marketing platforms already presented.

Do not copy unrelated platform names from another service just to fill the layout. Use accurate existing logo assets. If an asset is missing, use a clean text label in the matching container and report the missing logo. Do not fabricate logos or imply official partnerships or certifications.

## Consultation buttons, functional controls and footer

Use the exact visible label "Book a Consultation" for every promotional CTA button on these four pages, including hero, inline and final CTA buttons. Remove competing labels such as "Request a Call," "Discuss Your Project" and "Get Started." Avoid placing two identical consultation buttons beside each other.

Point consultation buttons to the existing verified consultation destination: use the working booking calendar if already configured, otherwise use the existing contact form as the consultation-request destination. Use one consistent destination mechanism across the four pages. Do not claim a booking is confirmed when only an enquiry has been submitted.

Project images and titles may remain links to projects, and media previews must remain usable. Do not rename functional controls such as play/pause, close, menu toggles, FAQ expanders or form submission controls to "Book a Consultation." These controls perform actions, rather than acting as promotional CTAs. Consultation buttons must never open an unrelated project or merely scroll to the showcase.

If the existing contact form supports service selection, preselect the relevant service using the project's established mechanism. Keep manual selection available. Do not redesign or reconnect the contact backend.

The reviewed footer displayed a sample phone number and Springfield address. Check the current project for verified replacements. Use genuine details already supplied in the project, or omit confirmed placeholders until real details are available. Never invent contact details. Retain the existing email only if it is the intended business address; report uncertainty.

If the footer component is shared, keep any correction limited to the contact data so the rest of the site retains its layout. Report the shared scope in the completion summary.

## Approved FAQ copy and implementation

Replace the old FAQ arrays on Web Design and Business Automation & CRM; each must contain exactly 10 entries. Use the copy below verbatim, in order, without shortening, paraphrasing or adding promises. The numbering identifies order; visible numbering is optional if the current accordion does not use it.

Use the same accessible accordion component on all four service pages, matching heading style, width, borders, row spacing and expand/collapse icons. All 10 questions on the two updated pages must be available without a “load more” control. Keep answers within the normal page flow when expanded, with no overlap, clipped text or fixed-height truncation. Support keyboard activation, visible focus and correct expanded state. Functional FAQ controls retain their question labels; they are not consultation CTA buttons.

Preserve existing FAQ copy on Email Marketing and Mobile App Development. If FAQ structured data already exists on either updated page, update it to match the visible approved copy exactly; do not leave stale or duplicate entries.

### Business Automation & CRM FAQs

**1. What parts of my business can you automate?**

Common starting points include capturing enquiries, assigning leads, sending reminders, following up with prospects and creating internal tasks. We’ll help identify repetitive work where automation could make a practical difference.

**2. Can you work with the tools we already use?**

We’ll check their integration options first. If a connection requires a paid plan, custom development or a different approach, we’ll explain that before work begins.

**3. Do we need a CRM before getting started?**

No. We can help you choose and set up a CRM, improve an existing one or assess whether a simpler setup is enough for your current needs.

**4. Do we need to automate everything?**

No. Starting with one useful workflow is often the most manageable approach. Decisions that need personal judgement or approval can stay with your team.

**5. How much does automation and CRM setup cost?**

The cost depends on the workflows, tools and level of customisation involved. We’ll outline the setup fee and any expected software subscriptions or usage charges before you commit.

**6. How long does it take to set up?**

Timing depends on the number of connections, the condition of your existing data and the testing required. We’ll agree on a timeline after reviewing your process and account access requirements.

**7. Can you move our existing contacts into a new CRM?**

We can assess your current data and plan an import where the platforms support it. We’ll agree on which records to transfer and how to handle duplicates, missing information and backups before making changes.

**8. How will you protect our business and customer information?**

We’ll review the data each workflow needs, who should have access and how connected tools handle it. Any sensitive information or industry-specific requirements should be discussed before choosing the setup.

**9. What happens if an automation fails?**

We’ll plan how failures should be flagged and handled, using alerts, retries or manual fallback steps where appropriate. Your support agreement will define who monitors the workflows and handles fixes.

**10. Will our team be able to use and manage the system?**

We’ll agree on the guidance and handover your team needs, including everyday tasks and when to ask for help. Ongoing support and workflow improvements can also be included in the project scope.

### Web Design FAQs

**1. Can you improve my existing website, or do I need a new one?**

We can help with either. We’ll review your current website, identify what’s holding it back and recommend focused improvements or a rebuild based on your goals.

**2. How much will my website cost?**

Pricing depends on the number of pages, design requirements and features you need. Book a consultation so we can understand your project and provide a clear quote.

**3. How long will it take to build my website?**

The timeline depends on the project’s size, features and how quickly content and feedback are available. We’ll agree on a schedule before work begins and explain what we need from you.

**4. Will my website work properly on mobile phones?**

Yes. We design for mobile, tablet and desktop, with layouts, navigation and forms that are easy to use across screen sizes.

**5. Can I supply my own images and copy?**

Yes. You can provide your logo, brand assets, images and written content. If you need help preparing them, we’ll discuss the available options and include any additional work in your quote.

**6. Will my website be set up for SEO?**

We include foundational SEO setup appropriate to your platform, such as page titles, descriptions and heading structure. Ongoing SEO and content work can be discussed separately; search rankings aren’t guaranteed.

**7. Can you connect booking systems, payments, forms or my CRM?**

Yes, where your chosen platform and tools support the connection. We’ll check compatibility and explain any subscription costs or custom development requirements before proceeding.

**8. Can I update the website myself after launch?**

That depends on how the website is built. If you want to edit text, images or listings yourself, tell us early so we can plan a suitable content management setup and explain how to use it.

**9. Will I own my website, and are hosting and a domain included?**

We’ll explain ownership, account access and handover arrangements in your proposal. Domain names, hosting and third-party subscriptions will be clearly listed, including any ongoing costs and asset licensing restrictions.

**10. What happens after launch if I need help or changes?**

We’ll agree on post-launch support before the project starts. Your proposal will explain what’s covered, while ongoing maintenance, new pages and additional features can be arranged separately.

## Implementation approach

1. Read repository instructions and inspect the working tree. Preserve unrelated work.
2. Locate all four routes, their current section order, components, project data and media.
3. Move existing showcases directly after the heroes before adding or rewriting sections.
4. Apply the page-specific consolidation and layout fixes in this brief, retaining already-completed work.
5. Reuse the existing Email Marketing/App Development platform-section pattern across all four pages, adding it to Web Design and Business Automation & CRM. Standardise the shared page layout and consultation buttons while allowing appropriate media rendering.
6. Preserve route paths, project-detail destinations and truthful content. Use existing assets rather than unnecessary new dependencies.
7. Complete the available changes even if a nonessential asset is missing. Report missing media or uncertain claims precisely; do not substitute unrelated images or fake working buttons.

## Acceptance checks

- Web Design has exactly the 10 approved Web Design FAQs, in the supplied order and with unchanged answers.
- Business Automation & CRM has exactly the 10 approved automation FAQs, in the supplied order and with unchanged answers.
- Previous FAQ entries are replaced, not duplicated; Email Marketing and Mobile App Development retain their existing FAQ copy.
- Expanded FAQ answers are fully readable on mobile and desktop; any existing FAQ structured data matches visible copy.
- All four service pages follow the required section order.
- The showcase is the first content section after every hero.
- Web Design retains its six projects in the specified order with correct links.
- No duplicate benefit or showcase sections remain.
- All four process steps are visible with no overlapping numbers or hidden text.
- Every promotional CTA button on the four service pages reads exactly "Book a Consultation" and reaches the correct consultation destination.
- All four pages include one Platforms & Tools section after the process and before FAQs; its layout matches the established Email Marketing/App Development pattern.
- All four pages share consistent section order, container widths, spacing, typography, cards, process, FAQ and final CTA treatment.
- Project image/title links and media controls remain functional, without misleading consultation labels.
- Project links, previews, videos, FAQ controls and contact CTAs work as labelled.
- Mobile, tablet and desktop layouts have readable text, consistent spacing and no horizontal overflow. Check representative widths around 390px, 768px and 1440px.
- Keyboard users can access links, accordions and media controls; modal focus and reduced-motion behaviour work.
- Heavy media below the fold loads sensibly; image dimensions prevent layout shifts. Do not delay essential hero content or the first visible showcase image unnecessarily.
- No new console errors, broken image paths or build/type errors are introduced. Run the project's relevant existing checks and report any pre-existing failures separately.

## Completion report

When finished, list the four routes updated, their final section order, meaningful fixes, checks completed and unresolved asset or content questions. Confirm the local preview address. Do not claim deployment or backend functionality that was not performed and verified.
