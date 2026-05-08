'use client'
import { useState, useEffect, useRef } from 'react'
import { FileText, Trash2, Upload, ExternalLink, X } from 'lucide-react'

type Doc = {
  id: string; name: string; category: string; type: string
  size: string | null; storagePath: string; publicUrl: string | null; createdAt: string
}

const typeColors: Record<string, string> = {
  PDF:  'bg-red-100 text-red-600',
  DOC:  'bg-blue-100 text-blue-600',
  DOCX: 'bg-blue-100 text-blue-600',
  XLSX: 'bg-green-100 text-green-600',
  XLS:  'bg-green-100 text-green-600',
}

const categories = ['Account Opening', 'KYC', 'Corporate', 'Fee Schedule', 'Other']

export default function DocumentsPage() {
  const [docs, setDocs]               = useState<Doc[]>([])
  const [loading, setLoading]         = useState(true)
  const [showModal, setShowModal]     = useState(false)
  const [uploadForm, setUploadForm]   = useState({ name: '', category: 'Account Opening' })
  const [uploadFile, setUploadFile]   = useState<File | null>(null)
  const [uploading, setUploading]     = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchDocs = () => {
    setLoading(true)
    fetch('/api/documents')
      .then(r => r.json())
      .then(setDocs)
      .finally(() => setLoading(false))
  }
  useEffect(fetchDocs, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    if (!uploadForm.name) setUploadForm(p => ({ ...p, name: file.name.replace(/\.[^/.]+$/, '') }))
  }

  const handleUpload = async () => {
    if (!uploadFile) { setUploadError('Please select a file.'); return }
    if (!uploadForm.name.trim()) { setUploadError('Please enter a document name.'); return }
    setUploading(true); setUploadError('')

    // Step 1: upload file to disk
    const fd = new FormData()
    fd.append('file', uploadFile)
    fd.append('bucket', 'documents')
    const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!uploadRes.ok) {
      const err = await uploadRes.json()
      setUploadError(err.error ?? 'Upload failed.')
      setUploading(false); return
    }
    const { storagePath, publicUrl, size, type } = await uploadRes.json()

    // Step 2: save metadata
    const metaRes = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: uploadForm.name.trim(), category: uploadForm.category, type, size, storagePath, publicUrl }),
    })
    if (!metaRes.ok) { setUploadError('Failed to save document record.'); setUploading(false); return }

    fetchDocs()
    setUploading(false); setShowModal(false)
    setUploadFile(null); setUploadForm({ name: '', category: 'Account Opening' })
  }

  const handleDelete = async (doc: Doc) => {
    if (!confirm(`Delete "${doc.name}"?`)) return
    await fetch(`/api/documents/${doc.id}`, { method: 'DELETE' })
    setDocs(prev => prev.filter(d => d.id !== doc.id))
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1d]">Document Management</h1>
        <button onClick={() => { setShowModal(true); setUploadError('') }} className="btn-blue inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white self-start sm:self-auto shrink-0">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><svg className="animate-spin w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg></div>
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
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-[#fafafa]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0"><FileText size={14} className="text-gray-500" /></div>
                        <span className="text-sm font-medium text-[#1d1d1d]">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.category}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-xs font-bold ${typeColors[doc.type] ?? 'bg-gray-100 text-gray-600'}`}>{doc.type}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size ?? '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {doc.publicUrl && <a href={doc.publicUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><ExternalLink size={15} /></a>}
                        <button onClick={() => handleDelete(doc)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1d1d1d]">Upload Document</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div onClick={() => fileRef.current?.click()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${uploadFile ? 'border-[#3457d5] bg-blue-50' : 'border-gray-200 hover:border-[#3457d5]'}`}>
                <Upload size={24} className={`mx-auto mb-2 ${uploadFile ? 'text-[#3457d5]' : 'text-gray-400'}`} />
                <p className="text-sm text-gray-600">{uploadFile ? uploadFile.name : 'Click to select a file'}</p>
                {uploadFile && <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, XLSX — max 20MB</p>}
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xlsx,.xls" className="hidden" onChange={handleFileChange} />
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1.5">Document Name *</label>
                <input value={uploadForm.name} onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Individual Account Opening Form" className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5]" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1.5">Category *</label>
                <select value={uploadForm.category} onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5]">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              {uploadError && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{uploadError}</p>}
              <div className="flex items-center gap-3">
                <button onClick={handleUpload} disabled={uploading} className="btn-blue flex-1 py-2.5 text-white text-sm font-semibold rounded-xl disabled:opacity-70 flex items-center justify-center gap-2">
                  {uploading ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Uploading...</> : 'Upload'}
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:bg-[#fafafa] transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
