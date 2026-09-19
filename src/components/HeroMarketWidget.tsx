'use client'
import { ArrowUpRight, ShieldCheck, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useLatestMarketReport } from '@/hooks/useLatestMarketReport'
import { Skeleton } from './Skeleton'

const sentimentConfig = {
  bullish: { label: 'Bullish', Icon: TrendingUp,   color: '#16875a', bg: '#e3f5ec' },
  bearish: { label: 'Bearish', Icon: TrendingDown, color: '#b3261e', bg: '#fbeaea' },
  neutral: { label: 'Neutral', Icon: Minus,        color: '#6b7280', bg: '#f1f2f4' },
}

export function HeroMarketWidget() {
  const { report, loading } = useLatestMarketReport()
  const cfg = report ? sentimentConfig[report.sentiment] ?? sentimentConfig.neutral : null

  return (
    <a
      href="https://dse.co.tz/"
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1" style={{ background: '#3457d5' }} />

        {/* Today's trend strip */}
        <div className="px-8 lg:px-10 pt-6 flex items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Today&apos;s Trend</span>
          {loading ? (
            <Skeleton className="h-6 w-24" />
          ) : cfg ? (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              <cfg.Icon size={12} /> {cfg.label}
            </span>
          ) : (
            <span className="text-xs text-gray-400">Not yet published</span>
          )}
        </div>

        <div className="p-8 lg:p-10 flex flex-col items-center text-center">

          {/* Logos: CMSA + DSE */}
          <div className="flex items-end gap-4 mb-7">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '88px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/cmsa-logo.jpg" alt="CMSA Tanzania" className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Regulator</span>
            </div>
            <div className="w-px h-12 bg-gray-200 mb-5" />
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '88px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/dse-logo.png" alt="Dar es Salaam Stock Exchange" className="max-h-full max-w-full object-contain scale-[0.85]" />
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Exchange</span>
            </div>
          </div>

          <p className="text-[#1d1d1d] font-bold text-lg tracking-tight mb-1">
            Dar es Salaam Stock Exchange
          </p>
          <p className="text-gray-400 text-sm mb-8">Official Market Authority — Tanzania</p>

          {/* CTA */}
          <div
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-opacity duration-200 group-hover:opacity-90"
            style={{ background: '#3457d5' }}
          >
            Visit DSE Website
            <ArrowUpRight size={15} />
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <ShieldCheck size={12} className="text-gray-300" />
            <p className="text-[11px] text-gray-400 font-medium">
              Diamond Global Securities · Licensed DSE Dealing Member
            </p>
          </div>

        </div>
      </div>
    </a>
  )
}
