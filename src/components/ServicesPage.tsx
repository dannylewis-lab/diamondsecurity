ï»¿import Link from 'next/link'
import {
  ArrowUpRight, CheckCircle, TrendingUp, Shield,
  BarChart2, Briefcase, PieChart, Zap, ArrowRight
} from 'lucide-react'

const services = [
  {
    number: '01',
    icon: Briefcase,
    title: 'Brokerage / Dealing Services',
    tagline: 'Seamless securities execution on the DSE',
    desc: 'We provide seamless execution of securities transactions on the Dar es Salaam Stock Exchange (DSE), delivering precision, speed, and reliability. Our brokerage services encompass trade execution, Central Depository System (CDS) account facilitation, and efficient settlement processesâ€”ensuring our clients experience a secure and streamlined investment journey.',
    features: [
      'Trade execution on the Dar es Salaam Stock Exchange',
      'Central Depository System (CDS) account facilitation',
      'Efficient and secure settlement processes',
      'Precision, speed, and reliability on every transaction',
      'Dedicated dealer support for every client',
    ],
    accent: '#1133f5',
    light: '#eff6ff',
    mid: '#dbeafe',
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Advisory Services',
    tagline: 'Insight-driven guidance tailored to your goals',
    desc: 'Our advisory practice is grounded in deep market intelligence and rigorous analysis. We offer tailored investment strategies, insightful research, and expert guidance designed to align with each client\'s financial objectives. By combining local market expertise with a forward-looking perspective, we empower clients to make confident, well-informed investment decisions.',
    features: [
      'Tailored investment strategies for each client',
      'Deep market intelligence and rigorous analysis',
      'Insightful research and expert guidance',
      'Alignment with individual financial objectives',
      'Local market expertise with forward-looking perspective',
    ],
    accent: '#1133f5',
    light: '#f0f9ff',
    mid: '#bae6fd',
  },
  {
    number: '03',
    icon: PieChart,
    title: 'Fund Management',
    tagline: 'Disciplined management focused on long-term value',
    desc: 'We deliver disciplined and performance-driven fund management solutions, focused on long-term value creation. Through strategic asset allocation, active portfolio management, and continuous risk assessment, we optimize returns while safeguarding capital. Our approach is built on transparency, accountability, and a commitment to excellence.',
    features: [
      'Strategic asset allocation for optimised returns',
      'Active portfolio management and monitoring',
      'Continuous risk assessment and capital protection',
      'Long-term value creation philosophy',
      'Full transparency, accountability, and reporting',
    ],
    accent: '#7c3aed',
    light: '#faf5ff',
    mid: '#ede9fe',
  },
]

const process = [
  { step: '01', title: 'Open Your Account', desc: 'Complete our simple form or visit our office. Account opening takes less than 24 hours.' },
  { step: '02', title: 'Fund Your Account', desc: 'Transfer funds via mobile money, bank transfer, or cash deposit to your trading account.' },
  { step: '03', title: 'Meet Your Advisor', desc: 'Schedule a free consultation with one of our certified investment advisors to plan your strategy.' },
  { step: '04', title: 'Start Investing', desc: 'Place your first trade on the DSE or let our fund managers handle your portfolio.' },
]


const faqs = [
  {
    q: 'How long does it take to open a trading account?',
    a: 'Account opening typically takes 24â€“48 hours once all required documents are submitted. You will need a valid ID, proof of address, and a tax identification number (TIN).',
  },
  {
    q: 'What is the minimum investment amount?',
    a: 'There is no fixed minimum investment. However, we recommend starting with at least TZS 500,000 to build a meaningful diversified portfolio on the DSE.',
  },
  {
    q: 'What is the difference between Advisory and Fund Management?',
    a: 'Advisory services provide expert guidance and strategies so you make your own informed decisions. Fund Management means our team actively manages your portfolio on your behalf under a mandate.',
  },
  {
    q: 'Is my investment protected?',
    a: 'Diamond Global Securities is fully licensed by the CMSA and a member of the DSE. Client assets are held in segregated accounts and protected under Tanzania securities regulations.',
  },
]

const diamonds = [
  { id: 1, size: 'w-3 h-3',     color: 'border-[#00D4FF]/40 border-2',  top: '10%',  left: '7%',  delay: '0s',   duration: '7s',  opacity: 0.5 },
  { id: 2, size: 'w-5 h-5',     color: 'border-[#1133f5]/30 border-2',  top: '40%',  left: '78%', delay: '1.5s', duration: '9s',  opacity: 0.4 },
  { id: 3, size: 'w-2 h-2',     color: 'bg-[#00D4FF]/50',               top: '70%',  left: '12%', delay: '2s',   duration: '8s',  opacity: 0.6 },
  { id: 4, size: 'w-4 h-4',     color: 'border-[#00D4FF]/25 border-2',  top: '60%',  left: '88%', delay: '0.8s', duration: '11s', opacity: 0.3 },
  { id: 5, size: 'w-2.5 h-2.5', color: 'bg-[#1133f5]/40',              top: '25%',  left: '55%', delay: '1s',   duration: '6s',  opacity: 0.5 },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #020B2D 0%, #041444 50%, #020B2D 100%)' }}
      >
        <div className="hero-grid-bg absolute inset-0 opacity-30" />

        {/* Glow orbs */}
        <div
          className="glow-orb glow-orb-1 absolute"
          style={{ width: '450px', height: '450px', top: '-20%', right: '5%' }}
        />
        <div
          className="glow-orb glow-orb-2 absolute"
          style={{ width: '280px', height: '280px', bottom: '0%', left: '-5%' }}
        />

        {/* Floating diamonds */}
        {diamonds.map((d) => (
          <div
            key={d.id}
            className={`floating-diamond absolute ${d.size} ${d.color}`}
            style={{
              top: d.top, left: d.left,
              animationDelay: d.delay, animationDuration: d.duration,
              opacity: d.opacity,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] text-sm font-medium mb-6">
              <BarChart2 size={14} />
              Licensed DSE Brokerage &amp; Investment Services
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight">
              Three Core Services.<br />
              <span className="text-gradient-blue">One Trusted Partner.</span>
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-2xl">
              Diamond Global Securities is authorised to deliver three specialised financial services â€”
              each executed with the highest standards of precision, integrity, and client focus.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-blue inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg">
                Get Started Today
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/market"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                View Live Market
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              { icon: Shield,    value: 'CMSA Licensed',    label: 'Fully Regulated' },
              { icon: Briefcase, value: 'Dealer Licence',   label: 'Securities Dealing' },
              { icon: TrendingUp,value: 'Investment Adviser',label: 'Advisory Licence' },
              { icon: BarChart2, value: 'Fund Manager',     label: 'Fund Management Licence' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#1133f5]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services â€” large premium cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Authorised, regulated, and built around your financial success
            </p>
          </div>

          <div className="space-y-10">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="relative rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
                  style={{ background: s.light }}
                >
                  <span
                    className="absolute top-4 right-8 text-[70px] md:text-[120px] font-black leading-none select-none pointer-events-none opacity-[0.06]"
                    style={{ color: s.accent }}
                  >
                    {s.number}
                  </span>

                  <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    <div className="md:col-span-2">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                        style={{ background: s.mid }}
                      >
                        <Icon size={26} style={{ color: s.accent }} />
                      </div>
                      <div
                        className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                        style={{ color: s.accent }}
                      >
                        Service {s.number}
                      </div>
                      <h3 className="text-2xl font-extrabold text-gray-900 leading-snug mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 mb-6">{s.tagline}</p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md"
                        style={{ background: s.accent }}
                      >
                        Enquire Now <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div className="md:col-span-3">
                      <p className="text-gray-600 leading-relaxed text-[15px] mb-7">
                        {s.desc}
                      </p>
                      <div
                        className="h-px mb-7 opacity-30"
                        style={{ background: s.accent }}
                      />
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <CheckCircle
                              size={15}
                              className="shrink-0 mt-0.5"
                              style={{ color: s.accent }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="h-1 w-0 group-hover:w-full transition-all duration-700"
                    style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">How to Get Started</h2>
            <p className="text-gray-500">Begin your investment journey in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <div key={p.step} className="relative text-center">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-gray-200 z-0" />
                )}
                <div className="w-16 h-16 rounded-full text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg" style={{ background: 'linear-gradient(135deg, #1133f5, #1133f5)' }}>
                  {p.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-blue inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg shadow-lg">
              Open Your Account Now
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Common questions about our services</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-100 transition-colors duration-300">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="w-6 h-6 text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold" style={{ background: 'linear-gradient(135deg, #1133f5, #1133f5)' }}>?</span>
                  {faq.q}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #020B2D 0%, #041444 50%, #020B2D 100%)' }}
      >
        <div className="hero-grid-bg absolute inset-0 opacity-20" />
        <div className="glow-orb glow-orb-1 absolute" style={{ width: '350px', height: '350px', top: '-20%', right: '5%', opacity: 0.5 }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap size={20} className="text-[#00D4FF]" />
            <span className="text-[#00D4FF] text-sm font-semibold tracking-wide uppercase">Ready to invest?</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Investment Journey Today</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Our team of certified professionals is ready to help you achieve your financial goals
            through brokerage, advisory, or fund management. First consultation is completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-blue px-8 py-3 font-semibold rounded-lg inline-flex items-center gap-2">
              Book Free Consultation
            </Link>
            <Link href="/about" className="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
