// Proxies the real DSE live-prices feed server-side — avoids exposing the
// upstream URL to the browser and sidesteps any CORS restriction on it.
// Verified response shape (2026-09-19): { success: boolean, data: [{ id, company, price, change }] }
// Note: no security name, %, or volume in this feed — only ticker/price/change.

type DsePriceRow = { id: number; company: string; price: number; change: number }

export type LivePrice = {
  symbol: string
  price: number
  change: number
  pctChange: number | null
}

const DSE_LIVE_PRICES_URL = 'https://dse.co.tz/api/get/live/market/prices'

export async function GET() {
  try {
    const res = await fetch(DSE_LIVE_PRICES_URL, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 20 }, // cache briefly server-side so many visitors share one upstream call
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`DSE responded ${res.status}`)

    const json = await res.json()
    const rows: DsePriceRow[] = Array.isArray(json?.data) ? json.data : []

    const prices: LivePrice[] = rows.map(r => {
      const prevClose = r.price - r.change
      return {
        symbol: r.company,
        price: r.price,
        change: r.change,
        pctChange: prevClose !== 0 ? (r.change / prevClose) * 100 : null,
      }
    })

    return Response.json({ prices, fetchedAt: new Date().toISOString() })
  } catch {
    return Response.json({ prices: [], fetchedAt: new Date().toISOString(), error: true }, { status: 200 })
  }
}
