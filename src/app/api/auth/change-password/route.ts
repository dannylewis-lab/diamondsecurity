import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

const cookieFlags =
  `HttpOnly; Path=/; Max-Age=0; SameSite=Lax` +
  (process.env.NODE_ENV === 'production' ? '; Secure' : '')

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const body = await req.json()
    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : ''
    const newPassword     = typeof body.newPassword     === 'string' ? body.newPassword     : ''

    if (!currentPassword || !newPassword)
      return Response.json({ error: 'Both fields are required' }, { status: 400 })

    if (newPassword.length < 8)
      return Response.json({ error: 'New password must be at least 8 characters' }, { status: 400 })

    if (newPassword.length > 256)
      return Response.json({ error: 'New password is too long' }, { status: 400 })

    const admin = await prisma.admin.findUnique({ where: { id: session.id } })
    if (!admin)
      return Response.json({ error: 'Account not found' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, admin.password)
    if (!valid)
      return Response.json({ error: 'Current password is incorrect' }, { status: 400 })

    const hashed = await bcrypt.hash(newPassword, 12)
    await prisma.admin.update({ where: { id: session.id }, data: { password: hashed } })

    // Invalidate current session — force re-login with new password
    const res = Response.json({ ok: true })
    res.headers.set('Set-Cookie', `admin_token=; ${cookieFlags}`)
    return res
  } catch {
    return Response.json({ error: 'Failed to change password' }, { status: 500 })
  }
}
