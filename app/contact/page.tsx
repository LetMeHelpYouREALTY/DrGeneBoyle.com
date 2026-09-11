import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, contactPageSchema, webPageSchema } from '@/lib/schema'
import SectionBlock from '@/components/SectionBlock'

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
    contactPageSchema({ title, description, path }),
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

        <SectionBlock
          id="how-to-reach"
          title="How to reach Eugene Boyle, Ph.D."
          answer={`${siteIdentity.name} can be reached at ${siteIdentity.email} or ${siteIdentity.telephone}, based in ${addressLocality}, ${addressRegion}, serving California and Nevada.`}
        >
          <div className="mt-4 max-w-xl space-y-3 text-lg text-gray-700 dark:text-gray-300">
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
          </div>
        </SectionBlock>

        <SectionBlock
          id="related-profiles"
          title="Related profiles & research"
          answer="For biography, publications, and LinkedIn-ready research hubs, continue to About, Publications, or the LinkedIn hub."
        >
          <p className="mt-4 text-gray-700 dark:text-gray-300">
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
        </SectionBlock>

        <NapBlock />
      </div>
    </>
  )
}
