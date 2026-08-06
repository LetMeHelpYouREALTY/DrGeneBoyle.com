import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import siteIdentity from '@/data/siteIdentity'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Eugene Boyle, Ph.D. on LinkedIn'
const description =
  'Professional profile overview for Eugene Boyle, Ph.D.—Managing Director at KLB Consultants, Fielding Clinical Psychology Ph.D., LinkedIn and ORCID links, and featured research.'
const path = '/linkedin'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.linkedin.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

const featured = [
  {
    href: '/blog/ctmt-attention-trail-making-dissertation',
    title: 'Dissertation: CTMT–2 & attentional deficits',
    blurb:
      'Fielding Ph.D. (2024-12-02)—CTMT-2 vs WISC-V PSI and TEA-Ch2 attention indices in ages 8–15 (N = 30).',
  },
  {
    href: '/topics/motherhood-and-smi',
    title: 'Topic hub: Motherhood and SMI',
    blurb: 'Overview of the 2019 Psychiatric Rehabilitation Journal study on motherhood and SMI.',
  },
  {
    href: '/blog/motherhood-reimagined-smi-parenting',
    title: 'Research brief: Motherhood Reimagined',
    blurb: 'Summary of Mizock, Merg, Boyle & Kompaniez-Dunigan (2019).',
  },
  {
    href: '/faq/motherhood-smi',
    title: 'FAQ',
    blurb: 'Short answers to common questions about the motherhood and SMI research.',
  },
  {
    href: '/glossary',
    title: 'Glossary',
    blurb: 'Plain-language definitions of key clinical and research terms.',
  },
  {
    href: '/about',
    title: 'About Eugene Boyle, Ph.D.',
    blurb: 'Full biography, education, and professional background.',
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
      'Ph.D. Clinical Psychology (Fielding)—dissertation on CTMT-2 attentional assessment in children and adolescents (2024-12-02; Boyle, Eugene); forensic psychology internship at Heartland Behavioral Healthcare; qualitative analyst on women with SMI research under Lauren Mizock, Ph.D.',
  },
  {
    title: 'Public-company CFO — Samaritan Pharmaceuticals',
    detail:
      'Led AMEX IPO and SEC reporting; administered $2.3M+ NIH STTR grants; Registered U.S. Patent Agent integrating IP and finance (1995–2009).',
  },
]

export default function LinkedInHubPage() {
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.linkedin }),
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
          eyebrow="Professional profile"
          title={title}
          summary="Managing Director at KLB Consultants and clinical researcher—connect on LinkedIn or explore featured work below."
          imageSrc={pageMedia.linkedin.src}
          imageAlt={pageMedia.linkedin.alt}
          priority
          ctas={[
            { href: siteIdentity.linkedin, label: 'Open LinkedIn profile', primary: true },
            { href: '/topics/motherhood-and-smi', label: 'Motherhood & SMI hub' },
          ]}
        />

        <AnswerCallout label="Overview">
          Eugene Boyle, Ph.D. (Eugene Joseph Boyle) is Managing Director at KLB Consultants and
          Investment Director at Boyle Family Office. Find him on{' '}
          <a href={siteIdentity.linkedin} rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          and{' '}
          <a href={siteIdentity.orcid} rel="noopener noreferrer">
            ORCID
          </a>
          , or continue on this site for research briefs and contact details.
        </AnswerCallout>

        <section className="rounded-xl border border-gray-200 bg-white/80 p-6 dark:border-gray-700 dark:bg-gray-900/50">
          <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
            Contact & profiles
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Name:</strong> {siteIdentity.name} (Eugene Joseph Boyle)
            </li>
            <li>
              <strong>Role:</strong> {siteIdentity.headline}
            </li>
            <li>
              <strong>Location:</strong> {siteIdentity.address.addressLocality} Metropolitan Area
            </li>
            <li>
              <strong>LinkedIn:</strong>{' '}
              <a href={siteIdentity.linkedin} className="text-primary-500 hover:underline">
                linkedin.com/in/geneboyle
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
            <li>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${siteIdentity.email}`} className="text-primary-500 hover:underline">
                {siteIdentity.email}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Experience highlights
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
            Featured research & pages
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
