/**
 * Canonical identity for SEO / GEO / AEO — sourced from
 * https://www.linkedin.com/in/geneboyle/ and ORCID 0000-0002-0183-8740.
 * Keep names and sameAs URLs identical across schema, About, and LinkedIn.
 */
const siteIdentity = {
  name: 'Eugene Boyle, Ph.D.',
  alternateName: ['Eugene Joseph Boyle', 'Gene Boyle', 'Eugene Boyle'],
  givenName: 'Eugene',
  familyName: 'Boyle',
  honorificSuffix: 'Ph.D.',
  jobTitle: 'Clinical Psychologist · Investor Decision-Making',
  headline:
    'Clinical Psychology Ph.D. · Cognitive–behavioral approaches to investor decision-making · CTMT-2 & motherhood/SMI research · ABCT',
  worksFor: {
    name: 'DrGeneBoyle.com',
    url: 'https://www.drgeneboyle.com',
    description:
      'Research and writing on cognitive–behavioral skill in investor decision-making—attention, bias, risk fluency—plus CTMT-2 and motherhood & SMI research explainers.',
  },
  additionalRoles: [
    {
      name: 'Independent investor',
      organization: 'Self-directed markets',
      description:
        'Practicing capital allocation and decision-making under uncertainty—using live feedback to train cognitive–behavioral habits around risk.',
    },
  ],
  // Public contact — Cloudflare Email Routing should forward to working inbox
  email: 'info@drgeneboyle.com',
  domainEmail: 'info@drgeneboyle.com',
  telephone: '949-324-8880',
  telephoneTel: 'tel:+19493248880',
  address: {
    // Street address not published on LinkedIn — locality/region only
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    addressCountry: 'US',
    areaServed: ['California', 'Nevada', 'Las Vegas', 'Southern California', 'Northern California'],
  },
  linkedin: 'https://www.linkedin.com/in/geneboyle/',
  github: 'https://github.com/geneboyle',
  orcid: 'https://orcid.org/0000-0002-0183-8740',
  sameAs: [
    'https://www.linkedin.com/in/geneboyle/',
    'https://orcid.org/0000-0002-0183-8740',
    'https://github.com/geneboyle',
  ],
  education: [
    {
      degree: 'Ph.D. Clinical Psychology',
      school: 'Fielding Graduate University',
      locality: 'Santa Barbara, CA',
      note: 'Dissertation: CTMT-2 utility for attentional deficits in children and adolescents (2024-12-02; ProQuest 31761032)',
    },
    {
      degree: 'M.A. Clinical Psychology',
      school: 'Fielding Graduate University',
      locality: 'Santa Barbara, CA',
    },
    {
      degree: 'Postbaccalaureate Certificate, Clinical Psychology',
      school: 'Fielding Graduate University',
      locality: 'Santa Barbara, CA',
    },
    {
      degree: 'MBA, Entrepreneurship',
      school: 'Babson F.W. Olin Graduate School of Business',
      locality: 'Babson Park, MA',
    },
    {
      degree: 'J.D.',
      school: 'Purdue Global Law School',
      locality: 'Los Angeles, CA',
    },
    {
      degree: 'B.E. Computer Engineering',
      school: 'Tulane University',
      locality: 'New Orleans, LA',
    },
  ],
  credentials: [
    'Registered U.S. Patent Agent (USPTO, issued Feb 2004)',
    'Real Estate Broker/Sales Agent (Bureau of Real Estate)',
  ],
  memberships: [
    'American Psychological Association',
    'Association for Psychological Science',
    'Association for Behavioral and Cognitive Therapies',
  ],
  researchAreas: [
    'Attentional assessment in children and adolescents (CTMT–2)',
    'Maternal mental health during pregnancy and postpartum',
    'Family caregiving in mental illness',
    'Child abuse and trauma',
    'Forensic psychology assessment',
    'Serious mental illness (SMI) and parenting',
  ],
  knowsAbout: [
    'Comprehensive Trail Making Test–Second Edition (CTMT–2)',
    'Attentional deficits in children and adolescents',
    'Neuropsychological assessment',
    'Serious mental illness',
    'Motherhood and parenting',
    'Psychiatric rehabilitation',
    'Grounded theory qualitative research',
    'Forensic psychology',
    'Cognitive–behavioral approaches to investor decision-making',
    'Behavioral finance and cognitive bias',
    'Risk fluency and decision-making under uncertainty',
    'Financial literacy and self-control',
  ],
  description:
    'Eugene Boyle, Ph.D. (Eugene Joseph Boyle) writes on clinical psychology and cognitive–behavioral approaches to investor decision-making—how attention, emotion, and habit shape choices under uncertainty. His Fielding Graduate University dissertation (2024-12-02) found CTMT-2 performance associated with WISC-V Processing Speed and TEA-Ch2 selective/everyday attention in school-aged children and adolescents (N = 30, ages 8–15), supporting CTMT-2 as a supplemental attentional assessment tool. He is a co-author of Motherhood reimagined: Experiences of women with SMI surrounding parenting (Psychiatric Rehabilitation Journal, 2019), with training in clinical and forensic psychology (Fielding Graduate University; Heartland Behavioral Healthcare internship), ABCT membership, and prior service as a public-company CFO.',
  publications: [
    {
      type: 'dissertation',
      title:
        'Investigating the Utility of the Comprehensive Trail Making Test -Second Edition (CTMT-2) in Assessing Attentional Deficits Among Children and Adolescents',
      author: 'Boyle, Eugene',
      year: 2024,
      date: '2024-12-02',
      institution: 'Fielding Graduate University',
      proquestId: '31761032',
      url: 'https://www.researchgate.net/publication/387076027_Investigating_the_Utility_of_the_Comprehensive_Trail_Making_Test_-Second_Edition_CTMT-2_in_Assessing_Attentional_Deficits_Among_Children_and_Adolescents',
      sitePath: '/blog/ctmt-attention-trail-making-dissertation',
    },
    {
      type: 'article',
      title: 'Motherhood reimagined: Experiences of women with SMI surrounding parenting',
      year: 2019,
      doi: '10.1037/prj0000339',
      sitePath: '/blog/motherhood-reimagined-smi-parenting',
    },
  ],
  followersNote: '1,253 LinkedIn followers (profile snapshot)',
  phoneNote: 'Public contact phone listed on LinkedIn profile materials: 949-324-8880',
}

module.exports = siteIdentity
