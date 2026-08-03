import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { ctmtAttentionGlossary } from '@/data/glossary/ctmt-attention'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, definedTermSchema, webPageSchema } from '@/lib/schema'

const title = 'Glossary: CTMT-2, Attention & ADHD Assessment'
const description =
  'Canonical definitions for CTMT-2, attentional deficits, WISC-V PSI, TEA-Ch2 attention indices, and related terms from Eugene Boyle’s 2024 dissertation cluster.'
const path = '/glossary/ctmt-attention'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.glossaryCtmt.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function CtmtAttentionGlossaryPage() {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.glossaryCtmt }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Glossary: CTMT-2', path },
    ]),
    ...ctmtAttentionGlossary.map((item) =>
      definedTermSchema(item.term, item.definition, `${pageUrl}#${item.slug}`)
    ),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Glossary"
          title={title}
          summary="Canonical wording for CTMT-2 dissertation posts and citations."
          imageSrc={pageMedia.glossaryCtmt.src}
          imageAlt={pageMedia.glossaryCtmt.alt}
          priority
        />

        <AnswerCallout>
          Related hub: <Link href="/topics/ctmt-attention">CTMT-2 & attentional assessment</Link>.
          Motherhood glossary: <Link href="/glossary">SMI & parenting terms</Link>.
        </AnswerCallout>

        <dl className="space-y-6">
          {ctmtAttentionGlossary.map((item) => (
            <div
              key={item.slug}
              id={item.slug}
              className="scroll-mt-24 rounded-xl border border-gray-200 bg-white/70 p-6 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <dt className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
                {item.term}
              </dt>
              <dd className="mt-3 max-w-3xl text-gray-700 dark:text-gray-300">{item.definition}</dd>
            </div>
          ))}
        </dl>

        <NapBlock />
      </div>
    </>
  )
}
