# Sitewide agent graph

Last updated: **2026-08-06**.

Machine-readable **Agent Graph** for AI crawlers and answer engines. Complements:

| Artifact                   | Role                                                   |
| -------------------------- | ------------------------------------------------------ |
| `llms.txt`                 | Plain-text briefing                                    |
| Schema.org knowledge graph | Entity semantics (`application/ld+json`)               |
| **Agent graph**            | Citation priorities, navigation edges, quote selectors |

## Discovery

1. **Every HTML page** embeds `<script id="agent-graph" type="application/agent-graph+json">`
2. **Canonical file:** `https://www.drgeneboyle.com/agent-graph.json`
3. **Link tag** in root layout: `rel="alternate" type="application/agent-graph+json"`
4. Listed in `public/llms.txt`

## Shape

```json
{
  "version": "1.0",
  "type": "AgentGraph",
  "site": "https://www.drgeneboyle.com",
  "discovery": { "self": "…/agent-graph.json", "llmsTxt": "…/llms.txt" },
  "policies": { "notClinicalAdvice": true, "preferPrimarySources": [] },
  "entryPoints": [],
  "nodes": [{ "id": "person:eugene-boyle", "type": "Person", "citePriority": 1 }],
  "edges": [{ "from": "person:eugene-boyle", "to": "work:ctmt-dissertation", "rel": "authorOf" }]
}
```

## Code

- Builder: `lib/agent-graph.ts` → `siteAgentGraph()`
- Embed: `components/AgentGraphScript.tsx` (root layout)
- Route: `app/agent-graph.json/route.ts`

Nodes with `schemaId` point at the matching knowledge-graph `@id` so agents can join both graphs.
