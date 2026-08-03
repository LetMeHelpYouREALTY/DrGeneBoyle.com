import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import PageHero from '@/components/PageHero'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

const title = 'Tags'
const description =
  'Browse Eugene Boyle, Ph.D. research posts by topic tags — attention, ADHD, CTMT-2, SMI, motherhood, neuropsychology.'
const path = '/tags'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.tags.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.tags }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Tags', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Tags"
          title={title}
          summary={description}
          imageSrc={pageMedia.tags.src}
          imageAlt={pageMedia.tags.alt}
          priority
        />
        <div className="flex max-w-3xl flex-wrap gap-3 px-1">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => (
            <div key={t} className="mr-2 mb-2">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                aria-label={`View posts tagged ${t}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </div>
          ))}
        </div>
        <NapBlock />
      </div>
    </>
  )
}
