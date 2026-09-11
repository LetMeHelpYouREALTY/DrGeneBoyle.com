import Link from '@/components/Link'
import Image from '@/components/Image'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import ConnectExperience from '@/components/connect/ConnectExperience'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { destinationLinks, portfolioItems, testimonials, videoItems } from '@/data/connectHub'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Connect — Virtual Twin'
const description =
  'Eugene Boyle, Ph.D. Virtual Twin on DrGeneBoyle.com — chat, capture leads, book Google Calendar meetings, and send visitors to portfolio, blog, photos, and publications.'
const path = '/connect'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.contact.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default function ConnectPage() {
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.contact }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Connect', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-12 pt-6">
        <PageHero
          eyebrow="DrGeneBoyle.com · Virtual Twin"
          title="Connect with Eugene Boyle, Ph.D."
          summary="Chat with Gene’s Virtual Twin, leave a lead for CRM follow-up, book on Google Calendar, and point people to portfolio, blog, photos, and research — all on this domain, with no about.me branding."
          imageSrc={pageMedia.contact.src}
          imageAlt={pageMedia.contact.alt}
          priority
          ctas={[
            { href: '#spotlight', label: 'Spotlight action', primary: true },
            { href: '#destinations', label: 'Portfolio · Blog · Photos' },
            { href: '/email-signature', label: 'Email signature' },
          ]}
        />

        <div id="twin">
          <ConnectExperience />
        </div>

        <section id="destinations" className="space-y-5">
          <div>
            <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Point people here
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
              Get more visits to your portfolio, blog, photos — anywhere you’d like to point people
              to. These links also ride along in the email-signature snapshot.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/40"
              >
                <p className="text-accent text-xs font-semibold tracking-[0.16em] uppercase">
                  Visit
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Testimonials
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={item.name + item.role}
                className="rounded-2xl border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-900/40"
              >
                <p className="text-gray-800 dark:text-gray-200">“{item.quote}”</p>
                <footer className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </span>
                  <br />
                  {item.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Portfolio
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {portfolioItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700"
              >
                <p className="text-accent text-xs font-semibold tracking-[0.16em] uppercase">
                  {item.tag}
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Video
          </h2>
          {videoItems.map((video) => (
            <div
              key={video.title}
              className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              {video.embedUrl ? (
                <iframe
                  title={video.title}
                  src={video.embedUrl}
                  className="aspect-video w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={pageMedia.home.src}
                    alt={video.title}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 1100px"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {video.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm text-white/85">{video.description}</p>
                      <p className="mt-3 text-xs text-white/70">{video.posterNote}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        <NapBlock />
      </div>
    </>
  )
}
