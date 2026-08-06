import { siteOntologyGraph } from '@/lib/ontology'

/**
 * Global ontology embed — Schema.org DefinedTermSet graph on every page.
 * Built via @lmhy/ontology-kit; also at /ontology.json and /ontology/skos.json.
 */
export default function OntologyScript() {
  return (
    <script
      id="ontology"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteOntologyGraph()) }}
    />
  )
}
