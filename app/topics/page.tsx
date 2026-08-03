import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Topics'
const description = `Topic hubs supporting ${siteIdentity.name}'s LinkedIn profile: motherhood and SMI research, psychiatric rehabilitation explainers, and institutional insights for SEO, GEO, and AEO.`

export const metadata = genPageMetadata({
  title,
  description,
  alternates: { canonical: `${siteMetadata.siteUrl}/topics` },
})

const topics = [
  {
    href: '/topics/motherhood-and-smi',
    title: 'Motherhood and serious mental illness (SMI)',
    summary:
      'Pillar for Mizock et al. (2019)—co-authored by Eugene Joseph Boyle—with five themes, clinician takeaways, FAQ, and glossary.',
  },
  {
    href: '/faq/motherhood-smi',
    title: 'FAQ: Motherhood and SMI',
    summary:
      'Answer-first Q&A for snippets, AI overviews, and LinkedIn replies—with matching FAQPage schema.',
  },
  {
    href: '/glossary',
    title: 'Glossary: SMI & parenting terms',
    summary: 'Canonical definitions (DefinedTerm) readers and generative engines can cite cleanly.',
  },
  {
    href: '/linkedin',
    title: 'LinkedIn profile hub',
    summary:
      'Canonical website ↔ linkedin.com/in/geneboyle entity page with sameAs, ORCID, and share-ready URLs.',
  },
]

export default function TopicsPage() {
  const schemas = [
    webPageSchema({ title, description, path: '/topics' }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Topics', path: '/topics' },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
            Topics
          </h1>
          <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {topics.map((topic) => (
            <li key={topic.href} className="py-8">
              <h2 className="text-2xl font-bold tracking-tight">
                <Link href={topic.href} className="text-gray-900 dark:text-gray-100">
                  {topic.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-3xl text-gray-600 dark:text-gray-400">{topic.summary}</p>
              <Link
                href={topic.href}
                className="text-primary-500 mt-3 inline-block text-sm font-medium"
              >
                Open topic →
              </Link>
            </li>
          ))}
        </ul>
        <div className="pt-10">
          <NapBlock />
        </div>
      </div>
    </>
  )
}
