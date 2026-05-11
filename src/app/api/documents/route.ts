import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'

// GET /api/documents — public
export async function GET() {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, category: true, type: true, size: true, publicUrl: true },
    })
    return Response.json(docs)
  } catch {
    return Response.json([], { status: 200 })
  }
}

// POST /api/documents — admin only (saves metadata after file upload)
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) return unauthorized()

    const body = await req.json()
    const { name, category, type, size, storagePath, publicUrl } = body

    if (!name || !category || !type || !storagePath || !publicUrl)
      return Response.json({ error: 'Missing required fields' }, { status: 400 })

    const doc = await prisma.document.create({
      data: { name, category, type, size: size ?? null, storagePath, publicUrl },
    })
    return Response.json(doc, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to save document' }, { status: 500 })
  }
}
