import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, scholarlyArticleSchema, thesisSchema, webPageSchema } from '@/lib/schema'

const title = 'Publications'
const description = `Peer-reviewed and dissertation publications by ${siteIdentity.name}, with links to research briefs on this site.`
const path = '/publications'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.publications.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

const publications = [
  {
    year: '2024',
    citation:
      'Boyle, Eugene. (2024). Investigating the Utility of the Comprehensive Trail Making Test -Second Edition (CTMT-2) in Assessing Attentional Deficits Among Children and Adolescents. Doctoral dissertation, Fielding Graduate University (ProQuest 31761032).',
    href: '/blog/ctmt-attention-trail-making-dissertation',
    external:
      'https://www.researchgate.net/publication/387076027_Investigating_the_Utility_of_the_Comprehensive_Trail_Making_Test_-Second_Edition_CTMT-2_in_Assessing_Attentional_Deficits_Among_Children_and_Adolescents',
  },
  {
    year: '2019',
    citation:
      'Mizock, L., Merg, A. L., Boyle, E. J., & Kompaniez-Dunigan, E. (2019). Motherhood reimagined: Experiences of women with SMI surrounding parenting. Psychiatric Rehabilitation Journal, 42(2), 105–112. https://doi.org/10.1037/prj0000339',
    href: '/blog/motherhood-reimagined-smi-parenting',
    external: 'https://doi.org/10.1037/prj0000339',
  },
]

export default function PublicationsPage() {
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.publications }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Publications', path },
    ]),
    thesisSchema({
      title:
        'Investigating the Utility of the Comprehensive Trail Making Test -Second Edition (CTMT-2) in Assessing Attentional Deficits Among Children and Adolescents',
      description:
        'Fielding Graduate University doctoral dissertation (ProQuest 31761032) on CTMT-2 utility for attentional assessment in children and adolescents.',
      datePublished: '2024-12-02',
      url: `${siteMetadata.siteUrl}/blog/ctmt-attention-trail-making-dissertation`,
      institution: 'Fielding Graduate University',
    }),
    scholarlyArticleSchema({
      title: 'Motherhood reimagined: Experiences of women with SMI surrounding parenting',
      description:
        'Peer-reviewed grounded-theory study on motherhood experiences among women with serious mental illness (Psychiatric Rehabilitation Journal, 2019).',
      datePublished: '2019',
      url: `${siteMetadata.siteUrl}/blog/motherhood-reimagined-smi-parenting`,
      doi: '10.1037/prj0000339',
      about: ['Serious mental illness', 'Motherhood', 'Psychiatric rehabilitation'],
    }),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Research"
          title={title}
          summary="Dissertation and peer-reviewed work with on-site research briefs."
          imageSrc={pageMedia.publications.src}
          imageAlt={pageMedia.publications.alt}
          priority
        />

        <ul className="space-y-6">
          {publications.map((pub) => (
            <li
              key={pub.year + pub.href}
              className="rounded-xl border border-gray-200 bg-white/70 p-6 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
                {pub.year}
              </p>
              <p className="mt-3 text-gray-800 dark:text-gray-200">{pub.citation}</p>
              <p className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link href={pub.href} className="text-primary-500 font-medium hover:underline">
                  Site brief →
                </Link>
                <a
                  href={pub.external}
                  className="text-primary-500 font-medium hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  External record →
                </a>
              </p>
            </li>
          ))}
        </ul>

        <NapBlock />
      </div>
    </>
  )
}
