import { ctmtAttentionOntology } from './ctmt-attention'
import { motherhoodSmiOntology } from './motherhood-smi'
import type { OntologyScheme } from './types'

export type { OntologyConcept, OntologyRelation, OntologyScheme } from './types'
export { ctmtAttentionOntology, motherhoodSmiOntology }

/** All research ontologies published on this site */
export const researchOntologies: OntologyScheme[] = [ctmtAttentionOntology, motherhoodSmiOntology]

export function getOntologyScheme(id: string): OntologyScheme | undefined {
  return researchOntologies.find((scheme) => scheme.id === id)
}
