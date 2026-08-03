import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import { motherhoodSmiGlossary } from '@/data/glossary/motherhood-smi'
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
      <div className="pt-6">
        <p className="text-primary-500 text-sm font-medium tracking-wide uppercase">
          GEO · DefinedTerm schema
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Use these definitions when posting on{' '}
          <Link href="/linkedin" className="text-primary-500 hover:underline">
            LinkedIn
          </Link>{' '}
          or answering comments. Related hub:{' '}
          <Link href="/topics/motherhood-and-smi" className="text-primary-500 hover:underline">
            Motherhood and SMI
          </Link>
          .
        </p>

        <dl className="mt-10 space-y-8">
          {motherhoodSmiGlossary.map((item) => (
            <div
              key={item.slug}
              id={item.slug}
              className="scroll-mt-24 border-b border-gray-200 pb-8 dark:border-gray-700"
            >
              <dt className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.term}</dt>
              <dd className="mt-3 max-w-3xl text-gray-700 dark:text-gray-300">{item.definition}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <NapBlock />
        </div>
      </div>
    </>
  )
}
