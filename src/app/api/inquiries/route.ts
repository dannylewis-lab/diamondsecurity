import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

const ALLOWED_TYPES   = ['General Enquiry', 'Investment', 'Account Opening', 'Market Data', 'Other']
const ALLOWED_STATUSES = ['new', 'read', 'replied', 'closed']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// GET /api/inquiries — admin only
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const { searchParams } = req.nextUrl
    const status = searchParams.get('status')

    if (status && !ALLOWED_STATUSES.includes(status))
      return Response.json({ error: 'Invalid status filter' }, { status: 400 })

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    })
    return Response.json(inquiries)
  } catch {
    return Response.json([], { status: 200 })
  }
}

// POST /api/inquiries — public (contact form)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, type, message } = body

    if (!name || !email || !type || !message)
      return Response.json({ error: 'Missing required fields' }, { status: 400 })

    if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100)
      return Response.json({ error: 'Name must be 2-100 characters' }, { status: 400 })

    if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254)
      return Response.json({ error: 'Invalid email address' }, { status: 400 })

    if (phone !== undefined && phone !== null && (typeof phone !== 'string' || phone.length > 30))
      return Response.json({ error: 'Phone number is too long' }, { status: 400 })

    if (!ALLOWED_TYPES.includes(type))
      return Response.json({ error: 'Invalid inquiry type' }, { status: 400 })

    if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000)
      return Response.json({ error: 'Message must be 10-5000 characters' }, { status: 400 })

    const inquiry = await prisma.inquiry.create({
      data: {
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
        phone:   phone?.trim() ?? null,
        type,
        message: message.trim(),
        status:  'new',
      },
    })
    return Response.json(inquiry, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
