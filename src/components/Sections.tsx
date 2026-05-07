import { MessageCircle } from 'lucide-react'
import InquiryForm from '@/components/InquiryForm'

// Market Insight Section — live from Supabase
export { default as AIInsightsSection } from '@/components/LiveMarketOverview'

// News Section — live from Supabase
export { default as NewsSection } from '@/components/LiveNewsSection'

// Download Center — live from Supabase
export { default as DownloadSection } from '@/components/DownloadSection'

// WhatsApp Section
export function WhatsAppSection() {
  return (
    <section style={{ background: '#020B2D' }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-400">
                Direct Support
              </span>
            </div>
            <h2 className="font-display text-3xl text-white mb-2">
              Speak to an advisor today.
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-lg">
              Reach our team directly on WhatsApp for account inquiries, investment
              guidance, or any questions — no waiting, no phone queues.
            </p>
          </div>
          <a
            href="https://wa.me/255655952075"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold text-sm whitespace-nowrap shrink-0 transition-all hover:-translate-y-0.5"
            style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
          >
            <MessageCircle size={15} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// Inquiry Form
export function InquirySection() {
  return (
    <section className="py-24 bg-[#fafafa] dark:bg-[#050e25] border-t border-gray-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                Inquiries
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a] dark:text-white leading-[1.1] mb-4">
              Send us a<br />
              <span className="italic text-[#3457d5]">message.</span>
            </h2>
            <p className="text-gray-500 dark:text-blue-300 text-[15px] leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="lg:col-span-8">
            <InquiryForm />
          </div>

        </div>
      </div>
    </section>
  )
}
