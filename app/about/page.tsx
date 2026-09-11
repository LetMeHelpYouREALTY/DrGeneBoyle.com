import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import siteMetadata from '@/data/siteMetadata'
import { pageMedia } from '@/data/pageMedia'
import { organizationSchema, personSchema } from '@/lib/schema'

export const metadata = genPageMetadata({
  title: 'About Eugene Boyle, Ph.D.',
  description:
    'About Eugene Boyle, Ph.D.—clinical psychology and cognitive–behavioral approaches to investor decision-making, attention, risk fluency, and research on CTMT-2 and motherhood & SMI.',
  image: pageMedia.about.src,
  alternates: { canonical: `${siteMetadata.siteUrl}/about` },
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <JsonLd data={[personSchema(), organizationSchema()]} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="About"
          title="Eugene Boyle, Ph.D."
          summary="Clinical psychology and cognitive–behavioral skill for investor decision-making under uncertainty."
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
