import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// In-memory rate limiter: 10 attempts per 15 minutes per IP
const attempts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const rec  = attempts.get(ip)

  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 })
    return { allowed: true }
  }
  if (rec.count >= 10) {
    return { allowed: false, retryAfter: Math.ceil((rec.resetAt - now) / 1000) }
  }
  rec.count++
  return { allowed: true }
}

function resetRateLimit(ip: string) {
  attempts.delete(ip)
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

const cookieFlags =
  `HttpOnly; Path=/; Max-Age=${8 * 3600}; SameSite=Lax` +
  (process.env.NODE_ENV === 'production' ? '; Secure' : '')

export async function POST(req: NextRequest) {
  try {
    const ip     = getIp(req)
    const limit  = checkRateLimit(ip)

    if (!limit.allowed) {
      return Response.json(
        { error: `Too many login attempts. Try again in ${Math.ceil((limit.retryAfter ?? 900) / 60)} minutes.` },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    const body = await req.json()
    const email    = typeof body.email    === 'string' ? body.email.trim().toLowerCase()    : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password)
      return Response.json({ error: 'Email and password required' }, { status: 400 })

    if (email.length > 254 || password.length > 256)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    resetRateLimit(ip)

    const token = await signToken({ id: admin.id, email: admin.email, name: admin.name })
    const res   = Response.json({ ok: true, admin: { id: admin.id, email: admin.email, name: admin.name } })
    res.headers.set('Set-Cookie', `admin_token=${token}; ${cookieFlags}`)
    return res
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
