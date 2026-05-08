import { NextRequest } from 'next/server'
import { getSessionFromRequest, unauthorized } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const IMAGE_TYPES  = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const DOC_TYPES    = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]
const MAX_IMAGE_MB = 5
const MAX_DOC_MB   = 20

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return unauthorized()

  const formData = await req.formData()
  const file     = formData.get('file') as File | null
  const bucket   = (formData.get('bucket') as string) ?? 'news-images'  // 'news-images' | 'documents'

  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

  const isImage = IMAGE_TYPES.includes(file.type)
  const isDoc   = DOC_TYPES.includes(file.type)

  if (!isImage && !isDoc)
    return Response.json({ error: 'Unsupported file type' }, { status: 400 })

  const maxMB    = isImage ? MAX_IMAGE_MB : MAX_DOC_MB
  const maxBytes = maxMB * 1024 * 1024
  if (file.size > maxBytes)
    return Response.json({ error: `File exceeds ${maxMB}MB limit` }, { status: 400 })

  // Build a safe filename: timestamp + original name (no path traversal)
  const ext      = path.extname(file.name).toLowerCase()
  const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 60)
  const filename = `${Date.now()}-${baseName}${ext}`
  const folder   = bucket === 'documents' ? 'documents' : 'news-images'
  const relative = `uploads/${folder}/${filename}`
  const absolute = path.join(process.cwd(), 'public', relative)

  await mkdir(path.dirname(absolute), { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(absolute, buffer)

  return Response.json({
    storagePath: relative,
    publicUrl: `/${relative}`,
    size: formatSize(file.size),
    type: ext.replace('.', '').toUpperCase(),
  })
}

function formatSize(bytes: number): string {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
