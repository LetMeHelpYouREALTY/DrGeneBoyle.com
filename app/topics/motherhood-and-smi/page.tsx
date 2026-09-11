import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import SectionBlock from '@/components/SectionBlock'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Motherhood and Serious Mental Illness (SMI)'
const description =
  'Women with serious mental illness navigate motherhood through decline, derailment, disability-related constraints, reimagining, and mattering. Hub for Mizock, Merg, Boyle & Kompaniez-Dunigan (2019)—research brief, FAQ, glossary, and LinkedIn-ready takeaways by co-author Eugene Boyle, Ph.D.'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.motherhoodSmi.src,
  alternates: { canonical: `${siteMetadata.siteUrl}/topics/motherhood-and-smi` },
})

const keyTakeaways = [
  'Risk-only narratives about mothers with SMI miss choice, grief, adaptation, and identity.',
  'Mizock, Merg, Boyle, and Kompaniez-Dunigan (2019) identified five themes from interviews with 20 women with SMI.',
  'Clinicians should emphasize self-determination and resource evaluation, not assumptions.',
]

const clusterLinks = [
  {
    href: '/blog/motherhood-reimagined-smi-parenting',
    label: 'Research brief: Motherhood Reimagined (Mizock et al., 2019)',
  },
  {
    href: '/blog/five-themes-motherhood-smi',
    label: 'Explainer: Five themes of motherhood and SMI',
  },
  {
    href: '/blog/clinical-support-parenting-smi',
    label: 'Practice notes: Supporting parenting decisions',
  },
  {
    href: '/blog/what-is-serious-mental-illness',
    label: 'Definition: What is serious mental illness (SMI)?',
  },
  { href: '/faq/motherhood-smi', label: 'FAQ: Motherhood and SMI' },
  { href: '/glossary', label: 'Glossary of key terms' },
  { href: '/linkedin', label: 'LinkedIn profile hub — Eugene Boyle, Ph.D.' },
]

export default function MotherhoodSmiTopicPage() {
  const schemas = [
    webPageSchema({
      title,
      description,
      path: '/topics/motherhood-and-smi',
      image: pageMedia.motherhoodSmi,
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Topics', path: '/topics' },
      { name: 'Motherhood and SMI', path: '/topics/motherhood-and-smi' },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Topic hub"
          title={title}
          summary="A citable pillar for clinician education and research citations."
          imageSrc={pageMedia.motherhoodSmi.src}
          imageAlt={pageMedia.motherhoodSmi.alt}
          priority
          ctas={[
            {
              href: '/blog/motherhood-reimagined-smi-parenting',
              label: 'Read research brief',
              primary: true,
            },
            { href: '/faq/motherhood-smi', label: 'Open FAQ' },
          ]}
        />

        <AnswerCallout>
          Women with serious mental illness (SMI) may decline motherhood, face derailed plans,
          encounter disability-related constraints, reimagine the mothering role, or find mattering
          through motherhood—according to qualitative research by Mizock, Merg, Boyle, and
          Kompaniez-Dunigan (2019) in <em>Psychiatric Rehabilitation Journal</em>.
        </AnswerCallout>
        <SectionBlock
          id="key-takeaways"
          title="Key takeaways"
          answer="Mizock, Merg, Boyle, and Kompaniez-Dunigan (2019) identified five themes from interviews with 20 women with SMI—beyond risk-only narratives."
        >
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock
          id="author-connection"
          title="Author connection"
          answer={`${siteIdentity.name} (Eugene Joseph Boyle) co-authored the study as a qualitative data analyst in Lauren Mizock, Ph.D.'s research program on women with serious mental health problems at Fielding Graduate University.`}
        >
          <p className="mt-4 max-w-3xl text-gray-700 dark:text-gray-300">
            This hub gives his{' '}
            <a href={siteIdentity.linkedin} rel="noopener noreferrer">
              LinkedIn profile
            </a>{' '}
            durable, citable URLs for posts and Featured links.
          </p>
        </SectionBlock>

        <SectionBlock
          id="five-themes"
          title="Five themes at a glance"
          answer="The five themes are motherhood declined, derailed, disabled, reimagined, and mattering through motherhood."
        >
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Motherhood declined</strong> — opting out of motherhood
            </li>
            <li>
              <strong>Motherhood derailed</strong> — parenting plans interrupted
            </li>
            <li>
              <strong>Motherhood disabled</strong> — disability-related constraints on the role
            </li>
            <li>
              <strong>Motherhood reimagined</strong> — alternate ways of embodying motherhood
            </li>
            <li>
              <strong>Mattering through motherhood</strong> — motherhood as identity and
              significance
            </li>
          </ol>
        </SectionBlock>

        <SectionBlock
          id="content-cluster"
          title="Content cluster"
          answer="This hub links the research brief, theme explainer, practice notes, SMI definition, FAQ, glossary, and LinkedIn hub."
        >
          <ul className="mt-4 space-y-3">
            {clusterLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary-500 font-medium hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock
          id="primary-source"
          title="Primary source"
          answer="Cite Mizock, Merg, Boyle & Kompaniez-Dunigan (2019), Psychiatric Rehabilitation Journal, DOI 10.1037/prj0000339."
        >
          <p className="mt-4 max-w-3xl text-gray-700 dark:text-gray-300">
            Mizock, L., Merg, A. L., Boyle, E. J., & Kompaniez-Dunigan, E. (2019). Motherhood
            reimagined: Experiences of women with SMI surrounding parenting.{' '}
            <em>Psychiatric Rehabilitation Journal, 42</em>(2), 105–112.{' '}
            <a href="https://doi.org/10.1037/prj0000339">https://doi.org/10.1037/prj0000339</a>
          </p>
        </SectionBlock>

        <NapBlock />
      </div>
    </>
  )
}
