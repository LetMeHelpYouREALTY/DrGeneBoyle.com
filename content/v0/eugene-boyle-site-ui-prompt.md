# v0.dev prompt — Eugene Boyle research site UI

Copy everything below the line into [v0.dev](https://v0.dev), then share the output for refinements.

---

Build a Next.js App Router + Tailwind UI system for **Eugene Boyle, Ph.D.** — institutional research & insights site (not a consumer real-estate landing page).

## Brand
- Name as hero signal: **Eugene Boyle, Ph.D.**
- Subline: Managing Director, KLB Consultants · Co-author, Motherhood Reimagined (SMI & parenting)
- Audience: clinicians, researchers, family-office / institutional readers
- LinkedIn: linkedin.com/in/geneboyle

## Visual direction
- One composition per first viewport — not a dashboard
- Atmosphere: deep ink navy (#0B1F2A) with soft graphite mist gradients and a single teal accent (#2A9D8F). Avoid purple gradients, cream+terracotta, broadsheet hairlines, glow pills, emoji.
- Typography: expressive pairing — display serif (e.g. Fraunces or Instrument Serif) + refined sans (DM Sans). No Inter/Roboto/Arial.
- Motion: subtle fade-up on hero text, slow gradient drift, underline grow on nav links (2–3 intentional motions only)
- Cards: none in hero; use cards only for interactive topic tiles

## Pages to design
1. **Home** — full-bleed atmospheric hero (abstract research / layered paper & light), brand name dominant, one headline, one sentence, CTA group: “Motherhood & SMI hub” + “LinkedIn profile”
2. **Topics hub** — editorial list with large titles, short summaries, thumbnails
3. **Motherhood & SMI pillar** — answer-first lead block, key takeaways, five-theme numbered strip, cluster links
4. **FAQ** — clean Q/A sections, sticky “Direct answers” label for AEO
5. **Glossary** — definition list with anchor IDs
6. **LinkedIn hub** — entity identity panel + featured link list
7. **About** — portrait + bio columns
8. **Blog post** — cover image, reading meta, serif body

## SEO / GEO / AEO UI requirements
- Visible “Direct answer” block near top of topic/FAQ pages
- FAQ questions as H2
- Image slots with descriptive alt text props
- Footer contact: Eugene Boyle, Ph.D. · KLB Consultants · Los Angeles, CA · 949-324-8880 · LinkedIn · ORCID

## Components
Header, Footer, PageHero, AnswerCallout, TopicTile, NapBlock, JsonLd-friendly structure (semantic HTML)

Output: React/TSX + Tailwind, mobile-first, accessible contrast.

---

After generating, paste the v0 share link here for integration refinements.
