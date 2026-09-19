import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Keep the whole /admin surface (including the bare login page) out of search results
  const withNoIndex = (res: NextResponse) => {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  // Only guard /admin sub-routes — /admin itself is the login page
  if (!pathname.startsWith('/admin/')) return withNoIndex(NextResponse.next())

  const session = await getSessionFromRequest(req)
  if (!session) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin'
    loginUrl.search = ''
    return withNoIndex(NextResponse.redirect(loginUrl))
  }

  return withNoIndex(NextResponse.next())
}

export const config = {
  matcher: ['/admin/:path*'],
  runtime: 'nodejs',
}
