import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { ctmtAttentionFaqs } from '@/data/faqs/ctmt-attention'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/schema'
import SectionBlock from '@/components/SectionBlock'

const title = 'FAQ: CTMT-2 & Attentional Assessment'
const description =
  'Answer-first FAQ on Eugene Boyle’s 2024 CTMT-2 dissertation—sample, measures, findings, and clinical framing for children and adolescents.'
const path = '/faq/ctmt-attention'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.faqCtmt.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function CtmtAttentionFaqPage() {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.faqCtmt }),
    faqPageSchema(ctmtAttentionFaqs, pageUrl),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ: CTMT-2 & attention', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="FAQ"
          title={title}
          summary="Short answers drawn from the Boyle (2024) dissertation abstract."
          imageSrc={pageMedia.faqCtmt.src}
          imageAlt={pageMedia.faqCtmt.alt}
          priority
        />

        <AnswerCallout>
          Canonical short answers for this cluster. Full brief:{' '}
          <Link href="/blog/ctmt-attention-trail-making-dissertation">CTMT-2 dissertation</Link>.
          Topic hub: <Link href="/topics/ctmt-attention">CTMT-2 & attentional assessment</Link>.
        </AnswerCallout>

        <div className="space-y-10">
          {ctmtAttentionFaqs.map((faq) => (
            <SectionBlock
              key={faq.question}
              title={faq.question}
              answer={faq.answer}
              answerLabel="Answer"
            />
          ))}
        </div>

        <NapBlock />
      </div>
    </>
  )
}
