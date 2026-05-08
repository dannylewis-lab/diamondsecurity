import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password)
      return Response.json({ error: 'Email and password required' }, { status: 400 })

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = await signToken({ id: admin.id, email: admin.email, name: admin.name })

    const res = Response.json({ ok: true, admin: { id: admin.id, email: admin.email, name: admin.name } })
    res.headers.set(
      'Set-Cookie',
      `admin_token=${token}; HttpOnly; Path=/; Max-Age=${8 * 3600}; SameSite=Lax`
    )
    return res
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
