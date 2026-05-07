import Link from 'next/link'
import { Shield, TrendingUp, Briefcase, PieChart, ArrowRight, BadgeCheck } from 'lucide-react'

const credentials = [
  { icon: BadgeCheck,  label: 'CMSA Licensed & Regulated',      sub: 'Capital Markets & Securities Authority' },
  { icon: TrendingUp,  label: 'DSE Dealing Member',             sub: 'Dar es Salaam Stock Exchange'           },
  { icon: Briefcase,   label: 'Dealer Licence',                 sub: 'Securities Dealing & Brokerage'        },
  { icon: Shield,      label: 'Investment Adviser & Fund Mgr',  sub: 'Advisory & Fund Management Licences'   },
]

const services = [
  {
    icon:   Briefcase,
    title:  'Brokerage / Dealing Services',
    desc:   'Seamless execution of securities transactions on the DSE — precision, speed, and reliability with every trade.',
    accent: '#1133f5',
    glow:   'rgba(17,51,245,0.12)',
  },
  {
    icon:   TrendingUp,
    title:  'Advisory Services',
    desc:   'Tailored investment strategies and expert guidance grounded in deep market intelligence and rigorous analysis.',
    accent: '#1133f5',
    glow:   'rgba(14,165,233,0.12)',
  },
  {
    icon:   PieChart,
    title:  'Fund Management',
    desc:   'Disciplined, performance-driven fund management focused on long-term value creation and capital protection.',
    accent: '#1133f5',
    glow:   'rgba(17,51,245,0.12)',
  },
]

export default function ServicesSection() {
  return (
    <>
      {/* Credentials bar */}
      <section className="py-10 theme-cred-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 md:divide-x md:divide-gray-200 dark:md:divide-white/10">
            {credentials.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="credential-item flex items-center gap-3 px-4 md:px-6 py-3 rounded-xl">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(17,51,245,0.15)' }}
                >
                  <Icon size={18} style={{ color: '#60A5FA' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-blue-300/65 leading-tight mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white dark:bg-[#050e25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: 'rgba(17,51,245,0.08)', color: '#1133f5' }}>
              Licensed Services
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h2>
            <p className="text-gray-400 dark:text-blue-300 text-lg max-w-xl mx-auto">
              Three specialised, CMSA-regulated services — each delivered with precision and integrity
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {services.map(({ icon: Icon, title, desc, accent, glow }) => (
              <div
                key={title}
                className="service-card rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-8 group"
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: accent }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: glow }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>

                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-3 leading-snug">{title}</h3>
                <p className="text-gray-400 dark:text-blue-300/70 text-sm leading-relaxed mb-7">{desc}</p>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{ color: accent }}
                >
                  Learn more <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="btn-blue inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm"
            >
              Explore All Services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
