> **DRAFT — not published.** For Joshua's review. See `README.md` in this folder.
> Grounded in the code as of commit `797fa9f`: `src/app/api/enquiry/`,
> `src/app/api/chat/`, `src/lib/whatsapp.ts`, `src/content/contact.ts`,
> `package.json` (no analytics package installed).

# Privacy Policy

**Last updated:** [NEEDS INPUT — date of publication]

This policy explains what happens when you visit the WALKFLOW website
(walkflow-phi.vercel.app) or use its contact form, Ask WALKFLOW assistant or
WhatsApp link.

**Who we are.** WALKFLOW, [NEEDS INPUT — legal entity name and registration
details, if any]. Contact for privacy questions: [NEEDS INPUT — a real email
address to publish here; `site.contact.email` in the codebase is a value
Joshua confirmed for display on the Contact page, but it hasn't been
confirmed as the right address for privacy/legal correspondence specifically].

## What we collect

**If you use the contact form.** When the enquiry form is connected (see
"Current status" below), submitting it sends: your name, email address,
company name, role, website (if given), which service and industry you
selected, your preferred start time, your message, your preferred contact
method, and a WhatsApp number if you chose that method. A technical
submission reference is generated in your browser so a retried submission
isn't saved twice.

**If you use Ask WALKFLOW.** The assistant sends the text you type to our
own server (`/api/chat`), which matches it against WALKFLOW's own published
website content to generate a reply. It does not call any third-party AI
service — there's no external AI API in this code path. Your messages are
not stored after the conversation ends; the chat log exists only in your
browser tab and is cleared on refresh.

**If you click the WhatsApp button.** You leave this site and open WhatsApp
(or wa.me) directly. What happens there is governed by WhatsApp's own
privacy policy, not this one.

**If you click "Book a discovery call".** You leave this site and go to a
Google Calendar appointment page. What happens there is governed by Google's
own privacy policy, not this one.

**Automatically, from hosting.** This site is hosted on Vercel, which — like
most hosts — keeps standard server logs (e.g. IP address, request time, page
requested) for operating and securing the service. We don't currently layer
any analytics or tracking tool on top of that. [NEEDS INPUT — confirm with
Vercel's own privacy documentation what it retains, rather than us asserting
specifics we haven't verified.]

## What we do NOT currently do

- We do not currently run any analytics or visitor-tracking tool (no
  PostHog, no Google Analytics, nothing similar) — see the Cookie Policy
  draft for detail.
- We do not sell personal information.
- We do not use your enquiry message for anything other than replying to
  you.

## Current status of the contact form

As of this draft, the live website's contact form is **not yet connected**
to our enquiry system — submitting it shows an "unavailable" message rather
than being saved anywhere. A connected version exists but hasn't been
launched. Once launched, submitted enquiries are saved to a private Google
Sheet that only WALKFLOW staff can access, and trigger an internal
notification so we can follow up by email or WhatsApp (your choice). We do
not use your enquiry for marketing unless you separately agree to that.

## How long we keep it

[NEEDS INPUT — a real retention period for enquiries once the sheet-based
system is live, e.g. "enquiries are kept for N months after the last
contact." Not invented here.]

## Your rights

Depending on where you're located, you may have rights to access, correct
or delete the personal information we hold about you, and to object to or
restrict certain processing. To exercise these, contact us at [NEEDS INPUT —
privacy contact address].

## Changes to this policy

We'll update the date at the top of this page when this policy changes.

---
*This draft is a starting point reflecting what the code actually does. It
is not legal advice; Joshua should have it checked against the law of
whatever jurisdiction(s) WALKFLOW operates in before publishing.*
