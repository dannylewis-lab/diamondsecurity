'use client'
import { TrendingUp, TrendingDown, Minus, FileDown } from 'lucide-react'
import { Skeleton } from './Skeleton'
import { useLatestMarketReport } from '@/hooks/useLatestMarketReport'

const sentimentConfig = {
  bullish: { label: 'Bullish',  Icon: TrendingUp,   color: '#16875a', bg: '#e3f5ec' },
  bearish: { label: 'Bearish',  Icon: TrendingDown, color: '#b3261e', bg: '#fbeaea' },
  neutral: { label: 'Neutral',  Icon: Minus,        color: '#6b7280', bg: '#f1f2f4' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
}

export function TodaysMarketTrend() {
  const { report, loading } = useLatestMarketReport()

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
        <Skeleton className="h-3 w-32 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-1.5" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 text-center">
        <p className="text-sm text-gray-500">No market trend has been published yet today.</p>
        <p className="text-xs text-gray-400 mt-1">Check back soon, or visit the official DSE site for live prices.</p>
      </div>
    )
  }

  const cfg = sentimentConfig[report.sentiment] ?? sentimentConfig.neutral

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="h-1 w-full" style={{ background: cfg.color }} />
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Today&apos;s Market Trend &middot; {formatDate(report.createdAt)}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            <cfg.Icon size={12} /> {cfg.label}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#1d1d1d] mb-2 leading-snug">{report.title}</h3>
        {report.summary && (
          <p className="text-sm text-gray-600 leading-relaxed">{report.summary}</p>
        )}
        <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
          <p className="text-xs text-gray-400">Diamond Global Securities &middot; Market Desk</p>
          {report.pdfUrl && (
            <a
              href={report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3457d5] hover:text-[#2a46c0] transition-colors"
            >
              <FileDown size={13} /> Download full report (PDF)
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
