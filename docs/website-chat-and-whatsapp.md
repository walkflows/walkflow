# Website chat assistant and WhatsApp button

Two floating controls sit bottom-right on every page (mounted once in
`src/app/layout.tsx` via `src/components/chat/FloatingWidgets.tsx`):

- **WALKFLOW Assistant** (`WebsiteChatWidget.tsx`): a compact chat panel.
  Works now, with no credentials.
- **WhatsApp button** (`WhatsAppWidget.tsx`): hidden until a WhatsApp link is
  configured.

## Current status

| Part | Status |
| --- | --- |
| Chat panel UI, keyboard use, Escape to close | Working |
| Chat answers (`src/lib/chat/respond.ts`) | Working. Rule-based, drawn only from the site's own copy. No AI provider is connected. |
| `POST /api/chat` validation and rate limit | Working (best-effort, see Limits) |
| WhatsApp button | Hidden until `NEXT_PUBLIC_WHATSAPP_URL` is set |

No AI provider, API key or external service is configured or called.

## Where things live

| Purpose | File |
| --- | --- |
| Copy, starter questions, reply text, link labels | `src/content/chat-assistant.ts` |
| Answer rules (safety, criticism, booking, pricing, navigation) | `src/lib/chat/respond.ts` |
| Request/response types | `src/lib/chat/types.ts` |
| API route (validation, rate limit) | `src/app/api/chat/route.ts` |
| Per-client rate limiter | `src/lib/chat/rate-limit.ts` |
| Chat panel | `src/components/chat/WebsiteChatWidget.tsx` |
| WhatsApp button | `src/components/chat/WhatsAppWidget.tsx` |
| WhatsApp URL check | `src/lib/whatsapp.ts` |

Reply text lives in the content file, not in the rules, so copy can change
without touching matching logic.

## Adding the WhatsApp link

1. Set `NEXT_PUBLIC_WHATSAPP_URL` in Vercel project settings, and in
   `.env.local` for local work. Use the form `https://wa.me/<country code and number, digits only>`.
   `https://api.whatsapp.com/...` also works.
2. Redeploy. This value is bundled into the site at build time, so changing it
   needs a new build.
3. Leave it empty to hide the button. Any other URL is ignored, so a non-WhatsApp
   link cannot be shipped by accident.

The button opens in a new tab with `rel="noopener noreferrer"`. WhatsApp Web
opens on desktop, and the app opens on supported mobile devices.

## Connecting an AI provider later

The fallback answers in `respond.ts` are deliberately limited. Before adding a
model:

1. Add a **server-only** secret (for example `WALKFLOW_CHAT_API_KEY`). Never
   prefix it with `NEXT_PUBLIC_`, and never import it into a client component.
   Add the name, not a value, to `.env.example`.
2. In `src/app/api/chat/route.ts`, keep validation and rate limiting as they are.
   Call the provider only after `respond()` has run its safety rules, or move
   those rules in front of the provider call. Unsafe or injection-style messages
   must never reach the model.
3. Put the site's approved facts and the limits (no prices, timelines,
   guarantees, client results, contract terms, integrations or availability
   unless the site states them) in the system prompt, and keep the scope
   restriction to WALKFLOW. Do not let visitor text override the system prompt.
4. If the provider is missing or errors, fall back to `respond()` so the
   production build and the chat keep working.
5. Re-run the question matrix in the testing section below before enabling it.

## Limits

- **Rate limiting is per instance.** It keeps one client from flooding a single
  serverless instance, but Vercel instances do not share memory, so it is not a
  hard global limit. Before relying on it, move the counter to a shared store.
- **Client identity** comes from the first `x-forwarded-for` address. It can be
  spoofed by a determined client, so treat the limit as a brake, not a security
  boundary.
- **Matching is keyword-based.** Unusual wording can get the generic off-topic
  or "not sure" reply. That is intentional: a wrong guess is worse than a
  Contact link.
- Messages are not stored by this code. Platform request logs may still record
  requests, so check the hosting provider's log settings before publishing.

## Testing

No automated test runner is set up in this repository. Checks used:

- `npm run typecheck`, `npm run lint`, `npm run build`
- `POST /api/chat` with a matrix of visitor questions: services, booking,
  pricing (one clarification with service chips), timelines and guarantees
  (Contact), criticism such as "What happens if an automation fails?" (answered
  normally), off-topic and abusive messages (scope reply), injection attempts,
  empty, invalid, oversized and over-limit requests.
- Browser checks at 1440px, 768px, 390px and 320px: open, send, chip click,
  Escape to close with focus returned to the launcher, no horizontal overflow,
  no overlap with footer controls, WhatsApp stacked above the launcher when
  configured.

Adding a test runner (for example Vitest for `respond.ts`) would be a sensible
follow-up if the rules change often.
