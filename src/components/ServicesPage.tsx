'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight, TrendingUp, Briefcase, PieChart,
  ChevronDown, BadgeCheck, Shield, Zap,
} from 'lucide-react'

const services = [
  {
    number: '01',
    icon: Briefcase,
    title: 'Brokerage & Dealing',
    tagline: 'Seamless securities execution on the DSE',
    desc: 'We provide seamless execution of securities transactions on the Dar es Salaam Stock Exchange (DSE), delivering precision, speed, and reliability. Our brokerage services encompass trade execution, Central Depository System (CDS) account facilitation, and efficient settlement processes — ensuring our clients experience a secure and streamlined investment journey.',
    features: [
      'Trade execution on the Dar es Salaam Stock Exchange',
      'Central Depository System (CDS) account facilitation',
      'Efficient and secure settlement processes',
      'Dedicated dealer support for every client',
    ],
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Investment Advisory',
    tagline: 'Insight-driven guidance tailored to your goals',
    desc: "Our advisory practice is grounded in deep market intelligence and rigorous analysis. We offer tailored investment strategies, insightful research, and expert guidance designed to align with each client's financial objectives — combining local market expertise with a forward-looking perspective.",
    features: [
      'Tailored investment strategies for each client',
      'Deep market intelligence and rigorous analysis',
      'Alignment with individual financial objectives',
      'Local market expertise with a forward-looking perspective',
    ],
  },
  {
    number: '03',
    icon: PieChart,
    title: 'Fund Management',
    tagline: 'Disciplined management focused on long-term value',
    desc: 'We deliver disciplined and performance-driven fund management solutions, focused on long-term value creation. Through strategic asset allocation, active portfolio management, and continuous risk assessment, we optimise returns while safeguarding capital.',
    features: [
      'Strategic asset allocation for optimised returns',
      'Active portfolio management and monitoring',
      'Continuous risk assessment and capital protection',
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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 bg-white overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">

            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-[#3457d5]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                  CMSA Licensed · DSE Dealing Member
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-[62px] text-[#0a0a0a] leading-[1.05]">
                Three licensed<br />
                financial services<br />
                <span className="italic text-[#3457d5]">built for you.</span>
              </h1>
            </div>

            <div className="lg:col-span-5 pb-1">
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Diamond Global Securities delivers brokerage, advisory, and fund management —
                each regulated, each built around your financial success.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="btn-blue inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white"
                >
                  Get Started <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/market"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  View Market Data
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Credentials Bar ──────────────────────────────────────────────── */}
      <section style={{ background: '#020B2D' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: 'CMSA Licensed',      label: 'Capital Markets Authority' },
              { value: 'Dealer Licence',      label: 'Securities Dealing' },
              { value: 'Investment Adviser',  label: 'Advisory Licence' },
              { value: 'Fund Manager',        label: 'Fund Management Licence' },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 lg:px-10 py-5">
                <p className="text-white text-sm font-semibold">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Banner ────────────────────────────────────────────────── */}
      <section className="relative h-[340px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop"
          alt="Financial analysis and portfolio management"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(2,11,45,0.92) 0%, rgba(2,11,45,0.65) 60%, rgba(2,11,45,0.3) 100%)' }} />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-400 mb-3">
              CMSA Licensed · DSE Dealing Member
            </p>
            <p className="font-display text-3xl sm:text-4xl text-white leading-[1.15]">
              Professional capital markets<br />
              <span className="italic text-blue-300">services you can trust.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#3457d5]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
              What We Offer
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] mb-16">Our Services</h2>

          <div className="border-t border-gray-200">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-14 border-b border-gray-200 group"
                >
                  {/* Number + Meta */}
                  <div className="lg:col-span-3">
                    <span className="block text-[88px] font-bold leading-none text-gray-100 group-hover:text-blue-100 transition-colors select-none mb-5">
                      {s.number}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(52,87,213,0.08)' }}
                    >
                      <Icon size={18} style={{ color: '#3457d5' }} />
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:gap-3 transition-all"
                    >
                      Enquire <ArrowUpRight size={13} />
                    </Link>
                  </div>

                  {/* Title + Description */}
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-bold text-[#0a0a0a] leading-snug mb-1">
                      {s.title}
                    </h3>
                    <p className="text-[#3457d5] text-sm font-medium mb-5">{s.tagline}</p>
                    <p className="text-gray-500 text-[15px] leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Features */}
                  <div className="lg:col-span-5">
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-5">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-3.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3457d5] mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-gray-100" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#3457d5]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
              Simple Process
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a]">How to Get Started</h2>
            <Link
              href="/contact"
              className="btn-blue inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm whitespace-nowrap"
            >
              Open Your Account <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {steps.map((p) => (
              <div key={p.step} className="bg-white p-8 hover:bg-[#fafafa] transition-colors group">
                <div className="text-[64px] font-bold text-gray-100 group-hover:text-blue-100 leading-none mb-7 select-none transition-colors">
                  {p.step}
                </div>
                <h3 className="font-semibold text-[#0a0a0a] text-base mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#3457d5]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                  FAQs
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-4 leading-tight">
                Common<br />Questions
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                Can&apos;t find the answer you&apos;re looking for? Reach our team directly.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:gap-3 transition-all"
              >
                Contact us <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Right column — accordion */}
            <div className="lg:col-span-8">
              <div className="border-t border-gray-200">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-8 py-5 text-left group"
                    >
                      <span className="font-medium text-[#0a0a0a] text-[15px] leading-snug group-hover:text-[#3457d5] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={16}
                        className="shrink-0 transition-transform duration-200"
                        style={{
                          color: openFaq === i ? '#3457d5' : '#9ca3af',
                          transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: openFaq === i ? '200px' : '0px' }}
                    >
                      <p className="text-gray-500 text-sm leading-relaxed pb-5">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#020B2D' }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">

            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-[#3457d5]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-400">
                  Ready to invest?
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.08] mb-5">
                Start your investment<br />journey today.
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-lg">
                Our certified professionals are ready to guide you through brokerage, advisory,
                or fund management. First consultation is completely free.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="/contact"
                className="btn-blue inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white text-sm"
              >
                Book Free Consultation <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-medium border border-white/20 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30 transition-colors"
              >
                Learn About Us
              </Link>

              <div className="flex items-center gap-6 pt-3 border-t border-white/10 mt-1">
                {[
                  { icon: Shield,     label: 'CMSA Regulated' },
                  { icon: BadgeCheck, label: 'DSE Member' },
                  { icon: Zap,        label: 'Licensed Broker' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Icon size={11} />
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
