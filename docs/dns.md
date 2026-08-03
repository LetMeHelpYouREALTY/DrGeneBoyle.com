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
- `https://drgeneboyle.com` → **307** → `https://www.drgeneboyle.com/`

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

### After routing is live (site code follow-up)

Update public mailto to the domain address:

- `data/siteMetadata.js` → `email: 'info@drgeneboyle.com'`
- `data/siteIdentity.js` → `email: 'info@drgeneboyle.com'`
- `data/authors/default.mdx` → `email: info@drgeneboyle.com`

Keep Fielding as destination only; do not publish it if domain forwarding works.

## Verify checklist

```bash
dig +short NS drgeneboyle.com
dig +short CNAME www.drgeneboyle.com
dig +short MX drgeneboyle.com
dig +short TXT drgeneboyle.com | grep -i spf
dig +short TXT cf2024-1._domainkey.drgeneboyle.com
curl -sI https://www.drgeneboyle.com | head -5
curl -sI https://drgeneboyle.com | head -8
```

## Rules of thumb

1. Keep Vercel CNAMEs **DNS-only** (gray cloud) — orange cloud breaks SSL with Vercel.
2. Do not delete `_vercel` TXT records while domains stay on the project.
3. Email changes are live production writes — enable Email Routing only after confirming the destination inbox.
