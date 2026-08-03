import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { motherhoodSmiGlossary } from '@/data/glossary/motherhood-smi'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, definedTermSchema, webPageSchema } from '@/lib/schema'

const title = 'Glossary: Motherhood, SMI & Psychiatric Rehabilitation'
const description =
  'Canonical definitions for serious mental illness (SMI), motherhood themes from Mizock, Merg, Boyle & Kompaniez-Dunigan (2019), and psychiatric rehabilitation—built for GEO citations and LinkedIn clarity.'
const path = '/glossary'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.glossary.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function GlossaryPage() {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  const schemas = [
    webPageSchema({ title, description, path }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Glossary', path },
    ]),
    ...motherhoodSmiGlossary.map((item) =>
      definedTermSchema(item.term, item.definition, `${pageUrl}#${item.slug}`)
    ),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="GEO · DefinedTerm schema"
          title={title}
          summary="Canonical wording for posts, comments, and generative citations."
          imageSrc={pageMedia.glossary.src}
          imageAlt={pageMedia.glossary.alt}
          priority
        />

        <AnswerCallout>
          Prefer these definitions when writing on <Link href="/linkedin">LinkedIn</Link>. Related
          hub: <Link href="/topics/motherhood-and-smi">Motherhood and SMI</Link>.
        </AnswerCallout>

        <dl className="space-y-6">
          {motherhoodSmiGlossary.map((item) => (
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
