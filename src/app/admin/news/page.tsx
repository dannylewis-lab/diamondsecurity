'use client'
import { useState, useEffect, useRef } from 'react'
import { Eye, Pencil, Trash2, Plus, X, Upload, Globe, EyeOff } from 'lucide-react'
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

const categoryColors: Record<string, string> = {
  'Market Update': 'bg-emerald-100 text-emerald-700',
  'Article':       'bg-blue-100 text-blue-700',
  'Notice':        'bg-amber-100 text-amber-700',
}

const emptyForm = { title: '', excerpt: '', content: '', category: 'Article', published: false }

export default function NewsManagement() {
  const [articles, setArticles]   = useState<Article[]>([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing]     = useState<Article | null>(null)
  const [form, setForm]           = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving]       = useState(false)
  const [saveError, setSaveError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchArticles = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false })
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
      title: article.title,
      excerpt: article.excerpt ?? '',
      content: article.content ?? '',
      category: article.category,
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
      .update({ published: !article.published })
      .eq('id', article.id)
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, published: !a.published } : a))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return
    await supabase.from('news_articles').delete().eq('id', id)
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
          style={{ background: '#1a2744' }}>
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none">
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
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium max-w-xs">
                      <p className="truncate">{article.title}</p>
                      {article.image_url && (
                        <span className="text-xs text-gray-400">Has cover image</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category]}`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        article.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => togglePublish(article)}
                          className={`transition-colors ${article.published ? 'text-emerald-500 hover:text-gray-400' : 'text-gray-400 hover:text-emerald-500'}`}
                          title={article.published ? 'Unpublish' : 'Publish'}>
                          {article.published ? <EyeOff size={16} /> : <Globe size={16} />}
                        </button>
                        <button onClick={() => openEdit(article)}
                          className="text-gray-400 hover:text-blue-500 transition-colors">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(article.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
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

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? 'Edit Article' : 'New Article'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-5">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-400 transition-colors"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                  ) : (
                    <div className="h-32 flex flex-col items-center justify-center gap-2 text-gray-400">
                      <Upload size={24} />
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={handleImageChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                <input value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Article title..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option>Market Update</option>
                    <option>Article</option>
                    <option>Notice</option>
                  </select>
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm(p => ({ ...p, published: !p.published }))}
                      className={`w-11 h-6 rounded-full relative transition-colors ${form.published ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {form.published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
                <textarea rows={2} value={form.excerpt}
                  onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                  placeholder="Short description shown in article cards..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
                <textarea rows={8} value={form.content}
                  onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                  placeholder="Full article body..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y" />
              </div>

              {saveError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{saveError}</p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                  {saving ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg> Saving...</>
                  ) : editing ? 'Save Changes' : 'Create Article'}
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
