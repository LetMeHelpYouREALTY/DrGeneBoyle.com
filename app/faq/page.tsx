import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import SectionBlock from '@/components/SectionBlock'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'FAQ Index'
const description =
  'Answer-first FAQ hubs for Eugene Boyle, Ph.D.—CTMT-2 attentional assessment and motherhood & serious mental illness (SMI).'
const path = '/faq'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.faq.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

const hubs = [
  {
    href: '/faq/ctmt-attention',
    title: 'FAQ: CTMT-2 & attention',
    answer:
      'Short answers on Boyle (2024) CTMT-2 sample, measures, findings, and clinical framing for children and adolescents.',
  },
  {
    href: '/faq/motherhood-smi',
    title: 'FAQ: Motherhood and SMI',
    answer:
      'Short answers on Mizock, Merg, Boyle & Kompaniez-Dunigan (2019) themes and Eugene Boyle’s research role.',
  },
]

export default function FaqIndexPage() {
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.faq }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-10 pt-6">
        <PageHero
          eyebrow="FAQ"
          title={title}
          summary={description}
          imageSrc={pageMedia.faq.src}
          imageAlt={pageMedia.faq.alt}
          priority
        />

        <SectionBlock
          id="faq-hubs"
          title="Choose an FAQ hub"
          answer="Use these FAQ hubs as canonical short-answer sources for CTMT-2 and motherhood & SMI questions."
        >
          <ul className="mt-6 space-y-8">
            {hubs.map((hub) => (
              <li key={hub.href}>
                <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
                  <Link href={hub.href} className="hover:underline">
                    {hub.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-3xl text-gray-700 dark:text-gray-300">{hub.answer}</p>
              </li>
            ))}
          </ul>
        </SectionBlock>

        <NapBlock />
      </div>
    </>
  )
}
