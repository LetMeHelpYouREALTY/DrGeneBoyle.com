import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import JsonLd from '@/components/JsonLd'
import { pageMedia } from '@/data/pageMedia'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { genPageMetadata } from './seo'
import Main from './Main'

const homeTitle = 'Eugene Boyle, Ph.D. — CTMT-2 & Motherhood/SMI Research'
const homeDescription =
  'Research briefs and answer-ready explainers from Eugene Boyle, Ph.D.—CTMT-2 attentional assessment (2024 dissertation) and motherhood & SMI (Mizock et al., 2019). Los Angeles; California and Nevada.'

export const metadata = {
  ...genPageMetadata({
    title: homeTitle,
    description: homeDescription,
    image: pageMedia.home.src,
    path: '/',
  }),
  title: {
    absolute: homeTitle,
  },
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const schemas = [
    webPageSchema({
      title: homeTitle,
      description: homeDescription,
      path: '/',
      image: pageMedia.home,
      type: 'WebPage',
    }),
    breadcrumbSchema([{ name: 'Home', path: '/' }]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <Main posts={posts} />
    </>
  )
}
