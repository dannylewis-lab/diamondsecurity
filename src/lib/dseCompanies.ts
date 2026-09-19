// Full company names for DSE-listed equities, keyed by ticker.
// Verified directly against the DSE historical-prices endpoint's `fullName`
// field for every ticker present in the live-prices feed (2026-09-19) —
// not guessed. A ticker missing from this map (e.g. a new listing) just
// falls back to showing the symbol alone.
export const DSE_COMPANY_NAMES: Record<string, string> = {
  SWIS:  'Swissport Tanzania PLC',
  USL:   'Uchumi Supermarket Limited',
  KA:    'Kenya Airways Limited',
  TOL:   'TOL Gases',
  SWALA: 'Swala Oil and Gas (Tanzania) PLC',
  TCCL:  'Tanga Cement Public Limited Company',
  VODA:  'Vodacom Tanzania Public Limited Company',
  TBL:   'Tanzania Breweries Limited',
  JHL:   'Jubilee Holdings Limited',
  KCB:   'Kenya Commercial Bank Limited',
  JATU:  'Jatu PLC',
  EABL:  'East African Breweries Limited',
  MKCB:  'Mkombozi Commercial Bank PLC',
  PAL:   'Precision Air Services PLC',
  NICO:  'National Investment Company Limited',
  TCC:   'Tanzania Cigarette Public Limited Company',
  CRDB:  'CRDB Bank Public Limited Company',
  MBP:   'Maendeleo Bank Public Limited Company',
  DSE:   'Dar es Salaam Stock Exchange PLC',
  TPCC:  'Tanzania Portland Cement Company Limited',
  MCB:   'Mwalimu Commercial Bank PLC',
  YETU:  'Yetu Microfinance Public Limited Company',
  NMG:   'National Media Group Limited',
  DCB:   'DCB Commercial Bank PLC',
  NMB:   'National Microfinance Bank PLC',
  TTP:   'Tatepa Limited',
}
