export type GlossaryTerm = {
  term: string
  slug: string
  definition: string
}

export const ctmtAttentionGlossary: GlossaryTerm[] = [
  {
    term: 'Comprehensive Trail Making Test–Second Edition (CTMT-2)',
    slug: 'ctmt-2',
    definition:
      'A standardized neuropsychological instrument using five timed visual search and sequencing trails. Performance is influenced by attention, concentration, resistance to distraction, and cognitive flexibility (set-shifting). Boyle (2024) studied its utility for attentional assessment in children and adolescents.',
  },
  {
    term: 'Attentional deficits',
    slug: 'attentional-deficits',
    definition:
      'Difficulties with attention-related functions (for example selective attention, everyday attention, or processing speed–related performance) that may inform ADHD evaluation and treatment planning. Exact measurement depends on the instruments used.',
  },
  {
    term: 'ADHD (attention-deficit/hyperactivity disorder)',
    slug: 'adhd',
    definition:
      'A neurodevelopmental condition for which accurate assessment of attentional deficits is important for diagnosis and treatment planning. Boyle (2024) frames CTMT-2 as a promising supplemental tool in that assessment context—not as a sole diagnostic test.',
  },
  {
    term: 'WISC-V Processing Speed Index (PSI)',
    slug: 'wisc-v-psi',
    definition:
      'A Wechsler Intelligence Scale for Children–Fifth Edition index reflecting processing speed. In Boyle (2024), CTMT-2 performance significantly correlated with and predicted PSI scores.',
  },
  {
    term: 'TEA-Ch2 Selective Attention Index',
    slug: 'tea-ch2-selective-attention',
    definition:
      'A Test of Everyday Attention for Children–Second Edition composite reflecting selective attention. Boyle (2024) reported significant associations with CTMT-2 performance.',
  },
  {
    term: 'TEA-Ch2 Everyday Attention Index',
    slug: 'tea-ch2-everyday-attention',
    definition:
      'A TEA-Ch2 composite reflecting everyday attention capacities. Boyle (2024) reported significant associations with CTMT-2 performance and predictive relations in regression analyses.',
  },
  {
    term: 'CAt-C Inattention Rating',
    slug: 'cat-c-inattention',
    definition:
      'Inattention symptom ratings from the Clinical Assessment of Attention Deficit–Child. Included in Boyle (2024) alongside WISC-V and TEA-Ch2 to examine relationships with CTMT-2 performance.',
  },
]
