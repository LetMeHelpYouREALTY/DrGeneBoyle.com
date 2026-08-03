# Cloudflare Images — DrGeneBoyle.com

Last verified: **2026-08-03**.

## Why hosted Images (not zone `/cdn-cgi/image/`)

Apex + `www` are **DNS-only (gray cloud)** → Vercel. That is required to avoid SSL conflicts with Vercel.

Zone Image Transformations (`https://www.drgeneboyle.com/cdn-cgi/image/...`) need the hostname to be **proxied (orange cloud)**. Do **not** orange-cloud this zone for transforms.

Use **Cloudflare Images** (hosted) instead:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<OPTIONS>
```

Photo features used here:

| Feature | Use |
|---------|-----|
| `gravity=face` | Face-aware crop for headshot favicon / avatar |
| `fit=cover` | Square crops without letterboxing |
| `format=auto` | WebP/AVIF when the browser supports them |
| `width` / `height` | Exact sizes (16, 32, 180, 384, 1200) |

Docs: [Images features](https://developers.cloudflare.com/images/optimization/features/), [upload methods](https://developers.cloudflare.com/images/storage/upload-images/methods/).

## One-time setup

1. Cloudflare dashboard → **Images** → enable a paid Images plan if needed.
2. **Variants** → turn on **Flexible variants** (needed for `gravity=face` URL options).
3. Upload the Boyle headshot:
   - Dashboard drag-drop, **or**
   - `CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… yarn cf:images:upload`
4. **Images → Developer Resources** → copy **Account Hash**.
5. Vercel project `drgeneboyle.com` → Environment Variables:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH` | Account hash from step 4 |

6. Redeploy production.

Custom image ID used by the site: `eugene-boyle/headshot` (`data/siteMedia.ts`).

## Code map

| File | Role |
|------|------|
| `lib/cloudflare-images.ts` | URL builder + local fallback |
| `data/siteMedia.ts` | Image IDs + crop presets |
| `app/layout.tsx` | Favicon / apple-touch → CF when hash set |
| `layouts/AuthorLayout.tsx` | About portrait |
| `layouts/PostLayout.tsx` | Post author chip |
| `lib/schema.ts` | Person `image` |
| `scripts/upload-cloudflare-images.mjs` | API upload |

Until `NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH` is set, the site keeps using local `/static/images` and `/static/favicons` assets.

## Verify

```bash
# After hash is set and image uploaded:
curl -sI "https://imagedelivery.net/$NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH/eugene-boyle/headshot/width=32,height=32,fit=cover,gravity=face,format=auto" | head
```

Expect `HTTP/2 200` and `content-type: image/...`.
