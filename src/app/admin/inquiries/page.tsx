'use client'
import { useState, useEffect } from 'react'
import { Eye, Download, RefreshCw, X } from 'lucide-react'

type Inquiry = {
  id: string; name: string; email: string; phone: string
  type: string; message: string; status: 'new' | 'reviewed' | 'closed'; createdAt: string
}

const statusColors: Record<string, string> = {
  new:      'bg-blue-100 text-blue-700',
  reviewed: 'bg-amber-100 text-amber-700',
  closed:   'bg-gray-100 text-gray-500',
}

const typeOptions = ['All', 'Account Opening', 'Investment Advisory', 'Brokerage Services', 'Fund Management', 'General Inquiry']

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter]       = useState('All')
  const [selected, setSelected]   = useState<Inquiry | null>(null)
  const [loading, setLoading]     = useState(true)

  const fetchInquiries = () => {
    setLoading(true)
    fetch('/api/inquiries')
      .then(r => r.json())
      .then(setInquiries)
      .finally(() => setLoading(false))
  }
  useEffect(fetchInquiries, [])

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    await fetch(`/api/inquiries/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
    setInquiries(prev => prev.filter(i => i.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'Phone', 'Type', 'Message', 'Status', 'Date'],
      ...inquiries.map(i => [i.name, i.email, i.phone ?? '', i.type, `"${(i.message ?? '').replace(/"/g, '""')}"`, i.status, new Date(i.createdAt).toLocaleDateString()]),
    ]
    const csv  = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a'); a.href = url; a.download = 'inquiries.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered  = filter === 'All' ? inquiries : inquiries.filter(i => i.type === filter)
  const newCount  = inquiries.filter(i => i.status === 'new').length

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1d]">Inquiries</h1>
          {newCount > 0 && <p className="text-sm text-blue-600 font-medium mt-1">{newCount} new unread</p>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchInquiries} className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-[#fafafa] transition-colors font-medium text-gray-700">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-[#fafafa] transition-colors font-medium text-gray-700">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {typeOptions.map(opt => (
          <button key={opt} onClick={() => setFilter(opt)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${filter === opt ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            style={filter === opt ? { background: '#3457d5' } : {}}>
            {opt}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><svg className="animate-spin w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inq => (
                  <tr key={inq.id} className="border-b border-gray-50 hover:bg-[#fafafa]/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#1d1d1d]">{inq.name}</p>
                      <p className="text-xs text-gray-400">{inq.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inq.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <select value={inq.status} onChange={e => updateStatus(inq.id, e.target.value as Inquiry['status'])} className={`px-2.5 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer focus:outline-none ${statusColors[inq.status]}`}>
                        <option value="new">new</option>
                        <option value="reviewed">reviewed</option>
                        <option value="closed">closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setSelected(inq)} className="text-gray-400 hover:text-blue-500 transition-colors"><Eye size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1d1d1d]">Inquiry Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="space-y-3 text-sm">
              {([['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone ?? '—'], ['Type', selected.type], ['Date', new Date(selected.createdAt).toLocaleString()]] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-gray-400 w-16 shrink-0">{label}</span>
                  <span className="text-[#1d1d1d] font-medium">{value}</span>
                </div>
              ))}
              <div>
                <span className="text-gray-400 block mb-1">Message</span>
                <p className="text-gray-700 bg-[#fafafa] rounded-lg p-3 leading-relaxed">{selected.message}</p>
              </div>
              <div className="flex gap-3 pt-2">
                {(['new', 'reviewed', 'closed'] as const).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selected.status === s ? statusColors[s] : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{s}</button>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-100">
                <button onClick={() => handleDelete(selected.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete inquiry</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
