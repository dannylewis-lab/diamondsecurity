'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Article = {
  id: string
  title: string
  excerpt: string | null
  category: string
  image_url: string | null
  created_at: string
}

const categoryStyle: Record<string, { bg: string; text: string }> = {
  'Market Update': { bg: 'rgba(52,87,213,0.12)', text: '#3457d5' },
  'Article':       { bg: 'rgba(52,87,213,0.08)', text: '#3457d5' },
  'Notice':        { bg: 'rgba(52,87,213,0.15)', text: '#2040b0' },
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

export default function LiveNewsSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('news_articles')
      .select('id, title, excerpt, category, image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setArticles(data)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-24 bg-white dark:bg-[#050e25] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                Latest Updates
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] dark:text-white">
              News &amp; <span className="italic text-[#3457d5]">Insights</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:gap-3 transition-all"
          >
            View all <ArrowUpRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-[#3457d5]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Newspaper size={32} className="text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">No published articles yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, i) => {
              const cs = categoryStyle[article.category] ?? { bg: 'rgba(0,0,0,0.07)', text: '#555' }
              return (
                <Link
                  key={article.id}
                  href="/news"
                  className={`group block bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-200 hover:shadow-lg transition-all duration-300 ${i === 0 ? 'md:col-span-1' : ''}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: i === 0 ? '240px' : '200px' }}>
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
                      <span
                        className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase backdrop-blur-sm"
                        style={{ background: cs.bg, color: cs.text }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                      <Calendar size={11} />
                      {formatDate(article.created_at)}
                    </div>
                    <h3 className="font-display text-lg text-[#0a0a0a] dark:text-white leading-snug group-hover:text-[#3457d5] dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-gray-500 dark:text-blue-300/60 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
