import Link from '@/components/Link'
import siteIdentity from '@/data/siteIdentity'

type NapBlockProps = {
  className?: string
}

export default function NapBlock({ className = '' }: NapBlockProps) {
  const { addressLocality, addressRegion } = siteIdentity.address

  return (
    <aside
      className={`rounded-xl border border-gray-200 bg-white/70 p-5 text-sm text-gray-600 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-300 ${className}`}
      aria-label="Contact information"
    >
      <p className="font-display text-base font-semibold text-gray-900 dark:text-gray-100">
        {siteIdentity.name}
      </p>
      <p>
        {siteIdentity.jobTitle}, {siteIdentity.worksFor.name}
      </p>
      <p>
        {addressLocality}, {addressRegion} · Serving California & Nevada
      </p>
      <p className="mt-2">
        <a className="text-primary-500 hover:underline" href={siteIdentity.telephoneTel}>
          Call {siteIdentity.telephone}
        </a>
        {' · '}
        <a className="text-primary-500 hover:underline" href={`mailto:${siteIdentity.email}`}>
          Email
        </a>
        {' · '}
        <Link className="text-primary-500 hover:underline" href={siteIdentity.linkedin}>
          LinkedIn
        </Link>
        {' · '}
        <a
          className="text-primary-500 hover:underline"
          href={siteIdentity.orcid}
          rel="noopener noreferrer"
        >
          ORCID
        </a>
      </p>
    </aside>
  )
}
