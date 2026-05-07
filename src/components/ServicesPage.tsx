'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight, CheckCircle, TrendingUp, Shield,
  BarChart2, Briefcase, PieChart, Zap, ArrowRight,
  ChevronDown, BadgeCheck,
} from 'lucide-react'

const services = [
  {
    number: '01',
    icon: Briefcase,
    title: 'Brokerage / Dealing Services',
    tagline: 'Seamless securities execution on the DSE',
    desc: 'We provide seamless execution of securities transactions on the Dar es Salaam Stock Exchange (DSE), delivering precision, speed, and reliability. Our brokerage services encompass trade execution, Central Depository System (CDS) account facilitation, and efficient settlement processes — ensuring our clients experience a secure and streamlined investment journey.',
    features: [
      'Trade execution on the Dar es Salaam Stock Exchange',
      'Central Depository System (CDS) account facilitation',
      'Efficient and secure settlement processes',
      'Precision, speed, and reliability on every transaction',
      'Dedicated dealer support for every client',
    ],
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
      'Local market expertise with a forward-looking perspective',
    ],
  },
  {
    number: '03',
    icon: PieChart,
    title: 'Fund Management',
    tagline: 'Disciplined management focused on long-term value',
    desc: 'We deliver disciplined and performance-driven fund management solutions, focused on long-term value creation. Through strategic asset allocation, active portfolio management, and continuous risk assessment, we optimise returns while safeguarding capital. Our approach is built on transparency, accountability, and a commitment to excellence.',
    features: [
      'Strategic asset allocation for optimised returns',
      'Active portfolio management and monitoring',
      'Continuous risk assessment and capital protection',
      'Long-term value creation philosophy',
      'Full transparency, accountability, and reporting',
    ],
  },
]

const steps = [
  { step: '01', title: 'Open Your Account',  desc: 'Complete our simple form or visit our office. Account opening takes less than 24 hours.' },
  { step: '02', title: 'Fund Your Account',   desc: 'Transfer funds via mobile money, bank transfer, or cash deposit to your trading account.' },
  { step: '03', title: 'Meet Your Advisor',   desc: 'Schedule a free consultation with one of our certified investment advisors to plan your strategy.' },
  { step: '04', title: 'Start Investing',     desc: 'Place your first trade on the DSE or let our fund managers handle your portfolio.' },
]

const faqs = [
  {
    q: 'How long does it take to open a trading account?',
    a: 'Account opening typically takes 24–48 hours once all required documents are submitted. You will need a valid ID, proof of address, and a tax identification number (TIN).',
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

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-36 pb-28"
        style={{ background: 'linear-gradient(135deg, #020B2D 0%, #041444 55%, #020B2D 100%)' }}
      >
        <div className="hero-grid-bg absolute inset-0 opacity-25" />

        {/* Glow orbs */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(17,51,245,0.18) 0%, transparent 65%)',
            transform: 'translate(35%, -35%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(17,51,245,0.12) 0%, transparent 65%)',
            transform: 'translate(-35%, 35%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-8"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <BarChart2 size={12} />
              Licensed DSE Brokerage &amp; Investment Services
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-white leading-[1.05] tracking-tight mb-6">
              Three Core<br />
              <span className="text-gradient-blue">Services.</span>
            </h1>

            <p className="text-blue-200/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              CMSA-licensed and DSE-regulated financial services — each built on precision,
              integrity, and deep market expertise.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="btn-blue inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-white text-sm">
                Get Started Today <ArrowUpRight size={15} />
              </Link>
              <Link href="/market"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 font-medium rounded-xl hover:bg-white/8 transition-all text-sm">
                View Live Market
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials Strip ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { icon: BadgeCheck, value: 'CMSA Licensed',       label: 'Capital Markets Authority' },
              { icon: Briefcase,  value: 'Dealer Licence',      label: 'Securities Dealing' },
              { icon: TrendingUp, value: 'Investment Adviser',  label: 'Advisory Licence' },
              { icon: PieChart,   value: 'Fund Manager',        label: 'Fund Management Licence' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-5 lg:px-8 py-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(17,51,245,0.08)' }}>
                  <Icon size={16} style={{ color: '#1133f5' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1133f5' }}>
              What We Offer
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">Our Services</h2>
          </div>

          <div className="space-y-5">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
                >
                  {/* Top accent stripe */}
                  <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #1133f5 0%, rgba(17,51,245,0.15) 100%)' }} />

                  <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">

                    {/* Left — dark navy panel */}
                    <div
                      className="relative p-8 lg:p-10 flex flex-col justify-between overflow-hidden"
                      style={{ background: 'linear-gradient(160deg, #020B2D 0%, #0f2051 100%)' }}
                    >
                      {/* Watermark number */}
                      <span className="absolute -bottom-2 -right-2 text-[110px] font-black leading-none select-none pointer-events-none"
                        style={{ color: 'rgba(255,255,255,0.04)' }}>
                        {s.number}
                      </span>

                      {/* Subtle grid */}
                      <div className="hero-grid-bg absolute inset-0 opacity-20" />

                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                          style={{ background: 'rgba(17,51,245,0.3)', border: '1px solid rgba(17,51,245,0.5)' }}>
                          <Icon size={22} className="text-white" />
                        </div>
                        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-blue-400/60 mb-2">
                          Service {s.number}
                        </p>
                        <h3 className="text-2xl font-black text-white leading-snug mb-3">
                          {s.title}
                        </h3>
                        <p className="text-blue-300/60 text-sm leading-relaxed">{s.tagline}</p>
                      </div>

                      <Link
                        href="/contact"
                        className="relative z-10 mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white w-fit transition-all duration-200 hover:opacity-90"
                        style={{ background: 'rgba(17,51,245,0.5)', border: '1px solid rgba(17,51,245,0.6)' }}
                      >
                        Enquire Now <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Right — white content panel */}
                    <div className="p-8 lg:p-10 flex flex-col justify-between">
                      <p className="text-gray-500 leading-relaxed text-[15px] mb-8">{s.desc}</p>

                      <div>
                        <div className="border-t border-gray-100 pt-6 mb-5">
                          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
                            What&apos;s Included
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {s.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                  style={{ background: 'rgba(17,51,245,0.08)' }}>
                                  <CheckCircle size={11} style={{ color: '#1133f5' }} />
                                </div>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1133f5' }}>
              Simple Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">How to Get Started</h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">Begin your investment journey in four straightforward steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((p, i) => (
              <div key={p.step} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[-10%] h-px z-0"
                    style={{ background: 'linear-gradient(90deg, rgba(17,51,245,0.4), rgba(17,51,245,0.05))' }} />
                )}

                <div className="relative z-10 bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  {/* Step number circle */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg mb-5 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #1133f5 0%, #0d28c9 100%)' }}
                  >
                    {p.step}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/contact"
              className="btn-blue inline-flex items-center gap-2 px-9 py-4 font-semibold rounded-xl text-white shadow-xl">
              Open Your Account Now <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1133f5' }}>
              FAQs
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">Common Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
                  openFaq === i ? 'border-blue-200 shadow-md' : 'border-gray-100 hover:border-blue-100'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-[15px] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                    style={{
                      background: openFaq === i ? 'rgba(17,51,245,0.1)' : 'rgba(0,0,0,0.04)',
                    }}
                  >
                    <ChevronDown size={15} style={{ color: openFaq === i ? '#1133f5' : '#9ca3af' }} />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 border-t border-gray-50">
                    <p className="text-gray-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #020B2D 0%, #041444 55%, #020B2D 100%)' }}
      >
        <div className="hero-grid-bg absolute inset-0 opacity-20" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(17,51,245,0.18) 0%, transparent 65%)',
            transform: 'translate(35%, -35%)',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Zap size={12} />
            Ready to invest?
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Start Your Investment<br />Journey Today
          </h2>

          <p className="text-blue-200/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Our certified professionals are ready to guide you through brokerage, advisory, or fund management.
            First consultation is completely free.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"
              className="btn-blue px-9 py-4 font-semibold rounded-xl inline-flex items-center gap-2 text-white shadow-2xl">
              Book Free Consultation <ArrowUpRight size={16} />
            </Link>
            <Link href="/about"
              className="px-9 py-4 border border-white/20 text-white/80 font-medium rounded-xl hover:bg-white/8 transition-colors">
              Learn About Us
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-14">
            {[
              { icon: Shield,    label: 'CMSA Regulated' },
              { icon: BadgeCheck,label: 'DSE Dealing Member' },
              { icon: Briefcase, label: 'Licensed Broker' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-blue-300/60 text-sm">
                <Icon size={14} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
