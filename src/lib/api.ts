/**
 * DSE API Integration
 * Real API endpoints for market data, prices, and status
 */

import { apiConfig } from './config'

// Types for API responses
export interface MarketStatus {
  closed: boolean
  timestamp: string
}

export interface LivePrice {
  security_code: string
  security_name: string
  last_price: number
  daily_change: number
  daily_change_percent: number
  high: number
  low: number
  volume: number
}

export interface HistoricalPrice {
  date: string
  security_code: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface MarketIndex {
  code: string
  name: string
  current_value: number
  daily_change: number
  daily_change_percent: number
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = apiConfig.REQUEST_TIMEOUT) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

/**
 * Check if DSE market is closed
 */
export async function getMarketStatus(): Promise<MarketStatus> {
  try {
    const response = await fetchWithTimeout(apiConfig.endpoints.marketClosed(), {
      headers: apiConfig.requestOptions.headers,
    })
    if (!response.ok) throw new Error('Failed to fetch market status')
    const data = await response.json()
    return {
      closed: data.closed || data.is_closed,
      timestamp: new Date().toISOString()
    }
  } catch {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    return {
      closed: day === 0 || day === 6 || hour < 9 || hour >= 16,
      timestamp: now.toISOString()
    }
  }
}

/**
 * Get live market prices for all securities
 */
export async function getLiveMarketPrices(): Promise<LivePrice[]> {
  try {
    const response = await fetchWithTimeout(apiConfig.endpoints.livePrices(), {
      headers: apiConfig.requestOptions.headers,
    })
    if (!response.ok) throw new Error('Failed to fetch live prices')
    const data = await response.json()
    
    // Handle different response formats
    return Array.isArray(data) ? data : data.data || data.prices || []
  } catch {
    return []
  }
}

/**
 * Get historical prices for a specific security
 * @param securityCode - Security code (e.g., 'CRDB', 'NMB')
 * @param days - Number of days of historical data (default: 180)
 * @param securityClass - Class of security: 'EQUITY' or 'BOND' (default: 'EQUITY')
 */
export async function getHistoricalPrices(
  securityCode: string,
  days: number = 180,
  securityClass: string = 'EQUITY'
): Promise<HistoricalPrice[]> {
  try {
    const url = apiConfig.endpoints.historicalPrices(securityCode, days, securityClass)
    const response = await fetchWithTimeout(url, {
      headers: apiConfig.requestOptions.headers,
    })
    if (!response.ok) throw new Error(`Failed to fetch historical prices for ${securityCode}`)
    const data = await response.json()
    
    // Handle different response formats
    return Array.isArray(data) ? data : data.data || data.prices || []
  } catch {
    return []
  }
}

/**
 * Get live prices for specific securities
 * @param securityCodes - Array of security codes (e.g., ['CRDB', 'NMB'])
 */
export async function getLiveSecurityPrices(securityCodes: string[]): Promise<LivePrice[]> {
  try {
    const allPrices = await getLiveMarketPrices()
    return allPrices.filter(price => 
      securityCodes.some(code => 
        code.toUpperCase() === (price.security_code || '').toUpperCase()
      )
    )
  } catch {
    return []
  }
}

/**
 * Get market indices (DSEI, TSI, etc.)
 */
export async function getMarketIndices(): Promise<MarketIndex[]> {
  try {
    // First try to get indices from live prices endpoint
    const response = await fetchWithTimeout(apiConfig.endpoints.livePrices(), {
      headers: apiConfig.requestOptions.headers,
    })
    if (!response.ok) throw new Error('Failed to fetch market indices')
    const data = await response.json()
    
    // Filter for indices (typically have specific codes like DSEI, TSI)
    const allPrices = Array.isArray(data) ? data : data.data || data.prices || []
    return allPrices
      .filter((item: any) => {
        const code = (item.code || item.security_code || '').toUpperCase()
        return ['DSEI', 'TSI', 'DSEI-BOND', 'DSE-BOND'].includes(code)
      })
      .map((item: any) => ({
        code: item.code || item.security_code,
        name: item.name || item.security_name,
        current_value: item.current_value || item.value || item.last_price,
        daily_change: item.daily_change || item.change,
        daily_change_percent: item.daily_change_percent || item.pctChange
      })) as MarketIndex[]
  } catch {
    return []
  }
}

/**
 * Calculate top gainers from live prices
 */
export async function getTopGainers(limit: number = 5): Promise<LivePrice[]> {
  try {
    const prices = await getLiveMarketPrices()
    return prices
      .filter(p => p.daily_change_percent !== undefined)
      .sort((a, b) => (b.daily_change_percent || 0) - (a.daily_change_percent || 0))
      .slice(0, limit)
  } catch {
    return []
  }
}

/**
 * Calculate top losers from live prices
 */
export async function getTopLosers(limit: number = 5): Promise<LivePrice[]> {
  try {
    const prices = await getLiveMarketPrices()
    return prices
      .filter(p => p.daily_change_percent !== undefined)
      .sort((a, b) => (a.daily_change_percent || 0) - (b.daily_change_percent || 0))
      .slice(0, limit)
  } catch {
    return []
  }
}

/**
 * Get market summary data (used by HeroSection and dashboard)
 */
export async function getMarketSummary() {
  try {
    const [marketStatus, liveprices, topGainers, topLosers] = await Promise.all([
      getMarketStatus(),
      getLiveMarketPrices(),
      getTopGainers(5),
      getTopLosers(5)
    ])

    return {
      marketStatus,
      livePrices: liveprices,
      topGainers,
      topLosers,
      timestamp: new Date().toISOString()
    }
  } catch {
    return {
      marketStatus: { closed: false, timestamp: new Date().toISOString() },
      livePrices: [],
      topGainers: [],
      topLosers: [],
      timestamp: new Date().toISOString()
    }
  }
}
