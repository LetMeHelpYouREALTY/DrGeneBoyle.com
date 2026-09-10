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
const description = `Topic hubs for ${siteIdentity.name}: CTMT-2 attentional assessment, motherhood & SMI research, and California–Nevada acquisition advisory.`

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.topics.src,
  alternates: { canonical: `${siteMetadata.siteUrl}/topics` },
})

const topics = [
  {
    href: '/topics/acquisition-advisory',
    title: 'Acquisition advisory (CA · NV)',
    summary:
      'KLB Consultants multifamily and mixed-use acquisition brokerage, equity structuring, and entitlements across California and Nevada.',
    image: pageMedia.acquisition,
  },
  {
    href: '/topics/ctmt-attention',
    title: 'CTMT-2 & attentional assessment',
    summary:
      'Fielding Ph.D. dissertation (2024-12-02)—CTMT-2 utility for selective/everyday attention and processing speed in children and adolescents (N = 30).',
    image: pageMedia.ctmtAttention,
  },
  {
    href: '/topics/motherhood-and-smi',
    title: 'Motherhood and serious mental illness (SMI)',
    summary:
      'Pillar for Mizock et al. (2019)—co-authored by Eugene Joseph Boyle—with five themes, clinician takeaways, FAQ, and glossary.',
    image: pageMedia.motherhoodSmi,
  },
  {
    href: '/faq/acquisition',
    title: 'FAQ: Acquisition advisory',
    summary: 'Answer-first Q&A on KLB markets, services, and citation guidance.',
    image: pageMedia.faqAcquisition,
  },
  {
    href: '/faq/ctmt-attention',
    title: 'FAQ: CTMT-2 & attention',
    summary: 'Answer-first Q&A on Boyle (2024) sample, measures, and findings.',
    image: pageMedia.faqCtmt,
  },
  {
    href: '/faq/motherhood-smi',
    title: 'FAQ: Motherhood and SMI',
    summary: 'Answer-first Q&A on the 2019 study themes and Boyle’s research role.',
    image: pageMedia.faq,
  },
  {
    href: '/glossary/ctmt-attention',
    title: 'Glossary: CTMT-2 terms',
    summary: 'Definitions for CTMT-2, PSI, TEA-Ch2 indices, and ADHD assessment framing.',
    image: pageMedia.glossaryCtmt,
  },
  {
    href: '/glossary',
    title: 'Glossary: SMI & parenting terms',
    summary: 'Canonical definitions for motherhood themes and psychiatric rehabilitation.',
    image: pageMedia.glossary,
  },
  {
    href: '/publications',
    title: 'Publications',
    summary: 'Dissertation and peer-reviewed publications with on-site research briefs.',
    image: pageMedia.publications,
  },
  {
    href: '/linkedin',
    title: 'LinkedIn profile hub',
    summary: 'Canonical website hub aligned with linkedin.com/in/geneboyle.',
    image: pageMedia.linkedin,
  },
]

export default function TopicsPage() {
  const schemas = [
    webPageSchema({ title, description, path: '/topics', image: pageMedia.topics }),
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
