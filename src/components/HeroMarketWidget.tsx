'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTopGainers, getTopLosers, LivePrice } from '@/lib/api'
import { topGainers as fallbackGainers, topLosers as fallbackLosers } from '@/lib/data'

export function HeroMarketWidget() {
  const [topGainers, setTopGainers] = useState<any[]>(fallbackGainers as any[])
  const [topLosers, setTopLosers] = useState<any[]>(fallbackLosers as any[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        const [gainers, losers] = await Promise.all([
          getTopGainers(5),
          getTopLosers(5)
        ])

        if (gainers && gainers.length > 0) {
          setTopGainers(gainers as unknown as any[])
        }
        if (losers && losers.length > 0) {
          setTopLosers(losers as unknown as any[])
        }
      } catch (error) {
        console.error('Failed to fetch market data:', error)
        // Use fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatStock = (stock: any) => ({
    symbol: stock.symbol || stock.security_code || stock.code || 'N/A',
    name: stock.name || stock.security_name || 'Unknown',
    price: stock.price || stock.last_price || 0,
    pctChange: stock.pctChange || stock.daily_change_percent || 0
  })

  return (
    <div className="glass-card p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">Live Market Data</h3>
        <Link href="/market" className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center gap-1">
          View All →
        </Link>
      </div>

      {/* Top Gainers */}
      <div className="mb-5">
        <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-3">Top Gainers</p>
        <div className="space-y-2">
          {topGainers.map(stock => {
            const formatted = formatStock(stock)
            return (
              <div key={formatted.symbol} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer">
                <div>
                  <p className="text-white font-semibold text-sm">{formatted.symbol}</p>
                  <p className="text-blue-300 text-xs">{formatted.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-sm">{formatted.price.toLocaleString()} TZS</p>
                  <p className="text-emerald-400 text-xs font-medium">+{formatted.pctChange.toFixed(2)}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Losers */}
      <div className="mb-5">
        <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-3">Top Losers</p>
        <div className="space-y-2">
          {topLosers.map(stock => {
            const formatted = formatStock(stock)
            return (
              <div key={formatted.symbol} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer">
                <div>
                  <p className="text-white font-semibold text-sm">{formatted.symbol}</p>
                  <p className="text-blue-300 text-xs">{formatted.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-sm">{formatted.price.toLocaleString()} TZS</p>
                  <p className="text-red-400 text-xs font-medium">{formatted.pctChange.toFixed(2)}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 text-xs text-blue-300 mt-2">
        <span className="pulse-dot" />
        Live market data · Updated every 30 seconds
      </div>
    </div>
  )
}
