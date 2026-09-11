import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import PageHero from '@/components/PageHero'
import JsonLd from '@/components/JsonLd'
import { pageMedia } from '@/data/pageMedia'
import siteMetadata from '@/data/siteMetadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import SectionBlock from '@/components/SectionBlock'

const POSTS_PER_PAGE = 5
const title = 'Research Blog'
const description =
  'Research briefs by Eugene Boyle, Ph.D. on CTMT-2 attentional assessment and motherhood & serious mental illness (SMI).'
const path = '/blog'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.blog.src,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.blog }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Blog"
          title={title}
          summary={description}
          imageSrc={pageMedia.blog.src}
          imageAlt={pageMedia.blog.alt}
          priority
        />
        <SectionBlock
          id="all-posts"
          title="All research posts"
          answer="Browse answer-first research briefs by Eugene Boyle, Ph.D. on CTMT-2 attentional assessment and motherhood & SMI."
        >
          <div className="mt-4">
            <ListLayout
              posts={posts}
              initialDisplayPosts={initialDisplayPosts}
              pagination={pagination}
              title="All Posts"
            />
          </div>
        </SectionBlock>
      </div>
    </>
  )
}
