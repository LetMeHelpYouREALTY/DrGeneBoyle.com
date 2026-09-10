import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Contact'
const description = `Contact ${siteIdentity.name} — ${siteIdentity.jobTitle}, ${siteIdentity.worksFor.name}.`
const path = '/contact'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.contact.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function ContactPage() {
  const { addressLocality, addressRegion } = siteIdentity.address
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.contact }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Contact"
          title={title}
          summary={`${siteIdentity.name} · ${addressLocality}, ${addressRegion}`}
          imageSrc={pageMedia.contact.src}
          imageAlt={pageMedia.contact.alt}
          priority
        />

        <div className="max-w-xl space-y-4 text-lg text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Email:</span>{' '}
            <a className="text-primary-500 hover:underline" href={`mailto:${siteIdentity.email}`}>
              {siteIdentity.email}
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Phone:</span>{' '}
            <a className="text-primary-500 hover:underline" href={siteIdentity.telephoneTel}>
              {siteIdentity.telephone}
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Location:</span>{' '}
            {addressLocality}, {addressRegion} · Serving California & Nevada
          </p>
          <p>
            <Link href="/connect" className="text-primary-500 hover:underline">
              Connect / Virtual Twin
            </Link>
            {' · '}
            <Link href="/linkedin" className="text-primary-500 hover:underline">
              LinkedIn hub
            </Link>
            {' · '}
            <Link href="/about" className="text-primary-500 hover:underline">
              About
            </Link>
            {' · '}
            <Link href="/publications" className="text-primary-500 hover:underline">
              Publications
            </Link>
          </p>
        </div>

        <NapBlock />
      </div>
    </>
  )
}
