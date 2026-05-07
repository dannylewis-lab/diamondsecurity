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
    sub: 'Mon–Fri, 8am–5pm EAT',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@diamondsecurities.co.tz'],
    sub: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Victoria', 'Dar es Salaam, Tanzania'],
    sub: 'Mon–Fri, 8am–5pm EAT',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Monday – Friday: 8:00 AM – 5:00 PM', 'Saturday: 9:00 AM – 1:00 PM'],
    sub: 'Closed on Sundays & Public Holidays',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="py-16 bg-white border-b border-gray-100 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(17,51,245,0.04) 0%, transparent 65%)', transform: 'translate(20%, -20%)' }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1133f5] border border-blue-200 mb-5"
              style={{ background: 'rgba(17,51,245,0.06)' }}
            >
              <Mail size={11} />
              Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Contact Us</h1>
            <p className="text-gray-500 text-lg max-w-xl">
              Get in touch with our team — we&apos;re here to help
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactCards.map(({ icon: Icon, title, lines, sub }) => (
                <div key={title} className="bg-blue-50 rounded-2xl p-6 border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <Icon size={18} className="text-blue-600" />
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
