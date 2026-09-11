import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import SectionBlock from '@/components/SectionBlock'

const title = 'Credentials & Education'
const description = `Education, credentials, and memberships for ${siteIdentity.name}.`
const path = '/credentials'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.credentials.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function CredentialsPage() {
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.credentials }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Credentials', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-10 pt-6">
        <PageHero
          eyebrow="Credentials"
          title={title}
          summary="Education, licensure, and professional memberships."
          imageSrc={pageMedia.credentials.src}
          imageAlt={pageMedia.credentials.alt}
          priority
        />

        <SectionBlock
          id="education"
          title="Education"
          answer={`${siteIdentity.name} holds a Ph.D. in Clinical Psychology from Fielding Graduate University, with additional graduate training spanning business and law.`}
        >
          <ul className="mt-4 space-y-4">
            {siteIdentity.education.map((edu) => (
              <li
                key={edu.degree + edu.school}
                className="rounded-xl border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-900/50"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.school}
                  {edu.locality ? ` · ${edu.locality}` : ''}
                </p>
                {'note' in edu && edu.note ? (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{edu.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock
          id="credentials-list"
          title="Credentials"
          answer="Professional credentials include Registered U.S. Patent Agent (USPTO) and real estate broker/sales agent licensure."
        >
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {siteIdentity.credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock
          id="memberships"
          title="Memberships"
          answer="Professional memberships include APA, APS, and ABCT."
        >
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {siteIdentity.memberships.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionBlock>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Related:{' '}
          <Link href="/blog/eugene-boyle-fielding-dissertation-path" className="text-primary-500">
            Fielding dissertation path
          </Link>
          {' · '}
          <Link href="/publications" className="text-primary-500">
            Publications
          </Link>
          {' · '}
          <Link href="/about" className="text-primary-500">
            About
          </Link>
        </p>

        <NapBlock />
      </div>
    </>
  )
}
