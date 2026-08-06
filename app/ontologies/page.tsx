import Link from '@/components/Link'
import JsonLd from '@/components/JsonLd'
import NapBlock from '@/components/NapBlock'
import PageHero from '@/components/PageHero'
import AnswerCallout from '@/components/AnswerCallout'
import { researchOntologies } from '@/data/ontologies'
import { pageMedia } from '@/data/pageMedia'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { ontologyCatalog } from '@/lib/ontology'

const title = 'Research ontologies'
const description =
  'Controlled vocabularies for Eugene Boyle, Ph.D. research—CTMT-2 attentional assessment and motherhood & SMI—published as Schema.org DefinedTermSet and SKOS concept schemes.'
const path = '/ontologies'

export const metadata = genPageMetadata({
  title,
  description,
  image: pageMedia.glossary.src,
  path,
})

export default function OntologiesPage() {
  const catalog = ontologyCatalog()
  const schemas = [
    webPageSchema({
      title,
      description,
      path,
      image: pageMedia.glossary,
      type: 'CollectionPage',
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Ontologies', path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <div className="space-y-8 pt-6">
        <PageHero
          eyebrow="Knowledge organization"
          title={title}
          summary="Machine-readable concept schemes that connect glossary terms, topic hubs, FAQs, and research briefs."
          imageSrc={pageMedia.glossary.src}
          imageAlt={pageMedia.glossary.alt}
          priority
          ctas={[
            { href: '/ontology.json', label: 'Schema.org JSON-LD', primary: true },
            { href: '/ontology/skos.json', label: 'SKOS JSON-LD' },
          ]}
        />

        <AnswerCallout>
          Prefer ontology concept URIs when citing terms across pages. Human glossaries remain at{' '}
          <Link href="/glossary">Motherhood &amp; SMI</Link> and{' '}
          <Link href="/glossary/ctmt-attention">CTMT-2</Link>; agents should start with{' '}
          <Link href="/ontology.json">/ontology.json</Link>.
        </AnswerCallout>

        <div className="grid gap-6 md:grid-cols-2">
          {researchOntologies.map((scheme) => (
            <section
              key={scheme.id}
              id={scheme.id}
              className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white/70 p-6 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {scheme.name}
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{scheme.description}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {scheme.concepts.length} concepts
              </p>
              <ul className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <li>
                  <Link href={scheme.hubPath} className="text-primary-600 hover:underline">
                    Topic hub
                  </Link>
                </li>
                <li>
                  <Link href={scheme.glossaryPath} className="text-primary-600 hover:underline">
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link href={scheme.faqPath} className="text-primary-600 hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
              <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {scheme.concepts.map((concept) => (
                  <li
                    key={concept.slug}
                    id={`${scheme.id}-${concept.slug}`}
                    className="scroll-mt-24"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {concept.prefLabel}
                    </span>
                    {concept.pagePath ? (
                      <>
                        {' — '}
                        <Link href={concept.pagePath} className="text-primary-600 hover:underline">
                          open page
                        </Link>
                      </>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className="rounded-xl border border-dashed border-gray-300 p-5 text-sm text-gray-600 dark:border-gray-600 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-gray-100">Machine endpoints</p>
          <ul className="mt-2 space-y-1">
            <li>
              Schema.org: <Link href={catalog.urls.schemaOrg}>{catalog.urls.schemaOrg}</Link>
            </li>
            <li>
              SKOS: <Link href={catalog.urls.skos}>{catalog.urls.skos}</Link>
            </li>
            <li>
              Agent graph: <Link href="/agent-graph.json">/agent-graph.json</Link>
            </li>
          </ul>
        </aside>

        <NapBlock />
      </div>
    </>
  )
}
