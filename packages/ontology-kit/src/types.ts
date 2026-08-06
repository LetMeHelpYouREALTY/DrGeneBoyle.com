/** SKOS-style relation within a scheme */
export type OntologyRelation = {
  /** Concept slug within the same scheme */
  slug: string
  type: 'broader' | 'narrower' | 'related'
}

export type OntologyConcept = {
  slug: string
  prefLabel: string
  altLabels?: string[]
  definition: string
  /** Preferred citation page path on the publishing site */
  pagePath?: string
  /** Glossary fragment path */
  glossaryPath?: string
  relations?: OntologyRelation[]
}

export type OntologyScheme = {
  id: string
  name: string
  description: string
  hubPath: string
  glossaryPath: string
  faqPath: string
  concepts: OntologyConcept[]
}

/**
 * Site binding for ontology graphs.
 * Pass the same config from every project so builders stay portable.
 */
export type OntologySiteConfig = {
  /** Public site origin, no trailing slash (e.g. https://www.example.com) */
  siteUrl: string
  /**
   * Canonical IRI base for concept/scheme @ids.
   * Defaults to siteUrl. Set to a shared authority when multiple projects
   * publish the same vocabulary (cross-site sameAs / global IDs).
   */
  ontologyBaseUrl?: string
  catalogName: string
  catalogDescription: string
  creatorName: string
  publisherName: string
  /** Stable Schema.org @id for the Person creator */
  creatorId: string
  /** Stable Schema.org @id for the Organization publisher */
  publisherId: string
  schemes: OntologyScheme[]
  /** Optional scheme.id → knowledge-graph topic @id */
  topicIds?: Record<string, string>
}

export type JsonNode = Record<string, unknown>
