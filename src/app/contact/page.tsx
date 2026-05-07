import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { InquirySection } from '@/components/Sections'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+255 655 952 075',
    sub: 'Mon–Fri, 8 am – 5 pm EAT',
    href: 'tel:+255655952075',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@diamondsecurities.co.tz',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@diamondsecurities.co.tz',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Victoria, Dar es Salaam',
    sub: 'Tanzania',
    href: undefined,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Fri: 8 am – 5 pm',
    sub: 'Sat: 9 am – 1 pm',
    href: undefined,
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="pt-20 pb-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                Get in Touch
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-6">
                <h1 className="font-display text-4xl sm:text-5xl text-[#0a0a0a] leading-[1.1] mb-4">
                  Let&apos;s start a<br />
                  <span className="italic text-[#3457d5]">conversation.</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                  Whether you&apos;re ready to open an account or just have questions,
                  our team is ready to help.
                </p>
              </div>

              {/* Contact info grid */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-px bg-gray-200">
                  {contactInfo.map(({ icon: Icon, label, value, sub, href }) => (
                    <div key={label} className="bg-white p-6 hover:bg-[#fafafa] transition-colors">
                      <Icon size={15} className="text-[#3457d5] mb-3" />
                      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-gray-400 mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-[#0a0a0a] hover:text-[#3457d5] transition-colors block leading-snug">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#0a0a0a] leading-snug">{value}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InquirySection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
