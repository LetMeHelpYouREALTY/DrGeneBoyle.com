export type OntologyRelation = {
  /** Concept slug within the same scheme */
  slug: string
  /** SKOS-style relation */
  type: 'broader' | 'narrower' | 'related'
}

export type OntologyConcept = {
  slug: string
  prefLabel: string
  altLabels?: string[]
  definition: string
  /** Path on this site for the preferred citation page */
  pagePath?: string
  /** Fragment on glossary page */
  glossaryPath?: string
  relations?: OntologyRelation[]
}

export type OntologyScheme = {
  id: string
  name: string
  description: string
  /** Canonical hub URL path */
  hubPath: string
  glossaryPath: string
  faqPath: string
  concepts: OntologyConcept[]
}
