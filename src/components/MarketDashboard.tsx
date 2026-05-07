'use client'
import { ExternalLink, BarChart2, TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react'

const highlights = [
  { label: 'Equity Market', desc: 'Shares of listed companies'        },
  { label: 'Bond Market',   desc: 'Government & corporate bonds'       },
  { label: 'DSEI Index',    desc: 'Dar es Salaam Stock Exchange Index' },
  { label: 'EAX',           desc: 'East African Exchange commodities'  },
]

export default function MarketDashboard() {
  return (
    <section className="py-20 bg-[#fafafa]" id="market">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-50 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-5">
            <BarChart2 size={13} />
            Live Market Data
          </div>
          <h2 className="text-4xl font-bold text-[#1d1d1d] mb-3">DSE Market Dashboard</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Real-time market data from the official Dar es Salaam Stock Exchange
          </p>
        </div>

        {/* Main DSE card */}
        <a
          href="https://dse.co.tz/"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200 group-hover:-translate-y-1">
            {/* Top accent */}
            <div className="h-1 w-full" style={{ background: '#3457d5' }} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Left: DSE branding */}
              <div className="p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                {/* Logos: CMSA + DSE */}
                <div className="flex items-end gap-4 mb-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '100px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/cmsa-logo.jpg" alt="CMSA Tanzania" className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Regulator</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200 mb-5" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '100px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/dse-logo.png" alt="Dar es Salaam Stock Exchange" className="max-h-full max-w-full object-contain scale-[0.85]" />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Exchange</span>
                  </div>
                </div>

                <h3 className="text-[#1d1d1d] font-bold text-2xl mb-2 leading-tight">
                  Dar es Salaam<br />Stock Exchange
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Tanzania&apos;s official securities exchange, providing real-time market data, stock listings, indices, and investment information.
                </p>

                <div
                  className="flex items-center gap-3 w-fit py-3.5 px-7 rounded-xl font-semibold text-sm text-white transition-opacity duration-200 group-hover:opacity-90"
                  style={{ background: '#3457d5' }}
                >
                  <span>Visit DSE Website</span>
                  <ArrowUpRight size={16} />
                </div>

                <p className="text-gray-400 text-xs mt-5 flex items-center gap-1.5">
                  <ExternalLink size={11} />
                  dse.co.tz — Official exchange website
                </p>
              </div>

              {/* Right: Market highlights */}
              <div className="p-10 lg:p-14 flex flex-col justify-center bg-[#fafafa]">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={15} className="text-gray-400" />
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">What you can find on DSE</p>
                </div>

                <div className="space-y-3 mb-8">
                  {highlights.map(({ label, desc }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 group-hover:border-blue-100 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#3457d5' }} />
                      <div>
                        <p className="text-[#1d1d1d] font-semibold text-sm">{label}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl p-4 flex items-start gap-3 bg-white border border-gray-100">
                  <ShieldCheck size={16} className="text-[#3457d5] shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Diamond Global Securities Limited is a licensed <strong className="text-[#1d1d1d]">DSE Dealing Member</strong>, authorised to trade on the Dar es Salaam Stock Exchange on behalf of investors.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </a>

      </div>
    </section>
  )
}
