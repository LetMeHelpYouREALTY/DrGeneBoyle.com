import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'

type FaqItem = {
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

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteMetadata.siteUrl}/about#person`,
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
    image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
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
    '@id': `${siteMetadata.siteUrl}/#organization`,
    name: siteIdentity.worksFor.name,
    description: siteIdentity.worksFor.description,
    url: siteMetadata.siteUrl,
    telephone: siteIdentity.telephone,
    areaServed: siteIdentity.address.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    employee: { '@id': `${siteMetadata.siteUrl}/about#person` },
    sameAs: [siteIdentity.worksFor.url, siteIdentity.linkedin],
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
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteMetadata.siteUrl}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteMetadata.title,
      url: siteMetadata.siteUrl,
    },
    author: { '@id': `${siteMetadata.siteUrl}/about#person` },
    about: { '@id': `${siteMetadata.siteUrl}/about#person` },
  }
}
