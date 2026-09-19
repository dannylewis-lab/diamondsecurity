import Link from 'next/link'
import {
  ArrowUpRight, ChevronRight, BadgeCheck,
  Image as ImageIcon, Landmark, MessageCircle, Phone, Download,
} from 'lucide-react'
import InquiryForm from '@/components/InquiryForm'

const steps = [
  { step: '01', title: 'Tell Us About You',      desc: 'Fill out the short form below, call us, or visit our office to begin.' },
  { step: '02', title: 'Prepare Your Documents',  desc: 'Gather your ID, a passport photo, and your bank details — see the checklist below.' },
  { step: '03', title: 'We Open Your CDS Account', desc: 'Our team reviews your application and opens your Central Depository System account, typically within 24–48 hours.' },
  { step: '04', title: 'Fund & Start Investing',  desc: 'Transfer funds via mobile money, bank transfer, or cash deposit, then place your first trade or meet your advisor.' },
]

const documents = [
  { icon: BadgeCheck, label: 'National ID or Passport', desc: 'A valid NIDA ID or passport for identity verification' },
  { icon: ImageIcon,  label: 'Passport-size Photo',      desc: 'One recent passport-size photograph' },
  { icon: Landmark,   label: 'Bank Account Details',     desc: 'For settlement and dividend payments' },
]

export default function OpenAccountPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                Get Started
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-[#0a0a0a] leading-[1.1] mb-5">
              Open your <span className="italic text-[#3457d5]">investment account.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              A CDS account with Diamond Global Securities gives you direct, regulated access
              to the Dar es Salaam Stock Exchange. Here&apos;s exactly what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-gray-200 z-0" />
                )}
                <div
                  className="w-16 h-16 rounded-full text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg"
                  style={{ background: '#3457d5' }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-[#1d1d1d] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document checklist */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#3457d5] text-xs font-bold uppercase tracking-[0.2em] mb-3">Before You Start</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1d] mb-3">What You&apos;ll Need</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Have these ready and your account opening will move quickly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {documents.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-[#fafafa]">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-[#3457d5]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1d] text-sm">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/downloads" className="inline-flex items-center gap-2 text-sm font-semibold text-[#3457d5] hover:text-[#2a46c0] transition-colors">
              <Download size={15} /> Get the account opening forms from our Downloads page
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Form + alternate paths */}
      <section className="py-20 bg-[#fafafa] border-t border-gray-100" id="apply">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] leading-[1.1] mb-4">
                Start your <br /><span className="italic text-[#3457d5]">application.</span>
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                Send us your details and one of our advisers will reach out to guide you
                through the rest of the process.
              </p>

              <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">Not ready yet?</p>
              <div className="space-y-2.5">
                <a href="tel:+255791228239" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#3457d5] transition-colors">
                  <Phone size={14} className="text-[#3457d5]" /> Call +255 791 228 239
                </a>
                <a href="https://wa.me/255791228239" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#3457d5] transition-colors">
                  <MessageCircle size={14} className="text-[#3457d5]" /> Chat with us on WhatsApp
                </a>
                <Link href="/contact" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#3457d5] transition-colors">
                  <ArrowUpRight size={14} className="text-[#3457d5]" /> Ask a general question instead
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <InquiryForm lockedType="Account Opening" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
