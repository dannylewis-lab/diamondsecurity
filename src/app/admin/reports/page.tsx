'use client'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, Trash2, Plus, X, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Report = {
  id: string
  title: string
  summary: string | null
  sentiment: 'bullish' | 'bearish' | 'neutral'
  published: boolean
  created_at: string
}

const sentimentStyle: Record<string, string> = {
  bullish: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  bearish: 'bg-red-50 text-red-600 border border-red-200',
  neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
}

const sentiments = ['bullish', 'neutral', 'bearish'] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

type FormState = { title: string; summary: string; sentiment: 'bullish' | 'bearish' | 'neutral' }
const emptyForm: FormState = { title: '', summary: '', sentiment: 'neutral' }

export default function AIReports() {
  const [reports, setReports]     = useState<Report[]>([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Report | null>(null)
  const [form, setForm]           = useState(emptyForm)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const supabase = createClient()

  const fetchReports = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('market_reports')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setReports(data)
    setLoading(false)
  }

  useEffect(() => { fetchReports() }, [])

  const openNew = () => {
    setEditTarget(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  const openEdit = (r: Report) => {
    setEditTarget(r)
    setForm({ title: r.title, summary: r.summary ?? '', sentiment: r.sentiment })
    setError('')
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required.'); return }
    setSaving(true)
    setError('')
    const payload = {
      title: form.title.trim(),
      summary: form.summary.trim() || null,
      sentiment: form.sentiment,
    }
    if (editTarget) {
      const { error: e } = await supabase.from('market_reports').update(payload).eq('id', editTarget.id)
      if (e) { setError(e.message); setSaving(false); return }
    } else {
      const { error: e } = await supabase.from('market_reports').insert({ ...payload, published: false })
      if (e) { setError(e.message); setSaving(false); return }
    }
    await fetchReports()
    setSaving(false)
    setShowModal(false)
  }

  const togglePublish = async (r: Report) => {
    await supabase.from('market_reports').update({ published: !r.published }).eq('id', r.id)
    setReports(prev => prev.map(x => x.id === r.id ? { ...x, published: !r.published } : x))
  }

  const handleDelete = async (r: Report) => {
    if (!confirm(`Delete "${r.title}"?`)) return
    await supabase.from('market_reports').delete().eq('id', r.id)
    setReports(prev => prev.filter(x => x.id !== r.id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Market Reports</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
          style={{ background: '#1a2744' }}
        >
          <Plus size={16} /> New Report
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">No market reports yet. Create one above.</div>
      ) : (
        <div className="space-y-5">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="text-base font-bold text-gray-900">{report.title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${sentimentStyle[report.sentiment]}`}>
                      {report.sentiment}
                    </span>
                    {report.published ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        Published
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{formatDate(report.created_at)}</p>
                  {report.summary && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{report.summary}</p>
                  )}
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles size={15} className="text-purple-500" />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => openEdit(report)}
                  className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublish(report)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    report.published
                      ? 'border border-amber-200 text-amber-600 hover:bg-amber-50'
                      : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {report.published ? <><EyeOff size={13} /> Unpublish</> : <><Eye size={13} /> Publish</>}
                </button>
                <button
                  onClick={() => handleDelete(report)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors ml-auto"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editTarget ? 'Edit Report' : 'New Market Report'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Daily Market Summary — 28 Apr 2026"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sentiment</label>
                <div className="flex gap-2">
                  {sentiments.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, sentiment: s }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border capitalize transition-colors ${
                        form.sentiment === s
                          ? sentimentStyle[s]
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Summary / Commentary</label>
                <textarea
                  value={form.summary}
                  onChange={e => setForm(p => ({ ...p, summary: e.target.value }))}
                  rows={5}
                  placeholder="Write a market summary that will appear on the homepage Market Overview section..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg> Saving...</>
                  ) : (editTarget ? 'Save Changes' : 'Create Report')}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
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
