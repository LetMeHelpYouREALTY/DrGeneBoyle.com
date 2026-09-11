import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import siteIdentity from '@/data/siteIdentity'
import { siteMedia } from '@/data/siteMedia'
import { resolveMediaUrl } from '@/lib/cloudflare-images'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content
  const headshot = siteMedia.eugeneBoyleHeadshot
  const portraitSrc = resolveMediaUrl(headshot.cfImageId, avatar || headshot.local, headshot.avatar)

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-0 space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-2">
            {portraitSrc && (
              <Image
                src={portraitSrc}
                alt={`Professional headshot of ${name}, clinical psychologist writing on cognitive–behavioral investor decision-making`}
                width={192}
                height={192}
                className="h-48 w-48 rounded-full object-cover ring-2 ring-[color:var(--color-accent)]/40"
              />
            )}
            <h2 className="font-display pt-4 pb-2 text-2xl leading-8 font-semibold tracking-tight">
              {name}
            </h2>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="orcid" href={siteIdentity.orcid} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
