import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { motherhoodSmiFaqs } from '@/data/faqs/motherhood-smi'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/schema'
import SectionBlock from '@/components/SectionBlock'

const title = 'FAQ: Motherhood and Serious Mental Illness (SMI)'
const description =
  'Answer-first FAQ on motherhood and SMI, including Mizock, Merg, Boyle & Kompaniez-Dunigan (2019) themes and Eugene Boyle, Ph.D.’s research role.'
const path = '/faq/motherhood-smi'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.faq.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function MotherhoodSmiFaqPage() {
  const pageUrl = `${siteMetadata.siteUrl}${path}`
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.faq }),
    faqPageSchema(motherhoodSmiFaqs, pageUrl),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ: Motherhood and SMI', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="FAQ"
          title={title}
          summary="Short, self-contained answers for research citations and clinician education."
          imageSrc={pageMedia.faq.src}
          imageAlt={pageMedia.faq.alt}
          priority
        />

        <AnswerCallout>
          Use these Q&A blocks as the canonical short answers when citing this site. Full research
          brief: <Link href="/blog/motherhood-reimagined-smi-parenting">Motherhood Reimagined</Link>
          . Topic hub: <Link href="/topics/motherhood-and-smi">Motherhood and SMI</Link>.
        </AnswerCallout>

        <div className="space-y-10">
          {motherhoodSmiFaqs.map((faq) => (
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
