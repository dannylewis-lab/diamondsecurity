import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is not set. Set it before starting the server.')
}

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-only-fallback-not-for-production'
)

export type AdminPayload = { id: string; email: string; name: string }

export async function signToken(payload: AdminPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}

export async function getSessionFromRequest(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

/**
 * Guard for admin-only route handlers. Returns the session on success, or a
 * ready-to-return 401 Response on failure — callers just need to check
 * `instanceof Response`. Not for dual-mode routes (e.g. public/admin news
 * listing) where anonymous callers get a filtered result instead of a 401.
 */
export async function requireAdminSession(req: NextRequest): Promise<AdminPayload | Response> {
  const session = await getSessionFromRequest(req)
  return session ?? unauthorized()
}
