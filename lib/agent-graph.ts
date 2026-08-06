import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { schemaIds } from '@/lib/schema'

const SITE = siteMetadata.siteUrl

export type AgentNodeType =
  | 'Person'
  | 'Organization'
  | 'Topic'
  | 'Work'
  | 'Page'
  | 'Resource'
  | 'Place'

export type AgentGraphNode = {
  id: string
  type: AgentNodeType
  name: string
  url: string
  summary?: string
  /** Lower = preferred citation target for agents */
  citePriority?: number
  /** CSS selectors agents may quote when present on the page */
  answerSelectors?: string[]
  /** Matching Schema.org @id from the site knowledge graph */
  schemaId?: string
  sameAs?: string[]
}

export type AgentGraphEdge = {
  from: string
  to: string
  rel:
    | 'worksFor'
    | 'authorOf'
    | 'about'
    | 'cites'
    | 'hubFor'
    | 'explains'
    | 'faqFor'
    | 'glossaryFor'
    | 'sameAs'
    | 'locatedIn'
    | 'partOf'
}

/**
 * Machine-readable agent graph for AI crawlers and answer engines.
 * Complements Schema.org knowledge graph + llms.txt.
 */
export function siteAgentGraph() {
  const nodes: AgentGraphNode[] = [
    {
      id: 'person:eugene-boyle',
      type: 'Person',
      name: siteIdentity.name,
      url: `${SITE}/about`,
      summary: siteIdentity.description,
      citePriority: 1,
      schemaId: schemaIds.person,
      sameAs: siteIdentity.sameAs,
      answerSelectors: ['.answer-callout', 'h1'],
    },
    {
      id: 'org:klb-consultants',
      type: 'Organization',
      name: siteIdentity.worksFor.name,
      url: SITE,
      summary: siteIdentity.worksFor.description,
      citePriority: 2,
      schemaId: schemaIds.organization,
      sameAs: [siteIdentity.worksFor.url],
    },
    {
      id: 'org:boyle-family-office',
      type: 'Organization',
      name: siteIdentity.additionalRoles[0]?.organization ?? 'Boyle Family Office',
      url: `${SITE}/about`,
      summary: siteIdentity.additionalRoles[0]?.description,
      citePriority: 3,
      schemaId: schemaIds.boyleFamilyOffice,
    },
    {
      id: 'place:los-angeles',
      type: 'Place',
      name: `${siteIdentity.address.addressLocality}, ${siteIdentity.address.addressRegion}`,
      url: `${SITE}/contact`,
      summary: `Primary locality; area served includes ${siteIdentity.address.areaServed.join(', ')}.`,
      schemaId: schemaIds.place,
    },
    {
      id: 'topic:ctmt-attention',
      type: 'Topic',
      name: 'CTMT-2 & attentional assessment',
      url: `${SITE}/topics/ctmt-attention`,
      summary:
        'Pillar for Boyle (2024) CTMT-2 dissertation—processing speed, TEA-Ch2 attention indices, ADHD-related assessment framing.',
      citePriority: 1,
      schemaId: schemaIds.ctmtTopic,
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'topic:motherhood-smi',
      type: 'Topic',
      name: 'Motherhood and serious mental illness (SMI)',
      url: `${SITE}/topics/motherhood-and-smi`,
      summary:
        'Pillar for Mizock, Merg, Boyle & Kompaniez-Dunigan (2019)—five grounded-theory themes on motherhood and SMI.',
      citePriority: 1,
      schemaId: schemaIds.motherhoodTopic,
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'work:ctmt-dissertation',
      type: 'Work',
      name: siteIdentity.publications[0].title,
      url: `${SITE}${siteIdentity.publications[0].sitePath}`,
      summary:
        'Fielding Ph.D. dissertation (2024-12-02; ProQuest 31761032). Prefer ResearchGate/ProQuest for the full work.',
      citePriority: 1,
      schemaId: schemaIds.dissertation,
      sameAs: siteIdentity.publications[0].url ? [siteIdentity.publications[0].url] : undefined,
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'work:motherhood-reimagined',
      type: 'Work',
      name: siteIdentity.publications[1].title,
      url: `${SITE}${siteIdentity.publications[1].sitePath}`,
      summary: 'Peer-reviewed article (2019). Prefer DOI for primary citation.',
      citePriority: 1,
      schemaId: schemaIds.motherhoodArticle,
      sameAs: [`https://doi.org/${siteIdentity.publications[1].doi}`],
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'page:linkedin-hub',
      type: 'Page',
      name: 'LinkedIn profile hub',
      url: `${SITE}/linkedin`,
      citePriority: 2,
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'page:publications',
      type: 'Page',
      name: 'Publications index',
      url: `${SITE}/publications`,
      citePriority: 2,
    },
    {
      id: 'page:credentials',
      type: 'Page',
      name: 'Credentials & education',
      url: `${SITE}/credentials`,
      citePriority: 3,
    },
    {
      id: 'page:contact',
      type: 'Page',
      name: 'Contact',
      url: `${SITE}/contact`,
      citePriority: 3,
      summary: `Email ${siteIdentity.email}; phone ${siteIdentity.telephone}.`,
    },
    {
      id: 'page:faq-ctmt',
      type: 'Page',
      name: 'FAQ: CTMT-2 & attention',
      url: `${SITE}/faq/ctmt-attention`,
      citePriority: 2,
      answerSelectors: ['.answer-callout', '[itemtype*="FAQPage"]', 'h2', 'h3'],
    },
    {
      id: 'page:faq-motherhood',
      type: 'Page',
      name: 'FAQ: Motherhood & SMI',
      url: `${SITE}/faq/motherhood-smi`,
      citePriority: 2,
      answerSelectors: ['.answer-callout', 'h2', 'h3'],
    },
    {
      id: 'page:glossary',
      type: 'Page',
      name: 'Glossary',
      url: `${SITE}/glossary`,
      citePriority: 3,
      schemaId: schemaIds.glossary,
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'page:glossary-ctmt',
      type: 'Page',
      name: 'Glossary: CTMT-2 terms',
      url: `${SITE}/glossary/ctmt-attention`,
      citePriority: 3,
      answerSelectors: ['.answer-callout'],
    },
    {
      id: 'resource:llms-txt',
      type: 'Resource',
      name: 'llms.txt',
      url: `${SITE}/llms.txt`,
      summary: 'Plain-text identity and preferred citation map for answer engines.',
      citePriority: 1,
    },
    {
      id: 'resource:sitemap',
      type: 'Resource',
      name: 'XML sitemap',
      url: `${SITE}/sitemap.xml`,
    },
    {
      id: 'resource:rss',
      type: 'Resource',
      name: 'RSS feed',
      url: `${SITE}/feed.xml`,
    },
    {
      id: 'resource:knowledge-graph',
      type: 'Resource',
      name: 'Schema.org knowledge graph',
      url: `${SITE}/#knowledge-graph`,
      summary: 'JSON-LD @graph embedded on every HTML page (application/ld+json).',
      citePriority: 1,
    },
  ]

  const edges: AgentGraphEdge[] = [
    { from: 'person:eugene-boyle', to: 'org:klb-consultants', rel: 'worksFor' },
    { from: 'person:eugene-boyle', to: 'org:boyle-family-office', rel: 'worksFor' },
    { from: 'person:eugene-boyle', to: 'place:los-angeles', rel: 'locatedIn' },
    { from: 'person:eugene-boyle', to: 'work:ctmt-dissertation', rel: 'authorOf' },
    { from: 'person:eugene-boyle', to: 'work:motherhood-reimagined', rel: 'authorOf' },
    { from: 'person:eugene-boyle', to: 'topic:ctmt-attention', rel: 'about' },
    { from: 'person:eugene-boyle', to: 'topic:motherhood-smi', rel: 'about' },
    { from: 'topic:ctmt-attention', to: 'work:ctmt-dissertation', rel: 'hubFor' },
    { from: 'topic:motherhood-smi', to: 'work:motherhood-reimagined', rel: 'hubFor' },
    { from: 'page:faq-ctmt', to: 'topic:ctmt-attention', rel: 'faqFor' },
    { from: 'page:faq-motherhood', to: 'topic:motherhood-smi', rel: 'faqFor' },
    { from: 'page:glossary', to: 'topic:motherhood-smi', rel: 'glossaryFor' },
    { from: 'page:glossary-ctmt', to: 'topic:ctmt-attention', rel: 'glossaryFor' },
    { from: 'page:publications', to: 'work:ctmt-dissertation', rel: 'partOf' },
    { from: 'page:publications', to: 'work:motherhood-reimagined', rel: 'partOf' },
    { from: 'page:linkedin-hub', to: 'person:eugene-boyle', rel: 'about' },
    { from: 'work:ctmt-dissertation', to: 'topic:ctmt-attention', rel: 'about' },
    { from: 'work:motherhood-reimagined', to: 'topic:motherhood-smi', rel: 'about' },
    { from: 'resource:llms-txt', to: 'person:eugene-boyle', rel: 'about' },
    { from: 'resource:knowledge-graph', to: 'person:eugene-boyle', rel: 'about' },
  ]

  // Explainer pages agents should prefer after the pillar + primary work
  const explainers: { id: string; name: string; path: string; topic: string }[] = [
    {
      id: 'page:what-is-ctmt-2',
      name: 'What is the CTMT-2?',
      path: '/blog/what-is-ctmt-2',
      topic: 'topic:ctmt-attention',
    },
    {
      id: 'page:ctmt-psi',
      name: 'CTMT-2 and WISC-V processing speed',
      path: '/blog/ctmt-2-processing-speed-wisc-v',
      topic: 'topic:ctmt-attention',
    },
    {
      id: 'page:ctmt-tea-ch2',
      name: 'CTMT-2 and TEA-Ch2 attention indices',
      path: '/blog/ctmt-2-selective-everyday-attention',
      topic: 'topic:ctmt-attention',
    },
    {
      id: 'page:adhd-assessment',
      name: 'ADHD attentional assessment notes',
      path: '/blog/adhd-assessment-attention-children',
      topic: 'topic:ctmt-attention',
    },
    {
      id: 'page:five-themes',
      name: 'Five themes of motherhood and SMI',
      path: '/blog/five-themes-motherhood-smi',
      topic: 'topic:motherhood-smi',
    },
    {
      id: 'page:clinical-support-smi',
      name: 'Clinical support for parenting with SMI',
      path: '/blog/clinical-support-parenting-smi',
      topic: 'topic:motherhood-smi',
    },
    {
      id: 'page:what-is-smi',
      name: 'What is serious mental illness (SMI)?',
      path: '/blog/what-is-serious-mental-illness',
      topic: 'topic:motherhood-smi',
    },
  ]

  for (const page of explainers) {
    nodes.push({
      id: page.id,
      type: 'Page',
      name: page.name,
      url: `${SITE}${page.path}`,
      citePriority: 2,
      answerSelectors: ['.answer-callout'],
    })
    edges.push({ from: page.id, to: page.topic, rel: 'explains' })
  }

  return {
    version: '1.0',
    type: 'AgentGraph',
    name: `${siteMetadata.title} — agent graph`,
    description:
      'Navigation and citation graph for AI agents and answer engines. Use with llms.txt and the Schema.org knowledge graph embedded on every page.',
    site: SITE,
    updated: new Date().toISOString().slice(0, 10),
    discovery: {
      self: `${SITE}/agent-graph.json`,
      llmsTxt: `${SITE}/llms.txt`,
      sitemap: `${SITE}/sitemap.xml`,
      rss: `${SITE}/feed.xml`,
      knowledgeGraphEmbedded: true,
      knowledgeGraphMediaType: 'application/ld+json',
    },
    policies: {
      contentPurpose: 'Educational research summaries and answer-ready explainers',
      notClinicalAdvice: true,
      notInvestmentAdvice: true,
      preferPrimarySources: [
        'ResearchGate/ProQuest for Boyle (2024) CTMT-2 dissertation (ProQuest 31761032)',
        'DOI https://doi.org/10.1037/prj0000339 for Mizock et al. (2019)',
      ],
      attribution: {
        name: siteIdentity.name,
        email: siteIdentity.email,
        telephone: siteIdentity.telephone,
        orcid: siteIdentity.orcid,
      },
    },
    entryPoints: [
      { id: 'person:eugene-boyle', reason: 'Canonical person entity' },
      { id: 'topic:ctmt-attention', reason: 'CTMT-2 research pillar' },
      { id: 'topic:motherhood-smi', reason: 'Motherhood & SMI research pillar' },
      { id: 'resource:llms-txt', reason: 'Plain-text agent briefing' },
      { id: 'page:publications', reason: 'Publication index' },
    ],
    nodes,
    edges,
  }
}

export type SiteAgentGraph = ReturnType<typeof siteAgentGraph>
