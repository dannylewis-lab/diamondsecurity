import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

const ALLOWED_STATUSES = ['new', 'read', 'replied', 'closed']

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const { id } = await params
    const { status } = await req.json()

    if (!ALLOWED_STATUSES.includes(status))
      return Response.json({ error: 'Invalid status' }, { status: 400 })

    const inquiry = await prisma.inquiry.update({ where: { id }, data: { status } })
    return Response.json(inquiry)
  } catch {
    return Response.json({ error: 'Failed to update inquiry' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const { id } = await params
    await prisma.inquiry.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Failed to delete inquiry' }, { status: 500 })
  }
}
