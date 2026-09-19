'use client'
import Link from 'next/link'
import { BarChart2, TrendingUp, TrendingDown, Minus, ChevronRight, FileDown } from 'lucide-react'
import { Skeleton } from './Skeleton'
import { useLatestMarketReport } from '@/hooks/useLatestMarketReport'
import { useFadeUp } from '@/hooks/useFadeUp'

const sentimentConfig = {
  bullish: {
    label: 'Positive Session',
    Icon: TrendingUp,
    badge: 'bg-blue-500/20 text-white border border-blue-500/20',
  },
  bearish: {
    label: 'Negative Session',
    Icon: TrendingDown,
    badge: 'bg-red-500/20 text-red-400 border border-red-500/20',
  },
  neutral: {
    label: 'Mixed Session',
    Icon: Minus,
    badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/20',
  },
}

const fallbackSummary = `Our team publishes market commentary here regularly. Check back soon, or visit the official DSE website for live prices and indices.`

export default function LiveMarketOverview() {
  const { report, loading } = useLatestMarketReport()
  const fadeRef = useFadeUp<HTMLDivElement>()

  const cfg = report ? sentimentConfig[report.sentiment] ?? sentimentConfig.neutral : null

  return (
    <section className="py-20 bg-white dark:bg-[#0a1628]">
      <div ref={fadeRef} className="fade-up max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <BarChart2 size={13} />
            DSE Market Insight
          </div>
          <h2 className="text-4xl font-bold text-[#1d1d1d] dark:text-white mb-3">Market Overview</h2>
          <p className="text-gray-500 dark:text-blue-300 max-w-lg mx-auto">
            Stay informed with our latest commentary on the Dar es Salaam Stock Exchange
          </p>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between bg-[#fafafa]">
            <div>
              <p className="text-[#1d1d1d] font-bold text-base">
                {loading ? 'DSE Market Summary' : (report?.title ?? 'DSE Market Summary')}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">Dar es Salaam Stock Exchange</p>
            </div>
            {!loading && cfg && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#3457d5] border border-blue-100">
                <cfg.Icon size={11} />
                {cfg.label}
              </span>
            )}
          </div>

          <div className="p-8">
            {loading ? (
              <div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <>
                <p className="text-gray-600 leading-relaxed mb-7 text-[15px]">
                  {report?.summary ?? fallbackSummary}
                </p>

                <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
                  <p className="text-xs text-gray-400">
                    {report ? 'Diamond Global Securities — Market Desk' : 'Commentary updates regularly'}
                  </p>
                  <div className="flex items-center gap-4">
                    {report?.pdfUrl && (
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1.5"
                      >
                        <FileDown size={13} /> PDF Report
                      </a>
                    )}
                    <Link
                      href="/market"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1"
                    >
                      View Market Data
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
