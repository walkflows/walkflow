> **DRAFT — not published.** For Joshua's review. See `README.md` in this folder.
> Grounded in the code as of commit `797fa9f`: skip link (`Header.tsx`,
> `globals.css`), `useReducedMotion` usage across sections, form error
> pattern (`ContactForm.tsx`), focus-visible outlines, honeypot field,
> `min-h-11` touch targets, `aria-label`/`aria-live`/`role` usage in the
> chat widget.

# Accessibility Statement

**Last updated:** [NEEDS INPUT — date of publication]

WALKFLOW wants this site to be usable by as many people as possible. This
page describes what's actually built in, not a certification — **we are not
claiming conformance to any accessibility standard (e.g. WCAG AA) or any
third-party certification**, only describing genuine measures present in the
code.

## What's in place today

- **Skip link.** A "skip to content" link is available at the top of every
  page for keyboard users.
- **Reduced motion.** Animated reveals, the chat panel's open/close motion
  and other transitions check `prefers-reduced-motion` and fall back to a
  static or near-instant presentation when it's set.
- **Keyboard support.** The Ask WALKFLOW chat panel can be closed with
  Escape, returns focus to its launcher button on close, and its input is
  focused automatically when opened. Interactive elements use visible focus
  outlines (`focus-visible`) rather than removing them.
- **Form errors.** Contact form errors are shown as text next to the field,
  paired with an icon — not signalled by colour alone — and are
  programmatically associated with their field via `aria-describedby` and
  `aria-invalid`.
- **Touch targets.** Buttons and links in the chat and form are sized to at
  least 44×44px (`min-h-11`) for comfortable tapping.
- **Semantic structure.** The chat panel uses `role="dialog"` with labelled
  title/description, and its message log uses `role="log"` with
  `aria-live="polite"` so new assistant replies are announced.
- **Spam protection without barriers.** The contact form's spam check is an
  invisible honeypot field, not a visual CAPTCHA that could block legitimate
  users.
- **Responsive layout.** The site is built mobile-first and checked for
  horizontal overflow and overlapping controls across a range of screen
  widths (see `SESSION-NOTES.md` for the specific widths tested in each
  pass).

## Known gaps

[NEEDS INPUT — an honest, current list. Possible candidates to verify
before publishing, not yet confirmed here: a full screen-reader pass across
every page, colour-contrast audit of every text/background combination
(CLAUDE.md flags this as something to check before using orange for small
text), and keyboard testing of the service/industry dropdown menus and image
galleries.]

## Feedback

If you hit an accessibility barrier using this site, please tell us at
[NEEDS INPUT — a real contact address] so we can look into it.

---
*This draft lists only measures verified in the current code. It is not a
compliance certification.*
