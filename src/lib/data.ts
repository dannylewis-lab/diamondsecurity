export const stockData = [
  { symbol: 'CRDB', name: 'CRDB Bank', price: 285, change: 5.00, pctChange: 1.79, volume: 125000 },
  { symbol: 'NMB', name: 'NMB Bank', price: 3200, change: -50.00, pctChange: -1.54, volume: 89000 },
  { symbol: 'DSE', name: 'DSE Limited', price: 1500, change: 25.00, pctChange: 1.69, volume: 45000 },
  { symbol: 'TCCL', name: 'TCC Limited', price: 850, change: 15.00, pctChange: 1.80, volume: 67000 },
  { symbol: 'NICO', name: 'NICO Insurance', price: 420, change: -8.00, pctChange: -1.87, volume: 34000 },
  { symbol: 'TOL', name: 'TOL Gases', price: 1250, change: 30.00, pctChange: 2.46, volume: 56000 },
  { symbol: 'SWIS', name: 'Swissport', price: 680, change: -12.00, pctChange: -1.73, volume: 28000 },
  { symbol: 'TBL', name: 'TBL Limited', price: 9500, change: 150.00, pctChange: 1.60, volume: 15000 },
];

export const topGainers = stockData.filter(s => s.pctChange > 0).sort((a, b) => b.pctChange - a.pctChange).slice(0, 3);
export const topLosers = stockData.filter(s => s.pctChange < 0).sort((a, b) => a.pctChange - b.pctChange).slice(0, 3);

export const indices = [
  { name: 'DSEI', value: 2456.78, change: 18.45, pctChange: 0.76, trend: 'up' },
  { name: 'TSI', value: 3892.34, change: -12.67, pctChange: -0.32, trend: 'down' },
  { name: 'DSEI-Bond', value: 1845.23, change: 5.12, pctChange: 0.28, trend: 'up' },
];

export const dseiChartData = [
  { date: 'Feb 23', value: 2415 }, { date: 'Feb 25', value: 2390 }, { date: 'Feb 27', value: 2405 },
  { date: 'Mar 1', value: 2385 }, { date: 'Mar 2', value: 2410 }, { date: 'Mar 3', value: 2415 },
  { date: 'Mar 4', value: 2420 }, { date: 'Mar 5', value: 2418 }, { date: 'Mar 6', value: 2430 },
  { date: 'Mar 7', value: 2435 }, { date: 'Mar 8', value: 2400 }, { date: 'Mar 10', value: 2375 },
  { date: 'Mar 12', value: 2365 }, { date: 'Mar 14', value: 2380 }, { date: 'Mar 16', value: 2375 },
  { date: 'Mar 18', value: 2340 }, { date: 'Mar 20', value: 2315 }, { date: 'Mar 22', value: 2318 },
  { date: 'Mar 24', value: 2312 },
];

