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
  email: 'eboyle@fielding.edu',
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
    'Maternal mental health during pregnancy and postpartum',
    'Family caregiving in mental illness',
    'Child abuse and trauma',
    'Forensic psychology assessment',
    'Serious mental illness (SMI) and parenting',
  ],
  knowsAbout: [
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
    'Eugene Boyle, Ph.D. (Eugene Joseph Boyle) is Managing Director at KLB Consultants and Investment Director at Boyle Family Office. He is a co-author of Motherhood reimagined: Experiences of women with SMI surrounding parenting (Psychiatric Rehabilitation Journal, 2019), with training in clinical and forensic psychology (Fielding Graduate University; Heartland Behavioral Healthcare internship) and prior service as a public-company CFO.',
  followersNote: '1,253 LinkedIn followers (profile snapshot)',
  phoneNote: 'KLB Consultants contact listed on LinkedIn company description: 949-324-8880',
}

module.exports = siteIdentity
