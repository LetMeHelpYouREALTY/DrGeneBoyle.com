# DNS — drgeneboyle.com

Last verified: **2026-08-03**. Zone export archived at [`dns/drgeneboyle.com.zone.txt`](./dns/drgeneboyle.com.zone.txt).

## Stack

| Layer | Provider | Notes |
|-------|----------|--------|
| Registrar / DNS | Cloudflare | Nameservers `amit` / `roxy` |
| Hosting | Vercel project `drgeneboyle.com` | Apex + `www` |
| Proxy | **DNS only (gray cloud)** | Required with Vercel — do not orange-cloud |

## Live web records (do not change)

```
;; NS
drgeneboyle.com.  NS  amit.ns.cloudflare.com.
drgeneboyle.com.  NS  roxy.ns.cloudflare.com.

;; Site → Vercel (CNAME flattening at apex; cf-proxied:false)
drgeneboyle.com.      CNAME  553347965863feb5.vercel-dns-017.com.
www.drgeneboyle.com.  CNAME  553347965863feb5.vercel-dns-017.com.

;; Vercel domain verification
_vercel.drgeneboyle.com.  TXT  "vc-domain-verify=drgeneboyle.com,…"
_vercel.drgeneboyle.com.  TXT  "vc-domain-verify=www.drgeneboyle.com,…"

;; Search Console
drgeneboyle.com.  TXT  "google-site-verification=U6dTkupnkNebU0nsneR1nxBD6wZH3aGhpTc6CkE0gyE"

;; DMARC (monitor-only; reports → Reverence inbox)
_dmarc.drgeneboyle.com.  TXT  "v=DMARC1; p=none; rua=mailto:DrJanSells@ReverenceSummerlinHomes.com; ruf=mailto:DrJanSells@ReverenceSummerlinHomes.com; fo=1"
```

### Expected HTTP behavior

- `https://www.drgeneboyle.com` → **200** (canonical; `siteUrl` in `data/siteMetadata.js`)
- `https://drgeneboyle.com` → **308** → `https://www.drgeneboyle.com/` (permanent; not 307)
- `http://*` → **308** → matching `https://*` (Vercel platform)
- `/projects` → **308** → `/publications` (template stub retired)

### Vercel domain redirect (apex → www)

Project Domains must send apex traffic to `www` with status **308** (or **301**), not **307**.

1. Vercel → project `drgeneboyle.com` → **Settings → Domains**
2. Edit `drgeneboyle.com` → Redirect to `www.drgeneboyle.com` → status **308**
3. Confirm with: `curl -sI https://drgeneboyle.com | head -8` → `308` + `location: https://www.drgeneboyle.com/`

Code backup: `vercel.json` host redirect + `middleware.ts` (308). If the dashboard still uses **307**, the platform redirect wins—change the dashboard status.

### Google Search Console — “Page with redirect”

See [`gsc-page-with-redirect.md`](./gsc-page-with-redirect.md). Alternate hosts/protocols listed there are expected and should **not** be indexed.

## Email — Cloudflare Email Routing

**Public address:** `info@drgeneboyle.com` (site mailto / schema / About).

**Status:** Site publishes `info@drgeneboyle.com`. Confirm Email Routing in Cloudflare so MX/SPF/DKIM resolve and mail forwards to the working inbox (e.g. `eboyle@fielding.edu`).

### Enable / verify in Cloudflare

Per [Cloudflare Email Routing docs](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/):

1. Dashboard → **Email** → **Email Routing** → select `drgeneboyle.com` → enable / onboard (adds root **MX**, **SPF**, and **DKIM**).
2. Destination address: verify the inbox that should receive mail.
3. Routing rule:

| Custom address | Action | Destination |
|----------------|--------|-------------|
| `info@drgeneboyle.com` | Forward | verified destination inbox |
| Catch-all (optional) | Forward | same |

4. Test: send from a third-party account to `info@drgeneboyle.com` → confirm delivery.
5. After SPF/DKIM resolve, optionally tighten DMARC from `p=none` → `p=quarantine` (confirm before changing).

### Records Cloudflare will manage

```txt
; MX (priorities assigned by Cloudflare)
MX  @  route1.mx.cloudflare.net
MX  @  route2.mx.cloudflare.net
MX  @  route3.mx.cloudflare.net

; SPF (merge if another SPF ever appears — only one v=spf1 allowed)
TXT  @  "v=spf1 include:_spf.mx.cloudflare.net ~all"

; DKIM (public key value provided in dashboard)
TXT  cf2024-1._domainkey  "v=DKIM1; h=sha256; k=rsa; p=…"
```

Do **not** add third-party MX (Google Workspace, Microsoft 365) while Email Routing is enabled — they conflict.

## Cloudflare Images (hosted portraits)

Headshot / favicon delivery uses **Cloudflare Images** on `imagedelivery.net` (face-aware crops). Keep this zone **gray-cloud** — see [`cloudflare-images.md`](./cloudflare-images.md).

### Site code (already live)

Public mailto fields use `info@drgeneboyle.com`:

- `data/siteMetadata.js`
- `data/siteIdentity.js`
- `data/authors/default.mdx`

Destination inbox stays private (forward target only).

## Verify checklist

```bash
dig +short NS drgeneboyle.com
dig +short CNAME www.drgeneboyle.com
dig +short MX drgeneboyle.com
dig +short TXT drgeneboyle.com | grep -i spf
dig +short TXT cf2024-1._domainkey.drgeneboyle.com
curl -sI https://www.drgeneboyle.com | head -5
curl -sI https://drgeneboyle.com | head -8   # expect 308 → www
curl -sI https://www.drgeneboyle.com/projects | head -8  # expect 308 → /publications
```

## Rules of thumb

1. Keep Vercel CNAMEs **DNS-only** (gray cloud) — orange cloud breaks SSL with Vercel.
2. Do not delete `_vercel` TXT records while domains stay on the project.
3. Email changes are live production writes — enable Email Routing only after confirming the destination inbox.
