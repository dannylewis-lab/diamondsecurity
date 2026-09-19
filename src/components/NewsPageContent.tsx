'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Newspaper, Calendar, ArrowUpRight, ChevronRight, MessageCircle } from 'lucide-react'
import { Skeleton } from './Skeleton'

type Article = {
  id: string
  title: string
  excerpt: string | null
  content: string | null
  category: string
  imageUrl: string | null
  createdAt: string
}

const categories = ['All', 'Market Update', 'Article', 'Notice']

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
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function CategoryBadge({ category }: { category: string }) {
  const s = categoryStyle[category] ?? { bg: 'rgba(0,0,0,0.08)', text: '#555' }
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase"
      style={{ background: s.bg, color: s.text }}
    >
      {category}
    </span>
  )
}

/* ── Main Component ──────────────────────────────────────────────────── */
export default function NewsPageContent() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading]   = useState(true)
  const [active, setActive]     = useState('All')
  const [visible, setVisible]   = useState(6)

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active)
  const shown    = filtered.slice(0, visible)
  const featured = active === 'All' && articles.length > 0 ? articles[0] : null

  if (loading) {
    return (
      <section className="py-14 bg-[#fafafa] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-full max-w-md mb-12" />
          <Skeleton className="h-[320px] w-full mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-[220px] w-full mb-3" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 mb-12 overflow-x-auto">
          {categories.map(cat => {
            const count = cat === 'All' ? articles.length : articles.filter(a => a.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => { setActive(cat); setVisible(6) }}
                className={`relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  active === cat
                    ? 'text-[#3457d5]'
                    : 'text-gray-500 hover:text-[#0a0a0a]'
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs text-gray-400">({count})</span>
                {active === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3457d5] rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-5">
              <Newspaper size={22} className="text-[#3457d5]" />
            </div>
            <p className="text-[#1d1d1d] font-semibold mb-1.5">No articles published yet</p>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              Our team publishes market updates and company news here regularly — check back soon.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:text-[#2a46c0] transition-colors">
                Contact us <ArrowUpRight size={13} />
              </Link>
              <span className="text-gray-200">&middot;</span>
              <a href="https://wa.me/255791228239" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:text-[#2a46c0] transition-colors">
                <MessageCircle size={13} /> WhatsApp us
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && active === 'All' && (
              <Link
                href={`/news/${featured.id}`}
                className="group block mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                    {featured.imageUrl ? (
                      <img
                        src={featured.imageUrl}
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient[featured.category] ?? 'from-gray-800 to-gray-600'} flex items-center justify-center`}>
                        <Newspaper size={56} className="text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    {/* Featured pill */}
                    <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
                      style={{ background: 'rgba(2,11,45,0.7)', backdropFilter: 'blur(4px)' }}>
                      Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <CategoryBadge category={featured.category} />
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={11} />
                        {formatDate(featured.createdAt)}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-[#0a0a0a] leading-[1.2] mb-4 group-hover:text-[#3457d5] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] group-hover:gap-3 transition-all">
                      Read full article <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(active === 'All' ? shown.slice(1) : shown).map(article => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden flex-shrink-0" style={{ height: '220px' }}>
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient[article.category] ?? 'from-gray-800 to-gray-600'} flex items-center justify-center`}>
                        <Newspaper size={36} className="text-white/15" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <CategoryBadge category={article.category} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                      <Calendar size={11} />
                      {formatDate(article.createdAt)}
                    </div>
                    <h3 className="font-display text-lg text-[#0a0a0a] leading-snug mb-3 group-hover:text-[#3457d5] transition-colors line-clamp-2 flex-1">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#3457d5] mt-auto group-hover:gap-2 transition-all">
                      Read more <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load more */}
            {visible < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisible(v => v + 3)}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:border-[#3457d5] hover:text-[#3457d5] transition-all text-gray-600"
                >
                  Load more articles
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-sm">No articles in this category yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
