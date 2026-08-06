import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { researchOntologies, type OntologyScheme } from '@/data/ontologies'
import { schemaIds } from '@/lib/schema'

const SITE = siteMetadata.siteUrl

type JsonNode = Record<string, unknown>

function conceptId(schemeIdValue: string, slug: string): string {
  return `${SITE}/ontology/${schemeIdValue}#${slug}`
}

function schemeNodeId(schemeIdValue: string): string {
  return `${SITE}/ontology/${schemeIdValue}#scheme`
}

function schemeAboutId(scheme: OntologyScheme): string {
  if (scheme.id === 'ctmt-attention') return schemaIds.ctmtTopic
  if (scheme.id === 'motherhood-smi') return schemaIds.motherhoodTopic
  return `${SITE}${scheme.hubPath}#topic`
}

/**
 * Schema.org DefinedTermSet / DefinedTerm ontology graph for AEO.
 * Relations are expressed as PropertyValue (skos:broader / skos:related);
 * full SKOS lives at /ontology/skos.json.
 */
export function siteOntologyGraph(): JsonNode {
  const graph: JsonNode[] = [
    {
      '@type': 'DataCatalog',
      '@id': `${SITE}/ontology#catalog`,
      name: 'Eugene Boyle research ontologies',
      description:
        'Controlled vocabularies for CTMT-2 attentional assessment and motherhood & SMI research published on drgeneboyle.com.',
      url: `${SITE}/ontologies`,
      creator: { '@id': schemaIds.person },
      publisher: { '@id': schemaIds.organization },
      dataset: researchOntologies.map((scheme) => ({
        '@id': schemeNodeId(scheme.id),
      })),
    },
  ]

  for (const scheme of researchOntologies) {
    graph.push(...schemaOrgSchemeNodes(scheme))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function schemaOrgSchemeNodes(scheme: OntologyScheme): JsonNode[] {
  const nodes: JsonNode[] = [
    {
      '@type': ['DefinedTermSet', 'Dataset'],
      '@id': schemeNodeId(scheme.id),
      name: scheme.name,
      description: scheme.description,
      url: `${SITE}/ontologies#${scheme.id}`,
      about: { '@id': schemeAboutId(scheme) },
      creator: { '@id': schemaIds.person },
      publisher: { '@id': schemaIds.organization },
      isPartOf: { '@id': `${SITE}/ontology#catalog` },
      hasDefinedTerm: scheme.concepts.map((concept) => ({
        '@id': conceptId(scheme.id, concept.slug),
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
        value: conceptId(scheme.id, rel.slug),
      })),
      ...narrower.map((rel) => ({
        '@type': 'PropertyValue',
        propertyID: 'skos:narrower',
        value: conceptId(scheme.id, rel.slug),
      })),
      ...related.map((rel) => ({
        '@type': 'PropertyValue',
        propertyID: 'skos:related',
        value: conceptId(scheme.id, rel.slug),
      })),
    ]

    nodes.push({
      '@type': 'DefinedTerm',
      '@id': conceptId(scheme.id, concept.slug),
      name: concept.prefLabel,
      ...(concept.altLabels?.length ? { alternateName: concept.altLabels } : {}),
      description: concept.definition,
      termCode: concept.slug,
      url: concept.pagePath
        ? `${SITE}${concept.pagePath}`
        : `${SITE}${scheme.glossaryPath}#${concept.slug}`,
      inDefinedTermSet: { '@id': schemeNodeId(scheme.id) },
      ...(concept.glossaryPath ? { sameAs: `${SITE}${concept.glossaryPath}` } : {}),
      ...(properties.length ? { additionalProperty: properties } : {}),
    })
  }

  return nodes
}

/**
 * SKOS JSON-LD concept schemes for linked-data / agent consumers.
 */
export function siteSkosOntology(): JsonNode {
  const graph: JsonNode[] = [
    {
      '@id': `${SITE}/ontology#catalog`,
      '@type': 'skos:ConceptScheme',
      'skos:prefLabel': 'Eugene Boyle research ontologies',
      'skos:definition':
        'Root catalog grouping CTMT-2 attentional assessment and motherhood & SMI concept schemes.',
      'dc:creator': siteIdentity.name,
      'dc:publisher': siteIdentity.worksFor.name,
      'rdfs:seeAlso': [`${SITE}/ontologies`, `${SITE}/ontology.json`, `${SITE}/ontology/skos.json`],
      'skos:hasTopConcept': researchOntologies.map((scheme) => ({
        '@id': schemeNodeId(scheme.id),
      })),
    },
  ]

  for (const scheme of researchOntologies) {
    graph.push(...skosSchemeNodes(scheme))
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

function skosSchemeNodes(scheme: OntologyScheme): JsonNode[] {
  const topConcepts = scheme.concepts.filter((c) => !c.relations?.some((r) => r.type === 'broader'))

  const nodes: JsonNode[] = [
    {
      '@id': schemeNodeId(scheme.id),
      '@type': 'skos:ConceptScheme',
      'skos:prefLabel': scheme.name,
      'skos:definition': scheme.description,
      'skos:hasTopConcept': topConcepts.map((c) => ({
        '@id': conceptId(scheme.id, c.slug),
      })),
      'rdfs:seeAlso': [
        `${SITE}${scheme.hubPath}`,
        `${SITE}${scheme.glossaryPath}`,
        `${SITE}${scheme.faqPath}`,
      ],
      'schema:about': { '@id': schemeAboutId(scheme) },
    },
  ]

  for (const concept of scheme.concepts) {
    const broader = concept.relations?.filter((r) => r.type === 'broader') ?? []
    const narrower = concept.relations?.filter((r) => r.type === 'narrower') ?? []
    const related = concept.relations?.filter((r) => r.type === 'related') ?? []

    nodes.push({
      '@id': conceptId(scheme.id, concept.slug),
      '@type': 'skos:Concept',
      'skos:inScheme': { '@id': schemeNodeId(scheme.id) },
      'skos:prefLabel': concept.prefLabel,
      ...(concept.altLabels?.length ? { 'skos:altLabel': concept.altLabels } : {}),
      'skos:definition': concept.definition,
      'skos:notation': concept.slug,
      ...(broader.length
        ? {
            'skos:broader': broader.map((r) => ({
              '@id': conceptId(scheme.id, r.slug),
            })),
          }
        : { 'skos:topConceptOf': { '@id': schemeNodeId(scheme.id) } }),
      ...(narrower.length
        ? {
            'skos:narrower': narrower.map((r) => ({
              '@id': conceptId(scheme.id, r.slug),
            })),
          }
        : {}),
      ...(related.length
        ? {
            'skos:related': related.map((r) => ({
              '@id': conceptId(scheme.id, r.slug),
            })),
          }
        : {}),
      'rdfs:seeAlso': [
        ...(concept.pagePath ? [`${SITE}${concept.pagePath}`] : []),
        ...(concept.glossaryPath ? [`${SITE}${concept.glossaryPath}`] : []),
      ],
    })
  }

  return nodes
}

/** Compact catalog for agent-graph discovery */
export function ontologyCatalog() {
  return {
    version: '1.0',
    type: 'OntologyCatalog',
    name: 'Eugene Boyle research ontologies',
    site: SITE,
    updated: new Date().toISOString().slice(0, 10),
    creator: siteIdentity.name,
    urls: {
      html: `${SITE}/ontologies`,
      schemaOrg: `${SITE}/ontology.json`,
      skos: `${SITE}/ontology/skos.json`,
    },
    schemes: researchOntologies.map((scheme) => ({
      id: scheme.id,
      name: scheme.name,
      description: scheme.description,
      conceptCount: scheme.concepts.length,
      hub: `${SITE}${scheme.hubPath}`,
      glossary: `${SITE}${scheme.glossaryPath}`,
      faq: `${SITE}${scheme.faqPath}`,
      schemaId: schemeNodeId(scheme.id),
    })),
  }
}
