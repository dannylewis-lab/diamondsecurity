import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = 'https://swqbxvvrubqmygrxabyz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cWJ4dnZydWJxbXlncnhhYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjA1NDksImV4cCI6MjA5MjkzNjU0OX0.aW9WxXg7ZVxzZowOVYSsQcF4DUoxiWGNs6JhZs7nfug'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }))

  // Server-side admin route protection:
  // /admin sub-routes (news, inquiries, etc.) require an authenticated session.
  // /admin itself is allowed through â€” it shows the login form when unauthenticated.
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin/') && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin'
    loginUrl.search = ''
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
