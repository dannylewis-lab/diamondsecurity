import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

const ALLOWED_CATEGORIES = ['Market Update', 'Company News', 'Research', 'Economic Outlook', 'DSE News', 'General']

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await getSessionFromRequest(req)
    const article = await prisma.newsArticle.findUnique({ where: { id } })

    if (!article) return Response.json({ error: 'Not found' }, { status: 404 })
    // Hide unpublished articles from unauthenticated visitors
    if (!article.published && !session) return Response.json({ error: 'Not found' }, { status: 404 })

    return Response.json(article)
  } catch {
    return Response.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const { id } = await params
    const body = await req.json()
    const { title, excerpt, content, category, imageUrl, published } = body

    if (title !== undefined) {
      if (typeof title !== 'string' || title.length === 0 || title.length > 300)
        return Response.json({ error: 'Title must be 1-300 characters' }, { status: 400 })
    }
    if (excerpt !== undefined) {
      if (typeof excerpt !== 'string' || excerpt.length === 0 || excerpt.length > 600)
        return Response.json({ error: 'Excerpt must be 1-600 characters' }, { status: 400 })
    }
    if (content !== undefined) {
      if (typeof content !== 'string' || content.length > 100_000)
        return Response.json({ error: 'Content is too long' }, { status: 400 })
    }
    if (category !== undefined && !ALLOWED_CATEGORIES.includes(category))
      return Response.json({ error: 'Invalid category' }, { status: 400 })

    const article = await prisma.newsArticle.update({
      where: { id },
      data: {
        ...(title     !== undefined && { title: title.trim() }),
        ...(excerpt   !== undefined && { excerpt: excerpt.trim() }),
        ...(content   !== undefined && { content }),
        ...(category  !== undefined && { category }),
        ...(imageUrl  !== undefined && { imageUrl }),
        ...(published !== undefined && { published: published === true }),
      },
    })
    return Response.json(article)
  } catch {
    return Response.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const { id } = await params
    await prisma.newsArticle.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
