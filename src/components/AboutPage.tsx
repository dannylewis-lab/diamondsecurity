import Link from 'next/link'
import Image from 'next/image'
import {
  Shield, Users, TrendingUp, CheckCircle,
  MapPin, Phone, Mail, ArrowUpRight, Target, Eye,
  Heart, Briefcase, PieChart, BadgeCheck,
  Lock, Handshake, ChevronRight
} from 'lucide-react'

const ABOUT_HERO_IMG = 'https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=80&auto=format&fit=crop&crop=top'
const ABOUT_TEAM_IMG  = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop'

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'We uphold the highest standards of professional conduct in every client relationship, placing ethical practice above all else.',
  },
  {
    icon: Target,
    title: 'Excellence',
    desc: 'We are committed to delivering exceptional results through rigorous analysis, disciplined execution, and continuous improvement.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'We communicate clearly and honestly about fees, risks, and market conditions — so our clients can always make informed decisions.',
  },
  {
    icon: Heart,
    title: 'Client First',
    desc: 'Every recommendation, every strategy, every decision is guided by what genuinely serves our clients\' long-term financial interests.',
  },
]

const licences = [
  {
    icon: Briefcase,
    name: 'Dealer Licence',
    authority: 'CMSA Tanzania',
    desc: 'We are authorised by the Capital Markets and Securities Authority as a licensed securities dealer, entitled to execute securities transactions on behalf of clients on the Dar es Salaam Stock Exchange within Tanzania\'s full regulatory framework.',
  },
  {
    icon: TrendingUp,
    name: 'Investment Adviser Licence',
    authority: 'CMSA Tanzania',
    desc: 'We hold an Investment Adviser Licence, authorising us to provide professional investment advice, portfolio guidance, and tailored financial strategies aligned to each client\'s individual objectives and risk profile.',
  },
  {
    icon: PieChart,
    name: 'Fund Manager Licence',
    authority: 'CMSA Tanzania',
    desc: 'We are licenced as a Fund Manager, authorised to manage and administer investment portfolios and collective schemes on behalf of our clients through disciplined asset allocation, active monitoring, and rigorous risk management.',
  },
]

const whyUs = [
  {
    number: '01',
    icon: BadgeCheck,
    title: 'Fully Authorised & Regulated',
    desc: 'Every service we offer is backed by a specific CMSA licence. You invest knowing that our operations are governed, monitored, and accountable under Tanzania\'s securities laws.',
  },
  {
    number: '02',
    icon: Users,
    title: 'Direct Market Access via the DSE',
    desc: 'As a licensed DSE Dealing Member, we provide clients with direct, regulated access to Tanzania\'s securities exchange — with the speed, precision, and reliability that markets demand.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Strategies Built Around You',
    desc: 'We do not apply generic templates. Every client engagement begins with understanding your goals, risk appetite, and investment horizon — then building a plan specifically for you.',
  },
  {
    number: '04',
    icon: Lock,
    title: 'Transparent by Design',
    desc: 'Clear fee schedules, straightforward reporting, and honest market guidance. We believe transparency is not a feature — it is a fundamental obligation to every client we serve.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-0 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

            {/* Text */}
            <div className="lg:col-span-6 pb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-[#3457d5]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                  CMSA Licensed & Regulated · DSE Dealing Member
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.6rem] text-[#0a0a0a] mb-6 leading-[1.1]">
                Tanzania&apos;s Authorised<br />
                <span className="italic text-[#3457d5]">Capital Markets Partner</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
                Diamond Global Securities Limited is a licensed and regulated capital markets intermediary,
                authorised by the CMSA to provide dealing, advisory, and fund management services
                on the Dar es Salaam Stock Exchange.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-blue inline-flex items-center gap-2 px-7 py-3 font-semibold rounded-lg text-sm text-white">
                  Open an Account <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-[#fafafa] hover:border-blue-200 transition-all text-sm"
                >
                  Our Services <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="lg:col-span-6 relative h-[480px] lg:h-[560px] overflow-hidden rounded-t-2xl">
              <Image
                src={ABOUT_HERO_IMG}
                alt="Diamond Global Securities professional financial advisor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              {/* Floating badge */}
              <div
                className="absolute bottom-6 left-6 px-4 py-3 rounded-xl backdrop-blur-sm"
                style={{ background: 'rgba(2,11,45,0.85)', border: '1px solid rgba(52,87,213,0.3)' }}
              >
                <p className="text-white text-xs font-semibold">CMSA Licensed · DSE Dealing Member</p>
                <p className="text-white/50 text-[10px] mt-0.5">Capital Markets & Securities Authority</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Regulatory Status Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">

            {/* CMSA Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <img
                src="/cmsa-logo.jpg"
                alt="Capital Markets & Securities Authority"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xs font-semibold text-gray-500 hidden sm:block">CMSA Tanzania</span>
            </div>

            <div className="h-5 w-px bg-gray-200 hidden sm:block" />

            {/* DSE Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <img
                src="/dse-logo.png"
                alt="Dar es Salaam Stock Exchange"
                className="h-7 w-auto object-contain"
              />
              <span className="text-xs font-semibold text-gray-500 hidden sm:block">DSE Member</span>
            </div>

            <div className="h-5 w-px bg-gray-200 hidden sm:block" />

            {[
              'Dealer Licence',
              'Investment Adviser Licence',
              'Fund Manager Licence',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3457d5] shrink-0" />
                <span className="text-xs text-gray-500 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#3457d5] text-xs font-bold uppercase tracking-[0.2em] mb-4">Who We Are</p>
              <h2 className="text-4xl font-bold text-[#1d1d1d] mb-6 leading-snug">
                A Regulated Partner Built on Trust and Expertise
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                Diamond Global Securities Limited is a registered and licensed capital markets intermediary
                in Tanzania, authorised by the Capital Markets and Securities Authority (CMSA). We hold
                specific licences to provide dealing, investment advisory, and fund management services —
                the three core disciplines of professional securities practice on the Dar es Salaam Stock Exchange.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
                We are built on a clear conviction: that every Tanzanian investor — individual, institutional,
                or corporate — deserves access to professional, regulated, and genuinely client-focused
                capital markets services. Our team operates at all times within the strict regulatory
                framework established by the CMSA, placing investor protection and market integrity at the
                centre of everything we do.
              </p>
              <div className="space-y-3">
                {[
                  'Authorised and regulated by the Capital Markets and Securities Authority (CMSA)',
                  'Licensed Dealing Member of the Dar es Salaam Stock Exchange (DSE)',
                  'Holder of Dealer, Investment Adviser, and Fund Manager Licences',
                  'Operating fully within Tanzania\'s securities laws and CMSA regulations',
                  'Committed to investor protection, market integrity, and professional standards',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-[#3457d5] mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-100 group-hover:bg-[#3457d5] transition-colors duration-300" />
                  <div className="w-10 h-10 bg-[#fafafa] rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                    <Icon size={18} className="text-gray-500 group-hover:text-[#3457d5] transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-[#1d1d1d] mb-2 text-sm">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Authorisations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-2xl px-8 py-8 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-[#fafafa] border border-gray-200">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#3457d5]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                  Regulatory Status
                </span>
              </div>
              <h2 className="font-display text-2xl text-[#0a0a0a] mb-2">Our Authorisations</h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl leading-relaxed">
                Diamond Global Securities Limited is authorised and regulated by the Capital Markets and Securities
                Authority (CMSA) of Tanzania and is a licensed dealing member of the Dar es Salaam Stock Exchange (DSE).
              </p>
            </div>

            {/* Logos side by side */}
            <div className="shrink-0 flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '100px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/cmsa-logo.jpg"
                    alt="CMSA Tanzania"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Regulator</span>
              </div>

              <div className="w-px h-12 bg-gray-200" />

              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '100px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/dse-logo.png"
                    alt="Dar es Salaam Stock Exchange"
                    className="max-h-full max-w-full object-contain scale-[0.85]"
                  />
                </div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Exchange</span>
              </div>
            </div>
          </div>

          {/* Licence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {licences.map(({ icon: Icon, name, authority, desc }) => (
              <div
                key={name}
                className="rounded-2xl border border-gray-200 p-7 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-100 group-hover:bg-[#3457d5] transition-colors duration-300 rounded-l-2xl" />
                <div className="pl-3">
                  <div className="w-11 h-11 rounded-xl bg-[#fafafa] flex items-center justify-center mb-5 group-hover:bg-blue-50 transition-colors duration-300">
                    <Icon size={20} className="text-gray-500 group-hover:text-[#3457d5] transition-colors duration-300" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-1">{authority}</p>
                  <h3 className="font-extrabold text-[#1d1d1d] text-base mb-3">{name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#3457d5] text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Purpose</p>
            <h2 className="text-4xl font-bold text-[#1d1d1d]">Mission &amp; Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="rounded-3xl p-10 bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#3457d5] rounded-l-3xl" />
              <div className="pl-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                  <Target size={20} className="text-[#3457d5]" />
                </div>
                <p className="text-[#3457d5] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Mission</p>
                <h3 className="text-xl font-bold text-[#1d1d1d] mb-4">What We Set Out to Do</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  To provide every Tanzanian investor with access to professional, regulated, and
                  expert-driven capital markets services — empowering individuals, institutions, and
                  corporations to grow and protect their wealth through the Dar es Salaam Stock Exchange
                  with clarity, confidence, and integrity.
                </p>
              </div>
            </div>
            {/* Vision */}
            <div className="rounded-3xl p-10 bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#3457d5] rounded-l-3xl" />
              <div className="pl-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                  <Eye size={20} className="text-[#3457d5]" />
                </div>
                <p className="text-[#3457d5] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Vision</p>
                <h3 className="text-xl font-bold text-[#1d1d1d] mb-4">Where We Are Headed</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  To be the most trusted and respected capital markets firm in Tanzania — recognised not
                  only for the quality of services we deliver, but for the integrity, transparency, and
                  genuine commitment with which we deliver them. We envision a financially literate Tanzania
                  where every investor participates confidently in the nation&apos;s economic growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1">
              <p className="text-[#3457d5] text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Strengths</p>
              <h2 className="text-4xl font-bold text-[#1d1d1d] mb-5 leading-snug">
                Why Invest with Diamond Global
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                We are not simply a brokerage. We are a fully authorised, client-centred institution
                with the licences, the expertise, and the commitment to serve your financial goals with precision.
              </p>
              <Link href="/contact" className="btn-blue inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg">
                Speak to Our Team
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map(({ number, icon: Icon, title, desc }) => (
                <div
                  key={number}
                  className="rounded-2xl border border-gray-100 p-7 hover:border-blue-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#fafafa] flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                      <Icon size={20} className="text-gray-400 group-hover:text-[#3457d5] transition-colors duration-300" />
                    </div>
                    <span className="text-3xl font-black text-gray-100 group-hover:text-blue-100 transition-colors duration-300 leading-none">
                      {number}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1d1d1d] text-[15px] mb-2 leading-snug">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#3457d5] text-xs font-bold uppercase tracking-[0.2em] mb-3">Our People</p>
            <h2 className="text-4xl font-bold text-[#1d1d1d]">Leadership &amp; Team</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-[15px]">
              A team of licensed professionals dedicated to delivering disciplined, transparent, and client-centred financial services.
            </p>
          </div>

          {/* CEO — full-width feature card */}
          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-5 mb-10">
            <div className="lg:col-span-2 relative min-h-[280px] sm:min-h-[380px] lg:min-h-0">
              <Image
                src="/ceo.jpeg"
                alt="Mr. Beatus Mlingi — Chief Executive Officer, Diamond Global Securities Limited"
                fill
                className="object-cover object-top"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-7 py-6"
                style={{ background: 'linear-gradient(to top, rgba(2,11,45,0.97) 0%, rgba(2,11,45,0.3) 70%, transparent 100%)' }}
              >
                <p className="text-white font-extrabold text-xl tracking-tight">Mr. Beatus Mlingi</p>
                <p className="text-xs font-bold tracking-[0.18em] uppercase mt-1.5" style={{ color: '#ffffff' }}>
                  Chief Executive Officer
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 p-9 lg:p-14 flex flex-col justify-center bg-white">
              <div className="w-8 h-0.5 mb-7" style={{ background: '#3457d5' }} />
              <p className="text-gray-700 leading-relaxed text-[15px] mb-5">
                Mr. Beatus Mlingi is a distinguished capital markets professional with extensive experience
                at the heart of Tanzania's securities industry. His deep expertise in investment operations,
                securities dealing, regulatory frameworks, and client advisory has established him as a
                respected practitioner within Tanzania's capital markets landscape.
              </p>
              <p className="text-gray-700 leading-relaxed text-[15px] mb-9">
                As Chief Executive Officer of Diamond Global Securities Limited, Mr. Mlingi provides
                strategic direction across all three licenced business lines — dealing, advisory, and
                fund management — with an unwavering focus on client outcomes, regulatory compliance,
                and institutional excellence. He is a committed advocate for the development and
                deepening of Tanzania's capital markets and for expanding investor participation
                on the Dar es Salaam Stock Exchange.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
                {[
                  'Deep expertise in Tanzania\'s capital markets',
                  'Extensive DSE dealing & brokerage experience',
                  'Strategic leadership across all service lines',
                  'CMSA regulatory compliance & governance',
                  'Advocate for investor education & DSE growth',
                  'Commitment to institutional excellence',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: '#3457d5' }} />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="w-1 h-7 rounded-full" style={{ background: '#3457d5' }} />
                <div>
                  <p className="text-xs font-bold text-[#1d1d1d] tracking-wide">Diamond Global Securities Limited</p>
                  <p className="text-xs text-gray-400">Victoria, Dar es Salaam, Tanzania</p>
                </div>
              </div>
            </div>
          </div>

          {/* Staff grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: '/staff-selina.jpeg',    name: 'CPA(T) Selina Isaya Kong\'oa', role: 'Finance Officer',    init: 'SK' },
              { src: '/staff-marylilian.png', name: 'Ms. Marylilian Siara',          role: 'Dealing Officer',    init: 'MS' },
              { src: '/staff-imani.png',      name: 'Mr. Imani Amulike',             role: 'Compliance Officer', init: 'IA' },
            ].map(({ src, name, role, init }) => (
              <div
                key={name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`${name} — ${role}, Diamond Global Securities`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(2,11,45,0.75) 0%, transparent 55%)' }}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(52,87,213,0.85)', color: '#fff' }}
                    >
                      {role}
                    </span>
                  </div>
                </div>

                <div className="px-5 py-4 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
                    style={{ background: 'linear-gradient(135deg, #3457d5, #2a46c0)' }}
                  >
                    {init}
                  </div>
                  <div>
                    <p className="font-bold text-[#1d1d1d] text-sm leading-tight">{name}</p>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">{role}</p>
                  </div>
                </div>

                <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ background: 'linear-gradient(90deg, #3457d5, #3457d5)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <p className="text-[#3457d5] text-xs font-bold uppercase tracking-[0.2em] mb-4">Find Us</p>
              <h2 className="text-3xl font-bold text-[#1d1d1d] mb-8">Visit Our Office</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fafafa] border border-gray-100 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#3457d5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1d] uppercase tracking-wider mb-1">Address</p>
                    <p className="text-gray-500 text-sm">Victoria, Dar es Salaam, Tanzania</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fafafa] border border-gray-100 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#3457d5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1d] uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-gray-500 text-sm">+255 655 952 075</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fafafa] border border-gray-100 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#3457d5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1d] uppercase tracking-wider mb-1">Email</p>
                    <p className="text-gray-500 text-sm">info@diamondsecurities.co.tz</p>
                  </div>
                </div>
              </div>
              <div className="mt-9 flex gap-3">
                <Link href="/contact" className="btn-blue px-5 py-2.5 text-sm font-semibold rounded-lg inline-flex items-center">
                  Get in Touch
                </Link>
                <Link href="/services" className="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-lg hover:bg-[#fafafa] transition-colors text-gray-700">
                  View Services
                </Link>
              </div>
            </div>

            <div className="min-h-[280px] flex flex-col items-center justify-center bg-[#fafafa] border-t lg:border-t-0 lg:border-l border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(52,87,213,0.08)' }}>
                <MapPin size={28} className="text-[#3457d5]" />
              </div>
              <p className="text-[#1d1d1d] font-semibold text-sm tracking-wide">Victoria</p>
              <p className="text-gray-400 text-xs mt-1 tracking-wide">Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-6 h-px bg-[#3457d5]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
              CMSA Licensed · Professional · Client-Centred
            </span>
            <div className="w-6 h-px bg-[#3457d5]" />
          </div>
          <h2 className="font-display text-4xl text-[#1d1d1d] mb-5 leading-[1.1]">
            Begin Your Investment Journey<br /><span className="italic">with a Partner You Can Trust</span>
          </h2>
          <p className="text-gray-500 mb-9 max-w-xl mx-auto leading-relaxed text-[15px]">
            Our team of licenced professionals is ready to guide you — from your first inquiry
            through to your first trade and beyond. Every engagement begins with listening to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-blue inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg text-sm">
              Open an Account
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/market"
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-[#fafafa] hover:border-blue-200 transition-colors text-sm"
            >
              View Live Market
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
