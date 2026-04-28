/**
 * API Configuration
 * Centralizes configuration for DSE API endpoints
 */

export const apiConfig = {
  // Base URLs - can be overridden by environment variables
  DSE_MARKET_API: process.env.DSE_MARKET_API || 'https://data.dse.co.tz',
  DSE_PRICES_API: process.env.DSE_PRICES_API || 'https://dse.co.tz',

  // Refresh intervals (in milliseconds)
  MARKET_REFRESH_INTERVAL: parseInt(process.env.NEXT_PUBLIC_MARKET_REFRESH_INTERVAL || '30000'),
  CHART_REFRESH_INTERVAL: parseInt(process.env.NEXT_PUBLIC_CHART_REFRESH_INTERVAL || '60000'),

  // Feature flags
  ENABLE_REAL_TIME_DATA: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME_DATA !== 'false',
  ENABLE_HISTORICAL_CHARTS: process.env.NEXT_PUBLIC_ENABLE_HISTORICAL_CHARTS !== 'false',

  // API Endpoints
  endpoints: {
    // Market status
    marketClosed: () => `${apiConfig.DSE_MARKET_API}/api/is/market/closed`,

    // Live market prices
    livePrices: () => `${apiConfig.DSE_PRICES_API}/api/get/live/market/prices`,

    // Historical prices
    historicalPrices: (securityCode: string, days: number = 180, securityClass: string = 'EQUITY') =>
      `${apiConfig.DSE_PRICES_API}/api/get/market/prices/for/range/duration?security_code=${securityCode}&days=${days}&class=${securityClass}`,
  },

  // Request configuration
  requestOptions: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 10000, // 10 seconds
  },

  // Timeout for API requests (in milliseconds)
  REQUEST_TIMEOUT: 10000,

  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
}

/**
 * Get endpoint URL with optional parameters
 */
export function getEndpoint(
  endpointKey: keyof typeof apiConfig.endpoints,
  param1?: string | number,
  param2?: string | number,
  param3?: string | number
): string {
  const endpoint = apiConfig.endpoints[endpointKey] as any
  if (typeof endpoint === 'function') {
    const params = [param1, param2, param3].filter(p => p !== undefined)
    return endpoint(...params)
  }
  return endpoint as string
}

/**
 * Initialize API configuration (can be called at app startup to verify endpoints)
 */
export async function initializeAPI(): Promise<boolean> {
  try {
    // Try to fetch market status to verify connectivity
    const response = await fetch(getEndpoint('marketClosed'), {
      ...apiConfig.requestOptions,
      method: 'GET',
    })
    return response.ok
  } catch (error) {
    console.warn('DSE API initialization check failed, will use fallback data:', error)
    return false
  }
}
