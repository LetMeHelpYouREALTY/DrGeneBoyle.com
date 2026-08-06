# SEO boost — 2026-08-06

Concrete on-site SEO / AEO changes shipped with the knowledge + agent graphs.

## Crawl hygiene

- `/projects` placeholder → permanent redirect to `/publications`
- Starter nested blog post set to `draft: true`
- `robots.txt` disallows `/api/` and `/projects`
- RSS tag feeds exclude drafts

## Metadata & schema

- Homepage: dedicated title/description, `WebPage` + breadcrumbs, `AnswerCallout`, hub internal links
- About: `AboutPage` schema + breadcrumbs
- Contact: `ContactPage` schema
- Blog posts: absolute canonicals, absolute schema image URLs, author `@id` preserved, breadcrumbs, `speakable`
- Organization: `ProfessionalService` + `ContactPoint`
- Removed broken `SearchAction` pointing at non-existent `/blog?q=`
- `genPageMetadata` sets twitter description, path-based canonical, `en`/`en-US` hreflang
- Sitemap priorities for research pillars

## AEO

- `AnswerCallout` registered in MDX components
- Direct-answer callouts on CTMT dissertation + Motherhood Reimagined briefs
- Natural image alts (removed “SEO GEO AEO” prefix stuffing)

## After deploy

1. GSC → inspect `https://www.drgeneboyle.com/` → Request indexing
2. Submit sitemap
3. Validate JSON-LD (Rich Results / schema.org validator)
4. Confirm `/projects` 308 → `/publications`
