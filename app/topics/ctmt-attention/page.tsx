import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import { blogMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'CTMT-2 & Attentional Assessment'
const description =
  'Topic hub for Eugene Boyle’s 2024 Fielding dissertation on the Comprehensive Trail Making Test-Second Edition (CTMT-2) in children and adolescents—research brief, explainers, FAQ, and glossary.'
const path = '/topics/ctmt-attention'

export const metadata = genPageMetadata({
  title,
  description,
  image: blogMedia.ctmtDissertation.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

const keyTakeaways = [
  'Boyle (2024) studied CTMT-2 with WISC-V, CAt-C, and TEA-Ch2 in ages 8–15 (N = 30).',
  'CTMT-2 performance related to processing speed (PSI) and TEA-Ch2 selective/everyday attention.',
  'Abstract frames CTMT-2 as a supplemental tool for comprehensive attentional assessment.',
]

const clusterLinks = [
  {
    href: '/blog/ctmt-attention-trail-making-dissertation',
    label: 'Research brief: CTMT-2 dissertation (Boyle, 2024)',
  },
  { href: '/blog/what-is-ctmt-2', label: 'Definition: What is the CTMT-2?' },
  {
    href: '/blog/ctmt-2-processing-speed-wisc-v',
    label: 'Explainer: CTMT-2 and WISC-V processing speed',
  },
  {
    href: '/blog/ctmt-2-selective-everyday-attention',
    label: 'Explainer: CTMT-2 and TEA-Ch2 attention indices',
  },
  {
    href: '/blog/adhd-assessment-attention-children',
    label: 'Practice notes: ADHD attentional assessment',
  },
  { href: '/faq/ctmt-attention', label: 'FAQ: CTMT-2 & attention' },
  { href: '/glossary/ctmt-attention', label: 'Glossary: CTMT-2 terms' },
  { href: '/publications', label: 'Publications index' },
]

export default function CtmtAttentionTopicPage() {
  const schemas = [
    webPageSchema({ title, description, path }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Topics', path: '/topics' },
      { name: 'CTMT-2 & attentional assessment', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Topic hub"
          title={title}
          summary="Citable pillar for Boyle’s CTMT-2 dissertation on attentional assessment in children and adolescents."
          imageSrc={blogMedia.ctmtDissertation.src}
          imageAlt={blogMedia.ctmtDissertation.alt}
          priority
          ctas={[
            {
              href: '/blog/ctmt-attention-trail-making-dissertation',
              label: 'Read research brief',
              primary: true,
            },
            { href: '/faq/ctmt-attention', label: 'Open FAQ' },
          ]}
        />

        <AnswerCallout>
          Doctoral dissertation by Boyle, Eugene (Fielding Graduate University, 2024-12-02;
          ProQuest 31761032). Full text on ResearchGate / ProQuest—this hub summarizes the abstract
          for citation and navigation.
        </AnswerCallout>

        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Key takeaways
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Cluster pages
          </h2>
          <ul className="mt-4 space-y-3">
            {clusterLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary-500 font-medium hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <NapBlock />
      </div>
    </>
  )
}
