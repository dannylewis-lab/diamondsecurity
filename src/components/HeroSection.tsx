import Link from 'next/link'
import { Shield, ArrowUpRight, ChevronRight } from 'lucide-react'
import { HeroMarketWidget } from './HeroMarketWidget'

const diamonds = [
  { size: 60,  style: { top: '10%',  left:  '5%'  }, delay: '0s',   dur: '9s'  },
  { size: 28,  style: { top: '32%',  left:  '1%'  }, delay: '2s',   dur: '7s'  },
  { size: 44,  style: { top: '70%',  left:  '10%' }, delay: '1s',   dur: '11s' },
  { size: 18,  style: { top: '86%',  left:  '3%'  }, delay: '3.5s', dur: '8s'  },
  { size: 72,  style: { top: '7%',   right: '3%'  }, delay: '1.5s', dur: '10s' },
  { size: 36,  style: { top: '55%',  right: '5%'  }, delay: '0.5s', dur: '12s' },
  { size: 22,  style: { top: '88%',  right: '10%' }, delay: '2.5s', dur: '8s'  },
  { size: 50,  style: { top: '42%',  left:  '44%' }, delay: '4s',   dur: '13s' },
]

const stats = [
  { value: '3',    label: 'CMSA Licences',  sub: 'Dealer Â· Adviser Â· Fund Manager' },
  { value: 'DSE',  label: 'Exchange Member', sub: 'Dar es Salaam Stock Exchange'    },
  { value: 'CMSA', label: 'Regulator',       sub: 'Capital Markets Authority'       },
]

export default function HeroSection() {
  return (
    <section
      className="hero-grid-bg relative min-h-screen flex items-center pt-[70px] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020B2D 0%, #050E25 45%, #071435 80%, #020B2D 100%)' }}
    >
      {/* Glowing orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      {/* Floating diamonds */}
      {diamonds.map((d, i) => (
        <div
          key={i}
          className="floating-diamond"
          style={{
            width:  d.size,
            height: d.size,
            ...d.style,
            animationDelay:    d.delay,
            animationDuration: d.dur,
          } as React.CSSProperties}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div className="hero-text-enter">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-8">
              <Shield size={12} />
              CMSA Licensed Â· DSE Dealing Member
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-white leading-[1.15] mb-6">
              Your Premier Gateway<br />
              to the{' '}
              <span className="text-gradient-blue">Dar es Salaam</span>
              <br />Stock Exchange
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Diamond Global Securities Limited is a CMSA-licensed firm delivering
              professional brokerage, investment advisory, and fund management services
              to investors across Tanzania.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/contact"
                className="btn-blue inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl text-sm"
              >
                Open an Account <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/market"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/90 font-medium rounded-xl hover:bg-white/10 hover:border-white/40 transition-all text-sm"
              >
                View Live Market <ChevronRight size={15} />
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-0">
              {stats.map(({ value, label, sub }, i) => (
                <div
                  key={label}
                  className={i > 0 ? 'pl-6 sm:pl-8 border-l border-white/10' : ''}
                >
                  <p className="text-xl sm:text-2xl font-black text-white">{value}</p>
                  <p className="text-[10px] sm:text-xs font-bold text-blue-300 uppercase tracking-wider mt-0.5">{label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight hidden sm:block">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Market Widget */}
          <div className="hero-widget-enter">
            <HeroMarketWidget />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-chevron" />
      </div>
    </section>
  )
}
