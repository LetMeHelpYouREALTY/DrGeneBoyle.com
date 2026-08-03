import Link from '@/components/Link'
import Image from '@/components/Image'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Topics'
const description = `Topic hubs supporting ${siteIdentity.name}'s LinkedIn profile: motherhood and SMI research, psychiatric rehabilitation explainers, and institutional insights for SEO, GEO, and AEO.`

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.topics.src,
  alternates: { canonical: `${siteMetadata.siteUrl}/topics` },
})

const topics = [
  {
    href: '/topics/motherhood-and-smi',
    title: 'Motherhood and serious mental illness (SMI)',
    summary:
      'Pillar for Mizock et al. (2019)—co-authored by Eugene Joseph Boyle—with five themes, clinician takeaways, FAQ, and glossary.',
    image: pageMedia.motherhoodSmi,
  },
  {
    href: '/faq/motherhood-smi',
    title: 'FAQ: Motherhood and SMI',
    summary:
      'Answer-first Q&A for snippets, AI overviews, and LinkedIn replies—with matching FAQPage schema.',
    image: pageMedia.faq,
  },
  {
    href: '/glossary',
    title: 'Glossary: SMI & parenting terms',
    summary: 'Canonical definitions (DefinedTerm) readers and generative engines can cite cleanly.',
    image: pageMedia.glossary,
  },
  {
    href: '/linkedin',
    title: 'LinkedIn profile hub',
    summary:
      'Canonical website ↔ linkedin.com/in/geneboyle entity page with sameAs, ORCID, and share-ready URLs.',
    image: pageMedia.linkedin,
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
      <div className="space-y-10 pt-6">
        <PageHero
          eyebrow="Topic architecture"
          title={title}
          summary={description}
          imageSrc={pageMedia.topics.src}
          imageAlt={pageMedia.topics.alt}
          priority
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic.href}>
              <Link
                href={topic.href}
                className="group block overflow-hidden rounded-xl border border-gray-200 bg-white/80 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/60"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={topic.image.src}
                    alt={topic.image.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {topic.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{topic.summary}</p>
                  <span className="text-primary-500 mt-3 inline-block text-sm font-medium">
                    Open topic →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <NapBlock />
      </div>
    </>
  )
}
