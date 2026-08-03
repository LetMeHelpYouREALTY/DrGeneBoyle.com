import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import siteMetadata from '@/data/siteMetadata'
import { organizationSchema, personSchema } from '@/lib/schema'

export const metadata = genPageMetadata({
  title: 'About Eugene Boyle, Ph.D.',
  description:
    'About Eugene Boyle, Ph.D.—Managing Director at KLB Consultants, Investment Director at Boyle Family Office, and co-author of Motherhood reimagined (Psychiatric Rehabilitation Journal, 2019).',
  alternates: { canonical: `${siteMetadata.siteUrl}/about` },
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <JsonLd data={[personSchema(), organizationSchema()]} />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
      <div className="pb-10">
        <NapBlock />
      </div>
    </>
  )
}
