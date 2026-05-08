import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

// GET /api/inquiries — admin only
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { searchParams } = req.nextUrl
  const status = searchParams.get('status')

  const inquiries = await prisma.inquiry.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(inquiries)
}

// POST /api/inquiries — public (contact form)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, type, message } = body

  if (!name || !email || !type || !message)
    return Response.json({ error: 'Missing required fields' }, { status: 400 })

  const inquiry = await prisma.inquiry.create({
    data: { name, email, phone: phone ?? null, type, message, status: 'new' },
  })
  return Response.json(inquiry, { status: 201 })
}
