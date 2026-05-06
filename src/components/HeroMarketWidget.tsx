'use client'
import Image from 'next/image'
import { ExternalLink, TrendingUp, BarChart2, ArrowUpRight } from 'lucide-react'

export function HeroMarketWidget() {
  return (
    <a
      href="https://dse.co.tz/"
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/25 group-hover:shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #10b981, #3b82f6, #10b981)' }} />

        <div className="p-8 lg:p-10">

          {/* DSE Logo */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
              style={{
                width: '180px',
                height: '100px',
                boxShadow: '0 0 40px 8px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.4)',
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

          {/* Title */}
          <div className="text-center mb-6">
            <p className="text-white font-bold text-xl tracking-tight mb-1">
              Dar es Salaam Stock Exchange
            </p>
            <p className="text-blue-300 text-sm">Official Market Authority — Tanzania</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {[
              { Icon: BarChart2,  label: 'Listed Stocks',   value: 'DSE'  },
              { Icon: TrendingUp, label: 'Market Index',    value: 'DSEI' },
              { Icon: BarChart2,  label: 'Exchange',        value: 'EAX'  },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl py-3 px-2 text-center"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <Icon size={16} className="text-white/70 mx-auto mb-1.5" />
                <p className="text-white font-bold text-sm">{value}</p>
                <p className="text-blue-300/70 text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <p className="text-center text-blue-200/70 text-sm leading-relaxed mb-7 px-2">
            For live stock prices, indices, and real‑time market data, visit the official Dar es Salaam Stock Exchange website.
          </p>

          {/* CTA Button */}
          <div
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 group-hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
          >
            <span className="text-white">Visit DSE Website</span>
            <ArrowUpRight size={16} className="text-white" />
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-[11px] text-blue-300/60 font-medium tracking-wide">
              Diamond Global Securities · Licensed DSE Dealing Member
            </p>
          </div>

        </div>
      </div>
    </a>
  )
}
