import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { unlink } from 'fs/promises'
import path from 'path'

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
