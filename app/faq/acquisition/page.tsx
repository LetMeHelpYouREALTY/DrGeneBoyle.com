import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { acquisitionFaqs } from '@/data/faqs/acquisition'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/schema'

const title = 'FAQ: Acquisition Advisory (CA · NV)'
const description =
  'Answer-first FAQ on Eugene Boyle / KLB Consultants multifamily and mixed-use acquisition advisory across California and Nevada.'
const path = '/faq/acquisition'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.faqAcquisition.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function AcquisitionFaqPage() {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.faqAcquisition }),
    faqPageSchema(acquisitionFaqs, pageUrl),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Topics', path: '/topics' },
      { name: 'Acquisition advisory', path: '/topics/acquisition-advisory' },
      { name: 'FAQ: Acquisition', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="FAQ"
          title={title}
          summary="Short, citable answers for AI and human readers evaluating KLB acquisition positioning."
          imageSrc={pageMedia.faqAcquisition.src}
          imageAlt={pageMedia.faqAcquisition.alt}
          priority
        />

        <AnswerCallout>
          Canonical short answers for acquisition counterparties. Topic hub:{' '}
          <Link href="/topics/acquisition-advisory">Acquisition advisory (CA · NV)</Link>. Contact:{' '}
          <Link href="/contact">info@drgeneboyle.com</Link>.
        </AnswerCallout>

        <div className="space-y-8">
          {acquisitionFaqs.map((faq) => (
            <section
              key={faq.question}
              className="rounded-xl border border-gray-200 bg-white/70 p-6 dark:border-gray-700 dark:bg-gray-900/50"
              data-speakable
            >
              <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
                {faq.question}
              </h2>
              <p className="mt-3 max-w-3xl text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </section>
          ))}
        </div>

        <NapBlock />
      </div>
    </>
  )
}
