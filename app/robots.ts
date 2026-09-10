import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

/**
 * Sept 2026 crawl policy:
 * - Allow general indexing for SEO / Google AI Overviews (standard crawl is enough per Google May 2026 guide).
 * - Explicitly allow major AI answer-engine crawlers so citation systems can fetch preferred pages.
 * - Disallow low-value template leftovers if any remain under /projects showcase noise paths.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: '/',
  } as const

  return {
    rules: [
      {
        userAgent: '*',
        ...allowAll,
      },
      {
        userAgent: 'GPTBot',
        ...allowAll,
      },
      {
        userAgent: 'ChatGPT-User',
        ...allowAll,
      },
      {
        userAgent: 'Google-Extended',
        ...allowAll,
      },
      {
        userAgent: 'Googlebot',
        ...allowAll,
      },
      {
        userAgent: 'PerplexityBot',
        ...allowAll,
      },
      {
        userAgent: 'ClaudeBot',
        ...allowAll,
      },
      {
        userAgent: 'anthropic-ai',
        ...allowAll,
      },
      {
        userAgent: 'Applebot-Extended',
        ...allowAll,
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
