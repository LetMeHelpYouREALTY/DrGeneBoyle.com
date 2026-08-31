import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CANONICAL_HOST = 'www.drgeneboyle.com'
const APEX_HOST = 'drgeneboyle.com'

/**
 * Canonicalize apex → www with a permanent redirect (308).
 * Complements Vercel project domain redirects. Prefer 308/301 at the
 * domain level too (not 307) so Google consolidates indexing signals.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase()

  if (host === APEX_HOST) {
    const url = request.nextUrl.clone()
    url.hostname = CANONICAL_HOST
    url.protocol = 'https:'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and common static assets.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|css|js|map)$).*)',
  ],
}
