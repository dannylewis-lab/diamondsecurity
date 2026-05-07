import Link from 'next/link'
import { TrendingUp, Briefcase, PieChart, ArrowUpRight } from 'lucide-react'

const credentials = [
  { value: 'CMSA Licensed',      label: 'Capital Markets Authority' },
  { value: 'DSE Dealing Member', label: 'Dar es Salaam Stock Exchange' },
  { value: 'Dealer Licence',     label: 'Securities Dealing & Brokerage' },
  { value: 'Investment Adviser', label: 'Advisory & Fund Management' },
]

const services = [
  {
    number: '01',
    icon: Briefcase,
    title: 'Brokerage & Dealing',
    desc: 'Seamless execution of securities transactions on the DSE — precision, speed, and reliability with every trade.',
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Investment Advisory',
    desc: 'Tailored investment strategies and expert guidance grounded in deep market intelligence and rigorous analysis.',
  },
  {
    number: '03',
    icon: PieChart,
    title: 'Fund Management',
    desc: 'Disciplined, performance-driven fund management focused on long-term value creation and capital protection.',
  },
]

export default function ServicesSection() {
  return (
    <>
      {/* Credentials bar */}
      <section style={{ background: '#020B2D' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {credentials.map(({ value, label }) => (
              <div key={label} className="px-5 lg:px-8 py-5">
                <p className="text-white text-sm font-semibold">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white dark:bg-[#050e25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#3457d5]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
              Licensed Services
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] dark:text-white">
              What We Offer
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:gap-3 transition-all"
            >
              All services <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="border-t border-gray-200 dark:border-white/10">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 border-b border-gray-200 dark:border-white/10 group"
                >
                  <div className="md:col-span-2">
                    <span className="text-[72px] font-bold leading-none text-gray-100 dark:text-white/10 group-hover:text-blue-100 dark:group-hover:text-white/15 transition-colors select-none block">
                      {s.number}
                    </span>
                  </div>

                  <div className="md:col-span-4 flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(52,87,213,0.08)' }}
                    >
                      <Icon size={17} style={{ color: '#3457d5' }} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[#0a0a0a] dark:text-white leading-snug">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-gray-500 dark:text-blue-300/70 text-[15px] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="md:col-span-2 flex items-start justify-end">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:gap-3 transition-all whitespace-nowrap"
                    >
                      Learn more <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12">
            <Link
              href="/services"
              className="btn-blue inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-sm"
            >
              Explore All Services <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
