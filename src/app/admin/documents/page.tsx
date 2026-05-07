'use client'
import { useState, useEffect, useRef } from 'react'
import { FileText, Trash2, Upload, ExternalLink, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Doc = {
  id: string
  name: string
  category: string
  type: string
  size: string | null
  storage_path: string
  public_url: string | null
  created_at: string
}

const typeColors: Record<string, string> = {
  PDF:  'bg-red-100 text-red-600',
  DOC:  'bg-blue-100 text-blue-600',
  DOCX: 'bg-blue-100 text-blue-600',
  XLSX: 'bg-blue-100 text-blue-600',
  XLS:  'bg-blue-100 text-blue-600',
}

const categories = ['Account Opening', 'KYC', 'Corporate', 'Fee Schedule', 'Other']

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsPage() {
  const [docs, setDocs]           = useState<Doc[]>([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [uploadForm, setUploadForm] = useState({ name: '', category: 'Account Opening' })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploading, setUploading]   = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchDocs = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setDocs(data)
    setLoading(false)
  }

  useEffect(() => { fetchDocs() }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    if (!uploadForm.name) {
      setUploadForm(p => ({ ...p, name: file.name.replace(/\.[^/.]+$/, '') }))
    }
  }

  const handleUpload = async () => {
    if (!uploadFile) { setUploadError('Please select a file.'); return }
    if (!uploadForm.name.trim()) { setUploadError('Please enter a document name.'); return }
    setUploading(true)
    setUploadError('')

    const ext = (uploadFile.name.split('.').pop() ?? '').toLowerCase()
    // Sanitise file name â€” remove spaces and special chars so Supabase accepts it
    const safeName = uploadFile.name
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '')
    const storagePath = `${Date.now()}_${safeName}`

    const { error: storageError } = await supabase.storage
      .from('documents')
      .upload(storagePath, uploadFile, { upsert: true })

    if (storageError) {
      setUploadError(`Storage error: ${storageError.message}`)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(storagePath)

    const { error: dbError } = await supabase.from('documents').insert({
      name:         uploadForm.name.trim(),
      category:     uploadForm.category,
      type:         ext.toUpperCase() || 'FILE',
      size:         formatSize(uploadFile.size),
      storage_path: storagePath,
      public_url:   publicUrl,
    })

    if (dbError) {
      // Storage succeeded but DB failed â€” clean up the orphaned file
      await supabase.storage.from('documents').remove([storagePath])
      setUploadError(`Database error: ${dbError.message}`)
      setUploading(false)
      return
    }

    await fetchDocs()
    setUploading(false)
    setShowModal(false)
    setUploadFile(null)
    setUploadForm({ name: '', category: 'Account Opening' })
  }

  const handleDelete = async (doc: Doc) => {
    if (!confirm(`Delete "${doc.name}"?`)) return
    await supabase.storage.from('documents').remove([doc.storage_path])
    await supabase.from('documents').delete().eq('id', doc.id)
    setDocs(prev => prev.filter(d => d.id !== doc.id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <button
          onClick={() => { setShowModal(true); setUploadError('') }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
          style={{ background: '#1a2744' }}>
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No documents uploaded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Size</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          <FileText size={14} className="text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${typeColors[doc.type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size ?? 'â€”'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {doc.public_url && (
                          <a href={doc.public_url} target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition-colors">
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button onClick={() => handleDelete(doc)}
                          className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* File Drop Zone */}
              <div
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  uploadFile ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
                }`}
              >
                <Upload size={24} className={`mx-auto mb-2 ${uploadFile ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className="text-sm text-gray-600">
                  {uploadFile ? uploadFile.name : 'Click to select a file'}
                </p>
                {uploadFile && (
                  <p className="text-xs text-gray-400 mt-1">{formatSize(uploadFile.size)}</p>
                )}
              </div>
              <input ref={fileRef} type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls"
                className="hidden" onChange={handleFileChange} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Name *</label>
                <input
                  value={uploadForm.name}
                  onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Individual Account Opening Form"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                <select
                  value={uploadForm.category}
                  onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {uploadError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{uploadError}</p>
              )}

              <div className="flex items-center gap-3">
                <button onClick={handleUpload} disabled={uploading}
                  className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                  {uploading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg> Uploading...</>
                  ) : 'Upload'}
                </button>
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
