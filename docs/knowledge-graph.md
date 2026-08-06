# Sitewide knowledge graph (JSON-LD)

Last updated: **2026-08-06**.

Every page emits one JSON-LD document from the root layout via `siteKnowledgeGraph()` in `lib/schema.ts` (`<script id="knowledge-graph">`).

For AI-agent citation/navigation (separate from Schema.org), see [`agent-graph.md`](./agent-graph.md).

## Shape

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "https://www.drgeneboyle.com/#website" },
    { "@type": "Person", "@id": "https://www.drgeneboyle.com/about#person" },
    { "@type": "Organization", "@id": "https://www.drgeneboyle.com/#organization" },
    { "@type": "Organization", "@id": "https://www.drgeneboyle.com/#boyle-family-office" },
    { "@type": "Place", "@id": "https://www.drgeneboyle.com/#place-los-angeles" },
    { "@type": "DefinedTerm", "@id": "…/topics/ctmt-attention#topic" },
    { "@type": "DefinedTerm", "@id": "…/topics/motherhood-and-smi#topic" },
    { "@type": "DefinedTermSet", "@id": "…/glossary#terms" },
    { "@type": "Thesis", "@id": "…/blog/ctmt-attention-trail-making-dissertation#work" },
    { "@type": "ScholarlyArticle", "@id": "…/blog/motherhood-reimagined-smi-parenting#work" }
  ]
}
```

## Page-level schemas

Topic, FAQ, and other pages may add `WebPage`, `FAQPage`, `BreadcrumbList`, etc. Those nodes should reference graph `@id`s (`isPartOf`, `author`, `publisher`) instead of re-embedding Person/Organization.

## Verify

1. View source on any URL → `application/ld+json` with `@graph`
2. [Google Rich Results Test](https://search.google.com/test/rich-results) on `https://www.drgeneboyle.com/`
3. [Schema Markup Validator](https://validator.schema.org/)
