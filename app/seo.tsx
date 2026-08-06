import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  path?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  path,
  ...rest
}: PageSEOProps): Metadata {
  const desc = description || siteMetadata.description
  const pageUrl = path
    ? `${siteMetadata.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
    : undefined
  const ogImage = image || siteMetadata.socialBanner

  return {
    title,
    description: desc,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: desc,
      url: pageUrl || './',
      siteName: siteMetadata.title,
      images: [ogImage],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      description: desc,
      card: 'summary_large_image',
      images: [ogImage],
    },
    ...(pageUrl
      ? {
          alternates: {
            canonical: pageUrl,
            languages: {
              'en-US': pageUrl,
              en: pageUrl,
            },
          },
        }
      : {}),
    ...rest,
  }
}
