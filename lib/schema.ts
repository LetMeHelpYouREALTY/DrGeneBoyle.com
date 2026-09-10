import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { siteMedia } from '@/data/siteMedia'
import { resolveMediaUrl } from '@/lib/cloudflare-images'

type FaqItem = {
  question: string
  answer: string
}

const personId = `${siteMetadata.siteUrl}/about#person`
const organizationId = `${siteMetadata.siteUrl}/#organization`
const familyOfficeId = `${siteMetadata.siteUrl}/#boyle-family-office`
const websiteId = `${siteMetadata.siteUrl}/#website`

const place = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteIdentity.address.addressLocality,
    addressRegion: siteIdentity.address.addressRegion,
    addressCountry: siteIdentity.address.addressCountry,
  },
}

const areaServed = siteIdentity.address.areaServed.map((name) => ({
  '@type': 'AdministrativeArea',
  name,
}))

function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  return `${siteMetadata.siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

function personImageUrl() {
  const headshot = siteMedia.eugeneBoyleHeadshot
  const resolved = resolveMediaUrl(headshot.cfImageId, headshot.local, headshot.social)
  return resolved.startsWith('http') ? resolved : `${siteMetadata.siteUrl}${resolved}`
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: siteIdentity.name,
    alternateName: siteIdentity.alternateName,
    givenName: siteIdentity.givenName,
    familyName: siteIdentity.familyName,
    honorificSuffix: siteIdentity.honorificSuffix,
    jobTitle: [siteIdentity.jobTitle, ...siteIdentity.additionalRoles.map((role) => role.name)],
    description: siteIdentity.description,
    url: `${siteMetadata.siteUrl}/about`,
    email: siteIdentity.email,
    telephone: siteIdentity.telephone,
    image: personImageUrl(),
    homeLocation: place,
    worksFor: [
      { '@id': organizationId },
      {
        '@type': 'Organization',
        '@id': familyOfficeId,
        name: 'Boyle Family Office',
        description: siteIdentity.additionalRoles[0]?.description,
      },
    ],
    alumniOf: siteIdentity.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.school,
    })),
    hasCredential: siteIdentity.credentials.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional credential',
      name: credential,
    })),
    memberOf: siteIdentity.memberships.map((name) => ({
      '@type': 'Organization',
      name,
    })),
    knowsAbout: siteIdentity.knowsAbout,
    sameAs: siteIdentity.sameAs,
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'ORCID',
        value: '0000-0002-0183-8740',
      },
    ],
  }
}

/** KLB Consultants as acquisition brokerage / RealEstateAgent entity (CA/NV). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'RealEstateAgent', 'ProfessionalService'],
    '@id': organizationId,
    name: siteIdentity.worksFor.name,
    legalName: siteIdentity.worksFor.name,
    description: siteIdentity.worksFor.description,
    url: siteMetadata.siteUrl,
    telephone: siteIdentity.telephone,
    email: siteIdentity.email,
    image: personImageUrl(),
    address: place.address,
    areaServed,
    priceRange: '$$$$',
    knowsAbout: [
      'Multifamily acquisition',
      'Mixed-use development',
      'Acquisition brokerage',
      'Waterfall equity structuring',
      'Public-agency entitlements',
      'California real estate',
      'Nevada real estate',
    ],
    employee: { '@id': personId },
    founder: { '@id': personId },
    sameAs: [siteIdentity.worksFor.url, siteIdentity.linkedin],
    parentOrganization: { '@id': familyOfficeId },
  }
}

export function boyleFamilyOfficeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': familyOfficeId,
    name: 'Boyle Family Office',
    description: siteIdentity.additionalRoles[0]?.description,
    url: siteMetadata.siteUrl,
    employee: { '@id': personId },
    areaServed,
    sameAs: [siteIdentity.linkedin],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    inLanguage: 'en-US',
    publisher: { '@id': organizationId },
    about: { '@id': personId },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function faqPageSchema(faqs: FaqItem[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
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
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Motherhood and SMI Glossary',
      url: `${siteMetadata.siteUrl}/glossary`,
    },
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
      item: `${siteMetadata.siteUrl}${item.path}`,
    })),
  }
}

export function webPageSchema({
  title,
  description,
  path,
  image,
  speakable = true,
}: {
  title: string
  description: string
  path: string
  image?: { src: string; alt: string }
  speakable?: boolean
}) {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: title,
    description,
    url: pageUrl,
    isPartOf: { '@id': websiteId },
    author: { '@id': personId },
    about: { '@id': personId },
    publisher: { '@id': organizationId },
    inLanguage: 'en-US',
    ...(speakable
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '[data-speakable]', '.answer-callout', 'article h2', 'section h2'],
          },
        }
      : {}),
    ...(image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: absoluteUrl(image.src),
            contentUrl: absoluteUrl(image.src),
            description: image.alt,
            name: image.alt,
            caption: image.alt,
          },
        }
      : {}),
  }
}

export function scholarlyArticleSchema({
  title,
  description,
  datePublished,
  url,
  doi,
  about,
}: {
  title: string
  description: string
  datePublished: string
  url: string
  doi?: string
  about?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: title,
    name: title,
    description,
    datePublished,
    url,
    ...(doi ? { sameAs: `https://doi.org/${doi}`, identifier: doi } : {}),
    author: { '@id': personId },
    publisher: { '@id': organizationId },
    ...(about ? { about: about.map((name) => ({ '@type': 'Thing', name })) } : {}),
  }
}

export function thesisSchema({
  title,
  description,
  datePublished,
  url,
  institution,
}: {
  title: string
  description: string
  datePublished: string
  url: string
  institution: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Thesis',
    name: title,
    description,
    datePublished,
    url,
    author: { '@id': personId },
    sourceOrganization: {
      '@type': 'CollegeOrUniversity',
      name: institution,
    },
  }
}
