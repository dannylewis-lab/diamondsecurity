import { NextRequest } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const IMAGE_TYPES  = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const PDF_TYPE     = 'application/pdf'
const MAX_IMAGE_MB = 5
const MAX_DOC_MB   = 20

// Which buckets accept which files — documents and market reports are PDF-only
const BUCKET_RULES: Record<string, { types: string[]; maxMB: number; folder: string }> = {
  'news-images': { types: IMAGE_TYPES, maxMB: MAX_IMAGE_MB, folder: 'news-images' },
  'documents':   { types: [PDF_TYPE],  maxMB: MAX_DOC_MB,   folder: 'documents' },
  'reports':     { types: [PDF_TYPE],  maxMB: MAX_DOC_MB,   folder: 'reports' },
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req)
  if (session instanceof Response) return session

  const formData = await req.formData()
  const file     = formData.get('file') as File | null
  const bucket   = (formData.get('bucket') as string) ?? 'news-images'

  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

  const rule = BUCKET_RULES[bucket]
  if (!rule) return Response.json({ error: 'Unknown upload destination' }, { status: 400 })

  if (!rule.types.includes(file.type)) {
    const label = rule.types === IMAGE_TYPES ? 'JPEG, PNG, WebP, or GIF images' : 'PDF files'
    return Response.json({ error: `Unsupported file type — only ${label} are accepted here` }, { status: 400 })
  }

  const maxBytes = rule.maxMB * 1024 * 1024
  if (file.size > maxBytes)
    return Response.json({ error: `File exceeds ${rule.maxMB}MB limit` }, { status: 400 })

  // Build a safe filename: timestamp + original name (no path traversal)
  const ext      = path.extname(file.name).toLowerCase()
  const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 60)
  const filename = `${Date.now()}-${baseName}${ext}`
  const relative = `uploads/${rule.folder}/${filename}`
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
