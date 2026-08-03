import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import { motherhoodSmiFaqs } from '@/data/faqs/motherhood-smi'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/schema'

const title = 'FAQ: Motherhood and Serious Mental Illness (SMI)'
const description =
  'Answer-first FAQ on motherhood and SMI, including Mizock, Merg, Boyle & Kompaniez-Dunigan (2019) themes and Eugene Boyle, Ph.D.’s research role—structured for AEO, GEO, and LinkedIn.'
const path = '/faq/motherhood-smi'

export const metadata = genPageMetadata({
  title,
  description,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function MotherhoodSmiFaqPage() {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  const schemas = [
    webPageSchema({ title, description, path }),
    faqPageSchema(motherhoodSmiFaqs, pageUrl),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ: Motherhood and SMI', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="pt-6">
        <p className="text-primary-500 text-sm font-medium tracking-wide uppercase">
          AEO · FAQPage schema
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Short, self-contained answers for search snippets, AI overviews, and LinkedIn comment
          replies. Full brief:{' '}
          <Link
            href="/blog/motherhood-reimagined-smi-parenting"
            className="text-primary-500 hover:underline"
          >
            Motherhood Reimagined
          </Link>
          . Topic hub:{' '}
          <Link href="/topics/motherhood-and-smi" className="text-primary-500 hover:underline">
            Motherhood and SMI
          </Link>
          .
        </p>

        <div className="mt-10 space-y-8">
          {motherhoodSmiFaqs.map((faq) => (
            <section
              key={faq.question}
              className="border-b border-gray-200 pb-8 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{faq.question}</h2>
              <p className="mt-3 max-w-3xl text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <NapBlock />
        </div>
      </div>
    </>
  )
}
