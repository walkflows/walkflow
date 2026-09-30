# WALKFLOW — Website Update Brief for Claude Code

## Task and scope

Implement the following updates in the existing WALKFLOW project. Inspect the project instructions, routes, shared components, design tokens, assets, form handling and animation setup before editing. Work within the existing website rather than rebuilding it.

Preserve the established layout style, brand identity, typography, imagery and animation effects except where changes are explicitly requested below. Brand orange is **#FF991C**. Use existing project assets and the current logo. Make the finished changes responsive across mobile, tablet and desktop.

This file is the implementation brief. Complete the work, verify the affected flows, and report what changed and any genuine blockers. Do not invent missing URLs or claim an integration works without checking it. Deployment is not part of this brief.

## 1. General changes across the website

### 1.1 Logo and homepage navigation

- Make every WALKFLOW logo used as a navigation element, including header, mobile menu and footer logos, link to the homepage hero at the very top of the page.
- This must work from every route and when already on the homepage but scrolled down.
- Close the mobile menu and release its scroll lock before completing navigation or scrolling.
- Use the existing router correctly. Avoid a fake `#` link or a solution that only works after a full browser refresh.

### 1.2 Favicon

- Replace the old favicon with the new logo currently used by WALKFLOW, using the matching source asset in the project.
- Produce appropriately sized favicon assets from that logo and update the existing metadata/icon references. Keep the logo proportions correct and the mark legible at small sizes.
- Update other existing browser/app icon references if they still display the old logo. Remove conflicting old favicon declarations.
- Do not create a different brand mark. If the matching source asset is unavailable, identify the missing asset in the completion report.

### 1.3 Footer heading colours

Set these footer column headings to **#FF991C**:

- Industries
- Services
- Connect with Us

Preserve the existing footer layout and link hierarchy.

### 1.4 New-page scroll position

Fix the mobile issue where opening a page retains an old scroll position instead of starting at its hero.

- When a visitor clicks an ordinary internal page link, the destination must start at the top of its hero.
- Apply this consistently on desktop and mobile, including header links, footer links, cards and CTAs.
- Clicking the logo must always return to the top of the homepage hero, including when the current route is already `/`.
- Intentional section links are an exception: homepage demo links must scroll to the demo section, not be overridden by a global scroll reset.
- Account for any sticky header so anchor headings remain visible.
- Preserve normal browser Back/Forward restoration where possible. Do not indiscriminately force every navigation event to the top.
- Check for menu scroll-lock styles, layout shifts or animation timing that could cause a second jump after navigation.

### 1.5 Modern mobile menu with expandable submenus

- On opening the mobile menu, show all main navigation items first, in the existing approved order. Keep subpages collapsed initially.
- Add a clear chevron/dropdown icon beside each parent item with subpages.
- Tapping either the parent label or its chevron expands or collapses that submenu. Rotate or otherwise update the icon to reflect its state.
- Use tidy accordion spacing and subtle transitions consistent with WALKFLOW's design.
- If a parent also has a real overview page, expose an explicit overview link inside its submenu so that page remains accessible; the parent row itself toggles the submenu.
- Selecting a subpage closes the menu and opens that page at the top of its hero.
- Preserve all existing main pages and submenu destinations. Allow the menu to scroll on small screens so nothing is cut off.
- Use accessible buttons, `aria-expanded`, visible keyboard focus and comfortable touch targets. Support Escape to close and appropriate focus return to the menu trigger.

### 1.6 Consistent button sizing

- Standardise CTA height, padding, typography, icon spacing and border radius through the existing shared button component or tokens.
- Keep primary and secondary buttons in a pair visually aligned.
- Labels may have different widths; do not force all buttons to an identical width if that harms the layout.
- Keep deliberate exceptions for icon-only controls, compact card controls and other places where the standard size would damage the design.
- Prevent clipping of longer industry-demo labels. On small screens, stack or wrap button groups cleanly.
- Maintain the existing button hover/tap animation style and provide visible focus states.

## 2. Homepage changes

### 2.1 CTA text, destinations and order

- Replace every **Request a Call** button on the homepage with **See How It Works**.
- Link these replacement buttons to the **Demos** section on the homepage. Reuse a stable existing section ID or add one if needed.
- Use smooth anchor scrolling with the correct sticky-header offset; respect reduced-motion preferences.
- Wherever the homepage has two adjacent CTA buttons and one is **Book a Consultation**, put **Book a Consultation first**, followed by the secondary CTA. Maintain that same order when stacked on mobile.
- Keep Book a Consultation connected to the existing consultation/contact destination.

### 2.2 Who We Work With image slider

Make the **Who We Work With** image slider a seamless, continuously moving infinite carousel.

- Keep the existing imagery, labels and overall design.
- The animation must have a constant, smooth speed with no end-of-list stop, blank gap, visible reset or jump.
- Duplicate the visual track as needed for a seamless loop. Hide duplicate content from assistive technology and avoid duplicate keyboard stops.
- Preserve consistent image sizes and responsive behaviour.
- Normal autoplay should continue on hover; remove hover-stop behaviour that interrupts the requested continuous movement.
- Preserve or provide a deliberate play/pause control. Respect reduced-motion preferences with a usable static or manually controlled alternative. These user-controlled accessibility states are the exceptions to continuous autoplay.
- Keep this slider integrated with the Hero area so it does not introduce an extra standalone section into the requested order below.

### 2.3 Required homepage section order

Use this exact top-to-bottom sequence:

| Position | Section |
|---|---|
| 1 | Hero, including the existing Who We Work With slider |
| 2 | Industry Solutions |
| 3 | Demos |
| 4 | Our Services |
| 5 | Why WALKFLOW |
| 6 | How We Work — Our Process |
| 7 | Platforms & Tools |
| 8 | FAQs |
| 9 | Book a Consultation — final CTA section |
| 10 | Footer |

Move and reuse existing sections rather than creating duplicates. Match sections by their purpose if their current component names differ. If there are additional standalone homepage sections, incorporate their relevant existing content into the appropriate sections above so the final visible order matches this brief.

### 2.4 Layout, backgrounds and animations

- Maintain each section's established visual style while changing its position.
- Adjust adjoining backgrounds, gradients, glows, decorative elements and separators so the new sequence flows naturally.
- Retain clear section separation and readable contrast without abrupt, accidental background changes.
- Keep section spacing consistent and appropriate to related content.
- Preserve existing reveal, hover and other animation effects. Update animation triggers if moving a section affects them.
- Ensure the page remains usable with reduced motion and has no horizontal overflow on mobile.

## 3. About Us page changes

### 3.1 Handwritten statement

Display this exact line:

**Take the steps. Build the flow**

Use the site's existing third/accent handwritten font with an italic appearance. The request for “Italian format” means **italic styling**, not translation into Italian. Use the existing handwritten font configuration rather than substituting the heading or body font. Use its supported italic variant or an appropriate slanted treatment while preserving readability.

### 3.2 CTA

Replace **Request a Call** on the About page with **Book a Consultation**, retaining the existing consultation/contact destination.

### 3.3 Founder role labels

Replace the existing set of labels — Mech Engineering Grad, Content Writer, Certified Web Designer and AI Automation Consultant — with exactly these three, in this order:

1. Web Designer
2. AI Automation Specialist
3. Content Writer

Do not duplicate Content Writer or rewrite unrelated biography content.

### 3.4 Founder LinkedIn icon

- Add a LinkedIn icon in the **About Founder** section, positioned neatly with the founder information/social area.
- The owner will supply the URL later. Keep one clearly named configurable value for that URL.
- Until a real URL is provided, render the icon as non-interactive with an appropriate accessible description. Do not use `href="#"`, invent a profile URL or create a misleading working link.
- Once configured, it should become an accessible external link.

### 3.5 Team role

Change **Boluwatife A.**'s role to:

**Email & AI Automation Specialist**

Preserve the name, image and other relevant team content.

## 4. Industry Solutions pages

Apply these changes to the existing Real Estate, Home Services — HVAC & Plumbing, Clinics, and Consulting Firms industry-solution pages. Discover their actual routes from the project; do not guess new routes or edit demo pages by mistake.

### 4.1 CTA labels and links

Replace all **Request a Call** buttons within these industry pages with **Request a Consultation**. Keep their existing consultation/contact destination.

Replace **See How It Works** using the matching label and destination:

| Industry page | New button label | Destination |
|---|---|---|
| Real Estate | Explore Real Estate Demo | Existing Real Estate demo page |
| Home Services — HVAC & Plumbing | Explore Home Services Demo | Existing Home Services demo page |
| Clinics | Explore Clinics Demo | Existing Clinics demo page |
| Consulting Firms | Explore Consulting Firms Demo | Existing Consulting Firms demo page |

Use the corrected spelling **Consulting**. These buttons must open the corresponding individual demo pages, not the homepage demo section or a generic contact page.

### 4.2 Replace long solution lists with three concise cards

On each industry page, replace the existing long list of small solution boxes with exactly three clear cards. Every card must include its title and full description below. Do not keep the old long solution list underneath.

Use the existing card design language. Prefer three columns where space allows, and stack responsively on smaller screens. Maintain readable text, consistent padding, aligned cards and existing appropriate hover/reveal effects.

#### A. Real Estate

**Capture Enquiries**  
Collect property interests, budgets and preferences through clear enquiry forms.

**Organise Leads**  
Qualify enquiries, assign agents and track each opportunity in one place.

**Manage Viewings & Follow-up**  
Simplify viewing requests, send reminders and follow up with interested property seekers.

#### B. Home Services — HVAC & Plumbing

**Capture Service Requests**  
Collect job details and locations, and route urgent enquiries to the right team.

**Organise Jobs & Bookings**  
Manage appointment requests, track job progress and notify technicians.

**Keep Customers Updated**  
Send appointment reminders, follow up on estimates and prompt maintenance bookings.

#### C. Clinics

**Capture Appointment Enquiries**  
Help visitors explore services and submit appointment requests with essential contact details.

**Organise Requests & Notify Staff**  
Track enquiries and alert your team when a request needs attention.

**Support Patient Follow-up**  
Send appointment reminders, share preparation information and follow up on missed appointments.

#### D. Consulting Firms

**Capture Enquiries & Book Calls**  
Collect project needs and help prospects schedule a discovery call.

**Qualify & Organise Opportunities**  
Assess fit, track conversations and assign next steps in your CRM.

**Follow Up & Onboard Clients**  
Keep proposals moving, collect documents and guide new clients through onboarding.

### 4.3 Related-section spacing

Slightly reduce the large gap between the problem bullets and **“A clearer path…”** on Real Estate. Apply the same modest adjustment to equivalent problem-to-solution transitions on the other industry pages where the same oversized gap exists.

Keep generous breathing room while making the related sections feel connected. Check desktop and mobile spacing separately; do not compress every section globally.

## 5. Contact Us form

### 5.1 Service dropdown

In **Which service are you interested in?**, retain all current valid options and add:

- Not sure yet

Keep existing options such as All if already present. Use a neutral placeholder rather than automatically selecting a service. Ensure Not sure yet is a valid submitted value.

### 5.2 Industry dropdown and conditional field

Add a dropdown labelled **Your industry** with these options:

1. Real Estate
2. Home Services - HVAC & Plumbing
3. Clinics
4. Consulting firm
5. Other

When **Other** is selected, show a text input immediately beneath it labelled:

**Please specify your industry.**

- Require this text input only when Other is selected.
- Hide it and remove its validation requirement when another industry is selected.
- Clear or exclude its previous value from the submitted payload when it is no longer applicable.
- Keep its appearance/disappearance smooth without losing focus or disrupting surrounding fields.

### 5.3 Project timing dropdown

Add a dropdown labelled **When would you like to start?** with these exact options:

1. As Soon as Possible
2. Within 1 Month
3. Within 3 Months
4. Just Exploring

Use a neutral placeholder. Do not preselect a timeline for the visitor.

### 5.4 Professional field order

Organise the current form into this progression, reusing existing fields rather than introducing unnecessary questions:

| Order | Field or group | Behaviour |
|---|---|---|
| 1 | Full name / existing name fields | Preserve current required status |
| 2 | Email address | Preserve current validation and any existing email-type choice |
| 3 | Business or company name, if already present | Preserve current required/optional status |
| 4 | Website URL, if already present | Preserve current required/optional status |
| 5 | Which service are you interested in? | Include Not sure yet; preserve current required status |
| 6 | Your industry | Required; use the options above |
| 7 | Please specify your industry. | Visible and required only for Other |
| 8 | When would you like to start? | Required; Just Exploring remains a valid choice |
| 9 | Existing project-details/message field | Preserve current wording and required status |
| 10 | Existing contact-preference and phone/WhatsApp fields | Group together; show conditional fields beside or directly after their trigger |
| 11 | Existing consent/privacy acknowledgement, if present | Preserve existing requirements |
| 12 | Submit button and submission feedback | Preserve the established action and branding |

If the existing form contains additional necessary fields, place them in the closest relevant group. Preserve current contact-preference behaviour, including a conditional WhatsApp field if present. Do not add a budget field or other new questions not requested here.

### 5.5 Layout and submission handling

- Use a clear single-column layout on mobile. On desktop, pair only short, related fields; keep long dropdowns and the message field at a comfortable width.
- Keep visible labels above fields and mark required/optional status consistently.
- Match field heights, spacing, borders, focus styles and typography.
- Show helpful inline validation messages and retain entered values when validation fails.
- Include service, industry, conditional other-industry text and start timing in the actual submission payload.
- Update the existing validation schema, types, handler and any existing email/CRM mapping so the new values reach the current destination.
- Preserve loading, success and failure states. If the form is not connected, clearly report that limitation rather than displaying a fabricated submission success.

## 6. Implementation boundaries and verification

Use page-specific CTA changes rather than a blind global text replacement:

| Scope | Old label | Replacement | Destination |
|---|---|---|---|
| Homepage | Request a Call | See How It Works | Homepage Demos section |
| About Us | Request a Call | Book a Consultation | Existing consultation/contact destination |
| Industry Solutions pages | Request a Call | Request a Consultation | Existing consultation/contact destination |
| Industry Solutions pages | See How It Works | Matching Explore…Demo label | Matching individual demo page |

Service-page copy and demo-page copy are outside the page-specific text changes above; shared general fixes still apply throughout the site.

Before reporting completion, verify:

- Every navigational logo returns to the top of the homepage hero from another page and from a scrolled homepage.
- Ordinary internal page navigation starts at the destination hero on mobile and desktop.
- Homepage demo anchors work without being overridden by the scroll fix.
- Mobile submenu labels and chevrons toggle correctly; all main pages are initially visible and subpages are accessible.
- The homepage has the exact requested section order with no duplicate sections.
- Homepage Request a Call buttons are replaced and Book a Consultation comes first in paired CTAs.
- The image slider completes multiple seamless cycles without stopping or showing a blank gap during normal autoplay.
- About text, three role labels, handwritten statement, LinkedIn placeholder and Boluwatife A.'s role are correct.
- Each industry page shows the correct three solution cards and links to its own demo.
- The contact form accepts Not sure yet, handles Other correctly, and submits the new fields through its existing handler.
- The favicon uses the current logo and footer headings use #FF991C.
- Buttons, section spacing, backgrounds and animations remain coherent at representative mobile, tablet and desktop widths.
- There are no new overflow, console, hydration, type or build errors introduced by these changes. Run the project's relevant existing checks and a production build where available.

Finish with a concise report of changes, verification results, any missing assets/integrations, and the configuration location for the founder's future LinkedIn URL.
