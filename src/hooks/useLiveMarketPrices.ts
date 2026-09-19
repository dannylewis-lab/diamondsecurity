import { useEffect, useState, useCallback } from 'react'
import type { LivePrice } from '@/app/api/dse/live-prices/route'

const REFRESH_MS = 30_000

export function useLiveMarketPrices() {
  const [prices, setPrices]     = useState<LivePrice[]>([])
  const [fetchedAt, setFetchedAt] = useState<string | null>(null)
  const [loading, setLoading]   = useState(true)
  const [errored, setErrored]   = useState(false)

  const load = useCallback(() => {
    fetch('/api/dse/live-prices')
      .then(r => r.json())
      .then(data => {
        setPrices(data.prices ?? [])
        setFetchedAt(data.fetchedAt ?? null)
        setErrored(Boolean(data.error) || (data.prices ?? []).length === 0)
      })
      .catch(() => setErrored(true))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => clearInterval(id)
  }, [load])

  return { prices, fetchedAt, loading, errored, refresh: load }
}
