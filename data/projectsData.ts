interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'CA · NV acquisition advisory',
    description:
      'KLB Consultants multifamily and mixed-use acquisition positioning — brokerage framing, equity structuring, and entitlements across California and Nevada.',
    imgSrc: '/static/images/portfolio-acquisition.webp',
    href: '/topics/acquisition-advisory',
  },
  {
    title: 'CTMT-2 attentional research',
    description:
      'Fielding dissertation hub on the Comprehensive Trail Making Test–Second Edition for attentional assessment in children and adolescents.',
    imgSrc: '/static/images/portfolio-research.webp',
    href: '/topics/ctmt-attention',
  },
]

export default projectsData
