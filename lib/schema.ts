import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { siteMedia } from '@/data/siteMedia'
import { resolveMediaUrl } from '@/lib/cloudflare-images'

export type FaqItem = {
  question: string
  answer: string
}

const place = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteIdentity.address.addressLocality,
    addressRegion: siteIdentity.address.addressRegion,
    addressCountry: siteIdentity.address.addressCountry,
  },
}

const personId = `${siteMetadata.siteUrl}/about#person`
const organizationId = `${siteMetadata.siteUrl}/#organization`
const websiteId = `${siteMetadata.siteUrl}/#website`

/** Default AEO/voice selectors — pair with `.answer-callout` and section H2s in the UI. */
export const defaultSpeakable = {
  '@type': 'SpeakableSpecification',
  cssSelector: ['h1', '.answer-callout', '[data-speakable]', 'section h2'],
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
    jobTitle: siteIdentity.jobTitle,
    description: siteIdentity.description,
    url: `${siteMetadata.siteUrl}/about`,
    email: siteIdentity.email,
    telephone: siteIdentity.telephone,
    image: (() => {
      const headshot = siteMedia.eugeneBoyleHeadshot
      const resolved = resolveMediaUrl(headshot.cfImageId, headshot.local, headshot.social)
      return resolved.startsWith('http') ? resolved : `${siteMetadata.siteUrl}${resolved}`
    })(),
    homeLocation: place,
    worksFor: {
      '@type': 'Organization',
      name: siteIdentity.worksFor.name,
      url: siteIdentity.worksFor.url,
      description: siteIdentity.worksFor.description,
    },
    alumniOf: siteIdentity.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.school,
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

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: siteIdentity.worksFor.name,
    description: siteIdentity.worksFor.description,
    url: siteMetadata.siteUrl,
    telephone: siteIdentity.telephone,
    areaServed: siteIdentity.address.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    employee: { '@id': personId },
    sameAs: [siteIdentity.worksFor.url, siteIdentity.linkedin],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    publisher: { '@id': organizationId },
    author: { '@id': personId },
    inLanguage: 'en-US',
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

export function definedTermSchema(
  term: string,
  description: string,
  pageUrl: string,
  termSet: { name: string; url: string } = {
    name: 'Eugene Boyle research glossary',
    url: `${siteMetadata.siteUrl}/glossary`,
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description,
    url: pageUrl,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: termSet.name,
      url: termSet.url,
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
    ...(speakable ? { speakable: defaultSpeakable } : {}),
    ...(image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image.src.startsWith('http') ? image.src : `${siteMetadata.siteUrl}${image.src}`,
            contentUrl: image.src.startsWith('http')
              ? image.src
              : `${siteMetadata.siteUrl}${image.src}`,
            description: image.alt,
            name: image.alt,
            caption: image.alt,
          },
        }
      : {}),
  }
}

export function contactPageSchema({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#contactpage`,
    name: title,
    description,
    url: pageUrl,
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    speakable: defaultSpeakable,
  }
}

export function blogPostingSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  image?: string
}) {
  const pageUrl = `${siteMetadata.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteMetadata.siteUrl}${image}`
    : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#blogposting`,
    headline: title,
    description,
    url: pageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId },
    author: { '@id': personId },
    publisher: { '@id': organizationId },
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    speakable: defaultSpeakable,
    ...(imageUrl
      ? {
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
          },
        }
      : {}),
  }
}

export const motherhoodGlossaryTermSet = {
  name: 'Motherhood, SMI & psychiatric rehabilitation glossary',
  url: `${siteMetadata.siteUrl}/glossary`,
}

export const ctmtGlossaryTermSet = {
  name: 'CTMT-2 & attentional assessment glossary',
  url: `${siteMetadata.siteUrl}/glossary/ctmt-attention`,
}
