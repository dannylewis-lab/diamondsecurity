'use client'
import Image from 'next/image'
import { ExternalLink, BarChart2, TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react'

const highlights = [
  { label: 'Equity Market',      desc: 'Shares of listed companies'         },
  { label: 'Bond Market',        desc: 'Government & corporate bonds'        },
  { label: 'DSEI Index',         desc: 'Dar es Salaam Stock Exchange Index'  },
  { label: 'EAX',                desc: 'East African Exchange commodities'   },
]

export default function MarketDashboard() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#050e25]" id="market">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <BarChart2 size={13} />
            Live Market Data
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">DSE Market Dashboard</h2>
          <p className="text-gray-500 dark:text-blue-300 max-w-lg mx-auto">
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
          <div
            className="relative rounded-3xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1"
            style={{ background: 'linear-gradient(145deg, #0f2a44 0%, #1a3a5c 50%, #0f2a44 100%)' }}
          >
            {/* Top accent */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #10b981, #3b82f6, #10b981)' }} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Left: DSE branding */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                {/* Logo */}
                <div className="mb-8">
                  <div
                    className="relative bg-white rounded-2xl overflow-hidden"
                    style={{
                      width: '200px',
                      height: '110px',
                      boxShadow: '0 0 40px 8px rgba(255,255,255,0.12), 0 8px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Image
                      src="/dse-logo.png"
                      alt="Dar es Salaam Stock Exchange"
                      fill
                      className="object-contain scale-[0.85]"
                      priority
                    />
                  </div>
                </div>

                <h3 className="text-white font-bold text-2xl mb-2 leading-tight">
                  Dar es Salaam<br />Stock Exchange
                </h3>
                <p className="text-blue-300 text-sm mb-6 leading-relaxed">
                  Tanzania's official securities exchange, providing real-time market data, stock listings, indices, and investment information.
                </p>

                {/* CTA */}
                <div className="flex items-center gap-3 w-fit py-3.5 px-7 rounded-xl font-semibold text-sm text-white transition-all duration-200 group-hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                  <span>Visit DSE Website</span>
                  <ArrowUpRight size={16} />
                </div>

                <p className="text-blue-300/50 text-xs mt-5 flex items-center gap-1.5">
                  <ExternalLink size={11} />
                  dse.co.tz — Official exchange website
                </p>
              </div>

              {/* Right: Market highlights */}
              <div
                className="p-10 lg:p-14 flex flex-col justify-center"
                style={{ background: 'rgba(0,0,0,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={15} className="text-emerald-400" />
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest">What you can find on DSE</p>
                </div>

                <div className="space-y-3 mb-8">
                  {highlights.map(({ label, desc }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">{label}</p>
                        <p className="text-blue-300/70 text-xs mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DSE partnership note */}
                <div
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-300/80 text-xs leading-relaxed">
                    Diamond Global Securities Limited is a licensed <strong className="text-emerald-300">DSE Dealing Member</strong>, authorised to trade on the Dar es Salaam Stock Exchange on behalf of investors.
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
