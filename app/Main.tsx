import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import HomeHero from '@/components/HomeHero'
import NapBlock from '@/components/NapBlock'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { formatDate } from 'pliny/utils/formatDate'
import SectionBlock from '@/components/SectionBlock'

const MAX_DISPLAY = 6

type PostItem = {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  images?: string[]
  path: string
}

export default function Home({ posts }: { posts: PostItem[] }) {
  return (
    <>
      <HomeHero imageSrc={pageMedia.home.src} imageAlt={pageMedia.home.alt} />

      <div className="mt-14 space-y-14">
        <SectionBlock
          id="motherhood-reimagined"
          eyebrow="Featured topic"
          title="Motherhood reimagined"
          answer="Five grounded-theory themes from Mizock, Merg, Boyle & Kompaniez-Dunigan (2019)—built as citable pages for clinicians and researchers."
        >
          <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={pageMedia.homeFeature.src}
                alt={pageMedia.homeFeature.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/topics/motherhood-and-smi"
                className="bg-accent hover:bg-accent-dark rounded-md px-5 py-2.5 text-sm font-semibold text-[color:var(--color-ink)]"
              >
                Open topic hub
              </Link>
              <Link
                href="/blog/motherhood-reimagined-smi-parenting"
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                Read research brief
              </Link>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          id="ctmt-attention"
          eyebrow="Dissertation"
          title="CTMT-2 & attention"
          answer="Boyle (2024): CTMT-2 performance linked to WISC-V processing speed and TEA-Ch2 selective/everyday attention in ages 8–15 (N = 30)."
        >
          <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 flex flex-wrap gap-3 md:order-1">
              <Link
                href="/topics/ctmt-attention"
                className="bg-accent hover:bg-accent-dark rounded-md px-5 py-2.5 text-sm font-semibold text-[color:var(--color-ink)]"
              >
                Open topic hub
              </Link>
              <Link
                href="/blog/ctmt-attention-trail-making-dissertation"
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                Read dissertation brief
              </Link>
            </div>
            <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-2xl md:order-2">
              <Image
                src={pageMedia.homeFeatureCtmt.src}
                alt={pageMedia.homeFeatureCtmt.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          id="latest-insights"
          title="Latest insights"
          answer="Answer-first research briefs for clinicians, researchers, and institutional readers—built for citation in search, entity graphs, and answer engines."
        >
          <div className="mb-6 flex justify-end">
            <Link href="/blog" className="text-primary-500 hidden text-sm font-semibold sm:inline">
              All posts →
            </Link>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {!posts.length && <li>No posts found.</li>}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const cover = post.images?.[0]
              return (
                <li key={post.slug}>
                  <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white/70 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/50">
                    {cover ? (
                      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9]">
                        <Image
                          src={cover}
                          alt={`Cover image for ${post.title}`}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </Link>
                    ) : null}
                    <div className="space-y-3 p-5">
                      <time
                        dateTime={post.date}
                        className="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        {formatDate(post.date, siteMetadata.locale)}
                      </time>
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.tags?.length ? (
                        <div className="flex flex-wrap">
                          {post.tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      ) : null}
                      <p className="text-sm text-gray-600 dark:text-gray-400">{post.summary}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary-500 inline-block text-sm font-semibold"
                        aria-label={`Read more: "${post.title}"`}
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </SectionBlock>
      </div>

      <div className="mt-14">
        <NapBlock />
      </div>
    </>
  )
}
