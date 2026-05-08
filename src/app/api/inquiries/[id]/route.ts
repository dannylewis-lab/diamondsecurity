import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { id } = await params
  const { status } = await req.json()

  const inquiry = await prisma.inquiry.update({ where: { id }, data: { status } })
  return Response.json(inquiry)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { id } = await params
  await prisma.inquiry.delete({ where: { id } })
  return Response.json({ ok: true })
}
