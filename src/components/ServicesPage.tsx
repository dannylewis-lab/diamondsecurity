'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight, CheckCircle, TrendingUp,
  BarChart2, Briefcase, PieChart, Zap, ArrowRight,
  ChevronDown, BadgeCheck, Shield,
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
    desc: "Our advisory practice is grounded in deep market intelligence and rigorous analysis. We offer tailored investment strategies, insightful research, and expert guidance designed to align with each client's financial objectives. By combining local market expertise with a forward-looking perspective, we empower clients to make confident, well-informed investment decisions.",
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
  { step: '03', title: 'Meet Your Advisor',   desc: 'Schedule a free consultation with one of our certified investment advisors.' },
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
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1133f5] border border-blue-200 mb-8"
              style={{ background: 'rgba(17,51,245,0.06)' }}
            >
              <BarChart2 size={11} />
              CMSA Licensed &nbsp;·&nbsp; DSE Dealing Member
            </span>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Three licensed<br />
              <span style={{ color: '#1133f5' }}>financial services.</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-9 max-w-lg">
              Diamond Global Securities delivers brokerage, advisory, and fund management — each
              regulated, each built around your financial success.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-blue inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white"
              >
                Get Started <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/market"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-200 transition-colors"
              >
                View Market Data
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials Strip ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-100">
            {[
              { icon: BadgeCheck, value: 'CMSA Licensed',      label: 'Capital Markets Authority' },
              { icon: Briefcase,  value: 'Dealer Licence',     label: 'Securities Dealing' },
              { icon: TrendingUp, value: 'Investment Adviser', label: 'Advisory Licence' },
              { icon: PieChart,   value: 'Fund Manager',       label: 'Fund Management Licence' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-5 lg:px-8 py-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(17,51,245,0.07)' }}
                >
                  <Icon size={16} style={{ color: '#1133f5' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1133f5] mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Services</h2>
          </div>

          <div className="space-y-6">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">

                    {/* Left panel */}
                    <div
                      className="p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100"
                      style={{ background: '#020B2D' }}
                    >
                      <div>
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                          style={{ background: 'rgba(17,51,245,0.25)' }}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-500/70 mb-2">
                          Service {s.number}
                        </p>
                        <h3 className="text-xl font-bold text-white leading-snug mb-2">
                          {s.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{s.tagline}</p>
                      </div>

                      <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-white transition-colors"
                      >
                        Enquire Now <ArrowRight size={13} />
                      </Link>
                    </div>

                    {/* Right panel */}
                    <div className="p-8">
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-7">{s.desc}</p>
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-4">
                          What&apos;s Included
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                              <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: '#1133f5' }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1133f5] mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How to Get Started</h2>
            <p className="text-gray-400 mt-2 text-base">Four straightforward steps to begin investing</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((p, i) => (
              <div
                key={p.step}
                className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-5"
                  style={{ background: '#1133f5' }}
                >
                  {p.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-11 -right-3 z-10">
                    <div className="w-6 h-[1px] bg-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="btn-blue inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white text-sm"
            >
              Open Your Account Now <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1133f5] mb-2">FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border overflow-hidden transition-colors duration-200 ${
                  openFaq === i ? 'border-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-900 text-sm leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: openFaq === i ? '#1133f5' : '#9ca3af',
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? '200px' : '0px' }}
                >
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <p className="text-gray-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1133f5] mb-4">
                Ready to invest?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                Start your investment journey today
              </h2>
              <p className="text-gray-500 leading-relaxed text-base">
                Our certified professionals are ready to guide you through brokerage, advisory,
                or fund management. First consultation is completely free.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="btn-blue inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white text-sm whitespace-nowrap"
              >
                Book Free Consultation <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-white hover:border-blue-200 transition-colors whitespace-nowrap"
              >
                Learn About Us
              </Link>

              <div className="flex items-center justify-center gap-5 pt-2">
                {[
                  { icon: Shield,     label: 'CMSA Regulated' },
                  { icon: BadgeCheck, label: 'DSE Member' },
                  { icon: Zap,        label: 'Licensed Broker' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Icon size={12} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
