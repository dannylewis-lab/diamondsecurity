import { useEffect, useState } from 'react'

export type MarketReport = {
  id: string
  title: string
  summary: string | null
  sentiment: 'bullish' | 'bearish' | 'neutral'
  createdAt: string
}

export function useLatestMarketReport() {
  const [report, setReport] = useState<MarketReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reports?limit=1')
      .then(r => r.json())
      .then((data: MarketReport[]) => { if (data.length > 0) setReport(data[0]) })
      .finally(() => setLoading(false))
  }, [])

  return { report, loading }
}
