'use client'
import { useState, useEffect, useRef } from 'react'
import { FileText, Trash2, Upload, ExternalLink, X, Pencil } from 'lucide-react'
import { Skeleton } from '@/components/Skeleton'

type Doc = {
  id: string; name: string; category: string; type: string
  size: string | null; publicUrl: string | null
}

const categories = ['Account Opening', 'KYC', 'Corporate', 'Fee Schedule', 'Other']
const emptyForm = { name: '', category: 'Account Opening' }

export default function DocumentsPage() {
  const [docs, setDocs]             = useState<Doc[]>([])
  const [loading, setLoading]       = useState(true)
  const [showModal, setShowModal]   = useState(false)
  const [editTarget, setEditTarget] = useState<Doc | null>(null)
  const [form, setForm]             = useState(emptyForm)
  const [file, setFile]             = useState<File | null>(null)
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchDocs = () => {
    setLoading(true)
    fetch('/api/documents')
      .then(r => r.json())
      .then(setDocs)
      .finally(() => setLoading(false))
  }
  useEffect(fetchDocs, [])

  const openNew = () => {
    setEditTarget(null); setForm(emptyForm); setFile(null); setError(''); setShowModal(true)
  }
  const openEdit = (doc: Doc) => {
    setEditTarget(doc); setForm({ name: doc.name, category: doc.category }); setFile(null); setError(''); setShowModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Only PDF files are accepted.'); return }
    setError('')
    setFile(f)
    if (!editTarget && !form.name) setForm(p => ({ ...p, name: f.name.replace(/\.[^/.]+$/, '') }))
  }

  const handleSave = async () => {
    if (!editTarget && !file) { setError('Please select a file.'); return }
    if (!form.name.trim()) { setError('Please enter a document name.'); return }
    setSaving(true); setError('')

    const payload: Record<string, unknown> = { name: form.name.trim(), category: form.category }

    if (file) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('bucket', 'documents')
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        setError(err.error ?? 'Upload failed.'); setSaving(false); return
      }
      const { storagePath, publicUrl, size, type } = await uploadRes.json()
      Object.assign(payload, { storagePath, publicUrl, size, type })
    }

    const res = editTarget
      ? await fetch(`/api/documents/${editTarget.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      : await fetch('/api/documents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!res.ok) { setError(editTarget ? 'Failed to update document.' : 'Failed to save document.'); setSaving(false); return }

    fetchDocs()
    setSaving(false); setShowModal(false)
  }

  const handleDelete = async (doc: Doc) => {
    if (!confirm(`Delete "${doc.name}"?`)) return
    await fetch(`/api/documents/${doc.id}`, { method: 'DELETE' })
    setDocs(prev => prev.filter(d => d.id !== doc.id))
  }

  const inputCls = "w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5]"

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1d]">Document Management</h1>
        <button onClick={openNew} className="btn-blue inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white self-start sm:self-auto shrink-0">
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 shrink-0" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#fafafa] flex items-center justify-center mb-4">
              <FileText size={20} className="text-[#3457d5]" />
            </div>
            <p className="text-[#1d1d1d] font-semibold text-sm mb-1">No documents uploaded yet</p>
            <p className="text-gray-400 text-sm mb-4">Upload account-opening forms and other files — they'll be downloadable on the public Downloads page immediately.</p>
            <button onClick={openNew} className="btn-blue inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white">
              <Upload size={13} /> Upload Document
            </button>
          </div>
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
                    <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-600">{doc.type}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size ?? '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {doc.publicUrl && <a href={doc.publicUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="View"><ExternalLink size={15} /></a>}
                        <button onClick={() => openEdit(doc)} className="text-gray-400 hover:text-[#3457d5] transition-colors" title="Edit"><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(doc)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete"><Trash2 size={15} /></button>
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
              <h2 className="text-xl font-bold text-[#1d1d1d]">{editTarget ? 'Edit Document' : 'Upload Document'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div onClick={() => fileRef.current?.click()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${file ? 'border-[#3457d5] bg-blue-50' : 'border-gray-200 hover:border-[#3457d5]'}`}>
                <Upload size={24} className={`mx-auto mb-2 ${file ? 'text-[#3457d5]' : 'text-gray-400'}`} />
                <p className="text-sm text-gray-600">
                  {file ? file.name : editTarget ? 'Click to replace the PDF file' : 'Click to select a PDF'}
                </p>
                {(file || !editTarget) && <p className="text-xs text-gray-400 mt-1">PDF only — max 20MB</p>}
                {editTarget && !file && <p className="text-xs text-gray-400 mt-1">Leave unchanged to keep the current file</p>}
              </div>
              <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFileChange} />
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1.5">Document Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Individual Account Opening Form" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1.5">Category *</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputCls}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}
              <div className="flex items-center gap-3">
                <button onClick={handleSave} disabled={saving} className="btn-blue flex-1 py-2.5 text-white text-sm font-semibold rounded-xl disabled:opacity-70 flex items-center justify-center gap-2">
                  {saving ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Saving...</> : editTarget ? 'Save Changes' : 'Upload'}
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
