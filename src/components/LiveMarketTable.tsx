'use client'
import { TrendingUp, TrendingDown, RefreshCw, AlertTriangle } from 'lucide-react'
import { Skeleton } from './Skeleton'
import { useLiveMarketPrices } from '@/hooks/useLiveMarketPrices'
import type { LivePrice } from '@/app/api/dse/live-prices/route'

function fmtPrice(v: number) {
  return `TZS ${v.toLocaleString('en-US')}`
}

function fmtPct(v: number | null) {
  if (v === null) return '—'
  return `${v > 0 ? '+' : ''}${v.toFixed(2)}%`
}

function fmtTime(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function ChangeCell({ p }: { p: LivePrice }) {
  const up = p.change > 0
  const down = p.change < 0
  const color = up ? '#16875a' : down ? '#b3261e' : '#6b7280'
  return (
    <span className="inline-flex items-center gap-1 font-semibold tabular-nums" style={{ color }}>
      {up && <TrendingUp size={12} />}
      {down && <TrendingDown size={12} />}
      {p.change > 0 ? '+' : ''}{p.change.toLocaleString('en-US')} ({fmtPct(p.pctChange)})
    </span>
  )
}

export default function LiveMarketTable() {
  const { prices, fetchedAt, loading, errored, refresh } = useLiveMarketPrices()

  const movers = [...prices].filter(p => p.pctChange !== null)
  const gainers = [...movers].sort((a, b) => (b.pctChange ?? 0) - (a.pctChange ?? 0)).slice(0, 3)
  const losers  = [...movers].sort((a, b) => (a.pctChange ?? 0) - (b.pctChange ?? 0)).slice(0, 3)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="h-1 w-full" style={{ background: '#3457d5' }} />
      <div className="px-6 sm:px-7 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 ${!errored ? 'animate-ping opacity-75' : ''}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${errored ? 'bg-gray-300' : 'bg-emerald-500'}`} />
          </span>
          <h3 className="font-bold text-[#1d1d1d] text-sm">Live DSE Prices</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {fetchedAt && !loading && <span>Updated {fmtTime(fetchedAt)}</span>}
          <button onClick={refresh} className="inline-flex items-center gap-1 text-[#3457d5] font-semibold hover:text-[#2a46c0] transition-colors">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}
        </div>
      ) : errored ? (
        <div className="flex flex-col items-center text-center py-12 px-6">
          <AlertTriangle size={20} className="text-amber-500 mb-3" />
          <p className="text-sm text-gray-600 font-medium">Live prices are temporarily unavailable</p>
          <p className="text-xs text-gray-400 mt-1">The DSE feed didn&apos;t respond — try again shortly, or visit dse.co.tz directly.</p>
        </div>
      ) : (
        <>
          {/* Top movers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100">
            <div className="p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Top Gainers</p>
              <div className="space-y-2">
                {gainers.map(p => (
                  <div key={p.symbol} className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#1d1d1d]">{p.symbol}</span>
                    <ChangeCell p={p} />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Top Losers</p>
              <div className="space-y-2">
                {losers.map(p => (
                  <div key={p.symbol} className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#1d1d1d]">{p.symbol}</span>
                    <ChangeCell p={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full list */}
          <div className="max-h-[420px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 sm:px-7 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Company</th>
                  <th className="text-right px-6 sm:px-7 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Price</th>
                  <th className="text-right px-6 sm:px-7 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400">Change</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(p => (
                  <tr key={p.symbol} className="stock-row border-b border-gray-50 last:border-0">
                    <td className="px-6 sm:px-7 py-3">
                      <p className="text-sm font-bold text-[#1d1d1d] leading-tight">{p.symbol}</p>
                      {p.name && <p className="text-xs text-gray-400 leading-tight mt-0.5">{p.name}</p>}
                    </td>
                    <td className="px-6 sm:px-7 py-3 text-sm text-right tabular-nums text-gray-700">{fmtPrice(p.price)}</td>
                    <td className="px-6 sm:px-7 py-3 text-sm text-right"><ChangeCell p={p} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 sm:px-7 py-4 bg-[#fafafa] border-t border-gray-100">
            <p className="text-[11px] text-gray-400">
              Source: Dar es Salaam Stock Exchange (dse.co.tz). Prices refresh automatically every 30 seconds during the session.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
