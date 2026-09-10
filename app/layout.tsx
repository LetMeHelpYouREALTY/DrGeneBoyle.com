import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { DM_Sans, Fraunces } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import siteMetadata from '@/data/siteMetadata'
import { siteMedia } from '@/data/siteMedia'
import { cloudflareImageUrl, isCloudflareImagesConfigured } from '@/lib/cloudflare-images'
import {
  boyleFamilyOfficeSchema,
  organizationSchema,
  personSchema,
  webSiteSchema,
} from '@/lib/schema'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
  verification: {
    google: siteMetadata.googleSiteVerification,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const headshot = siteMedia.eugeneBoyleHeadshot
  const useCf = isCloudflareImagesConfigured()
  const icon16 =
    (useCf &&
      cloudflareImageUrl(headshot.cfImageId, {
        width: 16,
        height: 16,
        fit: 'cover',
        gravity: 'face',
        format: 'auto',
      })) ||
    `${basePath}/static/favicons/favicon-16x16.png`
  const icon32 =
    (useCf &&
      cloudflareImageUrl(headshot.cfImageId, {
        width: 32,
        height: 32,
        fit: 'cover',
        gravity: 'face',
        format: 'auto',
      })) ||
    `${basePath}/static/favicons/favicon-32x32.png`
  const appleTouch =
    (useCf && cloudflareImageUrl(headshot.cfImageId, headshot.favicon)) ||
    `${basePath}/static/favicons/apple-touch-icon.png`

  return (
    <html
      lang={siteMetadata.language}
      className={`${dmSans.variable} ${fraunces.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href={icon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={icon16} />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouch} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#0f2744"
      />
      <meta name="msapplication-TileColor" content="#0f2744" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f2744" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <JsonLd
          data={[personSchema(), organizationSchema(), boyleFamilyOfficeSchema(), webSiteSchema()]}
        />
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className="mb-auto">{children}</main>
            </SearchProvider>
            <Footer />
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
