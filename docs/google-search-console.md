# Google Search Console — drgeneboyle.com

Prepared **2026-09-10**. Canonical host: `https://www.drgeneboyle.com` (`data/siteMetadata.js` → `siteUrl`).

## Already in place

| Signal | Status | Where |
|--------|--------|--------|
| Canonical host | `www` | Apex `https://drgeneboyle.com` → **307** → `https://www.drgeneboyle.com/` |
| DNS verification (domain property) | Live TXT | Cloudflare: `google-site-verification=U6dTkupnkNebU0nsneR1nxBD6wZH3aGhpTc6CkE0gyE` — see [`dns.md`](./dns.md) |
| HTML meta verification (URL-prefix backup) | App metadata | `app/layout.tsx` → `metadata.verification.google` from `siteMetadata.googleSiteVerification` |
| `robots.txt` | Live | `https://www.drgeneboyle.com/robots.txt` — allows Googlebot; lists Sitemap + Host |
| `sitemap.xml` | Live | `https://www.drgeneboyle.com/sitemap.xml` — static hubs + published posts only |
| Indexing | Allowed | Root `robots: { index: true, follow: true }` + generous `googleBot` preview settings |
| HTTPS / HSTS | Live | Vercel + `Strict-Transport-Security` in `next.config.js` |

## Property setup (do this in GSC UI)

1. Open [Google Search Console](https://search.google.com/search-console).
2. Prefer a **Domain** property: `drgeneboyle.com`  
   - Verification method: **DNS TXT** (already on Cloudflare). Click **Verify**.
3. Also add a **URL-prefix** property: `https://www.drgeneboyle.com/`  
   - Meta tag verification uses the same token rendered in `<head>` after deploy.  
   - Do **not** add a separate property for the apex-only URL; apex redirects to `www`.
4. Confirm ownership users (add team emails as needed).

## After verify — first actions

1. **Sitemaps** → submit: `https://www.drgeneboyle.com/sitemap.xml`
2. **URL Inspection** → test homepage `https://www.drgeneboyle.com` → **Request indexing** if “URL is not on Google”.
3. Inspect key hubs: `/about`, `/topics/acquisition-advisory`, `/topics/ctmt-attention`, `/publications`, `/contact`.
4. **Settings → users and permissions** — keep at least two owners.
5. Optional: link **Google Analytics** / Bing Webmaster (Bing can import from GSC).

## Env override (optional)

If Google rotates the verification token:

```bash
# .env / Vercel env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=new-token-without-prefix
```

Value is the token only — **not** `google-site-verification=…`. Redeploy after changing.

## Verify from CLI

```bash
# DNS domain verification
dig +short TXT drgeneboyle.com | grep google-site-verification

# HTML meta (after deploy)
curl -s https://www.drgeneboyle.com | grep -o 'google-site-verification" content="[^"]*"'

# Crawl surfaces
curl -sI https://www.drgeneboyle.com/robots.txt
curl -sI https://www.drgeneboyle.com/sitemap.xml
curl -sI https://drgeneboyle.com   # expect 307 → www
```

## Do not

- Orange-cloud the zone in Cloudflare (breaks Vercel SSL) — keep **DNS only / gray cloud**.
- Submit `http://` or apex-without-redirect URLs as the primary property.
- Expect Instant Indexing API for ordinary content — use sitemap + URL Inspection.
- Treat FAQ rich results as guaranteed (Google narrowed FAQ rich results in 2026); FAQ pages still help answer extraction.

## Coverage drilldown — 2026-09-10

Export: `Page with redirect` · **4 affected URLs** (stable since mid-June; briefly 5 in July).

| URL | Last crawled | Verdict |
|-----|--------------|---------|
| `http://drgeneboyle.com/` | 2026-08-28 | Expected → HTTPS apex → www |
| `https://drgeneboyle.com/` | 2026-08-28 | Expected → `https://www.drgeneboyle.com/` |
| `http://www.drgeneboyle.com/` | 2026-08-28 | Expected → HTTPS www |
| `https://www.drgeneboyle.com/tags/math` | 2026-07-31 | Junk starter tag (empty). Fixed: drafts excluded from `tag-data.json`; empty tag routes `404` |

**Action in GSC:** These “Page with redirect” rows are **exclusions**, not indexing failures. Do not request indexing for HTTP/apex variants. After deploy, use URL Inspection on `/tags/math` to confirm **404** / removed, and monitor Valid pages for `https://www.drgeneboyle.com/`.

## Related docs

- [`dns.md`](./dns.md) — live DNS + Search Console TXT
- [`../public/llms.txt`](../public/llms.txt) — answer-engine citation preferences (not a GSC ranking factor)
