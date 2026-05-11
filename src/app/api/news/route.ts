import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

const ALLOWED_CATEGORIES = ['Market Update', 'Company News', 'Research', 'Economic Outlook', 'DSE News', 'General']

// GET /api/news — public: published only; admin: all
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    const { searchParams } = req.nextUrl
    const category = searchParams.get('category')
    const limit    = Math.min(Math.max(1, Number(searchParams.get('limit') ?? 100)), 200)

    const where: Record<string, unknown> = session ? {} : { published: true }
    if (category) where.category = category

    const articles = await prisma.newsArticle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true, title: true, excerpt: true, content: true,
        category: true, imageUrl: true, published: true,
        createdAt: true, updatedAt: true,
      },
    })
    return Response.json(articles)
  } catch {
    return Response.json([], { status: 200 })
  }
}

// POST /api/news — admin only
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const body = await req.json()
    const { title, excerpt, content, category, imageUrl, published } = body

    if (!title || !excerpt || !content || !category)
      return Response.json({ error: 'Missing required fields' }, { status: 400 })

    if (typeof title !== 'string' || title.length > 300)
      return Response.json({ error: 'Title must be under 300 characters' }, { status: 400 })

    if (typeof excerpt !== 'string' || excerpt.length > 600)
      return Response.json({ error: 'Excerpt must be under 600 characters' }, { status: 400 })

    if (typeof content !== 'string' || content.length > 100_000)
      return Response.json({ error: 'Content is too long' }, { status: 400 })

    if (!ALLOWED_CATEGORIES.includes(category))
      return Response.json({ error: 'Invalid category' }, { status: 400 })

    if (imageUrl !== undefined && imageUrl !== null && typeof imageUrl !== 'string')
      return Response.json({ error: 'Invalid image URL' }, { status: 400 })

    const article = await prisma.newsArticle.create({
      data: {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        category,
        imageUrl: imageUrl ?? null,
        published: published === true,
      },
    })
    return Response.json(article, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to create article' }, { status: 500 })
  }
}

