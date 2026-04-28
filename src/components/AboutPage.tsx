import Link from 'next/link'
import Image from 'next/image'
import {
  Shield, Users, TrendingUp, CheckCircle,
  MapPin, Phone, Mail, ArrowUpRight, Target, Eye,
  Heart, Quote, Briefcase, PieChart, BadgeCheck,
  Lock, Handshake, ChevronRight
} from 'lucide-react'

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
      <section
        className="pt-32 pb-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1128 0%, #1a2744 55%, #0c2240 100%)' }}
      >
        <div className="hero-dots absolute inset-0 opacity-40" />

        {/* Subtle decorative ring */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] border-[60px] border-white"
          style={{ transform: 'translate(40%, -50%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-8">
              <Shield size={12} />
              CMSA Licensed &amp; Regulated · DSE Dealing Member
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.6rem] font-bold text-white mb-6 leading-[1.15]">
              Tanzania's Authorised<br />
              <span className="text-emerald-400">Capital Markets Partner</span>
            </h1>
            <p className="text-blue-200/90 text-lg leading-relaxed mb-10 max-w-2xl">
              Diamond Global Securities Limited is a licensed and regulated capital markets intermediary,
              authorised by the Capital Markets and Securities Authority (CMSA) to provide dealing,
              advisory, and fund management services on the Dar es Salaam Stock Exchange.
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
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/25 text-white/90 font-medium rounded-lg hover:bg-white/10 transition-all text-sm"
              >
                Our Services
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Status Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest shrink-0">Authorised &amp; Regulated</span>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            {[
              'Capital Markets &amp; Securities Authority (CMSA)',
              'Licensed DSE Dealing Member',
              'Dealer Licence',
              'Investment Adviser Licence',
              'Fund Manager Licence',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs text-gray-600 font-medium" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Who We Are</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
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
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
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
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-100 group-hover:bg-emerald-400 transition-colors duration-300" />
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors duration-300">
                    <Icon size={18} className="text-gray-500 group-hover:text-emerald-600 transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
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

          {/* Section Header — styled like a regulatory panel */}
          <div
            className="rounded-2xl px-8 py-8 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, #1a2744 0%, #0f2a44 100%)' }}
          >
            <div>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Regulatory Status</p>
              <h2 className="text-2xl font-bold text-white">Our Authorisations</h2>
              <p className="text-blue-200/80 text-sm mt-2 max-w-xl leading-relaxed">
                Diamond Global Securities Limited is authorised and regulated by the Capital Markets and Securities
                Authority (CMSA) of Tanzania and is a licensed dealing member of the Dar es Salaam Stock Exchange (DSE).
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <BadgeCheck size={40} className="text-emerald-400 opacity-80" />
            </div>
          </div>

          {/* Licence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {licences.map(({ icon: Icon, name, authority, desc }) => (
              <div
                key={name}
                className="rounded-2xl border border-gray-200 p-7 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-100 group-hover:bg-emerald-400 transition-colors duration-300 rounded-l-2xl" />
                <div className="pl-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:bg-emerald-50 transition-colors duration-300">
                    <Icon size={20} className="text-gray-500 group-hover:text-emerald-600 transition-colors duration-300" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-1">{authority}</p>
                  <h3 className="font-extrabold text-gray-900 text-base mb-3">{name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Purpose</p>
            <h2 className="text-4xl font-bold text-gray-900">Mission &amp; Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div
              className="rounded-3xl p-10 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #1a2744 0%, #0c2240 100%)' }}
            >
              <div
                className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-[0.06]"
                style={{ background: '#10b981' }}
              />
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-6">
                <Target size={20} className="text-emerald-400" />
              </div>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Mission</p>
              <h3 className="text-xl font-bold text-white mb-4">What We Set Out to Do</h3>
              <p className="text-blue-200/80 leading-relaxed text-[15px]">
                To provide every Tanzanian investor with access to professional, regulated, and
                expert-driven capital markets services — empowering individuals, institutions, and
                corporations to grow and protect their wealth through the Dar es Salaam Stock Exchange
                with clarity, confidence, and integrity.
              </p>
            </div>
            {/* Vision */}
            <div className="rounded-3xl p-10 relative overflow-hidden bg-emerald-500">
              <div
                className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-[0.12]"
                style={{ background: 'white' }}
              />
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center mb-6">
                <Eye size={20} className="text-white" />
              </div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Vision</p>
              <h3 className="text-xl font-bold text-white mb-4">Where We Are Headed</h3>
              <p className="text-emerald-50/90 leading-relaxed text-[15px]">
                To be the most trusted and respected capital markets firm in Tanzania — recognised not
                only for the quality of services we deliver, but for the integrity, transparency, and
                genuine commitment with which we deliver them. We envision a financially literate Tanzania
                where every investor participates confidently in the nation's economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Left — heading */}
            <div className="lg:col-span-1">
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Strengths</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-5 leading-snug">
                Why Invest with Diamond Global
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                We are not simply a brokerage. We are a fully authorised, client-centred institution
                with the licences, the expertise, and the commitment to serve your financial goals with precision.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-all"
                style={{ background: '#1a2744' }}
              >
                Speak to Our Team
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Right — 4 items in 2x2 grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map(({ number, icon: Icon, title, desc }) => (
                <div
                  key={number}
                  className="rounded-2xl border border-gray-100 p-7 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors duration-300">
                      <Icon size={20} className="text-gray-400 group-hover:text-emerald-600 transition-colors duration-300" />
                    </div>
                    <span className="text-3xl font-black text-gray-100 group-hover:text-emerald-100 transition-colors duration-300 leading-none">
                      {number}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2 leading-snug">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Leader</p>
            <h2 className="text-4xl font-bold text-gray-900">Leadership</h2>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-5">
            {/* Photo */}
            <div className="lg:col-span-2 relative min-h-[280px] sm:min-h-[380px] lg:min-h-0">
              <Image
                src="/ceo.jpeg"
                alt="Mr. Beatus Mlingi — Chief Executive Officer, Diamond Global Securities Limited"
                fill
                className="object-cover object-top"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-7 py-6"
                style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.97) 0%, rgba(10,17,40,0.3) 70%, transparent 100%)' }}
              >
                <p className="text-white font-extrabold text-xl tracking-tight">Mr. Beatus Mlingi</p>
                <p className="text-emerald-400 text-xs font-bold tracking-[0.18em] uppercase mt-1.5">
                  Chief Executive Officer — Diamond Global Securities Limited
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 p-9 lg:p-14 flex flex-col justify-center bg-white">
              <div className="w-8 h-0.5 bg-emerald-500 mb-7" />
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
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="w-1 h-7 bg-emerald-500 rounded-full" />
                <div>
                  <p className="text-xs font-bold text-gray-900 tracking-wide">Diamond Global Securities Limited</p>
                  <p className="text-xs text-gray-400">Victoria, Dar es Salaam, Tanzania</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Info */}
            <div className="p-10 lg:p-14">
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Find Us</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Visit Our Office</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-gray-500 text-sm">Victoria, Dar es Salaam, Tanzania</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-gray-500 text-sm">+255 655 952 075</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-gray-500 text-sm">info@diamondsecurities.co.tz</p>
                  </div>
                </div>
              </div>
              <div className="mt-9 flex gap-3">
                <Link href="/contact" className="px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors">
                  Get in Touch
                </Link>
                <Link href="/services" className="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  View Services
                </Link>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="min-h-[280px] flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(145deg, #1a2744 0%, #0c2240 100%)' }}
            >
              <MapPin size={32} className="text-emerald-400 mb-3" />
              <p className="text-white font-semibold text-sm tracking-wide">Victoria</p>
              <p className="text-blue-300/70 text-xs mt-1 tracking-wide">Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24"
        style={{ background: 'linear-gradient(145deg, #0a1128 0%, #1a2744 60%, #0c2240 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-7">
            <Shield size={11} />
            CMSA Licensed · Professional · Client-Centred
          </div>
          <h2 className="text-4xl font-bold text-white mb-5 leading-snug">
            Begin Your Investment Journey<br />with a Partner You Can Trust
          </h2>
          <p className="text-blue-200/80 mb-9 max-w-xl mx-auto leading-relaxed text-[15px]">
            Our team of licenced professionals is ready to guide you — from your first inquiry
            through to your first trade and beyond. Every engagement begins with listening to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-sm"
            >
              Open an Account
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/market"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white/90 font-medium rounded-lg hover:bg-white/10 transition-colors text-sm"
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
