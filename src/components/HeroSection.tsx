import Link from 'next/link'
import { Shield, ArrowUpRight, ChevronRight } from 'lucide-react'
import { HeroMarketWidget } from './HeroMarketWidget'

const stats = [
  { value: '3',    label: 'CMSA Licences',  sub: 'Dealer · Adviser · Fund Manager' },
  { value: 'DSE',  label: 'Exchange Member', sub: 'Dar es Salaam Stock Exchange'    },
  { value: 'CMSA', label: 'Regulator',       sub: 'Capital Markets Authority'       },
]

export default function HeroSection() {
  return (
    <section className="relative bg-white min-h-screen flex items-center pt-[70px] overflow-hidden">

      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,87,213,0.05) 0%, transparent 65%)',
          transform: 'translate(25%, -25%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,87,213,0.03) 0%, transparent 65%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#3457d5] border border-blue-200 mb-8"
              style={{ background: 'rgba(52,87,213,0.06)' }}
            >
              <Shield size={11} />
              CMSA Licensed &nbsp;·&nbsp; DSE Dealing Member
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1d1d1d] leading-[1.12] mb-5">
              Your Premier Gateway<br />
              to the{' '}
              <span style={{ color: '#3457d5' }}>Dar es Salaam</span>
              <br />Stock Exchange
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Diamond Global Securities Limited is a CMSA-licensed firm delivering
              professional brokerage, investment advisory, and fund management services
              to investors across Tanzania.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/contact"
                className="btn-blue inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl text-sm"
              >
                Open an Account <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/market"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-[#fafafa] hover:border-blue-200 transition-all text-sm"
              >
                View Live Market <ChevronRight size={15} />
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-0 border-t border-gray-100 pt-8">
              {stats.map(({ value, label, sub }, i) => (
                <div
                  key={label}
                  className={i > 0 ? 'pl-6 sm:pl-8 border-l border-gray-200' : ''}
                >
                  <p className="text-2xl font-bold text-[#1d1d1d]">{value}</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-[#3457d5] uppercase tracking-wider mt-0.5">
                    {label}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden sm:block">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Market Widget */}
          <div>
            <HeroMarketWidget />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-300 tracking-[0.3em] uppercase">Scroll</span>
        <div
          className="w-[18px] h-[18px]"
          style={{
            borderRight: '2px solid rgba(52,87,213,0.3)',
            borderBottom: '2px solid rgba(52,87,213,0.3)',
            transform: 'rotate(45deg)',
            animation: 'bounceDown 1.6s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
