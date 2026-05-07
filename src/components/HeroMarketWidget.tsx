'use client'
import Image from 'next/image'
import { TrendingUp, BarChart2, ArrowUpRight, ShieldCheck } from 'lucide-react'

export function HeroMarketWidget() {
  return (
    <a
      href="https://dse.co.tz/"
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1" style={{ background: '#1133f5' }} />

        <div className="p-7 lg:p-8">

          {/* DSE Logo */}
          <div className="flex items-center justify-center mb-7">
            <div
              className="relative bg-white rounded-xl overflow-hidden border border-gray-100"
              style={{
                width: '180px',
                height: '96px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
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
            <p className="text-gray-900 font-bold text-lg tracking-tight mb-1">
              Dar es Salaam Stock Exchange
            </p>
            <p className="text-gray-400 text-sm">Official Market Authority — Tanzania</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { Icon: BarChart2,  label: 'Listed Stocks', value: 'DSE'  },
              { Icon: TrendingUp, label: 'Market Index',  value: 'DSEI' },
              { Icon: BarChart2,  label: 'Exchange',      value: 'EAX'  },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl py-3 px-2 text-center bg-gray-50 border border-gray-100"
              >
                <Icon size={15} className="mx-auto mb-1.5 text-gray-400" />
                <p className="text-gray-900 font-bold text-sm">{value}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <p className="text-center text-gray-400 text-sm leading-relaxed mb-6 px-2">
            For live stock prices, indices, and real-time market data, visit the
            official Dar es Salaam Stock Exchange website.
          </p>

          {/* CTA Button */}
          <div
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-opacity duration-200 group-hover:opacity-90"
            style={{ background: '#1133f5' }}
          >
            Visit DSE Website
            <ArrowUpRight size={15} />
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <ShieldCheck size={12} className="text-gray-300" />
            <p className="text-[11px] text-gray-400 font-medium">
              Diamond Global Securities · Licensed DSE Dealing Member
            </p>
          </div>

        </div>
      </div>
    </a>
  )
}
