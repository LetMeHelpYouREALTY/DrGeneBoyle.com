import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import siteIdentity from '@/data/siteIdentity'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, organizationSchema, personSchema, webPageSchema } from '@/lib/schema'

const title = 'LinkedIn Profile Hub — Eugene Boyle, Ph.D.'
const description =
  'Canonical website hub for Eugene Boyle, Ph.D. (linkedin.com/in/geneboyle): Person/Organization schema with sameAs, ORCID, featured research pages, and share-ready URLs for SEO, GEO, and AEO.'
const path = '/linkedin'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.linkedin.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

const featured = [
  {
    href: '/topics/motherhood-and-smi',
    title: 'Topic hub: Motherhood and SMI',
    blurb: 'Pillar page for LinkedIn carousels and posts on the 2019 study.',
  },
  {
    href: '/blog/motherhood-reimagined-smi-parenting',
    title: 'Research brief: Motherhood Reimagined',
    blurb: 'Cited summary of Mizock, Merg, Boyle & Kompaniez-Dunigan (2019).',
  },
  {
    href: '/faq/motherhood-smi',
    title: 'FAQ (AEO)',
    blurb: 'Copy-paste answers for comments and AI extraction.',
  },
  {
    href: '/glossary',
    title: 'Glossary (GEO)',
    blurb: 'Canonical definitions with DefinedTerm schema.',
  },
  {
    href: '/about',
    title: 'About Eugene Boyle, Ph.D.',
    blurb: 'Full bio aligned with LinkedIn experience and education.',
  },
]

const experienceHighlights = [
  {
    title: 'Managing Director — KLB Consultants Ltd',
    detail:
      'Financial modeling, due diligence, and waterfall structuring for multifamily and mixed-use acquisitions in California and Nevada (since 2005).',
  },
  {
    title: 'Investment Director — Boyle Family Office',
    detail:
      'Private placement sourcing, pre-IPO diligence, and multi-asset portfolio risk (since 2009).',
  },
  {
    title: 'Clinical / research path',
    detail:
      'Ph.D. Clinical Psychology (Fielding); forensic psychology internship at Heartland Behavioral Healthcare; qualitative analyst on women with SMI research under Lauren Mizock, Ph.D.',
  },
  {
    title: 'Public-company CFO — Samaritan Pharmaceuticals',
    detail:
      'Led AMEX IPO and SEC reporting; administered $2.3M+ NIH STTR grants; Registered U.S. Patent Agent integrating IP and finance (1995–2009).',
  },
]

export default function LinkedInHubPage() {
  const schemas = [
    personSchema(),
    organizationSchema(),
    webPageSchema({ title, description, path }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'LinkedIn', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Entity · sameAs LinkedIn + ORCID"
          title={title}
          summary="Connect website identity to linkedin.com/in/geneboyle for search and generative engines."
          imageSrc={pageMedia.linkedin.src}
          imageAlt={pageMedia.linkedin.alt}
          priority
          ctas={[
            { href: siteIdentity.linkedin, label: 'Open LinkedIn profile', primary: true },
            { href: '/topics/motherhood-and-smi', label: 'Motherhood & SMI hub' },
          ]}
        />

        <AnswerCallout>
          This page is the canonical web hub for{' '}
          <a href={siteIdentity.linkedin} rel="noopener noreferrer">
            linkedin.com/in/geneboyle
          </a>
          —so engines resolve one person (Eugene Joseph Boyle / Eugene Boyle, Ph.D.), one ORCID, and
          one set of citable topic pages.
        </AnswerCallout>

        <section className="rounded-xl border border-gray-200 bg-white/80 p-6 dark:border-gray-700 dark:bg-gray-900/50">
          <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
            Profile identity
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Name:</strong> {siteIdentity.name} (Eugene Joseph Boyle)
            </li>
            <li>
              <strong>Headline:</strong> {siteIdentity.headline}
            </li>
            <li>
              <strong>Location:</strong> {siteIdentity.address.addressLocality} Metropolitan Area
            </li>
            <li>
              <strong>LinkedIn:</strong>{' '}
              <a href={siteIdentity.linkedin} className="text-primary-500 hover:underline">
                {siteIdentity.linkedin}
              </a>
            </li>
            <li>
              <strong>ORCID:</strong>{' '}
              <a href={siteIdentity.orcid} className="text-primary-500 hover:underline">
                0000-0002-0183-8740
              </a>
            </li>
            <li>
              <strong>Phone (KLB):</strong>{' '}
              <a href={siteIdentity.telephoneTel} className="text-primary-500 hover:underline">
                {siteIdentity.telephone}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Experience highlights (from LinkedIn)
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {experienceHighlights.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-900/50"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Featured pages to link from LinkedIn
          </h2>
          <ul className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white/70 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900/50">
            {featured.map((item) => (
              <li key={item.href} className="p-5">
                <Link
                  href={item.href}
                  className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{item.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <NapBlock />
      </div>
    </>
  )
}
