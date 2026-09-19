import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { unlink } from 'fs/promises'
import path from 'path'

const categories = ['Account Opening', 'KYC', 'Corporate', 'Fee Schedule', 'Other']

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdminSession(req)
    if (session instanceof Response) return session

    const { id } = await params
    const body = await req.json()
    const { name, category, type, size, storagePath, publicUrl } = body

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0 || name.length > 200)
        return Response.json({ error: 'Name must be 1-200 characters' }, { status: 400 })
    }
    if (category !== undefined && !categories.includes(category))
      return Response.json({ error: 'Invalid category' }, { status: 400 })

    // Replacing the file — delete the old one from disk first
    if (storagePath !== undefined) {
      const existing = await prisma.document.findUnique({ where: { id }, select: { storagePath: true } })
      if (existing?.storagePath) {
        try { await unlink(path.join(process.cwd(), 'public', existing.storagePath)) } catch {}
      }
    }

    const doc = await prisma.document.update({
      where: { id },
      data: {
        ...(name        !== undefined && { name: name.trim() }),
        ...(category    !== undefined && { category }),
        ...(type        !== undefined && { type }),
        ...(size        !== undefined && { size }),
        ...(storagePath !== undefined && { storagePath }),
        ...(publicUrl   !== undefined && { publicUrl }),
      },
    })
    return Response.json(doc)
  } catch {
    return Response.json({ error: 'Failed to update document' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdminSession(req)
    if (session instanceof Response) return session

    const { id } = await params
    const doc = await prisma.document.findUnique({ where: { id } })
    if (!doc) return Response.json({ error: 'Not found' }, { status: 404 })

    try {
      const filePath = path.join(process.cwd(), 'public', doc.storagePath)
      await unlink(filePath)
    } catch {
      // File may already be gone — continue with DB deletion
    }

    await prisma.document.delete({ where: { id } })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Failed to delete document' }, { status: 500 })
  }
}
