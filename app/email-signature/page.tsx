import Link from '@/components/Link'
import siteIdentity from '@/data/siteIdentity'
import siteMetadata from '@/data/siteMetadata'
import { destinationLinks, spotlightConfig } from '@/data/connectHub'
import { genPageMetadata } from 'app/seo'

const title = 'Email signature'
const description =
  'A snapshot of the DrGeneBoyle.com Connect page — Spotlight, destinations, and contact — for every outbound email.'
const path = '/email-signature'

export const metadata = genPageMetadata({
  title,
  description,
  alternates: { canonical: `${siteMetadata.siteUrl}${path}` },
})

/**
 * Email signature = a compact snapshot of /connect that rides along
 * on every message: headshot, role, Spotlight, and links to portfolio,
 * blog, photos, and the live hub.
 */
export default function EmailSignaturePage() {
  const connectUrl = `${siteMetadata.siteUrl}/connect`
  const spotlightLabel = process.env.NEXT_PUBLIC_SPOTLIGHT_LABEL || spotlightConfig.defaultLabel
  const spotlightHref =
    process.env.NEXT_PUBLIC_SPOTLIGHT_HREF ||
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ||
    `${connectUrl}#spotlight`
  const headshotUrl = `${siteMetadata.siteUrl}/static/images/eugene-boyle-headshot.jpg`
  const investmentRole = siteIdentity.additionalRoles?.[0]

  return (
    <div className="space-y-8 pt-8">
      <div>
        <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
          DrGeneBoyle.com
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-gray-900 dark:text-gray-100">
          Email signature
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          A snapshot of your Connect page added to every email you send — identity, Spotlight
          action, and links that send people to portfolio, blog, photos, and more. Copy the block
          below into Gmail or Outlook.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div
          style={{
            background: '#0b1f2a',
            color: '#ffffff',
            padding: '14px 18px',
            fontFamily: 'Georgia, serif',
            fontSize: 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Snapshot · www.drgeneboyle.com/connect
        </div>

        <div className="p-6">
          <table
            cellPadding={0}
            cellSpacing={0}
            style={{ fontFamily: 'Georgia, serif', maxWidth: 560, width: '100%' }}
          >
            <tbody>
              <tr>
                <td style={{ paddingRight: 16, verticalAlign: 'top', width: 96 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={headshotUrl}
                    alt={siteIdentity.name}
                    width={88}
                    height={88}
                    style={{ borderRadius: 8, display: 'block' }}
                  />
                </td>
                <td style={{ verticalAlign: 'top', color: '#0b1f2a' }}>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{siteIdentity.name}</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    {siteIdentity.jobTitle}, {siteIdentity.worksFor.name}
                  </div>
                  {investmentRole ? (
                    <div style={{ fontSize: 13, marginTop: 2 }}>
                      {investmentRole.name}, {investmentRole.organization}
                    </div>
                  ) : null}
                  <div style={{ fontSize: 13, marginTop: 10 }}>
                    <a href={`mailto:${siteIdentity.email}`} style={{ color: '#0b1f2a' }}>
                      {siteIdentity.email}
                    </a>
                    {' · '}
                    <a href={siteIdentity.telephoneTel} style={{ color: '#0b1f2a' }}>
                      {siteIdentity.telephone}
                    </a>
                  </div>
                  <div style={{ fontSize: 13, marginTop: 10 }}>
                    <a
                      href={spotlightHref}
                      style={{
                        background: '#2a9d8f',
                        color: '#0b1f2a',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: 12,
                        padding: '8px 12px',
                        borderRadius: 4,
                        display: 'inline-block',
                      }}
                    >
                      {spotlightLabel}
                    </a>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 12, lineHeight: 1.7, color: '#5a6b7d' }}>
                    {destinationLinks.slice(0, 4).map((item, index) => (
                      <span key={item.href}>
                        {index > 0 ? ' · ' : null}
                        <a
                          href={`${siteMetadata.siteUrl}${item.href}`}
                          style={{ color: '#2a9d8f' }}
                        >
                          {item.label}
                        </a>
                      </span>
                    ))}
                    {' · '}
                    <a href={connectUrl} style={{ color: '#2a9d8f' }}>
                      Connect / Virtual Twin
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
        <li>Select the signature block above (from the navy bar through the links).</li>
        <li>Copy, then paste into Gmail Settings → Signature or Outlook signature editor.</li>
        <li>
          Keep Spotlight and destination links pointed where you want traffic — update{' '}
          <code className="text-xs">NEXT_PUBLIC_SPOTLIGHT_LABEL</code> /{' '}
          <code className="text-xs">NEXT_PUBLIC_SPOTLIGHT_HREF</code> or{' '}
          <code className="text-xs">data/connectHub.ts</code> when priorities change.
        </li>
      </ol>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Prefer the live hub?{' '}
        <Link href="/connect" className="text-primary-500 hover:underline">
          Open /connect
        </Link>
        .
      </p>
    </div>
  )
}
