import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import siteIdentity from '@/data/siteIdentity'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, organizationSchema, personSchema, webPageSchema } from '@/lib/schema'

const title = 'LinkedIn Profile Hub — Eugene Boyle, Ph.D.'
const description =
  'Canonical website hub for Eugene Boyle, Ph.D. (linkedin.com/in/geneboyle): Person/Organization schema with sameAs, ORCID, featured research pages, and share-ready URLs for SEO, GEO, and AEO.'
const path = '/linkedin'

export const metadata = genPageMetadata({
  title,
  description,
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
      { name: 'LinkedIn', path: path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="pt-6">
        <p className="text-primary-500 text-sm font-medium tracking-wide uppercase">
          Entity · sameAs LinkedIn + ORCID
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Direct answer: This page is the canonical web hub for{' '}
          <a
            href={siteIdentity.linkedin}
            className="text-primary-500 hover:underline"
            rel="noopener noreferrer"
          >
            linkedin.com/in/geneboyle
          </a>
          —so search and generative engines resolve one person (Eugene Joseph Boyle / Eugene Boyle,
          Ph.D.), one ORCID, and one set of citable topic pages.
        </p>

        <section className="mt-10 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile identity</h2>
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
              <strong>GitHub:</strong>{' '}
              <a href={siteIdentity.github} className="text-primary-500 hover:underline">
                github.com/geneboyle
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

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Experience highlights (from LinkedIn)
          </h2>
          <ul className="mt-6 space-y-5">
            {experienceHighlights.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Education</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {siteIdentity.education.map((edu) => (
              <li key={`${edu.degree}-${edu.school}`}>
                <strong>{edu.degree}</strong> — {edu.school} ({edu.locality})
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Featured pages to link from LinkedIn
          </h2>
          <ul className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            {featured.map((item) => (
              <li key={item.href} className="py-5">
                <Link
                  href={item.href}
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{item.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="prose dark:prose-invert mt-10 max-w-none">
          <h2>How to use this hub</h2>
          <ol>
            <li>
              Add this URL (or the motherhood topic hub) to LinkedIn <strong>Featured</strong>.
            </li>
            <li>In posts, deep-link the research brief, FAQ, or a glossary term anchor.</li>
            <li>
              Keep name strings consistent: Eugene Boyle, Ph.D. / Eugene Joseph Boyle / Gene Boyle.
            </li>
            <li>Reuse FAQ answers in comments for consistent AEO-friendly language.</li>
          </ol>
        </section>

        <div className="mt-10">
          <NapBlock />
        </div>
      </div>
    </>
  )
}
