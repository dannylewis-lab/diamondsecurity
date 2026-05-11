import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only guard /admin sub-routes — /admin itself is the login page
  if (!pathname.startsWith('/admin/')) return NextResponse.next()

  const session = await getSessionFromRequest(req)
  if (!session) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin'
    loginUrl.search = ''
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path+'],
  runtime: 'nodejs',
}
