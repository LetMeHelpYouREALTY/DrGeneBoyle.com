import {
  absoluteSitePath,
  catalogId,
  conceptId,
  ontologyOrigin,
  schemeAboutId,
  schemeNodeId,
  siteOrigin,
} from './ids'
import type { JsonNode, OntologyScheme, OntologySiteConfig } from './types'

/**
 * Schema.org DefinedTermSet / DefinedTerm ontology graph for AEO.
 * Relations are expressed as PropertyValue (skos:broader / skos:related);
 * full SKOS lives at /ontology/skos.json on the publishing site.
 */
export function buildOntologyGraph(config: OntologySiteConfig): JsonNode {
  const site = siteOrigin(config)
  const catalog = catalogId(config)

  const graph: JsonNode[] = [
    {
      '@type': 'DataCatalog',
      '@id': catalog,
      name: config.catalogName,
      description: config.catalogDescription,
      url: `${site}/ontologies`,
      creator: { '@id': config.creatorId },
      publisher: { '@id': config.publisherId },
      dataset: config.schemes.map((scheme) => ({
        '@id': schemeNodeId(config, scheme.id),
      })),
    },
  ]

  for (const scheme of config.schemes) {
    graph.push(...schemaOrgSchemeNodes(config, scheme))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function schemaOrgSchemeNodes(config: OntologySiteConfig, scheme: OntologyScheme): JsonNode[] {
  const site = siteOrigin(config)
  const nodes: JsonNode[] = [
    {
      '@type': ['DefinedTermSet', 'Dataset'],
      '@id': schemeNodeId(config, scheme.id),
      name: scheme.name,
      description: scheme.description,
      url: `${site}/ontologies#${scheme.id}`,
      about: { '@id': schemeAboutId(config, scheme) },
      creator: { '@id': config.creatorId },
      publisher: { '@id': config.publisherId },
      isPartOf: { '@id': catalogId(config) },
      hasDefinedTerm: scheme.concepts.map((concept) => ({
        '@id': conceptId(config, scheme.id, concept.slug),
      })),
    },
  ]

  for (const concept of scheme.concepts) {
    const broader = concept.relations?.filter((r) => r.type === 'broader') ?? []
    const related = concept.relations?.filter((r) => r.type === 'related') ?? []
    const narrower = concept.relations?.filter((r) => r.type === 'narrower') ?? []

    const properties = [
      ...broader.map((rel) => ({
        '@type': 'PropertyValue',
        propertyID: 'skos:broader',
        value: conceptId(config, scheme.id, rel.slug),
      })),
      ...narrower.map((rel) => ({
        '@type': 'PropertyValue',
        propertyID: 'skos:narrower',
        value: conceptId(config, scheme.id, rel.slug),
      })),
      ...related.map((rel) => ({
        '@type': 'PropertyValue',
        propertyID: 'skos:related',
        value: conceptId(config, scheme.id, rel.slug),
      })),
    ]

    nodes.push({
      '@type': 'DefinedTerm',
      '@id': conceptId(config, scheme.id, concept.slug),
      name: concept.prefLabel,
      ...(concept.altLabels?.length ? { alternateName: concept.altLabels } : {}),
      description: concept.definition,
      termCode: concept.slug,
      url: concept.pagePath
        ? absoluteSitePath(config, concept.pagePath)
        : absoluteSitePath(config, `${scheme.glossaryPath}#${concept.slug}`),
      inDefinedTermSet: { '@id': schemeNodeId(config, scheme.id) },
      ...(concept.glossaryPath
        ? { sameAs: absoluteSitePath(config, concept.glossaryPath) }
        : {}),
      ...(properties.length ? { additionalProperty: properties } : {}),
    })
  }

  return nodes
}

/** SKOS JSON-LD concept schemes for linked-data / agent consumers. */
export function buildSkosOntology(config: OntologySiteConfig): JsonNode {
  const site = siteOrigin(config)
  const graph: JsonNode[] = [
    {
      '@id': catalogId(config),
      '@type': 'skos:ConceptScheme',
      'skos:prefLabel': config.catalogName,
      'skos:definition': config.catalogDescription,
      'dc:creator': config.creatorName,
      'dc:publisher': config.publisherName,
      'rdfs:seeAlso': [`${site}/ontologies`, `${site}/ontology.json`, `${site}/ontology/skos.json`],
      'skos:hasTopConcept': config.schemes.map((scheme) => ({
        '@id': schemeNodeId(config, scheme.id),
      })),
    },
  ]

  for (const scheme of config.schemes) {
    graph.push(...skosSchemeNodes(config, scheme))
  }

  return {
    '@context': {
      skos: 'http://www.w3.org/2004/02/skos/core#',
      dc: 'http://purl.org/dc/terms/',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      schema: 'https://schema.org/',
    },
    '@graph': graph,
  }
}

function skosSchemeNodes(config: OntologySiteConfig, scheme: OntologyScheme): JsonNode[] {
  const topConcepts = scheme.concepts.filter((c) => !c.relations?.some((r) => r.type === 'broader'))

  const nodes: JsonNode[] = [
    {
      '@id': schemeNodeId(config, scheme.id),
      '@type': 'skos:ConceptScheme',
      'skos:prefLabel': scheme.name,
      'skos:definition': scheme.description,
      'skos:hasTopConcept': topConcepts.map((c) => ({
        '@id': conceptId(config, scheme.id, c.slug),
      })),
      'rdfs:seeAlso': [
        absoluteSitePath(config, scheme.hubPath),
        absoluteSitePath(config, scheme.glossaryPath),
        absoluteSitePath(config, scheme.faqPath),
      ],
      'schema:about': { '@id': schemeAboutId(config, scheme) },
    },
  ]

  for (const concept of scheme.concepts) {
    const broader = concept.relations?.filter((r) => r.type === 'broader') ?? []
    const narrower = concept.relations?.filter((r) => r.type === 'narrower') ?? []
    const related = concept.relations?.filter((r) => r.type === 'related') ?? []

    nodes.push({
      '@id': conceptId(config, scheme.id, concept.slug),
      '@type': 'skos:Concept',
      'skos:inScheme': { '@id': schemeNodeId(config, scheme.id) },
      'skos:prefLabel': concept.prefLabel,
      ...(concept.altLabels?.length ? { 'skos:altLabel': concept.altLabels } : {}),
      'skos:definition': concept.definition,
      'skos:notation': concept.slug,
      ...(broader.length
        ? {
            'skos:broader': broader.map((r) => ({
              '@id': conceptId(config, scheme.id, r.slug),
            })),
          }
        : { 'skos:topConceptOf': { '@id': schemeNodeId(config, scheme.id) } }),
      ...(narrower.length
        ? {
            'skos:narrower': narrower.map((r) => ({
              '@id': conceptId(config, scheme.id, r.slug),
            })),
          }
        : {}),
      ...(related.length
        ? {
            'skos:related': related.map((r) => ({
              '@id': conceptId(config, scheme.id, r.slug),
            })),
          }
        : {}),
      'rdfs:seeAlso': [
        ...(concept.pagePath ? [absoluteSitePath(config, concept.pagePath)] : []),
        ...(concept.glossaryPath ? [absoluteSitePath(config, concept.glossaryPath)] : []),
      ],
    })
  }

  return nodes
}

/** Compact catalog for agent-graph / llms.txt discovery */
export function buildOntologyCatalog(config: OntologySiteConfig) {
  const site = siteOrigin(config)
  return {
    version: '1.0',
    type: 'OntologyCatalog',
    name: config.catalogName,
    site,
    ontologyBaseUrl: ontologyOrigin(config),
    updated: new Date().toISOString().slice(0, 10),
    creator: config.creatorName,
    urls: {
      html: `${site}/ontologies`,
      schemaOrg: `${site}/ontology.json`,
      skos: `${site}/ontology/skos.json`,
    },
    schemes: config.schemes.map((scheme) => ({
      id: scheme.id,
      name: scheme.name,
      description: scheme.description,
      conceptCount: scheme.concepts.length,
      hub: absoluteSitePath(config, scheme.hubPath),
      glossary: absoluteSitePath(config, scheme.glossaryPath),
      faq: absoluteSitePath(config, scheme.faqPath),
      schemaId: schemeNodeId(config, scheme.id),
    })),
  }
}

export function getOntologyScheme(
  schemes: OntologyScheme[],
  id: string
): OntologyScheme | undefined {
  return schemes.find((scheme) => scheme.id === id)
}
