import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  const { addressLocality, addressRegion } = siteIdentity.address

  return (
    <footer className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-800">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="orcid" href={siteIdentity.orcid} size={6} />
        </div>
        <div className="mb-3 max-w-xl px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-display text-base font-semibold text-gray-900 dark:text-gray-100">
            {siteIdentity.name}
          </p>
          <p>
            {siteIdentity.jobTitle}, {siteIdentity.worksFor.name}
          </p>
          <p>
            {addressLocality}, {addressRegion} ·{' '}
            <a href={siteIdentity.telephoneTel} className="hover:underline">
              {siteIdentity.telephone}
            </a>
          </p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            <Link href="/publications" className="text-primary-500 hover:underline">
              Publications
            </Link>
            <Link href="/topics/acquisition-advisory" className="text-primary-500 hover:underline">
              Acquisition (CA · NV)
            </Link>
            <Link href="/topics/ctmt-attention" className="text-primary-500 hover:underline">
              CTMT-2
            </Link>
            <Link href="/topics/motherhood-and-smi" className="text-primary-500 hover:underline">
              Motherhood & SMI
            </Link>
            <Link href="/connect" className="text-primary-500 hover:underline">
              Connect
            </Link>
            <Link href="/contact" className="text-primary-500 hover:underline">
              Contact
            </Link>
          </p>
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
