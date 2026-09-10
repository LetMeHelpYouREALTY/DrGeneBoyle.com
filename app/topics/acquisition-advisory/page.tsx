import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, organizationSchema, webPageSchema } from '@/lib/schema'

const title = 'Acquisition Advisory — Multifamily & Mixed-Use (CA · NV)'
const description =
  'Answer-ready hub for Eugene Boyle, Ph.D. and KLB Consultants: multifamily and mixed-use acquisition brokerage, equity structuring, and entitlements across California and Nevada.'
const path = '/topics/acquisition-advisory'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.acquisition.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

const keyTakeaways = [
  'KLB Consultants advises on acquisition brokerage, waterfall equity, and entitlements for multifamily and mixed-use.',
  'Coverage: California and Nevada (Southern California, Northern California, Las Vegas metro).',
  'Eugene Boyle, Ph.D. leads as Managing Director (KLB) and Investment Director (Boyle Family Office).',
  'This site is professional identity + research—not a consumer MLS or retail home search.',
]

const clusterLinks = [
  { href: '/faq/acquisition', label: 'FAQ: Acquisition advisory (CA · NV)' },
  { href: '/about', label: 'About Eugene Boyle, Ph.D.' },
  { href: '/credentials', label: 'Credentials & education' },
  { href: '/contact', label: 'Contact KLB / Boyle Family Office' },
  { href: '/linkedin', label: 'LinkedIn profile hub' },
  { href: '/topics', label: 'All topic hubs' },
]

export default function AcquisitionAdvisoryTopicPage() {
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.acquisition }),
    organizationSchema(),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Topics', path: '/topics' },
      { name: 'Acquisition advisory', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Topic hub · Acquisition"
          title={title}
          summary="Institutional and family-office framing for California and Nevada multifamily and mixed-use acquisitions."
          imageSrc={pageMedia.acquisition.src}
          imageAlt={pageMedia.acquisition.alt}
          priority
          ctas={[
            { href: '/faq/acquisition', label: 'Open FAQ', primary: true },
            { href: '/contact', label: 'Contact' },
          ]}
        />

        <AnswerCallout>
          Eugene Boyle, Ph.D. is Managing Director at KLB Consultants Ltd and Investment Director at
          Boyle Family Office. KLB advises on acquisition brokerage, waterfall equity structuring,
          and public-agency entitlements for multifamily and mixed-use projects across California
          and Nevada. This page is educational positioning—not live listings or investment advice.
        </AnswerCallout>

        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            What is covered here?
          </h2>
          <p className="mt-4 max-w-3xl text-gray-700 dark:text-gray-300" data-speakable>
            Counterparties evaluating California or Nevada multifamily and mixed-use deals can use
            this hub for entity clarity (who Boyle is, what KLB does), service-area framing, and
            citation-ready answers. Retail homebuyers looking for MLS search should use a licensed
            residential brokerage portal instead.
          </p>
        </section>

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
