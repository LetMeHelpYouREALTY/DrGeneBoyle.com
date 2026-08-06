import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { siteMedia } from '@/data/siteMedia'
import { resolveMediaUrl } from '@/lib/cloudflare-images'

type FaqItem = {
  question: string
  answer: string
}

type SchemaNode = Record<string, unknown>

const SITE = siteMetadata.siteUrl

/** Stable @id URIs for the sitewide knowledge graph */
export const schemaIds = {
  website: `${SITE}/#website`,
  person: `${SITE}/about#person`,
  organization: `${SITE}/#organization`,
  boyleFamilyOffice: `${SITE}/#boyle-family-office`,
  place: `${SITE}/#place-los-angeles`,
  ctmtTopic: `${SITE}/topics/ctmt-attention#topic`,
  motherhoodTopic: `${SITE}/topics/motherhood-and-smi#topic`,
  glossary: `${SITE}/glossary#terms`,
  dissertation: `${SITE}/blog/ctmt-attention-trail-making-dissertation#work`,
  motherhoodArticle: `${SITE}/blog/motherhood-reimagined-smi-parenting#work`,
} as const

function personImageUrl(): string {
  const headshot = siteMedia.eugeneBoyleHeadshot
  const resolved = resolveMediaUrl(headshot.cfImageId, headshot.local, headshot.social)
  return resolved.startsWith('http') ? resolved : `${SITE}${resolved}`
}

function placeNode(): SchemaNode {
  return {
    '@type': 'Place',
    '@id': schemaIds.place,
    name: `${siteIdentity.address.addressLocality}, ${siteIdentity.address.addressRegion}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteIdentity.address.addressLocality,
      addressRegion: siteIdentity.address.addressRegion,
      addressCountry: siteIdentity.address.addressCountry,
    },
  }
}

function personNode(): SchemaNode {
  return {
    '@type': 'Person',
    '@id': schemaIds.person,
    name: siteIdentity.name,
    alternateName: siteIdentity.alternateName,
    givenName: siteIdentity.givenName,
    familyName: siteIdentity.familyName,
    honorificSuffix: siteIdentity.honorificSuffix,
    jobTitle: [siteIdentity.jobTitle, ...siteIdentity.additionalRoles.map((r) => r.name)],
    description: siteIdentity.description,
    url: `${SITE}/about`,
    email: siteIdentity.email,
    telephone: siteIdentity.telephone,
    image: personImageUrl(),
    homeLocation: { '@id': schemaIds.place },
    worksFor: [{ '@id': schemaIds.organization }, { '@id': schemaIds.boyleFamilyOffice }],
    alumniOf: siteIdentity.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.school,
      address: {
        '@type': 'PostalAddress',
        addressLocality: edu.locality,
      },
    })),
    memberOf: siteIdentity.memberships.map((name) => ({
      '@type': 'Organization',
      name,
    })),
    knowsAbout: [
      ...siteIdentity.knowsAbout,
      { '@id': schemaIds.ctmtTopic },
      { '@id': schemaIds.motherhoodTopic },
    ],
    sameAs: siteIdentity.sameAs,
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'ORCID',
        value: '0000-0002-0183-8740',
      },
    ],
    hasCredential: siteIdentity.credentials.map((name) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: name,
    })),
  }
}

function organizationNode(): SchemaNode {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': schemaIds.organization,
    name: siteIdentity.worksFor.name,
    description: siteIdentity.worksFor.description,
    url: siteMetadata.siteUrl,
    telephone: siteIdentity.telephone,
    email: siteIdentity.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteIdentity.address.addressLocality,
      addressRegion: siteIdentity.address.addressRegion,
      addressCountry: siteIdentity.address.addressCountry,
    },
    areaServed: siteIdentity.address.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteIdentity.email,
        telephone: siteIdentity.telephone,
        areaServed: siteIdentity.address.areaServed,
        availableLanguage: ['English'],
      },
    ],
    employee: { '@id': schemaIds.person },
    founder: { '@id': schemaIds.person },
    sameAs: [siteIdentity.worksFor.url, siteIdentity.linkedin],
  }
}

function boyleFamilyOfficeNode(): SchemaNode {
  const role = siteIdentity.additionalRoles[0]
  return {
    '@type': 'Organization',
    '@id': schemaIds.boyleFamilyOffice,
    name: role?.organization ?? 'Boyle Family Office',
    description: role?.description,
    employee: { '@id': schemaIds.person },
  }
}

function websiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': schemaIds.website,
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: SITE,
    inLanguage: 'en-US',
    publisher: { '@id': schemaIds.organization },
    author: { '@id': schemaIds.person },
    about: [
      { '@id': schemaIds.person },
      { '@id': schemaIds.ctmtTopic },
      { '@id': schemaIds.motherhoodTopic },
    ],
  }
}

function topicNodes(): SchemaNode[] {
  return [
    {
      '@type': 'DefinedTerm',
      '@id': schemaIds.ctmtTopic,
      name: 'CTMT-2 & attentional assessment',
      description:
        'Research cluster on the Comprehensive Trail Making Test–Second Edition (CTMT-2) for attentional assessment in children and adolescents (Boyle, 2024).',
      url: `${SITE}/topics/ctmt-attention`,
      inDefinedTermSet: { '@id': schemaIds.glossary },
    },
    {
      '@type': 'DefinedTerm',
      '@id': schemaIds.motherhoodTopic,
      name: 'Motherhood and serious mental illness (SMI)',
      description:
        'Research cluster on experiences of women with SMI surrounding parenting (Mizock, Merg, Boyle & Kompaniez-Dunigan, 2019).',
      url: `${SITE}/topics/motherhood-and-smi`,
      inDefinedTermSet: { '@id': schemaIds.glossary },
    },
    {
      '@type': 'DefinedTermSet',
      '@id': schemaIds.glossary,
      name: 'Eugene Boyle research glossary',
      description:
        'Plain-language clinical and research terms used across CTMT-2 and motherhood/SMI topic hubs.',
      url: `${SITE}/glossary`,
      hasDefinedTerm: [{ '@id': schemaIds.ctmtTopic }, { '@id': schemaIds.motherhoodTopic }],
    },
  ]
}

function publicationNodes(): SchemaNode[] {
  return [
    {
      '@type': 'Thesis',
      '@id': schemaIds.dissertation,
      name: siteIdentity.publications[0].title,
      author: { '@id': schemaIds.person },
      datePublished: siteIdentity.publications[0].date,
      url: `${SITE}${siteIdentity.publications[0].sitePath}`,
      sameAs: siteIdentity.publications[0].url,
      inSupportOf: 'Ph.D. Clinical Psychology',
      sourceOrganization: {
        '@type': 'EducationalOrganization',
        name: siteIdentity.publications[0].institution,
      },
      identifier: [
        {
          '@type': 'PropertyValue',
          propertyID: 'ProQuest',
          value: siteIdentity.publications[0].proquestId,
        },
      ],
      about: { '@id': schemaIds.ctmtTopic },
    },
    {
      '@type': 'ScholarlyArticle',
      '@id': schemaIds.motherhoodArticle,
      name: siteIdentity.publications[1].title,
      author: { '@id': schemaIds.person },
      datePublished: String(siteIdentity.publications[1].year),
      url: `${SITE}${siteIdentity.publications[1].sitePath}`,
      identifier: `https://doi.org/${siteIdentity.publications[1].doi}`,
      about: { '@id': schemaIds.motherhoodTopic },
      isPartOf: {
        '@type': 'Periodical',
        name: 'Psychiatric Rehabilitation Journal',
      },
    },
  ]
}

/**
 * Sitewide JSON-LD knowledge graph (@graph) for every page.
 * Entities cross-link via stable @id so page-level schemas can reference them.
 */
export function siteKnowledgeGraph(): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      organizationNode(),
      boyleFamilyOfficeNode(),
      placeNode(),
      ...topicNodes(),
      ...publicationNodes(),
    ],
  }
}

/** @deprecated Prefer siteKnowledgeGraph(); kept for page-level extras that need a standalone Person node */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    ...personNode(),
  }
}

/** @deprecated Prefer siteKnowledgeGraph(); kept for page-level extras that need a standalone Organization node */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    ...organizationNode(),
  }
}

export function faqPageSchema(faqs: FaqItem[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    isPartOf: { '@id': schemaIds.website },
    author: { '@id': schemaIds.person },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function definedTermSchema(term: string, description: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description,
    url: pageUrl,
    inDefinedTermSet: { '@id': schemaIds.glossary },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  }
}

export function webPageSchema({
  title,
  description,
  path,
  image,
  type = 'WebPage',
}: {
  title: string
  description: string
  path: string
  image?: { src: string; alt: string }
  type?: 'WebPage' | 'ContactPage' | 'AboutPage' | 'CollectionPage'
}) {
  const pageUrl = `${SITE}${path === '/' ? '' : path}`
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${pageUrl || SITE}#webpage`,
    name: title,
    description,
    url: pageUrl || SITE,
    inLanguage: 'en-US',
    isPartOf: { '@id': schemaIds.website },
    author: { '@id': schemaIds.person },
    about: { '@id': schemaIds.person },
    publisher: { '@id': schemaIds.organization },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.answer-callout', 'h1'],
    },
    ...(image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image.src.startsWith('http') ? image.src : `${SITE}${image.src}`,
            contentUrl: image.src.startsWith('http') ? image.src : `${SITE}${image.src}`,
            description: image.alt,
            name: image.alt,
            caption: image.alt,
          },
        }
      : {}),
  }
}
