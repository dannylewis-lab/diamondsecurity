'use client'
import { useState, useEffect, useCallback } from 'react'
import { Newspaper, X, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Article = {
  id: string
  title: string
  excerpt: string | null
  content: string | null
  category: string
  image_url: string | null
  created_at: string
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

/* ── Article Drawer ──────────────────────────────────────────────────── */
function ArticleDrawer({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-white shadow-2xl overflow-y-auto flex flex-col"
        style={{ animation: 'slideInRight 0.3s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Image */}
        <div className="relative w-full flex-shrink-0" style={{ height: '280px' }}>
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient[article.category] ?? 'from-gray-800 to-gray-600'} flex items-center justify-center`}>
              <Newspaper size={52} className="text-white/15" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <CategoryBadge category={article.category} />
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={11} />
              {formatDate(article.created_at)}
            </div>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] leading-[1.15] mb-6">
            {article.title}
          </h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#3457d5] mb-7" />

          {/* Body */}
          <div className="prose-content">
            {article.content ? (
              article.content.split('\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-gray-600 text-[15px] leading-[1.85] mb-5">
                  {para}
                </p>
              ))
            ) : article.excerpt ? (
              <p className="text-gray-600 text-[15px] leading-[1.85]">{article.excerpt}</p>
            ) : (
              <p className="text-gray-400 text-sm italic">No content available.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-[#fafafa]">
          <p className="text-xs text-gray-400">
            Published by Diamond Global Securities Limited · {formatDate(article.created_at)}
          </p>
        </div>
      </div>
    </>
  )
}

/* ── Main Component ──────────────────────────────────────────────────── */
export default function NewsPageContent() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading]   = useState(true)
  const [active, setActive]     = useState('All')
  const [visible, setVisible]   = useState(6)
  const [open, setOpen]         = useState<Article | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('news_articles')
      .select('id, title, excerpt, content, category, image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setArticles(data)
        setLoading(false)
      })
  }, [])

  const closeDrawer = useCallback(() => setOpen(null), [])

  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active)
  const shown    = filtered.slice(0, visible)
  const featured = active === 'All' && articles.length > 0 ? articles[0] : null

  if (loading) {
    return (
      <section className="py-16 bg-[#fafafa] min-h-[60vh] flex items-center justify-center">
        <svg className="animate-spin w-7 h-7 text-[#3457d5]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </section>
    )
  }

  return (
    <>
      {open && <ArticleDrawer article={open} onClose={closeDrawer} />}

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
              <Newspaper size={36} className="text-gray-200 mb-4" />
              <p className="text-gray-400 text-sm">No published articles yet.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && active === 'All' && (
                <div
                  onClick={() => setOpen(featured)}
                  className="group cursor-pointer mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                      {featured.image_url ? (
                        <img
                          src={featured.image_url}
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
                          {formatDate(featured.created_at)}
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
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(active === 'All' ? shown.slice(1) : shown).map(article => (
                  <div
                    key={article.id}
                    onClick={() => setOpen(article)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden flex-shrink-0" style={{ height: '220px' }}>
                      {article.image_url ? (
                        <img
                          src={article.image_url}
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
                        {formatDate(article.created_at)}
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
                  </div>
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

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  )
}
