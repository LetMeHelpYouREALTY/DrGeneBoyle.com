/**
 * Virtual Twin knowledge for DrGeneBoyle.com (not about.me).
 * Keep answers short (40–70 words) for AEO-style extraction.
 */

export type TwinFact = {
  id: string
  keywords: string[]
  question: string
  answer: string
}

export const twinPersona = {
  name: 'Eugene Boyle, Ph.D.',
  shortName: 'Gene',
  site: 'https://www.drgeneboyle.com',
  role: 'Managing Director at KLB Consultants and Investment Director at Boyle Family Office',
  greeting:
    'Hi — I’m Gene’s Virtual Twin on DrGeneBoyle.com. Ask about CTMT-2 research, motherhood & SMI work, or CA/NV multifamily acquisition advisory. Share your email anytime if you’d like a follow-up.',
  disclaimer:
    'Educational responses only — not clinical, legal, or investment advice. For live deals or clinical questions, book a meeting or email info@drgeneboyle.com.',
}

export const twinFacts: TwinFact[] = [
  {
    id: 'who',
    keywords: ['who are you', 'who is', 'about gene', 'about eugene', 'bio', 'background'],
    question: 'Who is Eugene Boyle?',
    answer:
      'Eugene Boyle, Ph.D. is Managing Director at KLB Consultants and Investment Director at Boyle Family Office. He advises on multifamily and mixed-use acquisitions across California and Nevada, and publishes research on CTMT-2 attentional assessment and motherhood & serious mental illness.',
  },
  {
    id: 'ctmt',
    keywords: ['ctmt', 'trail making', 'attention', 'adhd', 'dissertation', 'wisc', 'tea-ch'],
    question: 'What is the CTMT-2 research?',
    answer:
      'Boyle’s 2024 Fielding dissertation studied whether the Comprehensive Trail Making Test–Second Edition (CTMT-2) helps assess attentional deficits in children and adolescents (ages 8–15, N = 30). Findings linked CTMT-2 to processing speed and selective/everyday attention indices. See /topics/ctmt-attention.',
  },
  {
    id: 'motherhood',
    keywords: ['motherhood', 'smi', 'parenting', 'mental illness', 'mizock'],
    question: 'What is the motherhood & SMI research?',
    answer:
      'Boyle co-authored Motherhood reimagined (Psychiatric Rehabilitation Journal, 2019) on experiences of women with serious mental illness surrounding parenting. The study describes five grounded-theory themes. Start at /topics/motherhood-and-smi.',
  },
  {
    id: 'acquisition',
    keywords: [
      'acquisition',
      'multifamily',
      'mixed-use',
      'real estate',
      'california',
      'nevada',
      'klb',
      'invest',
      'broker',
    ],
    question: 'What acquisition work does KLB do?',
    answer:
      'KLB Consultants advises family offices and land developers on acquisition brokerage, waterfall equity structuring, and public-agency entitlements for multifamily and mixed-use projects across California and Nevada. This site is not an MLS portal — contact or book a meeting for live mandates.',
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'follow up'],
    question: 'How do I contact Gene?',
    answer:
      'Email info@drgeneboyle.com or call 949-324-8880. You can also use the lead form or booking button on /connect. Los Angeles base; California and Nevada coverage.',
  },
  {
    id: 'book',
    keywords: ['book', 'meeting', 'calendar', 'schedule', 'appointment', 'call'],
    question: 'How do I book a meeting?',
    answer:
      'Use the Book a meeting button on https://www.drgeneboyle.com/connect — it opens Gene’s Google Calendar appointment schedule when configured. Prefer email if you need a custom time window.',
  },
  {
    id: 'credentials',
    keywords: ['credential', 'license', 'phd', 'degree', 'education', 'patent'],
    question: 'What are Gene’s credentials?',
    answer:
      'Ph.D. and M.A. in Clinical Psychology (Fielding), MBA (Babson), J.D. (Purdue Global Law School), B.E. Computer Engineering (Tulane), Registered U.S. Patent Agent, and California real estate broker/sales credential. Details: /credentials.',
  },
]

export function matchTwinFact(message: string): TwinFact | null {
  const normalized = message.toLowerCase()
  let best: { fact: TwinFact; score: number } | null = null
  for (const fact of twinFacts) {
    const score = fact.keywords.reduce(
      (sum, keyword) => (normalized.includes(keyword) ? sum + keyword.length : sum),
      0
    )
    if (score > 0 && (!best || score > best.score)) {
      best = { fact, score }
    }
  }
  return best?.fact ?? null
}
