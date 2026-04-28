'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Search } from 'lucide-react'
import { getLiveMarketPrices, getHistoricalPrices, getMarketIndices } from '@/lib/api'
import { indices as fallbackIndices, dseiChartData, stockData as fallbackData } from '@/lib/data'

const timeFilters = ['1D', '1W', '1M']

// Helper function to normalize stock data from different API formats
function normalizeStock(stock: any) {
  return {
    symbol: (stock.symbol || stock.security_code || stock.code || '').toString().trim().toUpperCase(),
    name: (stock.name || stock.security_name || stock.company_name || stock.description || '').toString().trim(),
    price: Number(stock.price || stock.last_price || stock.closing_price || 0),
    change: Number(stock.change || stock.daily_change || stock.price_change || 0),
    pctChange: Number(stock.pctChange || stock.daily_change_percent || stock.percent_change || 0),
    volume: Number(stock.volume || stock.trading_volume || 0),
  }
}

export default function MarketDashboard() {
  const [activeFilter, setActiveFilter] = useState('1M')
  const [search, setSearch] = useState('')
  const [livePrices, setLivePrices] = useState<any[]>([])
  const [marketIndices, setMarketIndices] = useState<any[]>(fallbackIndices)
  const [chartData, setChartData] = useState(dseiChartData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        const [prices, indices] = await Promise.all([
          getLiveMarketPrices(),
          getMarketIndices()
        ])

        if (prices && prices.length > 0) {
          // Log first item to see API response structure
          console.log('API Live Prices Response (first item):', prices[0])
          setLivePrices(prices)
        } else {
          console.log('No API data, using fallback data')
          setLivePrices(fallbackData)
        }

        if (indices && indices.length > 0) {
          setMarketIndices(indices)
        }

        // Fetch DSEI historical data if available
        try {
          const dseiData = await getHistoricalPrices('DSEI', 30)
          if (dseiData && dseiData.length > 0) {
            setChartData(dseiData.map(item => ({
              date: item.date || new Date().toLocaleDateString(),
              value: item.close || item.last_price || 0
            })))
          }
        } catch (chartError) {
          console.log('Chart data not available, using fallback')
        }
      } catch (error) {
        console.error('Failed to fetch market data, using fallback', error)
        setLivePrices(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000)
    return () => clearInterval(interval)
  }, [])

  const filtered = (livePrices && livePrices.length > 0 ? livePrices : fallbackData)
    .map(normalizeStock)
    .filter(s => {
      if (!s.symbol && !s.name) return false
      return (
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase())
      )
    })

  return (
    <section className="py-20 bg-gray-50" id="market">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Live Market Dashboard</h2>
          <p className="text-gray-500">Real-time market data from the Dar es Salaam Stock Exchange</p>
        </div>

        {/* Index Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {marketIndices.map(idx => (
            <div key={idx.name || idx.security_name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">{idx.name || idx.security_name || 'Index'}</span>
                {(idx.daily_change ?? idx.change ?? 0) >= 0
                  ? <TrendingUp size={20} className="text-emerald-500" />
                  : <TrendingDown size={20} className="text-red-500" />
                }
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{(idx.current_value ?? idx.value ?? 0).toLocaleString()}</p>
              <p className={(idx.daily_change_percent ?? idx.pctChange ?? 0) >= 0 ? 'text-emerald-500 text-sm font-medium' : 'text-red-500 text-sm font-medium'}>
                {(idx.daily_change ?? idx.change ?? 0) >= 0 ? '+' : ''}{(idx.daily_change ?? idx.change ?? 0).toFixed(2)} ({(idx.daily_change_percent ?? idx.pctChange ?? 0) >= 0 ? '+' : ''}{(idx.daily_change_percent ?? idx.pctChange ?? 0).toFixed(2)}%)
              </p>
            </div>
          ))}
        </div>

        {/* DSEI Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">DSEI Performance</h3>
            <div className="flex items-center gap-1">
              {timeFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    activeFilter === f
                      ? 'bg-navy-900 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  style={activeFilter === f ? { background: '#1a2744' } : {}}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dseiChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={['dataMin - 20', 'dataMax + 20']} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: number) => [val.toLocaleString(), 'DSEI']}
              />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* All Stocks Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 justify-between p-5 sm:p-6 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900">All Stocks</h3>
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search stocks..."
                className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Symbol</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Name</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Price</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Change</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">%Change</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Volume</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((stock, i) => (
                  <tr key={stock.symbol + i} className={`stock-row border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{stock.symbol}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stock.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">{stock.price.toLocaleString()} TZS</td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${stock.pctChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stock.pctChange >= 0 ? '+' : ''}{stock.pctChange.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-right">{stock.volume.toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No stocks found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center border-t border-gray-50">
            <button className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              View Full Market Data
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
