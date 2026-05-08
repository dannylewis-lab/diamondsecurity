import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.newsArticle.findUnique({ where: { id } })
  if (!article) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(article)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { id } = await params
  const body = await req.json()
  const { title, excerpt, content, category, imageUrl, published } = body

  const article = await prisma.newsArticle.update({
    where: { id },
    data: {
      ...(title     !== undefined && { title }),
      ...(excerpt   !== undefined && { excerpt }),
      ...(content   !== undefined && { content }),
      ...(category  !== undefined && { category }),
      ...(imageUrl  !== undefined && { imageUrl }),
      ...(published !== undefined && { published }),
    },
  })
  return Response.json(article)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const { id } = await params
  await prisma.newsArticle.delete({ where: { id } })
  return Response.json({ ok: true })
}
