'use client'
import { useState, useEffect } from 'react'
import { Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Article = {
  id: string
  title: string
  excerpt: string | null
  category: string
  image_url: string | null
  created_at: string
}

const categories = ['All', 'Market Update', 'Article', 'Notice']

const categoryClass: Record<string, string> = {
  'Market Update': 'badge-market',
  'Article': 'badge-article',
  'Notice': 'badge-notice',
}

const categoryGradient: Record<string, string> = {
  'Market Update': 'from-blue-800 to-blue-600',
  'Article': 'from-sky-700 to-sky-500',
  'Notice': 'from-amber-700 to-amber-500',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function NewsPageContent() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  const [visible, setVisible] = useState(6)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('news_articles')
      .select('id, title, excerpt, category, image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setArticles(data)
        setLoading(false)
      })
  }, [])

  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active)
  const shown = filtered.slice(0, visible)
  const featured = active === 'All' ? articles[0] : null

  function countFor(cat: string) {
    return cat === 'All' ? articles.length : articles.filter(a => a.category === cat).length
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <svg className="animate-spin w-8 h-8 text-[#1133f5]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setVisible(6) }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-[#1133f5] text-white shadow-sm shadow-[#1133f5]/30'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1133f5] hover:text-[#1133f5]'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${active === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {countFor(cat)}
              </span>
            </button>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Newspaper size={22} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">No published articles yet.</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && visible >= 1 && (
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-8 hover:shadow-md transition-all cursor-pointer group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    {featured.image_url ? (
                      <img
                        src={featured.image_url}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${categoryGradient[featured.category] ?? 'from-gray-700 to-gray-500'} flex items-center justify-center`}>
                        <Newspaper size={48} className="text-white/20" />
                      </div>
                    )}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryClass[featured.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {featured.category}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-white">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <p className="text-xs text-gray-400 mb-3">{formatDate(featured.created_at)}</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#1133f5] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-gray-500 leading-relaxed mb-5">{featured.excerpt}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {(active === 'All' ? shown.slice(1) : shown).map(article => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${categoryGradient[article.category] ?? 'from-gray-700 to-gray-500'} flex items-center justify-center`}>
                        <Newspaper size={36} className="text-white/30" />
                      </div>
                    )}
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryClass[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-2">{formatDate(article.created_at)}</p>
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#1133f5] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visible < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisible(v => v + 3)}
                  className="px-8 py-3 border border-gray-300 text-sm font-medium rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-700"
                >
                  Load More Articles
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-medium">No articles found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
