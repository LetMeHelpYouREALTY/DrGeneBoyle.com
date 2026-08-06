import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'

export const metadata = genPageMetadata({
  title: 'About Eugene Boyle, Ph.D.',
  description:
    'About Eugene Boyle, Ph.D.—Managing Director at KLB Consultants, Investment Director at Boyle Family Office, and co-author of Motherhood reimagined (Psychiatric Rehabilitation Journal, 2019).',
  image: pageMedia.about.src,
  alternates: { canonical: `${siteMetadata.siteUrl}/about` },
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="About"
          title="Eugene Boyle, Ph.D."
          summary="Managing Director at KLB Consultants · Investment Director at Boyle Family Office · Co-author of Motherhood Reimagined"
          imageSrc={pageMedia.about.src}
          imageAlt={pageMedia.about.alt}
          priority
          ctas={[
            {
              href: 'https://www.linkedin.com/in/geneboyle/',
              label: 'LinkedIn profile',
              primary: true,
            },
            { href: '/topics/ctmt-attention', label: 'CTMT-2 research' },
            { href: '/topics/motherhood-and-smi', label: 'Motherhood & SMI' },
          ]}
        />
        <AuthorLayout content={mainContent}>
          <MDXLayoutRenderer code={author.body.code} />
        </AuthorLayout>
        <NapBlock />
      </div>
    </>
  )
}
