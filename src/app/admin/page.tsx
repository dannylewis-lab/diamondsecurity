'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Newspaper, MessageSquare, FolderOpen, ArrowUpRight, Eye, ExternalLink, BarChart2 } from 'lucide-react'

type Inquiry = { id: string; name: string; type: string; status: string; createdAt: string }
type Article  = { id: string; title: string; category: string; createdAt: string; published: boolean }
type Stats    = { totalNews: number; publishedNews: number; totalInquiries: number; newInquiries: number; totalDocs: number; totalReports: number }

const statusColors: Record<string, string> = {
  new:      'bg-blue-100 text-blue-700',
  reviewed: 'bg-amber-100 text-amber-700',
  closed:   'bg-gray-100 text-gray-500',
}

export default function AdminOverview() {
  const [stats, setStats]         = useState<Stats>({ totalNews: 0, publishedNews: 0, totalInquiries: 0, newInquiries: 0, totalDocs: 0, totalReports: 0 })
  const [recentInq, setRecentInq] = useState<Inquiry[]>([])
  const [recentNews, setRecentNews] = useState<Article[]>([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(data => {
        setStats(data.stats)
        setRecentInq(data.recentInquiries)
        setRecentNews(data.recentNews)
      })
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { icon: Newspaper,     label: 'Articles',   value: stats.totalNews,      sub: `${stats.publishedNews} published`,                      href: '/admin/news',      color: 'text-blue-600',  bg: 'bg-blue-50' },
    { icon: MessageSquare, label: 'Inquiries',  value: stats.totalInquiries, sub: stats.newInquiries > 0 ? `${stats.newInquiries} new` : 'All reviewed', href: '/admin/inquiries', color: 'text-violet-600', bg: 'bg-violet-50', alert: stats.newInquiries > 0 },
    { icon: FolderOpen,    label: 'Documents',  value: stats.totalDocs,      sub: 'All active',                                             href: '/admin/documents', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: BarChart2,     label: 'Reports',    value: stats.totalReports,   sub: 'Market reports',                                         href: '/admin/reports',   color: 'text-amber-600',  bg: 'bg-amber-50' },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1d]">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back — here&apos;s what&apos;s happening today</p>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-[#fafafa] transition-colors font-medium text-gray-700 self-start sm:self-auto shrink-0">
          <ArrowUpRight size={14} /> View Site
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map(({ icon: Icon, label, value, sub, href, color, bg, alert }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group relative overflow-hidden">
                {alert && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={18} className={color} />
                </div>
                <p className="text-3xl font-bold text-[#1d1d1d] mb-0.5">{value}</p>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className={`text-xs font-medium ${alert ? 'text-blue-600' : 'text-gray-400'}`}>{sub}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Inquiries */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-[#1d1d1d]">Recent Inquiries</h2>
                <Link href="/admin/inquiries" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">View All <ArrowUpRight size={12} /></Link>
              </div>
              {recentInq.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-400">No inquiries yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-50">
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Name</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Type</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Date</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentInq.map(inq => (
                        <tr key={inq.id} className="border-b border-gray-50 hover:bg-[#fafafa]/50">
                          <td className="px-6 py-4 text-sm font-medium text-[#1d1d1d]">{inq.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{inq.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[inq.status] ?? 'bg-gray-100 text-gray-500'}`}>{inq.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* DSE / Market card */}
            <a href="https://dse.co.tz/" target="_blank" rel="noopener noreferrer"
              className="block group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(145deg, #0f2a44 0%, #1a3a5c 60%, #0f2a44 100%)' }}>
              <div className="h-1 w-full" style={{ background: '#3457d5' }} />
              <div className="p-6 flex flex-col items-center text-center">
                <div className="flex items-end gap-3 mb-5 mt-1">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="bg-white rounded-xl border border-white/20 p-2.5 shadow-sm" style={{ width: '72px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/cmsa-logo.jpg" alt="CMSA Tanzania" className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[9px] font-semibold text-blue-300/70 uppercase tracking-wider">Regulator</span>
                  </div>
                  <div className="w-px h-10 bg-white/15 mb-4" />
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="bg-white rounded-xl border border-white/20 p-2.5 shadow-sm" style={{ width: '72px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/dse-logo.png" alt="DSE" className="max-h-full max-w-full object-contain scale-[0.85]" />
                    </div>
                    <span className="text-[9px] font-semibold text-blue-300/70 uppercase tracking-wider">Exchange</span>
                  </div>
                </div>
                <p className="text-white font-bold text-sm mb-1">Dar es Salaam Stock Exchange</p>
                <p className="text-blue-300/70 text-xs mb-5">Official market data &amp; indices</p>
                <div className="w-full space-y-2 mb-5 text-left">
                  {['Equity Market', 'Bond Market', 'DSEI Index', 'EAX Commodities'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      <span className="text-white/80 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity group-hover:opacity-90" style={{ background: 'linear-gradient(135deg, #3457d5 0%, #2a46c0 100%)' }}>
                  <ExternalLink size={13} /> Visit DSE Website
                </div>
              </div>
            </a>
          </div>

          {/* Recent News */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-semibold text-[#1d1d1d]">Recent News</h2>
              <Link href="/admin/news" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">Manage <ArrowUpRight size={12} /></Link>
            </div>
            {recentNews.length === 0 ? (
              <p className="text-center py-8 text-sm text-gray-400">No articles yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentNews.map(n => (
                  <div key={n.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#fafafa]/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-[#1d1d1d]">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(n.createdAt).toLocaleDateString()} · {n.category} ·{' '}
                        <span className={n.published ? 'text-blue-600' : 'text-gray-400'}>{n.published ? 'Published' : 'Draft'}</span>
                      </p>
                    </div>
                    <Eye size={15} className="text-gray-300 ml-4 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
