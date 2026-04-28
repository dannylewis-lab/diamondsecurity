# DSE API Integration Guide

This document explains how the real DSE (Dar es Salaam Stock Exchange) APIs have been integrated into the Diamond Securities application.

## Overview

The application now fetches real-time market data from three DSE API endpoints:

1. **Market Status** - Check if the market is open/closed
2. **Live Market Prices** - Get current prices for all listed securities
3. **Historical Prices** - Get historical price data for specific securities

## API Endpoints

### 1. Market Status
```
GET https://data.dse.co.tz/api/is/market/closed
```
**Response Example:**
```json
{
  "closed": false,
  "is_closed": false,
  "timestamp": "2026-03-24T14:30:00Z"
}
```

### 2. Live Market Prices
```
GET https://dse.co.tz/api/get/live/market/prices
```
**Response Example:**
```json
[
  {
    "security_code": "CRDB",
    "security_name": "Crescent Bancorp",
    "last_price": 1250.00,
    "daily_change": 25.00,
    "daily_change_percent": 2.00,
    "high": 1255.00,
    "low": 1225.00,
    "volume": 150000
  },
  ...
]
```

### 3. Historical Prices
```
GET https://dse.co.tz/api/get/market/prices/for/range/duration?security_code=CRDB&days=180&class=EQUITY
```
**Query Parameters:**
- `security_code` - Stock ticker (e.g., CRDB, NMB)
- `days` - Number of days of historical data (default: 180)
- `class` - Security class: EQUITY or BOND (default: EQUITY)

**Response Example:**
```json
[
  {
    "date": "2026-01-01",
    "security_code": "CRDB",
    "open": 1200.00,
    "high": 1255.00,
    "low": 1195.00,
    "close": 1250.00,
    "volume": 150000
  },
  ...
]
```

## Configuration

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Base URLs for DSE APIs
DSE_MARKET_API=https://data.dse.co.tz
DSE_PRICES_API=https://dse.co.tz

# Data refresh intervals (in milliseconds)
NEXT_PUBLIC_MARKET_REFRESH_INTERVAL=30000      # 30 seconds
NEXT_PUBLIC_CHART_REFRESH_INTERVAL=60000       # 60 seconds

# Feature flags
NEXT_PUBLIC_ENABLE_REAL_TIME_DATA=true
NEXT_PUBLIC_ENABLE_HISTORICAL_CHARTS=true
```

See `.env.example` for the default configuration template.

## API Integration Files

### New Files Created

1. **`src/lib/api.ts`** - Main API service layer
   - `getMarketStatus()` - Check market status with fallback logic
   - `getLiveMarketPrices()` - Fetch all live security prices
   - `getHistoricalPrices()` - Fetch historical data for a specific security
   - `getMarketIndices()` - Get market indices (DSEI, TSI, etc.)
   - `getTopGainers()` - Get top performing securities
   - `getTopLosers()` - Get worst performing securities
   - All functions include error handling and fallback to hardcoded data

2. **`src/lib/config.ts`** - Centralized API configuration
   - Manages all API endpoints and URLs
   - Configurable via environment variables
   - Request timeout and retry settings

3. **`src/components/HeroMarketWidget.tsx`** - New client component
   - Displays live top gainers and losers
   - Real-time data fetching with 30-second refresh interval
   - Graceful fallback to demo data if API is unavailable

### Updated Components

#### 1. **MarketDashboard** (`src/components/MarketDashboard.tsx`)
- Now fetches live market prices using `getLiveMarketPrices()`
- Fetches market indices using `getMarketIndices()`
- Attempts to fetch DSEI historical data for the chart
- Auto-refreshes data every 30 seconds
- Falls back to hardcoded demo data if APIs are unavailable

#### 2. **HeroSection** (`src/components/HeroSection.tsx`)
- Refactored to use the new `HeroMarketWidget` component
- Component now handles real API data fetching independently

## Data Handling

### API Response Mapping

The API service layer handles different response formats and keys:

```typescript
// API Response Key Mapping
{
  security_code | code | symbol         // Stock ticker
  security_name | name                   // Company name
  last_price | price | current_value    // Current price
  daily_change | change                  // Price change amount
  daily_change_percent | pctChange       // Percentage change
  volume                                 // Trading volume
}
```

### Fallback Data

If API calls fail:
1. Components check if they received valid data from the API
2. If empty or error, they fall back to hardcoded data in `src/lib/data.ts`
3. Users see demo data instead of broken components
4. Console shows error messages for debugging

### Error Handling

All functions include:
- **Try-catch blocks** for network errors
- **Timeout handling** - requests timeout after 10 seconds
- **Type coercion** - handles different API response formats
- **Fallback values** - returns empty arrays instead of throwing errors
- **Console logging** - errors logged for debugging

## Usage Examples

### Fetch Live Market Data

```typescript
import { getLiveMarketPrices } from '@/lib/api'

async function displayPrices() {
  const prices = await getLiveMarketPrices()
  console.log(prices)  // Array of LivePrice objects
}
```

### Fetch Historical Data

```typescript
import { getHistoricalPrices } from '@/lib/api'

async function displayChart() {
  const data = await getHistoricalPrices('CRDB', 180, 'EQUITY')
  // Returns 180 days of CRDB prices
}
```

### Get Top Gainers

```typescript
import { getTopGainers } from '@/lib/api'

async function showTopPerformers() {
  const gainers = await getTopGainers(5)  // Top 5 gainers
  gainers.forEach(stock => {
    console.log(`${stock.symbol}: +${stock.daily_change_percent}%`)
  })
}
```

## Testing the Integration

### Development Mode
```bash
npm run dev
```

Check the browser console and Network tab:
1. **Console**: Look for any API errors with helpful messages
2. **Network**: View actual API requests and responses
3. **Components**: Live data should update automatically

### Manual Testing

```bash
# Test market status endpoint
curl https://data.dse.co.tz/api/is/market/closed

# Test live prices endpoint
curl https://dse.co.tz/api/get/live/market/prices

# Test historical prices
curl "https://dse.co.tz/api/get/market/prices/for/range/duration?security_code=CRDB&days=30&class=EQUITY"
```

## Performance Considerations

1. **Refresh Intervals**
   - Market data: 30 seconds (configurable)
   - Chart data: 60 seconds (configurable)
   - Reduces API load and improves performance

2. **Caching**
   - Component state caches data between refreshes
   - Consider implementing server-side caching for better performance

3. **Parallel Requests**
   - Multiple API calls are batched using `Promise.all()`
   - Reduces loading time for complex data views

## Troubleshooting

### APIs Returning Empty Data
1. Check API endpoints are accessible: `curl https://dse.co.tz/api/get/live/market/prices`
2. Verify response format hasn't changed from the examples above
3. Check browser console for fetch errors
4. Fallback data will be used if APIs fail

### Component Not Updating
1. Check if refresh interval is configured correctly
2. Open DevTools > Network tab to see API request frequency
3. Check for errors in the browser console
4. Verify `.env.local` file has correct API URLs

### Type Errors
1. The `LivePrice`, `HistoricalPrice`, and `MarketIndex` interfaces in `src/lib/api.ts` define expected data shapes
2. API responses may use different field names - the service layer handles mapping
3. If new fields are added to API responses, update interfaces as needed

## Future Enhancements

1. **Caching Layer** - Implement Redis/IndexedDB for offline support
2. **WebSocket Support** - Real-time updates instead of polling
3. **Rate Limiting** - Client-side throttling for API calls
4. **Analytics** - Track API response times and error rates
5. **Admin Dashboard** - Allow users to configure API endpoints
6. **Data Validation** - JSON schema validation for API responses

## Related Files

- API Service: [`src/lib/api.ts`](src/lib/api.ts)
- Configuration: [`src/lib/config.ts`](src/lib/config.ts)  
- Fallback Data: [`src/lib/data.ts`](src/lib/data.ts)
- Market Dashboard: [`src/components/MarketDashboard.tsx`](src/components/MarketDashboard.tsx)
- Market Widget: [`src/components/HeroMarketWidget.tsx`](src/components/HeroMarketWidget.tsx)
- Environment Example: [`.env.example`](.env.example)
