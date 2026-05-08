import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

// GET /api/reports — public: published only; admin: all
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  const { searchParams } = req.nextUrl
  const limit = Number(searchParams.get('limit') ?? 100)

  const reports = await prisma.marketReport.findMany({
    where: session ? undefined : { published: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
  return Response.json(reports)
}

// POST /api/reports — admin only
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const body = await req.json()
  const { title, summary, sentiment } = body

  if (!title || !summary || !sentiment)
    return Response.json({ error: 'Missing required fields' }, { status: 400 })

  const report = await prisma.marketReport.create({
    data: { title, summary, sentiment, published: false },
  })
  return Response.json(report, { status: 201 })
}
