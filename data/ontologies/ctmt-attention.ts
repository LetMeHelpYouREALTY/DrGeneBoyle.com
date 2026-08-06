import { ctmtAttentionGlossary } from '@/data/glossary/ctmt-attention'
import type { OntologyScheme } from './types'

const bySlug = Object.fromEntries(ctmtAttentionGlossary.map((t) => [t.slug, t]))

/**
 * CTMT-2 & attentional assessment ontology.
 * Definitions reuse the glossary; relations add the controlled vocabulary structure.
 */
export const ctmtAttentionOntology: OntologyScheme = {
  id: 'ctmt-attention',
  name: 'CTMT-2 & attentional assessment',
  description:
    'Controlled vocabulary for Boyle (2024) CTMT-2 research: attentional assessment instruments, indices, and ADHD-related framing in children and adolescents.',
  hubPath: '/topics/ctmt-attention',
  glossaryPath: '/glossary/ctmt-attention',
  faqPath: '/faq/ctmt-attention',
  concepts: [
    {
      slug: 'attentional-assessment',
      prefLabel: 'Attentional assessment',
      altLabels: ['attention assessment', 'attentional evaluation'],
      definition:
        'The process of measuring attention-related functions (selective attention, everyday attention, processing speed–related performance, and related constructs) with standardized instruments to inform clinical formulation.',
      pagePath: '/topics/ctmt-attention',
      glossaryPath: '/glossary/ctmt-attention#attentional-deficits',
      relations: [
        { slug: 'attentional-deficits', type: 'narrower' },
        { slug: 'ctmt-2', type: 'narrower' },
        { slug: 'adhd', type: 'related' },
      ],
    },
    {
      slug: 'ctmt-2',
      prefLabel: bySlug['ctmt-2'].term,
      altLabels: ['CTMT-2', 'Comprehensive Trail Making Test-Second Edition'],
      definition: bySlug['ctmt-2'].definition,
      pagePath: '/blog/what-is-ctmt-2',
      glossaryPath: '/glossary/ctmt-attention#ctmt-2',
      relations: [
        { slug: 'attentional-assessment', type: 'broader' },
        { slug: 'attentional-deficits', type: 'related' },
        { slug: 'wisc-v-psi', type: 'related' },
        { slug: 'tea-ch2-selective-attention', type: 'related' },
        { slug: 'tea-ch2-everyday-attention', type: 'related' },
        { slug: 'cat-c-inattention', type: 'related' },
        { slug: 'adhd', type: 'related' },
      ],
    },
    {
      slug: 'attentional-deficits',
      prefLabel: bySlug['attentional-deficits'].term,
      definition: bySlug['attentional-deficits'].definition,
      pagePath: '/blog/adhd-assessment-attention-children',
      glossaryPath: '/glossary/ctmt-attention#attentional-deficits',
      relations: [
        { slug: 'attentional-assessment', type: 'broader' },
        { slug: 'adhd', type: 'related' },
        { slug: 'ctmt-2', type: 'related' },
      ],
    },
    {
      slug: 'adhd',
      prefLabel: bySlug['adhd'].term,
      altLabels: ['ADHD', 'attention-deficit/hyperactivity disorder'],
      definition: bySlug['adhd'].definition,
      pagePath: '/blog/adhd-assessment-attention-children',
      glossaryPath: '/glossary/ctmt-attention#adhd',
      relations: [
        { slug: 'attentional-deficits', type: 'related' },
        { slug: 'ctmt-2', type: 'related' },
        { slug: 'cat-c-inattention', type: 'related' },
      ],
    },
    {
      slug: 'wisc-v-psi',
      prefLabel: bySlug['wisc-v-psi'].term,
      altLabels: ['WISC-V PSI', 'Processing Speed Index'],
      definition: bySlug['wisc-v-psi'].definition,
      pagePath: '/blog/ctmt-2-processing-speed-wisc-v',
      glossaryPath: '/glossary/ctmt-attention#wisc-v-psi',
      relations: [
        { slug: 'ctmt-2', type: 'related' },
        { slug: 'attentional-assessment', type: 'broader' },
      ],
    },
    {
      slug: 'tea-ch2-selective-attention',
      prefLabel: bySlug['tea-ch2-selective-attention'].term,
      altLabels: ['TEA-Ch2 Selective Attention'],
      definition: bySlug['tea-ch2-selective-attention'].definition,
      pagePath: '/blog/ctmt-2-selective-everyday-attention',
      glossaryPath: '/glossary/ctmt-attention#tea-ch2-selective-attention',
      relations: [
        { slug: 'ctmt-2', type: 'related' },
        { slug: 'tea-ch2-everyday-attention', type: 'related' },
        { slug: 'attentional-assessment', type: 'broader' },
      ],
    },
    {
      slug: 'tea-ch2-everyday-attention',
      prefLabel: bySlug['tea-ch2-everyday-attention'].term,
      altLabels: ['TEA-Ch2 Everyday Attention'],
      definition: bySlug['tea-ch2-everyday-attention'].definition,
      pagePath: '/blog/ctmt-2-selective-everyday-attention',
      glossaryPath: '/glossary/ctmt-attention#tea-ch2-everyday-attention',
      relations: [
        { slug: 'ctmt-2', type: 'related' },
        { slug: 'tea-ch2-selective-attention', type: 'related' },
        { slug: 'attentional-assessment', type: 'broader' },
      ],
    },
    {
      slug: 'cat-c-inattention',
      prefLabel: bySlug['cat-c-inattention'].term,
      altLabels: ['CAt-C', 'Clinical Assessment of Attention Deficit–Child'],
      definition: bySlug['cat-c-inattention'].definition,
      pagePath: '/blog/ctmt-attention-trail-making-dissertation',
      glossaryPath: '/glossary/ctmt-attention#cat-c-inattention',
      relations: [
        { slug: 'adhd', type: 'related' },
        { slug: 'ctmt-2', type: 'related' },
        { slug: 'attentional-assessment', type: 'broader' },
      ],
    },
  ],
}
