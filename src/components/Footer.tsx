import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'

const navLinks = [
  { label: 'About Us',       href: '/about'    },
  { label: 'Services',       href: '/services' },
  { label: 'Market Data',    href: '/market'   },
  { label: 'News & Insights',href: '/news'     },
  { label: 'Contact Us',     href: '/contact'  },
]

const serviceLinks = [
  { label: 'Brokerage & Dealing',  href: '/services' },
  { label: 'Investment Advisory',  href: '/services' },
  { label: 'Fund Management',      href: '/services' },
]

const socials = [
  { Icon: Facebook,  href: '#',                label: 'Facebook'  },
  { Icon: Twitter,   href: '#',                label: 'Twitter'   },
  { Icon: Linkedin,  href: '#',                label: 'LinkedIn'  },
  { Icon: Instagram, href: 'https://www.instagram.com/diamond_globalsecurities?igsh=d2Q0a2s5aWQyeXVr&utm_source=qr', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#020B2D' }} className="text-white">

      {/* ── Brand statement ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

          <div className="lg:col-span-7">
            <Link href="/" className="flex items-center gap-3 mb-7 w-fit group">
              <div
                className="relative shrink-0 bg-white rounded-xl overflow-hidden"
                style={{ width: '44px', height: '44px', boxShadow: '0 0 14px 3px rgba(255,255,255,0.25)' }}
              >
                <Image
                  src="/diamond-logo.png"
                  alt="Diamond Global Securities Limited"
                  fill
                  className="object-cover scale-[1.2]"
                />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white text-sm tracking-wide">DIAMOND GLOBAL</div>
                <div className="text-[10px] font-semibold tracking-[0.22em] text-white/50">SECURITIES LIMITED</div>
              </div>
            </Link>

            <p className="font-display text-3xl sm:text-4xl text-white leading-[1.15] mb-4">
              Your partner in Tanzania&apos;s<br />
              <span className="italic text-white/60">capital markets.</span>
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              A CMSA-licensed and DSE Dealing Member firm delivering professional
              brokerage, advisory, and fund management services.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={14} className="mt-0.5 shrink-0 text-white/30" />
                <span>Victoria, Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone size={14} className="shrink-0 text-white/30" />
                <a href="tel:+255655952075" className="hover:text-white transition-colors">+255 655 952 075</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail size={14} className="shrink-0 text-white/30" />
                <a href="mailto:info@diamondsecurities.co.tz" className="hover:text-white transition-colors">
                  info@diamondsecurities.co.tz
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center text-white/40 hover:border-[#3457d5]/60 hover:text-white hover:bg-[#3457d5]/10 transition-all"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Links grid ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">Services</p>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">Regulatory</p>
            <ul className="space-y-3">
              {[
                'CMSA Licensed & Regulated',
                'DSE Dealing Member',
                'Dealer Licence',
                'Investment Adviser Licence',
                'Fund Manager Licence',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#3457d5] shrink-0" />
                  <span className="text-sm text-white/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2026 Diamond Global Securities Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((l) => (
              <a key={l} href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
