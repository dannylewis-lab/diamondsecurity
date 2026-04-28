import Link from 'next/link'
import { Shield, ArrowUpRight, ChevronRight } from 'lucide-react'
import { HeroMarketWidget } from './HeroMarketWidget'

export default function HeroSection() {
  return (
    <section
      className="hero-dots min-h-screen flex items-center pt-[70px] relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1128 0%, #1a2744 55%, #0c2240 100%)' }}
    >
      {/* Subtle decorative ring */}
      <div
        className="absolute left-0 top-1/2 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full border-[40px] lg:border-[50px] border-white opacity-[0.025] pointer-events-none"
        style={{ transform: 'translate(-40%, -50%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hero Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-8">
              <Shield size={12} />
              CMSA Licensed · DSE Dealing Member
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.4rem] font-bold text-white leading-[1.15] mb-6">
              Your Authorised Partner<br />
              on the <span className="text-emerald-400">Dar es Salaam</span><br />
              Stock Exchange
            </h1>

            <p className="text-blue-200/90 text-lg leading-relaxed mb-8 max-w-lg">
              Diamond Global Securities Limited is a licensed and regulated firm offering
              professional brokerage, investment advisory, and fund management services
              to investors across Tanzania.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 text-sm"
              >
                Open an Account
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/market"
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/25 text-white/90 font-medium rounded-lg hover:bg-white/10 transition-all text-sm"
              >
                View Live Market
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right: Live Market Widget */}
          <HeroMarketWidget />
        </div>
      </div>
    </section>
  )
}
