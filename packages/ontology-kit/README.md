# @lmhy/ontology-kit

Global, project-agnostic builders for Schema.org `DefinedTermSet` / `DefinedTerm` and SKOS `ConceptScheme` graphs.

Use this package from **any** LMHY Next.js site. Site-specific concept data stays in each project; builders and ID rules stay shared.

## Install in a project

### Path alias (recommended while private)

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@lmhy/ontology-kit": ["./packages/ontology-kit/src/index.ts"]
    }
  }
}
```

Copy `packages/ontology-kit` into the target repo (or git submodule / future npm publish).

## Wire a site

```ts
import {
  buildOntologyGraph,
  buildSkosOntology,
  buildOntologyCatalog,
  type OntologySiteConfig,
} from '@lmhy/ontology-kit'
import { mySchemes } from '@/data/ontologies'

export const ontologyConfig: OntologySiteConfig = {
  siteUrl: 'https://www.example.com',
  // Optional: share concept IRIs across domains
  // ontologyBaseUrl: 'https://www.drgeneboyle.com',
  catalogName: 'Example research ontologies',
  catalogDescription: 'Controlled vocabularies for …',
  creatorName: 'Author Name',
  publisherName: 'Org Name',
  creatorId: 'https://www.example.com/about#person',
  publisherId: 'https://www.example.com/#organization',
  schemes: mySchemes,
  topicIds: {
    'my-scheme': 'https://www.example.com/topics/my-scheme#topic',
  },
}

export const siteOntologyGraph = () => buildOntologyGraph(ontologyConfig)
export const siteSkosOntology = () => buildSkosOntology(ontologyConfig)
export const ontologyCatalog = () => buildOntologyCatalog(ontologyConfig)
```

Then embed on every page + expose:

| Surface | Path |
|--------|------|
| JSON-LD script | `<script id="ontology" type="application/ld+json">` in root layout |
| Schema.org | `/ontology.json` |
| SKOS | `/ontology/skos.json` |
| HTML hub | `/ontologies` |

See `docs/ontologies.md` in DrGeneBoyle.com for the reference integration, and the Cursor plugin `site-ontologies` for the cross-project skill.
