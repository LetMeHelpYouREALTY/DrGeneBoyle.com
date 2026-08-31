# GSC: Page with redirect — drgeneboyle.com

Last verified: **2026-08-06**.

## Verdict

**Not an indexing failure for the live site.** Google correctly refuses to index URLs that redirect. The canonical host is already indexed.

| URL in GSC example | Live behavior (2026-08-06) | Action |
|--------------------|----------------------------|--------|
| `http://drgeneboyle.com/` | 308 → `https://drgeneboyle.com/` → 308/307 → www | Expected — leave alone |
| `http://www.drgeneboyle.com/` | 308 → `https://www.drgeneboyle.com/` | Expected — leave alone |
| `https://drgeneboyle.com/` | Redirect → `https://www.drgeneboyle.com/` | Expected — make redirect **308** (not 307) |
| `https://www.drgeneboyle.com/` | **200** + canonical self | Should appear under **Indexed** — not a problem |
| `https://www.drgeneboyle.com/projects` | Was thin template; now **308 → `/publications`** | Expected after fix |

Canonical homepage confirmed in Google results: `https://www.drgeneboyle.com/`.

## What “Done fixing?” means

Do **not** mark “Done fixing” for the http/apex rows—they will stay in this report forever while redirects exist (correct).

Do check:

1. **Indexing → Pages → Indexed** includes `https://www.drgeneboyle.com/` and key paths (`/blog`, `/topics`, `/about`, …).
2. URL Inspection on those www HTTPS URLs → “URL is on Google”.
3. Apex redirect is **308** (see [`dns.md`](./dns.md)).

## Why Google lists www URLs here

Often stale crawl data, a prior temporary redirect, or a trailing-slash hop (`/projects/` → `/projects`). Re-inspect the www URL; if it returns 200 with a matching canonical, request indexing only if it is missing from **Indexed**.

## Canonical rules (do not change casually)

- Preferred host: `https://www.drgeneboyle.com` (`data/siteMetadata.js` → `siteUrl`)
- `robots.txt` `Host` + `Sitemap` point at www
- Sitemap loc values are www only
- NAP / schema / internal links use www

## One dashboard fix that still matters

Apex currently used a **307 Temporary** redirect at the Vercel domain layer. Temporary redirects tell Google not to fully consolidate ranking signals. Change that domain redirect to **308** (steps in [`dns.md`](./dns.md)).
