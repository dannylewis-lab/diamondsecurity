'use client'
import { useState, useEffect } from 'react'
import { FileText, Download, FolderOpen } from 'lucide-react'
type Doc = {
  id: string
  name: string
  category: string
  type: string
  size: string | null
  publicUrl: string | null
}

const typeColors: Record<string, { bg: string; text: string }> = {
  PDF:  { bg: 'bg-red-50',     text: 'text-red-500' },
  DOC:  { bg: 'bg-blue-50',    text: 'text-blue-500' },
  DOCX: { bg: 'bg-blue-50',    text: 'text-blue-500' },
  XLSX: { bg: 'bg-blue-50', text: 'text-blue-500' },
  XLS:  { bg: 'bg-blue-50', text: 'text-blue-500' },
}

export default function DownloadSection() {
  const [docs, setDocs]       = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-[#fafafa] rounded-2xl flex items-center justify-center mb-4">
              <FolderOpen size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">No documents available yet.</p>
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
                              {doc.type}{doc.size ? ` Â· ${doc.size}` : ''}
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
