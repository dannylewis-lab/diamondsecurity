import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const [
      totalNews,
      publishedNews,
      totalInquiries,
      newInquiries,
      totalDocs,
      totalReports,
      recentNews,
      recentInquiries,
    ] = await Promise.all([
      prisma.newsArticle.count(),
      prisma.newsArticle.count({ where: { published: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'new' } }),
      prisma.document.count(),
      prisma.marketReport.count(),
      prisma.newsArticle.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, title: true, category: true, published: true, createdAt: true },
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, type: true, status: true, createdAt: true },
      }),
    ])

    return Response.json({
      stats: { totalNews, publishedNews, totalInquiries, newInquiries, totalDocs, totalReports },
      recentNews,
      recentInquiries,
    })
  } catch {
    return Response.json(
      { stats: { totalNews: 0, publishedNews: 0, totalInquiries: 0, newInquiries: 0, totalDocs: 0, totalReports: 0 }, recentNews: [], recentInquiries: [] },
      { status: 200 }
    )
  }
}
