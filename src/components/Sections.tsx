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
    <section
      className="py-20"
      style={{ background: 'linear-gradient(135deg, #020B2D 0%, #0A1628 60%, #071435 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-blue p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
                style={{ background: 'rgba(37,211,102,0.12)', color: '#4ade80' }}>
                <MessageCircle size={14} />
                WhatsApp Support
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Have Questions? Let's Chat!</h2>
              <p className="text-slate-300 leading-relaxed mb-7">
                Connect with our team directly on WhatsApp for instant support, account inquiries, or investment advice.
                We're here to help you succeed.
              </p>
              <a
                href="https://wa.me/255655952075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{ background: '#25d366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
              >
                <MessageCircle size={16} />
                Chat with us on WhatsApp
              </a>
            </div>

            <div className="space-y-5">
              {[
                { icon: Clock, title: 'Quick Responses', desc: 'Get answers within minutes' },
                { icon: Users, title: 'Expert Support',  desc: 'Chat with our specialists'  },
                { icon: Zap,   title: 'Instant Access',  desc: 'No waiting, no hassle'      },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(37,99,235,0.18)' }}
                  >
                    <Icon size={18} style={{ color: '#60A5FA' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-sm text-slate-400">{desc}</p>
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
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Send Us an Inquiry</h2>
          <p className="text-gray-500">Fill out the form below and our team will get back to you within 24 hours</p>
        </div>

        <InquiryForm />
      </div>
    </section>
  )
}
