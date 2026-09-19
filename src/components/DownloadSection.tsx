'use client'
import { useState, useEffect } from 'react'
import { FileText, Download, FolderOpen, MessageCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from './Skeleton'
import { useFadeUp } from '@/hooks/useFadeUp'
type Doc = {
  id: string
  name: string
  category: string
  type: string
  size: string | null
  publicUrl: string | null
}

const typeColors: Record<string, { bg: string; text: string }> = {
  PDF: { bg: 'bg-red-50', text: 'text-red-500' },
}

export default function DownloadSection() {
  const [docs, setDocs]       = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const fadeRef = useFadeUp<HTMLDivElement>()

  useEffect(() => {
    fetch('/api/documents')
      .then(r => r.json())
      .then(setDocs)
      .finally(() => setLoading(false))
  }, [])

  // Group documents by category
  const grouped = docs.reduce<Record<string, Doc[]>>((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  return (
    <section className="py-16 bg-white dark:bg-[#0a1628]">
      <div ref={fadeRef} className="fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <Skeleton className="h-4 w-1/2 mb-5" />
                <Skeleton className="h-12 w-full mb-3" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-5">
              <FolderOpen size={22} className="text-[#3457d5]" />
            </div>
            <p className="text-[#1d1d1d] font-semibold mb-1.5">No documents available yet</p>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              Account opening forms and other documents will appear here once our team publishes them.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:text-[#2a46c0] transition-colors">
                Request a form <ArrowUpRight size={13} />
              </Link>
              <span className="text-gray-200">&middot;</span>
              <a href="https://wa.me/255791228239" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:text-[#2a46c0] transition-colors">
                <MessageCircle size={13} /> WhatsApp us
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <div key={category} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#1d1d1d] mb-5 text-sm uppercase tracking-wider text-gray-500">
                  {category}
                </h3>
                <div className="space-y-3">
                  {grouped[category].map(doc => {
                    const style = typeColors[doc.type] ?? { bg: 'bg-[#fafafa]', text: 'text-gray-500' }
                    return (
                      <a
                        key={doc.id}
                        href={doc.publicUrl ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-[#fafafa] rounded-xl p-3.5 hover:bg-blue-50 hover:border-blue-100 border border-transparent transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 ${style.bg} rounded-lg flex items-center justify-center shrink-0`}>
                            <FileText size={15} className={style.text} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[#1d1d1d] leading-tight truncate">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {doc.type}{doc.size ? ` · ${doc.size}` : ''}
                            </p>
                          </div>
                        </div>
                        <Download
                          size={15}
                          className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0 ml-3"
                        />
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
