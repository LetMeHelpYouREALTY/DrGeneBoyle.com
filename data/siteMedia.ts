/**
 * Site media catalog — local assets + optional Cloudflare Images IDs.
 *
 * After uploading with `yarn cf:images:upload` (or dashboard), set
 * NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH in Vercel. Custom image IDs below
 * match the upload script defaults.
 */

export const siteMedia = {
  eugeneBoyleHeadshot: {
    /** Custom Cloudflare Images ID (upload script default) */
    cfImageId: 'eugene-boyle/headshot',
    local: '/static/images/eugene-boyle-headshot.jpg',
    /** About / author avatar circular crop */
    avatar: {
      width: 384,
      height: 384,
      fit: 'cover' as const,
      gravity: 'face' as const,
      format: 'auto' as const,
      quality: 85,
    },
    /** Browser tab / apple-touch style square */
    favicon: {
      width: 180,
      height: 180,
      fit: 'cover' as const,
      gravity: 'face' as const,
      format: 'auto' as const,
      quality: 80,
    },
    /** Open Graph / schema */
    social: {
      width: 1200,
      height: 1200,
      fit: 'cover' as const,
      gravity: 'face' as const,
      format: 'auto' as const,
      quality: 85,
    },
  },
} as const

export type SiteMediaKey = keyof typeof siteMedia
