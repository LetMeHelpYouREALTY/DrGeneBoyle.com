import { motherhoodSmiGlossary } from '@/data/glossary/motherhood-smi'
import type { OntologyScheme } from './types'

const bySlug = Object.fromEntries(motherhoodSmiGlossary.map((t) => [t.slug, t]))

/**
 * Motherhood & serious mental illness ontology.
 * Definitions reuse the glossary; relations encode the Mizock et al. (2019) theme structure.
 */
export const motherhoodSmiOntology: OntologyScheme = {
  id: 'motherhood-smi',
  name: 'Motherhood & serious mental illness (SMI)',
  description:
    'Controlled vocabulary for Mizock, Merg, Boyle & Kompaniez-Dunigan (2019): SMI, five motherhood themes, psychiatric rehabilitation, and self-determination in parenting decisions.',
  hubPath: '/topics/motherhood-and-smi',
  glossaryPath: '/glossary',
  faqPath: '/faq/motherhood-smi',
  concepts: [
    {
      slug: 'serious-mental-illness',
      prefLabel: bySlug['serious-mental-illness'].term,
      altLabels: ['SMI', 'serious mental illness'],
      definition: bySlug['serious-mental-illness'].definition,
      pagePath: '/blog/what-is-serious-mental-illness',
      glossaryPath: '/glossary#serious-mental-illness',
      relations: [
        { slug: 'motherhood-and-smi', type: 'related' },
        { slug: 'psychiatric-rehabilitation', type: 'related' },
      ],
    },
    {
      slug: 'motherhood-and-smi',
      prefLabel: 'Motherhood experiences and SMI',
      altLabels: ['motherhood and serious mental illness', 'parenting and SMI'],
      definition:
        'The broader domain of how women with serious mental illness relate to motherhood and the parenting role—including when they do not have children—beyond risk-only frames (Mizock et al., 2019).',
      pagePath: '/topics/motherhood-and-smi',
      glossaryPath: '/glossary#serious-mental-illness',
      relations: [
        { slug: 'serious-mental-illness', type: 'related' },
        { slug: 'motherhood-declined', type: 'narrower' },
        { slug: 'motherhood-derailed', type: 'narrower' },
        { slug: 'motherhood-disabled', type: 'narrower' },
        { slug: 'motherhood-reimagined', type: 'narrower' },
        { slug: 'mattering-through-motherhood', type: 'narrower' },
        { slug: 'self-determination-parenting', type: 'related' },
      ],
    },
    {
      slug: 'motherhood-declined',
      prefLabel: bySlug['motherhood-declined'].term,
      definition: bySlug['motherhood-declined'].definition,
      pagePath: '/blog/five-themes-motherhood-smi',
      glossaryPath: '/glossary#motherhood-declined',
      relations: [{ slug: 'motherhood-and-smi', type: 'broader' }],
    },
    {
      slug: 'motherhood-derailed',
      prefLabel: bySlug['motherhood-derailed'].term,
      definition: bySlug['motherhood-derailed'].definition,
      pagePath: '/blog/five-themes-motherhood-smi',
      glossaryPath: '/glossary#motherhood-derailed',
      relations: [{ slug: 'motherhood-and-smi', type: 'broader' }],
    },
    {
      slug: 'motherhood-disabled',
      prefLabel: bySlug['motherhood-disabled'].term,
      definition: bySlug['motherhood-disabled'].definition,
      pagePath: '/blog/five-themes-motherhood-smi',
      glossaryPath: '/glossary#motherhood-disabled',
      relations: [{ slug: 'motherhood-and-smi', type: 'broader' }],
    },
    {
      slug: 'motherhood-reimagined',
      prefLabel: bySlug['motherhood-reimagined'].term,
      definition: bySlug['motherhood-reimagined'].definition,
      pagePath: '/blog/motherhood-reimagined-smi-parenting',
      glossaryPath: '/glossary#motherhood-reimagined',
      relations: [{ slug: 'motherhood-and-smi', type: 'broader' }],
    },
    {
      slug: 'mattering-through-motherhood',
      prefLabel: bySlug['mattering-through-motherhood'].term,
      definition: bySlug['mattering-through-motherhood'].definition,
      pagePath: '/blog/five-themes-motherhood-smi',
      glossaryPath: '/glossary#mattering-through-motherhood',
      relations: [{ slug: 'motherhood-and-smi', type: 'broader' }],
    },
    {
      slug: 'psychiatric-rehabilitation',
      prefLabel: bySlug['psychiatric-rehabilitation'].term,
      definition: bySlug['psychiatric-rehabilitation'].definition,
      pagePath: '/blog/clinical-support-parenting-smi',
      glossaryPath: '/glossary#psychiatric-rehabilitation',
      relations: [
        { slug: 'serious-mental-illness', type: 'related' },
        { slug: 'self-determination-parenting', type: 'related' },
      ],
    },
    {
      slug: 'self-determination-parenting',
      prefLabel: bySlug['self-determination-parenting'].term,
      altLabels: ['self-determination', 'parenting self-determination'],
      definition: bySlug['self-determination-parenting'].definition,
      pagePath: '/blog/clinical-support-parenting-smi',
      glossaryPath: '/glossary#self-determination-parenting',
      relations: [
        { slug: 'motherhood-and-smi', type: 'related' },
        { slug: 'psychiatric-rehabilitation', type: 'related' },
      ],
    },
  ],
}
