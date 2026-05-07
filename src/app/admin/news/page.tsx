'use client'
import { useState, useEffect, useRef } from 'react'
import { Eye, Pencil, Trash2, Plus, X, Upload, Globe, EyeOff, Calendar, Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Article = {
  id: string
  title: string
  excerpt: string | null
  content: string | null
  category: string
  image_url: string | null
  published: boolean
  created_at: string
}

const categoryStyle: Record<string, { bg: string; text: string }> = {
  'Market Update': { bg: 'rgba(52,87,213,0.1)',  text: '#3457d5' },
  'Article':       { bg: 'rgba(52,87,213,0.08)', text: '#3457d5' },
  'Notice':        { bg: 'rgba(52,87,213,0.12)', text: '#2040b0' },
}

const fallbackGradient: Record<string, string> = {
  'Market Update': 'from-[#020B2D] to-[#3457d5]',
  'Article':       'from-[#0a1a40] to-[#2a45b8]',
  'Notice':        'from-[#071530] to-[#3457d5]',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const emptyForm = { title: '', excerpt: '', content: '', category: 'Article', published: false }

/* ── Preview Drawer — mirrors public reader view ─────────────────────── */
function PreviewDrawer({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const cs = categoryStyle[article.category] ?? { bg: 'rgba(0,0,0,0.07)', text: '#555' }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-white shadow-2xl overflow-y-auto flex flex-col"
        style={{ animation: 'slideInRight 0.3s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Image */}
        <div className="relative w-full flex-shrink-0" style={{ height: '280px' }}>
          {article.image_url ? (
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient[article.category] ?? 'from-gray-800 to-gray-600'} flex items-center justify-center`}>
              <Newspaper size={52} className="text-white/15" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Admin badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
            style={{ background: 'rgba(2,11,45,0.75)', backdropFilter: 'blur(4px)' }}>
            {article.published ? 'Published' : 'Draft — Preview'}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase"
              style={{ background: cs.bg, color: cs.text }}
            >
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={11} />
              {formatDate(article.created_at)}
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] leading-[1.15] mb-6">
            {article.title || <span className="text-gray-300 italic">No title</span>}
          </h2>

          <div className="w-12 h-0.5 bg-[#3457d5] mb-7" />

          <div>
            {article.content ? (
              article.content.split('\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-gray-600 text-[15px] leading-[1.85] mb-5">{para}</p>
              ))
            ) : article.excerpt ? (
              <p className="text-gray-600 text-[15px] leading-[1.85]">{article.excerpt}</p>
            ) : (
              <p className="text-gray-300 text-sm italic">No content written yet.</p>
            )}
          </div>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-[#fafafa]">
          <p className="text-xs text-gray-400">
            Admin preview · {article.published ? 'Live on site' : 'Not yet published'} · {formatDate(article.created_at)}
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  )
}

/* ── Main Page ───────────────────────────────────────────────────────── */
export default function NewsManagement() {
  const [articles, setArticles]     = useState<Article[]>([])
  const [loading, setLoading]       = useState(true)
  const [showModal, setShowModal]   = useState(false)
  const [editing, setEditing]       = useState<Article | null>(null)
  const [previewing, setPreviewing] = useState<Article | null>(null)
  const [form, setForm]             = useState(emptyForm)
  const [imageFile, setImageFile]   = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving]         = useState(false)
  const [saveError, setSaveError]   = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchArticles = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('news_articles').select('*').order('created_at', { ascending: false })
    if (data) setArticles(data)
    setLoading(false)
  }

  useEffect(() => { fetchArticles() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setSaveError('')
    setShowModal(true)
  }

  const openEdit = (article: Article) => {
    setEditing(article)
    setForm({
      title:     article.title,
      excerpt:   article.excerpt ?? '',
      content:   article.content ?? '',
      category:  article.category,
      published: article.published,
    })
    setImageFile(null)
    setImagePreview(article.image_url)
    setSaveError('')
    setShowModal(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!form.title.trim()) { setSaveError('Title is required.'); return }
    setSaving(true)
    setSaveError('')

    let image_url = editing?.image_url ?? null

    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('news-images').upload(path, imageFile, { upsert: true })
      if (uploadError) { setSaveError('Image upload failed.'); setSaving(false); return }
      const { data: { publicUrl } } = supabase.storage.from('news-images').getPublicUrl(path)
      image_url = publicUrl
    }

    const payload = {
      title:     form.title.trim(),
      excerpt:   form.excerpt.trim() || null,
      content:   form.content.trim() || null,
      category:  form.category,
      published: form.published,
      image_url,
    }

    if (editing) {
      const { error } = await supabase.from('news_articles')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', editing.id)
      if (error) { setSaveError('Failed to update article.'); setSaving(false); return }
    } else {
      const { error } = await supabase.from('news_articles').insert(payload)
      if (error) { setSaveError('Failed to create article.'); setSaving(false); return }
    }

    await fetchArticles()
    setSaving(false)
    setShowModal(false)
  }

  const togglePublish = async (article: Article) => {
    await supabase.from('news_articles')
      .update({ published: !article.published }).eq('id', article.id)
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, published: !a.published } : a))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return
    await supabase.from('news_articles').delete().eq('id', id)
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  /* Build a preview article from the current form state for live preview */
  const formAsArticle: Article = {
    id: editing?.id ?? 'preview',
    title:      form.title,
    excerpt:    form.excerpt || null,
    content:    form.content || null,
    category:   form.category,
    image_url:  imagePreview,
    published:  form.published,
    created_at: editing?.created_at ?? new Date().toISOString(),
  }

  return (
    <div>
      {/* Preview drawer */}
      {previewing && <PreviewDrawer article={previewing} onClose={() => setPreviewing(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1d]">News Management</h1>
          <p className="text-sm text-gray-400 mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''} · {articles.filter(a => a.published).length} published</p>
        </div>
        <button
          onClick={openCreate}
          className="btn-blue inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white self-start sm:self-auto shrink-0"
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-[#3457d5]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No articles yet. Create your first one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Title</th>
                  <th className="text-left px-6 py-4 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Category</th>
                  <th className="text-left px-6 py-4 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Status</th>
                  <th className="text-left px-6 py-4 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Date</th>
                  <th className="text-left px-6 py-4 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => {
                  const cs = categoryStyle[article.category] ?? { bg: 'rgba(0,0,0,0.07)', text: '#555' }
                  return (
                    <tr key={article.id} className="border-b border-gray-50 hover:bg-[#fafafa] transition-colors">

                      {/* Title + thumbnail */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          {article.image_url ? (
                            <img
                              src={article.image_url}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 rounded-lg shrink-0 bg-gradient-to-br ${fallbackGradient[article.category] ?? 'from-gray-700 to-gray-500'} flex items-center justify-center`}
                            >
                              <Newspaper size={14} className="text-white/40" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[#1d1d1d] truncate">{article.title}</p>
                            {article.excerpt && (
                              <p className="text-xs text-gray-400 truncate mt-0.5">{article.excerpt}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span
                          className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase"
                          style={{ background: cs.bg, color: cs.text }}
                        >
                          {article.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                          article.published
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(article.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setPreviewing(article)}
                            className="text-gray-400 hover:text-[#3457d5] transition-colors"
                            title="Preview as reader"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => togglePublish(article)}
                            className={`transition-colors ${article.published ? 'text-emerald-500 hover:text-gray-400' : 'text-gray-400 hover:text-emerald-500'}`}
                            title={article.published ? 'Unpublish' : 'Publish'}
                          >
                            {article.published ? <EyeOff size={16} /> : <Globe size={16} />}
                          </button>
                          <button
                            onClick={() => openEdit(article)}
                            className="text-gray-400 hover:text-[#3457d5] transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">

            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1d1d1d]">
                {editing ? 'Edit Article' : 'New Article'}
              </h2>
              <div className="flex items-center gap-3">
                {/* Live preview from modal */}
                <button
                  onClick={() => setPreviewing(formAsArticle)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3457d5] hover:underline"
                  title="Preview how readers will see this"
                >
                  <Eye size={13} /> Preview
                </button>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-5">

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">
                  Cover Image
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#3457d5]/50 transition-colors"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-52 object-cover" />
                  ) : (
                    <div className="h-36 flex flex-col items-center justify-center gap-2 text-gray-400">
                      <Upload size={22} />
                      <span className="text-sm">Click to upload cover image</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                {imagePreview && (
                  <button
                    onClick={() => { setImageFile(null); setImagePreview(null) }}
                    className="mt-1.5 text-xs text-red-400 hover:text-red-600"
                  >
                    Remove image
                  </button>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Article title…"
                  className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5] transition-colors"
                />
              </div>

              {/* Category + Publish */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5] transition-colors"
                  >
                    <option>Market Update</option>
                    <option>Article</option>
                    <option>Notice</option>
                  </select>
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm(p => ({ ...p, published: !p.published }))}
                      className="w-11 h-6 rounded-full relative transition-colors"
                      style={{ background: form.published ? '#3457d5' : '#e5e7eb' }}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {form.published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold tracking-wide uppercase text-gray-500">Excerpt</label>
                  <span className="text-xs text-gray-400">{form.excerpt.length} chars — shown on cards</span>
                </div>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                  placeholder="Short summary shown on news cards and search results…"
                  className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5] transition-colors resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold tracking-wide uppercase text-gray-500">Full Content</label>
                  <span className="text-xs text-gray-400">{form.content.length} chars — shown in Read More drawer</span>
                </div>
                <textarea
                  rows={10}
                  value={form.content}
                  onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                  placeholder="Write the full article here. Each new line becomes a new paragraph when displayed to readers."
                  className="w-full px-4 py-3 bg-[#fafafa] border border-gray-200 rounded-lg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#3457d5]/20 focus:border-[#3457d5] transition-colors resize-y"
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Tip: press Enter to start a new paragraph. Click <strong>Preview</strong> above to see how readers will see this article.
                </p>
              </div>

              {saveError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                  {saveError}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-blue flex-1 py-2.5 text-white text-sm font-semibold rounded-lg disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg> Saving…</>
                  ) : editing ? 'Save Changes' : 'Create Article'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-lg hover:bg-[#fafafa] transition-colors text-gray-600"
                >
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
