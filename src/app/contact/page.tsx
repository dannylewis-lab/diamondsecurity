import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { InquirySection, WhatsAppSection } from '@/components/Sections'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactCards = [
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+255 655 952 075'],
    sub: 'Monâ€“Fri, 8amâ€“5pm EAT',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@diamondsecurities.co.tz'],
    sub: 'We reply within 24 hours',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Victoria', 'Dar es Salaam, Tanzania'],
    sub: 'Monâ€“Fri, 8amâ€“5pm EAT',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Monday â€“ Friday: 8:00 AM â€“ 5:00 PM', 'Saturday: 9:00 AM â€“ 1:00 PM'],
    sub: 'Closed on Sundays & Public Holidays',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div
          className="py-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a2744 100%)' }}
        >
          <div className="hero-dots absolute inset-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
            <p className="text-blue-200">Get in touch with our team â€” we're here to help</p>
          </div>
        </div>

        {/* Contact Cards */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactCards.map(({ icon: Icon, title, lines, sub, color, iconColor }) => (
                <div key={title} className={`${color} rounded-2xl p-6 border border-gray-100`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <Icon size={18} className={iconColor} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  {lines.map(l => <p key={l} className="text-sm text-gray-700 font-medium">{l}</p>)}
                  <p className="text-xs text-gray-500 mt-2">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WhatsAppSection />
        <InquirySection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
