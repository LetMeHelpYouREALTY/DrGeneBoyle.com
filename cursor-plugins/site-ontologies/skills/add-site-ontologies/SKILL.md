---
name: add-site-ontologies
description: Install the global ontology kit and wire Schema.org + SKOS endpoints into any Next.js project. Use when the user asks to add ontologies, DefinedTermSet, SKOS, or controlled vocabularies to a site.
---

# Add site ontologies

## Goal

Ship portable ontologies on the current project using `@lmhy/ontology-kit`, matching the DrGeneBoyle.com reference.

## Done looks like

- [ ] `packages/ontology-kit` present (copied from DrGeneBoyle.com or already in repo)
- [ ] tsconfig path: `"@lmhy/ontology-kit": ["./packages/ontology-kit/src/index.ts"]`
- [ ] `data/ontologies/` with types + at least one scheme
- [ ] `lib/ontology.ts` exports `siteOntologyGraph`, `siteSkosOntology`, `ontologyCatalog` via kit builders
- [ ] Root layout embeds `#ontology` JSON-LD
- [ ] Routes: `/ontology.json`, `/ontology/skos.json`, page `/ontologies`
- [ ] `llms.txt` / agent-graph link the endpoints when those files exist
- [ ] Docs note that the kit is global for all projects

## Steps

1. **Copy the kit** from `LetMeHelpYouREALTY/DrGeneBoyle.com` → `packages/ontology-kit` (do not reinvent builders).
2. **Add path alias** in `tsconfig.json`.
3. **Author schemes** under `data/ontologies/` (`OntologyScheme` concepts with broader/narrower/related). Reuse glossary definitions when present.
4. **Bind config** in `lib/ontology.ts` with real `siteUrl`, Person/Organization `@id`s, and `topicIds` if a knowledge graph exists.
5. **Wire surfaces**
   - Component: embed `siteOntologyGraph()` as `application/ld+json` id=`ontology`
   - `app/ontology.json/route.ts` → `siteOntologyGraph()`
   - `app/ontology/skos.json/route.ts` → `siteSkosOntology()`
   - `app/ontologies/page.tsx` → human hub listing schemes
6. **Discovery** — layout `<link rel="alternate">`, `public/llms.txt`, agent-graph resource nodes.
7. **Verify** — GET `/ontology.json` has `DefinedTermSet`; `/ontology/skos.json` has `skos:ConceptScheme`; homepage source includes `id="ontology"`.

## Cross-site vocabularies

If two domains share the same terms, set `ontologyBaseUrl` on both to the canonical host so concept `@id`s match. Local pages still use each site’s `siteUrl` for `url` / `rdfs:seeAlso`.

## Guardrails

- Fair housing / clinical claims: educational framing only; no treatment or investment advice.
- Do not invent market stats or clinical cutoffs—pull defs from existing glossaries or mark UNKNOWN.
- Keep IDX/MLS and site-specific compliance files untouched unless asked.
