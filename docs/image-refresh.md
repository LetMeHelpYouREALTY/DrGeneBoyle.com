# Image refresh — replace placeholder title cards

Last updated: **2026-08-06**.

## Problem

Many page/blog heroes were low-resolution **UI title cards** (burned-in labels + empty placeholder grids). They competed with real page H1s and looked unfinished.

## Solution

Generated text-free photographic/editorial assets for every live page section and published blog cover. PageHero / HomeHero continue to overlay typography.

| Area | Count | Notes |
|------|-------|--------|
| Page heroes + features + OG | 18 | Includes About composite with real headshot |
| Blog covers | 11 | All published research posts |
| Social banner | 1 | `og-social-banner.webp` + `twitter-card.webp` |

## Paths

- Pages: `public/static/images/pages/*.webp`
- Blog: `public/static/images/blog/*.webp`
- Registry: `data/pageMedia.ts`
- Homepage now uses `hero-home-eugene-boyle.webp` (not `improve-here-homepage.webp`)
- CTMT home feature uses dedicated `home-feature-ctmt.webp`

## Visual direction

Deep navy / teal research atmosphere, no burned-in text, no purple gradients, no stock “AI purple” look. Fair-housing-safe: no neighborhood quality language; images are research/clinical atmospheres.
