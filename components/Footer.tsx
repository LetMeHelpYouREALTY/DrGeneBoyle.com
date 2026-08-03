import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import siteIdentity from '@/data/siteIdentity'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  const { addressLocality, addressRegion } = siteIdentity.address

  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <div className="mb-2 max-w-xl px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="font-medium text-gray-700 dark:text-gray-300">{siteIdentity.name}</p>
          <p>
            {siteIdentity.jobTitle}, {siteIdentity.worksFor.name}
          </p>
          <p>
            {addressLocality}, {addressRegion} ·{' '}
            <a href={siteIdentity.telephoneTel} className="hover:underline">
              {siteIdentity.telephone}
            </a>
          </p>
          <p className="mt-1">
            <Link href="/linkedin" className="hover:underline">
              LinkedIn hub
            </Link>
            {' · '}
            <Link href="/topics/motherhood-and-smi" className="hover:underline">
              Motherhood & SMI
            </Link>
            {' · '}
            <Link href="/glossary" className="hover:underline">
              Glossary
            </Link>
          </p>
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
