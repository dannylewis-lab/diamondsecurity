import Link from 'next/link'
import { Shield, TrendingUp, Briefcase, PieChart, ArrowRight, BadgeCheck } from 'lucide-react'

const credentials = [
  { icon: BadgeCheck, label: 'CMSA Licensed & Regulated', sub: 'Capital Markets & Securities Authority' },
  { icon: TrendingUp, label: 'DSE Dealing Member', sub: 'Dar es Salaam Stock Exchange' },
  { icon: Briefcase, label: 'Dealer Licence', sub: 'Securities Dealing & Brokerage' },
  { icon: Shield, label: 'Investment Adviser & Fund Manager', sub: 'Advisory & Fund Management Licences' },
]

const services = [
  {
    icon: Briefcase,
    title: 'Brokerage / Dealing Services',
    desc: 'Seamless execution of securities transactions on the DSE — precision, speed, and reliability with every trade.',
    accent: '#2563eb',
    bg: '#eff6ff',
    iconBg: '#dbeafe',
  },
  {
    icon: TrendingUp,
    title: 'Advisory Services',
    desc: 'Tailored investment strategies and expert guidance grounded in deep market intelligence and rigorous analysis.',
    accent: '#059669',
    bg: '#f0fdf4',
    iconBg: '#d1fae5',
  },
  {
    icon: PieChart,
    title: 'Fund Management',
    desc: 'Disciplined, performance-driven fund management focused on long-term value creation and capital protection.',
    accent: '#7c3aed',
    bg: '#faf5ff',
    iconBg: '#ede9fe',
  },
]

export default function ServicesSection() {
  return (
    <>
      {/* Credentials */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-gray-100">
            {credentials.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 md:px-6 py-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Three specialised, regulated services — each delivered with precision and integrity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {services.map(({ icon: Icon, title, desc, accent, bg, iconBg }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                style={{ background: bg }}
              >
                <div
                  className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ background: iconBg }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-lg mb-3 leading-snug">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: accent }}
                >
                  Learn more <ArrowRight size={13} />
                </Link>
                {/* bottom hover bar */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: accent }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all shadow-md"
              style={{ background: '#1a2744' }}
            >
              View All Services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
