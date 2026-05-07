'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart2, TrendingUp, TrendingDown, Minus, CheckCircle, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Report = {
  id: string
  title: string
  summary: string | null
  sentiment: 'bullish' | 'bearish' | 'neutral'
  created_at: string
}

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

const staticPoints = [
  'Banking sector equities remained the most actively traded on the DSE',
  'Market breadth positive — advancers outnumbered decliners',
  'Investor participation remained steady across equity and bond markets',
  'The DSE All-Share Index reflects continued growth in listed securities',
]

const staticSummary =
  “The Dar es Salaam Stock Exchange continued to attract investor interest, with banking stocks “ +
  “remaining among the most actively traded securities. CRDB and TCCL led activity among listed “ +
  “equities, reflecting sustained confidence in Tanzania's financial sector. Market breadth remained “ +
  “positive, with advancers outnumbering decliners — a sign of broad-based participation across the exchange.”

export default function LiveMarketOverview() {
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('market_reports')
      .select('id, title, summary, sentiment, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setReport(data[0])
        setLoading(false)
      })
  }, [])

  const cfg = report
    ? sentimentConfig[report.sentiment] ?? sentimentConfig.neutral
    : sentimentConfig.bullish
  const { Icon: SentimentIcon } = cfg

  return (
    <section className="py-20 bg-white dark:bg-[#0a1628]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <BarChart2 size={13} />
            DSE Market Insight
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Market Overview</h2>
          <p className="text-gray-500 dark:text-blue-300 max-w-lg mx-auto">
            Stay informed with our latest commentary on the Dar es Salaam Stock Exchange
          </p>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div>
              <p className="text-gray-900 font-bold text-base">
                {loading ? 'DSE Market Summary' : (report?.title ?? 'DSE Market Summary')}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">Dar es Salaam Stock Exchange</p>
            </div>
            {!loading && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#1133f5] border border-blue-100">
                <SentimentIcon size={11} />
                {cfg.label}
              </span>
            )}
          </div>

          <div className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <svg className="animate-spin w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </div>
            ) : (
              <>
                <p className="text-gray-600 leading-relaxed mb-7 text-[15px]">
                  {report?.summary ?? staticSummary}
                </p>

                {!report && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1 h-5 bg-blue-500 rounded-full" />
                      <h4 className="font-bold text-gray-900 text-sm">Key Market Indicators</h4>
                    </div>
                    <ul className="space-y-3">
                      {staticPoints.map(point => (
                        <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-blue-500 mt-0.5 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Source: Dar es Salaam Stock Exchange (DSE)</p>
                  <Link
                    href="/market"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1"
                  >
                    View Live Data
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
