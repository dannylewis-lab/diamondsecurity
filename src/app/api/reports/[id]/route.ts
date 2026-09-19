import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { unlink } from 'fs/promises'
import path from 'path'

const ALLOWED_SENTIMENTS = ['bullish', 'bearish', 'neutral']

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdminSession(req)
    if (session instanceof Response) return session

    const { id } = await params
    const body = await req.json()
    const { title, summary, sentiment, published, pdfUrl, pdfStoragePath } = body

    if (title !== undefined) {
      if (typeof title !== 'string' || title.length === 0 || title.length > 300)
        return Response.json({ error: 'Title must be 1-300 characters' }, { status: 400 })
    }
    if (summary !== undefined) {
      if (typeof summary !== 'string' || summary.length === 0 || summary.length > 5000)
        return Response.json({ error: 'Summary must be 1-5000 characters' }, { status: 400 })
    }
    if (sentiment !== undefined && !ALLOWED_SENTIMENTS.includes(sentiment))
      return Response.json({ error: 'Sentiment must be bullish, bearish, or neutral' }, { status: 400 })

    // Replacing or removing the PDF — delete the old file from disk first
    if (pdfUrl !== undefined) {
      const existing = await prisma.marketReport.findUnique({ where: { id }, select: { pdfStoragePath: true } })
      if (existing?.pdfStoragePath) {
        try { await unlink(path.join(process.cwd(), 'public', existing.pdfStoragePath)) } catch {}
      }
    }

    const report = await prisma.marketReport.update({
      where: { id },
      data: {
        ...(title          !== undefined && { title: title.trim() }),
        ...(summary        !== undefined && { summary: summary.trim() }),
        ...(sentiment      !== undefined && { sentiment }),
        ...(published      !== undefined && { published: published === true }),
        ...(pdfUrl         !== undefined && { pdfUrl }),
        ...(pdfStoragePath !== undefined && { pdfStoragePath }),
      },
    })
    return Response.json(report)
  } catch {
    return Response.json({ error: 'Failed to update report' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdminSession(req)
    if (session instanceof Response) return session

    const { id } = await params
    const report = await prisma.marketReport.findUnique({ where: { id }, select: { pdfStoragePath: true } })
    if (report?.pdfStoragePath) {
      try { await unlink(path.join(process.cwd(), 'public', report.pdfStoragePath)) } catch {}
    }
    await prisma.marketReport.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
