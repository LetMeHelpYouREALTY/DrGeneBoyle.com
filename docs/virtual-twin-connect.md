# Virtual Twin & Connect hub (DrGeneBoyle.com)

Owned-domain Connect experience at `/connect` — Spotlight, Virtual Twin chat, lead capture, Google Calendar booking, testimonials, portfolio, video, destination links (portfolio / blog / photos), and an email signature that snapshots the page. No about.me branding.

## Routes

| Path | Purpose |
|------|---------|
| `/connect` | Hub: Spotlight → Twin chat + lead form → destinations → social proof |
| `/email-signature` | Copy-ready HTML signature = snapshot of Connect for every outbound email |
| `/api/twin/chat` | Knowledge-first twin replies; optional OpenAI fallback |
| `/api/leads` | Lead POST → `CRM_WEBHOOK_URL` and/or Resend email |

## Spotlight Button

Spotlight is the **one action** visitors should take — whatever is most important right now (book a call, open a flagship page, etc.).

- Label: `NEXT_PUBLIC_SPOTLIGHT_LABEL`
- Destination: `NEXT_PUBLIC_SPOTLIGHT_HREF`, or `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL`, else `/contact`
- Anchored at `#spotlight` on `/connect`

## Destination links

Use `/connect#destinations` (and the email signature) to send more visits to portfolio, blog, photos, publications, and topics. Edit `destinationLinks` in `data/connectHub.ts`.

## Email signature

Treat the signature as a **snapshot of the Connect page**: headshot, roles, Spotlight CTA, destination links, and link back to `/connect`. Paste into Gmail/Outlook so every message carries that snapshot.

## Environment

See `.env.example` for GA4, calendar booking, CRM webhook, Resend, OpenAI twin fallback, and intro video embed. CSP allows GA scripts and Calendar / YouTube / Vimeo frames in `next.config.js`.
