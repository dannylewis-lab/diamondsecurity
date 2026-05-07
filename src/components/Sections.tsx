import { MessageCircle, Clock, Users, Zap } from 'lucide-react'
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
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1133f5] border border-blue-200 mb-5"
                style={{ background: 'rgba(17,51,245,0.06)' }}
              >
                <MessageCircle size={12} />
                WhatsApp Support
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Have Questions? Let&apos;s Chat!</h2>
              <p className="text-gray-500 leading-relaxed mb-7">
                Connect with our team directly on WhatsApp for instant support, account inquiries,
                or investment advice. We&apos;re here to help you succeed.
              </p>
              <a
                href="https://wa.me/255655952075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 text-sm"
                style={{ background: '#1133f5', boxShadow: '0 4px 16px rgba(17,51,245,0.25)' }}
              >
                <MessageCircle size={15} />
                Chat with us on WhatsApp
              </a>
            </div>

            <div className="space-y-4">
              {[
                { icon: Clock, title: 'Quick Responses', desc: 'Get answers within minutes' },
                { icon: Users, title: 'Expert Support',  desc: 'Chat with our specialists'  },
                { icon: Zap,   title: 'Instant Access',  desc: 'No waiting, no hassle'      },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 px-5 py-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(17,51,245,0.08)' }}
                  >
                    <Icon size={16} style={{ color: '#1133f5' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Inquiry Form
export function InquirySection() {
  return (
    <section className="py-20 bg-white dark:bg-[#050e25]" id="contact">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Send Us an Inquiry</h2>
          <p className="text-gray-500 dark:text-blue-300">Fill out the form below and our team will get back to you within 24 hours</p>
        </div>

        <InquiryForm />
      </div>
    </section>
  )
}
