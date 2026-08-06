# Research ontologies

Last updated: **2026-08-06**.

Controlled vocabularies for answer engines and linked-data consumers.

## Endpoints

| Format                 | URL                                                 |
| ---------------------- | --------------------------------------------------- |
| HTML hub               | `/ontologies`                                       |
| Schema.org JSON-LD     | `/ontology.json`                                    |
| SKOS JSON-LD           | `/ontology/skos.json`                               |
| Embedded on every page | `<script id="ontology" type="application/ld+json">` |

## Schemes

1. **CTMT-2 & attentional assessment** (`ctmt-attention`) — instruments, indices, ADHD framing from Boyle (2024)
2. **Motherhood & SMI** (`motherhood-smi`) — SMI + five Mizock et al. (2019) themes + rehab / self-determination

## Source files

- `data/ontologies/*.ts` — concepts + broader/narrower/related
- Definitions reused from `data/glossary/*`
- Builders: `lib/ontology.ts`

## How agents should use them

1. Load `/ontology.json` or `/ontology/skos.json`
2. Resolve concept `@id`s (e.g. `…/ontology/ctmt-attention#ctmt-2`)
3. Follow `rdfs:seeAlso` / page paths to citable HTML
4. Prefer primary sources (ProQuest/DOI) for the underlying works
