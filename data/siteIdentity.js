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
  jobTitle: 'Managing Director',
  headline:
    'Managing Director · KLB Consultants | Private Equity · Acquisition Risk · Pre-IPO SPV | JD/MBA · Ph.D. | Former Public-Co CFO | Multifamily & Mixed-Use | CA · NV',
  worksFor: {
    name: 'KLB Consultants Ltd',
    url: 'https://www.linkedin.com/company/klb-consultants-ltd',
    description:
      'Family office and land developer advisory: acquisition brokerage, waterfall equity structuring, and public-agency entitlements for multifamily and mixed-use projects across California and Nevada.',
  },
  additionalRoles: [
    {
      name: 'Investment Director',
      organization: 'Boyle Family Office',
      description:
        'Private placement sourcing, due diligence, and pre-IPO portfolio structuring across technology, real estate, and alternatives.',
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
    'Private equity acquisition risk',
    'Pre-IPO SPV structuring',
    'Multifamily and mixed-use real estate',
    'Financial due diligence',
  ],
  description:
    'Eugene Boyle, Ph.D. (Eugene Joseph Boyle) is Managing Director at KLB Consultants and Investment Director at Boyle Family Office. His Fielding Graduate University dissertation (2024-12-02) found CTMT-2 performance associated with WISC-V Processing Speed and TEA-Ch2 selective/everyday attention in school-aged children and adolescents (N = 30, ages 8–15), supporting CTMT-2 as a supplemental attentional assessment tool. He is a co-author of Motherhood reimagined: Experiences of women with SMI surrounding parenting (Psychiatric Rehabilitation Journal, 2019), with training in clinical and forensic psychology (Fielding Graduate University; Heartland Behavioral Healthcare internship) and prior service as a public-company CFO.',
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
  phoneNote: 'KLB Consultants contact listed on LinkedIn company description: 949-324-8880',
}

module.exports = siteIdentity
