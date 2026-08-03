export type FaqItem = {
  question: string
  answer: string
}

/** Visible FAQ copy + FAQPage schema source of truth (keep in sync). */
export const ctmtAttentionFaqs: FaqItem[] = [
  {
    question: 'What is Eugene Boyle’s CTMT-2 dissertation about?',
    answer:
      'Boyle, Eugene (2024) investigated the utility of the Comprehensive Trail Making Test-Second Edition (CTMT-2) for assessing attentional deficits among children and adolescents. The Fielding Graduate University dissertation (ProQuest 31761032; dated 2024-12-02) examined relationships between CTMT-2 performance and cognitive abilities, inattention ratings, and attentional capacities in a school-aged sample.',
  },
  {
    question: 'Who was studied in the CTMT-2 dissertation?',
    answer:
      'The sample included school-aged children and adolescents (N = 30), ages 8–15.',
  },
  {
    question: 'Which measures were used alongside the CTMT-2?',
    answer:
      'The study used the Wechsler Intelligence Scale for Children–Fifth Edition (WISC-V) for cognitive abilities, the Clinical Assessment of Attention Deficit–Child (CAt-C) for inattention symptoms, and the Test of Everyday Attention for Children–Second Edition (TEA-Ch2) for attentional capacities—selected for established validity and reliability in this population.',
  },
  {
    question: 'What did Boyle (2024) find about CTMT-2 performance?',
    answer:
      'There were significant correlations between CTMT-2 performance and WISC-V Processing Speed Index (PSI) scores and TEA-Ch2 Selective Attention Index and Everyday Attention Index scores. Multiple regression analyses indicated that CTMT-2 trails significantly predicted PSI scores and those TEA-Ch2 index scores. Findings support CTMT-2 utility for selective attention, everyday attention, and processing speed in this sample.',
  },
  {
    question: 'How might clinicians use the CTMT-2 based on this dissertation?',
    answer:
      'The abstract suggests the CTMT-2 can be a valuable supplemental tool in comprehensive assessment of attentional deficits in children and adolescents—not a stand-alone diagnostic replacement. Educational summary only; consult the full dissertation and clinical judgment for practice decisions.',
  },
  {
    question: 'Where can I read the full dissertation?',
    answer:
      'See the research brief on this site, the ResearchGate publication record, and ProQuest Dissertations & Theses (Publication No. 31761032). Site pages summarize the abstract; they are not a substitute for the full text.',
  },
]
