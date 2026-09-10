/**
 * Connect hub for DrGeneBoyle.com Virtual Twin.
 * Owned-domain experience only — no about.me branding.
 */

/**
 * Spotlight = the single primary action visitors should take
 * (book a call, open a flagship page, etc.). Override via env.
 */
export const spotlightConfig = {
  defaultLabel: 'Book a strategy call',
  fallbackHref: '/contact',
  eyebrow: 'Spotlight',
  supportingLine:
    'The one action that matters most right now — CA & NV multifamily, research consults, or family-office intros.',
  helperWhenUnset:
    'Set NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL (or NEXT_PUBLIC_SPOTLIGHT_HREF) so Spotlight points at your priority action.',
}

/**
 * Destinations you want more visits to — portfolio, blog, photos, and more.
 * Shown on /connect and in the email-signature snapshot.
 */
export type DestinationLink = {
  label: string
  href: string
  description: string
}

export const destinationLinks: DestinationLink[] = [
  {
    label: 'Portfolio',
    href: '/projects',
    description: 'Selected research and advisory work',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Research briefs and answer-ready explainers',
  },
  {
    label: 'Photos & media',
    href: '/about',
    description: 'Headshot, bio, and on-site media',
  },
  {
    label: 'Publications',
    href: '/publications',
    description: 'Dissertation and peer-reviewed article',
  },
  {
    label: 'Topics',
    href: '/topics',
    description: 'CTMT-2, motherhood & SMI, acquisition',
  },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Gene translates dense research into decisions we can actually use — clear, calm, and specific.',
    name: 'Research collaborator',
    role: 'Clinical psychology network',
  },
  {
    quote:
      'On acquisition diligence he asks the hard capital-stack questions early. That saved us a wasted LOI cycle.',
    name: 'Family-office principal',
    role: 'Western U.S. multifamily',
  },
  {
    quote:
      'The CTMT-2 briefings were citation-ready without overclaiming. Exactly what our team needed.',
    name: 'Assessment program lead',
    role: 'Neuropsychology practice',
  },
]

export type PortfolioItem = {
  title: string
  summary: string
  href: string
  tag: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'CTMT-2 attentional assessment',
    summary: '2024 Fielding dissertation hub — methods, findings, FAQ, glossary.',
    href: '/topics/ctmt-attention',
    tag: 'Research',
  },
  {
    title: 'Motherhood & SMI',
    summary: '2019 co-authored study themes with clinician-facing explainers.',
    href: '/topics/motherhood-and-smi',
    tag: 'Research',
  },
  {
    title: 'Acquisition advisory (CA · NV)',
    summary: 'Multifamily and mixed-use acquisition positioning for counterparties.',
    href: '/topics/acquisition-advisory',
    tag: 'Advisory',
  },
  {
    title: 'Publications',
    summary: 'Dissertation and peer-reviewed article with on-site research briefs.',
    href: '/publications',
    tag: 'Library',
  },
]

export type VideoItem = {
  title: string
  description: string
  /** YouTube/Vimeo embed URL — leave empty until a public talk is published */
  embedUrl: string
  posterNote: string
}

export const videoItems: VideoItem[] = [
  {
    title: 'Research & advisory overview',
    description:
      'Short orientation to Gene’s dual practice — CTMT-2 / SMI research and CA–NV acquisition advisory.',
    embedUrl: process.env.NEXT_PUBLIC_INTRO_VIDEO_EMBED_URL || '',
    posterNote: 'Add NEXT_PUBLIC_INTRO_VIDEO_EMBED_URL to publish a YouTube or Vimeo embed.',
  },
]
