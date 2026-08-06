import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { researchOntologies } from '@/data/ontologies'
import { schemaIds } from '@/lib/schema'
import {
  buildOntologyCatalog,
  buildOntologyGraph,
  buildSkosOntology,
  type OntologySiteConfig,
} from '@lmhy/ontology-kit'

/**
 * Site binding for the global ontology kit.
 * Other projects copy packages/ontology-kit and supply their own config + schemes.
 */
export const ontologyConfig: OntologySiteConfig = {
  siteUrl: siteMetadata.siteUrl,
  catalogName: 'Eugene Boyle research ontologies',
  catalogDescription:
    'Controlled vocabularies for CTMT-2 attentional assessment and motherhood & SMI research published on drgeneboyle.com.',
  creatorName: siteIdentity.name,
  publisherName: siteIdentity.worksFor.name,
  creatorId: schemaIds.person,
  publisherId: schemaIds.organization,
  schemes: researchOntologies,
  topicIds: {
    'ctmt-attention': schemaIds.ctmtTopic,
    'motherhood-smi': schemaIds.motherhoodTopic,
  },
}

/** Schema.org DefinedTermSet graph (every page + /ontology.json) */
export function siteOntologyGraph() {
  return buildOntologyGraph(ontologyConfig)
}

/** SKOS ConceptScheme graph (/ontology/skos.json) */
export function siteSkosOntology() {
  return buildSkosOntology(ontologyConfig)
}

/** Compact catalog for agent-graph discovery */
export function ontologyCatalog() {
  return buildOntologyCatalog(ontologyConfig)
}
