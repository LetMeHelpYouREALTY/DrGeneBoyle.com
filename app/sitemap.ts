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
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const pillarRoutes = [
    { route: '', priority: 1, changeFrequency: 'weekly' as const },
    { route: 'topics/ctmt-attention', priority: 0.95, changeFrequency: 'monthly' as const },
    { route: 'topics/motherhood-and-smi', priority: 0.95, changeFrequency: 'monthly' as const },
    { route: 'publications', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: 'about', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: 'blog', priority: 0.85, changeFrequency: 'weekly' as const },
    { route: 'faq/ctmt-attention', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: 'faq/motherhood-smi', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: 'glossary', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'glossary/ctmt-attention', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'topics', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'credentials', priority: 0.75, changeFrequency: 'yearly' as const },
    { route: 'contact', priority: 0.75, changeFrequency: 'yearly' as const },
    { route: 'linkedin', priority: 0.75, changeFrequency: 'monthly' as const },
    { route: 'tags', priority: 0.5, changeFrequency: 'monthly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency,
    priority,
  }))

  return [...pillarRoutes, ...blogRoutes]
}
