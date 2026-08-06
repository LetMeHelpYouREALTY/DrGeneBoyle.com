import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import AnswerCallout from '@/components/AnswerCallout'
import HomeHero from '@/components/HomeHero'
import NapBlock from '@/components/NapBlock'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { formatDate } from 'pliny/utils/formatDate'

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

      <AnswerCallout label="Direct answer">
        Eugene Boyle, Ph.D. publishes citable research briefs on CTMT-2 attentional assessment in
        children and adolescents (Boyle, 2024) and motherhood &amp; serious mental illness (Mizock,
        Merg, Boyle &amp; Kompaniez-Dunigan, 2019)—plus acquisition insight across California and
        Nevada.
      </AnswerCallout>

      <nav aria-label="Research hubs" className="mt-8">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <li>
            <Link href="/about" className="text-primary-600 dark:text-primary-400 hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/publications"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Publications
            </Link>
          </li>
          <li>
            <Link
              href="/topics/ctmt-attention"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              CTMT-2 topic hub
            </Link>
          </li>
          <li>
            <Link
              href="/topics/motherhood-and-smi"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Motherhood &amp; SMI hub
            </Link>
          </li>
          <li>
            <Link
              href="/faq/ctmt-attention"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              CTMT FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/faq/motherhood-smi"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Motherhood FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/glossary"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Glossary
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <section className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
          <Image
            src={pageMedia.homeFeature.src}
            alt={pageMedia.homeFeature.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Featured topic
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
            Motherhood reimagined
          </h2>
          <p className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-400">
            Five grounded-theory themes from Mizock, Merg, Boyle & Kompaniez-Dunigan (2019)—built as
            citable pages for clinicians and researchers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
      </section>

      <section className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Dissertation
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
            CTMT-2 & attention
          </h2>
          <p className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-400">
            Boyle (2024): CTMT-2 performance linked to WISC-V processing speed and TEA-Ch2
            selective/everyday attention in ages 8–15 (*N* = 30).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
      </section>

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Latest insights
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
              Answer-first briefs for clinicians, researchers, and institutional readers.
            </p>
          </div>
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
      </section>

      <div className="mt-14">
        <NapBlock />
      </div>
    </>
  )
}
