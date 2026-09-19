import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

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

function formatDate(iso: string | Date) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function getArticle(id: string) {
  const session = await getSession()
  const article = await prisma.newsArticle.findUnique({ where: { id } })
  if (!article) return null
  if (!article.published && !session) return null
  return article
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const article = await getArticle(id)
  if (!article) return { title: 'Article Not Found - Diamond Global Securities' }
  return {
    title: `${article.title} - Diamond Global Securities`,
    description: article.excerpt,
    openGraph: article.imageUrl ? { images: [article.imageUrl] } : undefined,
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticle(id)
  if (!article) notFound()

  const cs = categoryStyle[article.category] ?? { bg: 'rgba(0,0,0,0.07)', text: '#555' }

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white">
        {!article.published && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-700 text-sm text-center py-2.5 px-4">
            Draft preview — this article is not yet published on the public site.
          </div>
        )}

        {/* Cover image */}
        <div className="relative w-full" style={{ height: '360px' }}>
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient[article.category] ?? 'from-gray-800 to-gray-600'} flex items-center justify-center`}>
              <Newspaper size={64} className="text-white/15" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 sm:p-12">
            <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#3457d5] transition-colors mb-6">
              <ArrowLeft size={13} /> Back to News
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase" style={{ background: cs.bg, color: cs.text }}>
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Calendar size={11} /> {formatDate(article.createdAt)}
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] leading-[1.15] mb-6">
              {article.title}
            </h1>

            <div className="w-12 h-0.5 bg-[#3457d5] mb-8" />

            <div>
              {article.content ? (
                article.content.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i} className="text-gray-600 text-[15.5px] leading-[1.85] mb-5">{para}</p>
                ))
              ) : article.excerpt ? (
                <p className="text-gray-600 text-[15.5px] leading-[1.85]">{article.excerpt}</p>
              ) : (
                <p className="text-gray-400 text-sm italic">No content available.</p>
              )}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Published by Diamond Global Securities Limited &middot; {formatDate(article.createdAt)}
              </p>
            </div>
          </div>
        </article>

        <div className="h-16" />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
