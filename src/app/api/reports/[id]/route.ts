import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { id } = await params
  const body = await req.json()
  const { title, summary, sentiment, published } = body

  const report = await prisma.marketReport.update({
    where: { id },
    data: {
      ...(title     !== undefined && { title }),
      ...(summary   !== undefined && { summary }),
      ...(sentiment !== undefined && { sentiment }),
      ...(published !== undefined && { published }),
    },
  })
  return Response.json(report)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { id } = await params
  await prisma.marketReport.delete({ where: { id } })
  return Response.json({ ok: true })
}
