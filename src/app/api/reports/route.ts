import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

const ALLOWED_SENTIMENTS = ['bullish', 'bearish', 'neutral']

// GET /api/reports — public: published only; admin: all
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    const { searchParams } = req.nextUrl
    const limit = Math.min(Math.max(1, Number(searchParams.get('limit') ?? 100)), 200)

    const reports = await prisma.marketReport.findMany({
      where: session ? undefined : { published: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
    return Response.json(reports)
  } catch {
    return Response.json([], { status: 200 })
  }
}

// POST /api/reports — admin only
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const body = await req.json()
    const { title, summary, sentiment } = body

    if (!title || !summary || !sentiment)
      return Response.json({ error: 'Missing required fields' }, { status: 400 })

    if (typeof title !== 'string' || title.length === 0 || title.length > 300)
      return Response.json({ error: 'Title must be 1-300 characters' }, { status: 400 })

    if (typeof summary !== 'string' || summary.length === 0 || summary.length > 5000)
      return Response.json({ error: 'Summary must be 1-5000 characters' }, { status: 400 })

    if (!ALLOWED_SENTIMENTS.includes(sentiment))
      return Response.json({ error: 'Sentiment must be bullish, bearish, or neutral' }, { status: 400 })

    const report = await prisma.marketReport.create({
      data: { title: title.trim(), summary: summary.trim(), sentiment, published: false },
    })
    return Response.json(report, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to create report' }, { status: 500 })
  }
}
