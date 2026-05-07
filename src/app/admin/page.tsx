'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Newspaper, MessageSquare, FolderOpen, ArrowUpRight, Eye, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Inquiry = {
  id: string; name: string; type: string; status: string; created_at: string
}
type Article = {
  id: string; title: string; category: string; created_at: string; published: boolean
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewed: 'bg-blue-100 text-blue-700',
  closed: 'bg-gray-100 text-gray-500',
}


export default function AdminOverview() {
  const [counts, setCounts]       = useState({ articles: 0, inquiries: 0, newInquiries: 0, documents: 0 })
  const [recentInq, setRecentInq] = useState<Inquiry[]>([])
  const [recentNews, setRecentNews] = useState<Article[]>([])
  const [loading, setLoading]     = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const [inqAll, newInq, arts, docs, recentI, recentA] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('news_articles').select('*', { count: 'exact', head: true }),
        supabase.from('documents').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id,name,type,status,created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('news_articles').select('id,title,category,created_at,published').order('created_at', { ascending: false }).limit(5),
      ])
      setCounts({
        articles:     arts.count ?? 0,
        inquiries:    inqAll.count ?? 0,
        newInquiries: newInq.count ?? 0,
        documents:    docs.count ?? 0,
      })
      if (recentI.data) setRecentInq(recentI.data)
      if (recentA.data) setRecentNews(recentA.data)
      setLoading(false)
    }
    load()
  }, [])

  const overviewCards = [
    { icon: Newspaper,     label: 'Total Articles', value: counts.articles,  change: 'Published & drafts', href: '/admin/news' },
    { icon: MessageSquare, label: 'Inquiries',       value: counts.inquiries, change: `${counts.newInquiries} new`, href: '/admin/inquiries' },
    { icon: FolderOpen,    label: 'Documents',       value: counts.documents, change: 'All active', href: '/admin/documents' },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back — here's what's happening today</p>
        </div>
        <Link href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 self-start sm:self-auto shrink-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {overviewCards.map(({ icon: Icon, label, value, change, href }) => (
              <Link key={label} href={href}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-0.5">{value}</p>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className={`text-xs font-medium ${label === 'Inquiries' && counts.newInquiries > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                  {change}
                </p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Inquiries */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
                <Link href="/admin/inquiries"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All <ArrowUpRight size={12} />
                </Link>
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
                        <tr key={inq.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{inq.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{inq.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[inq.status]}`}>
                              {inq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Market — DSE */}
            <a
              href="https://dse.co.tz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(145deg, #0f2a44 0%, #1a3a5c 60%, #0f2a44 100%)' }}
            >
              {/* Top accent */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #1133f5, #1133f5, #1133f5)' }} />

              <div className="p-6 flex flex-col items-center text-center">
                {/* DSE Logo */}
                <div
                  className="relative bg-white rounded-xl overflow-hidden mb-5 mt-1"
                  style={{
                    width: '140px',
                    height: '78px',
                    boxShadow: '0 0 24px 6px rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                  <Image
                    src="/dse-logo.png"
                    alt="Dar es Salaam Stock Exchange"
                    fill
                    className="object-contain scale-[0.85]"
                  />
                </div>

                <p className="text-white font-bold text-sm mb-1">Dar es Salaam Stock Exchange</p>
                <p className="text-blue-300/70 text-xs mb-5">Official market data &amp; indices</p>

                {/* Bullet points */}
                <div className="w-full space-y-2 mb-5 text-left">
                  {['Equity Market', 'Bond Market', 'DSEI Index', 'EAX Commodities'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      <span className="text-white/80 text-xs">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity group-hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #1133f5 0%, #0d28c9 100%)' }}
                >
                  <ExternalLink size={13} />
                  Visit DSE Website
                </div>
              </div>
            </a>
          </div>

          {/* Recent News */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent News</h2>
              <Link href="/admin/news"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                Manage <ArrowUpRight size={12} />
              </Link>
            </div>
            {recentNews.length === 0 ? (
              <p className="text-center py-8 text-sm text-gray-400">No articles yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentNews.map(n => (
                  <div key={n.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(n.created_at).toLocaleDateString()} · {n.category} ·{' '}
                        <span className={n.published ? 'text-blue-600' : 'text-gray-400'}>
                          {n.published ? 'Published' : 'Draft'}
                        </span>
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
