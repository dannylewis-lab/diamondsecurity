import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

// GET /api/news — public: returns published articles; admin: returns all
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category')
  const limit    = Number(searchParams.get('limit') ?? 100)

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
}

// POST /api/news — admin only
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const body = await req.json()
  const { title, excerpt, content, category, imageUrl, published } = body

  if (!title || !excerpt || !content || !category)
    return Response.json({ error: 'Missing required fields' }, { status: 400 })

  const article = await prisma.newsArticle.create({
    data: { title, excerpt, content, category, imageUrl: imageUrl ?? null, published: published ?? false },
  })
  return Response.json(article, { status: 201 })
}
