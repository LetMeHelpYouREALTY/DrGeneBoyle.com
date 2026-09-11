import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import JsonLd from '@/components/JsonLd'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import Main from './Main'

const title = 'Eugene Boyle, Ph.D. — Research & Insights'
const description =
  'Research briefs and answer-ready explainers by Eugene Boyle, Ph.D. on CTMT-2 attentional assessment in children and adolescents, and motherhood & serious mental illness (SMI).'
const path = '/'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const schemas = [
    webPageSchema({ title, description, path, image: pageMedia.home }),
    breadcrumbSchema([{ name: 'Home', path: '/' }]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <Main posts={posts} />
    </>
  )
}
