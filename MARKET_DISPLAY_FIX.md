# Market Dashboard - Display Fix

## Issue
Company names and symbols were not displaying in the All Stocks table on the market page.

## Root Cause
The DSE API response uses different field names than what the component was expecting:
- API returns: `security_code`, `security_name`, `company_name`, `code`, etc.
- Component expected: `symbol`, `name`

Additionally, the component wasn't handling all possible field name variations from different API response formats.

## Solution Implemented

### 1. Created a Normalization Function
Added `normalizeStock()` helper function that handles multiple field name variations:
```typescript
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
```

### 2. Updated Data Processing Pipeline
- All live price data is now normalized before filtering
- Filtered array contains properly structured data with consistent field names
- Search filtering now works on normalized data

### 3. Added Debugging
- Added console logging to show API response structure
- Logs show `markets: {first live price item from API}` for troubleshooting

### 4. Improved Table Rendering
- Renders normalized data directly (no inline extraction needed)
- Added "No stocks found" message when table is empty
- Better handling of missing data

## Field Name Mappings
The normalization function handles these API response variations:

| Data Field | API Field Names (in priority order) |
|-----------|-------------------------------------|
| Symbol | symbol, security_code, code |
| Name | name, security_name, company_name, description |
| Price | price, last_price, closing_price |
| Change | change, daily_change, price_change |
| % Change | pctChange, daily_change_percent, percent_change |
| Volume | volume, trading_volume |

## Testing
1. Open the market page: `/market`
2. Check the "All Stocks" table
3. Company names and symbols should now display correctly
4. Search functionality filters by both symbol and name
5. Check browser DevTools console to see API response format if data isn't displaying

## Files Modified
- `src/components/MarketDashboard.tsx` - Added normalization function and updated rendering logic

## Next Steps
If symbols/names still aren't displaying:
1. Check the browser console for the logged API response
2. Add those field names to the `normalizeStock()` function if needed
3. Verify the API is returning data (not empty arrays)
