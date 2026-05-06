'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Newspaper } from 'lucide-react'

type Article = {
  id: string
  title: string
  excerpt: string | null
  category: string
  image_url: string | null
  created_at: string
}

const categoryClass: Record<string, string> = {
  'Market Update': 'badge-market',
  'Article':       'badge-article',
  'Notice':        'badge-notice',
}

const categoryGradient: Record<string, string> = {
  'Market Update': 'from-emerald-800 to-emerald-600',
  'Article':       'from-blue-800 to-blue-600',
  'Notice':        'from-amber-700 to-amber-500',
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
    <section className="py-20 bg-gray-50 dark:bg-[#050e25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">News &amp; Insights</h2>
          <p className="text-gray-500 dark:text-blue-300">
            Stay informed with the latest market updates, articles, and official notices
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Newspaper size={22} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">No published articles yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  {/* Image or gradient placeholder */}
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
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {formatDate(article.created_at)}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/news"
                className="px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                View All News →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
