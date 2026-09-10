import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const staticRoutes = [
    '',
    'blog',
    'topics',
    'topics/motherhood-and-smi',
    'topics/ctmt-attention',
    'topics/acquisition-advisory',
    'faq/motherhood-smi',
    'faq/ctmt-attention',
    'faq/acquisition',
    'glossary',
    'glossary/ctmt-attention',
    'publications',
    'credentials',
    'contact',
    'connect',
    'email-signature',
    'linkedin',
    'about',
    'tags',
  ].map((route) => ({
    // Homepage must match canonical (no trailing slash; next.config trailingSlash: false)
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...staticRoutes, ...blogRoutes]
}
