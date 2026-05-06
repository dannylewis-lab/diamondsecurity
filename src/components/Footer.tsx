import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{background:'#1a2744'}} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div
                className="relative shrink-0 bg-white rounded-2xl overflow-hidden"
                style={{ width: '64px', height: '64px', boxShadow: '0 0 18px 4px rgba(255,255,255,0.35), 0 4px 12px rgba(0,0,0,0.25)' }}
              >
                <Image
                  src="/diamond-logo.png"
                  alt="Diamond Global Securities Limited"
                  fill
                  className="object-cover scale-[1.2]"
                />
              </div>
              <div className="leading-tight">
                <div className="font-black text-white text-base tracking-tight">DIAMOND GLOBAL</div>
                <div className="text-sm font-bold tracking-widest" style={{ color: '#c8cc00' }}>SECURITIES LIMITED</div>
              </div>
            </Link>
            <p className="text-sm text-blue-200 leading-relaxed mb-5">
              Your trusted partner in securities trading. Licensed by the Dar es Salaam Stock Exchange.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook,  href: '#' },
                { Icon: Twitter,   href: '#' },
                { Icon: Linkedin,  href: '#' },
                { Icon: Instagram, href: 'https://www.instagram.com/diamond_globalsecurities?igsh=d2Q0a2s5aWQyeXVr&utm_source=qr' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-blue-400 hover:text-blue-400 transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Market Data', href: '/market' },
                { label: 'News & Insights', href: '/news' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Admin Login', href: '/admin' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Our Services</h4>
            <ul className="space-y-2.5">
              {['Brokerage Services', 'Investment Advisory', 'Portfolio Management', 'Market Research'].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-blue-200 hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-blue-200">
                <MapPin size={15} className="mt-0.5 shrink-0 text-blue-300" />
                <span>Victoria<br/>Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Phone size={15} className="shrink-0 text-blue-300" />
                +255 655 952 075
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Mail size={15} className="shrink-0 text-blue-300" />
                info@diamondsecurities.co.tz
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-300">© 2026 Diamond Global Securities. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(l => (
              <a key={l} href="#" className="text-xs text-blue-300 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
