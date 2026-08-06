import { siteOntologyGraph } from '@/lib/ontology'

/**
 * Embeds Schema.org ontology (DefinedTermSet graph) on every page.
 * Also discoverable at /ontology.json and /ontology/skos.json.
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
