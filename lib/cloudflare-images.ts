/**
 * Cloudflare Images helpers (hosted Images on imagedelivery.net).
 *
 * Keep apex/www DNS gray-cloud → Vercel. Do not rely on zone
 * `/cdn-cgi/image/` transforms for this site — those need orange-cloud proxy.
 *
 * Delivery URL (flexible variants):
 * https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<OPTIONS>
 *
 * @see https://developers.cloudflare.com/images/optimization/features/
 */

export type CfImageOptions = {
  width?: number
  height?: number
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
  /** Face-aware crop — used for headshots / favicons */
  gravity?: 'auto' | 'face' | 'left' | 'right' | 'top' | 'bottom' | string
  format?: 'auto' | 'webp' | 'avif' | 'json' | 'jpeg' | 'png'
  quality?: number
  sharpen?: number
  dpr?: number
  /** Named variant instead of flexible options (e.g. "public") */
  variant?: string
}

const accountHash = () =>
  process.env.NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH?.trim() ||
  process.env.CF_IMAGES_ACCOUNT_HASH?.trim() ||
  ''

export function isCloudflareImagesConfigured(): boolean {
  return Boolean(accountHash())
}

export function buildFlexibleOptions(options: CfImageOptions): string {
  if (options.variant) return options.variant

  const parts: string[] = []
  if (options.width != null) parts.push(`width=${Math.round(options.width)}`)
  if (options.height != null) parts.push(`height=${Math.round(options.height)}`)
  if (options.fit) parts.push(`fit=${options.fit}`)
  if (options.gravity) parts.push(`gravity=${options.gravity}`)
  if (options.format) parts.push(`format=${options.format}`)
  if (options.quality != null) parts.push(`quality=${Math.round(options.quality)}`)
  if (options.sharpen != null) parts.push(`sharpen=${options.sharpen}`)
  if (options.dpr != null) parts.push(`dpr=${options.dpr}`)

  // Always request modern formats when callers omit format
  if (!options.format) parts.push('format=auto')

  return parts.join(',')
}

/** Absolute Cloudflare Images delivery URL, or null if not configured. */
export function cloudflareImageUrl(
  imageId: string,
  options: CfImageOptions = { format: 'auto' }
): string | null {
  const hash = accountHash()
  if (!hash || !imageId) return null
  const suffix = buildFlexibleOptions(options)
  return `https://imagedelivery.net/${hash}/${imageId}/${suffix}`
}

/**
 * Prefer Cloudflare Images when configured; otherwise return the local path.
 * Local paths stay relative (e.g. `/static/images/...`) for next/image.
 */
export function resolveMediaUrl(
  imageId: string | undefined,
  localPath: string,
  options?: CfImageOptions
): string {
  if (imageId) {
    const remote = cloudflareImageUrl(imageId, options)
    if (remote) return remote
  }
  return localPath
}
