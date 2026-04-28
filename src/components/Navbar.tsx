'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { setDark(true); document.documentElement.classList.add('dark') }
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Market', href: '/market' },
    { label: 'News', href: '/news' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}
      style={{ background: scrolled ? 'rgba(15, 23, 50, 0.98)' : 'rgba(26, 39, 68, 0.97)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/logoo.jpeg"
                alt="Diamond Global Securities Limited"
                width={160}
                height={160}
                className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-white text-[15px] tracking-wide">DIAMOND GLOBAL</div>
              <div className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: '#c8cc00' }}>SECURITIES LIMITED</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 relative group/link"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 group-hover/link:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle dark mode"
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} className="text-white/70" />}
            </button>
            <Link
              href="/market"
              className="px-4 py-2 text-sm font-medium border border-white/30 rounded-lg text-white/90 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              View Market
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors duration-200 shadow-lg shadow-emerald-500/25"
            >
              Open Account
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleDark} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              {dark ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-white/70" />}
            </button>
            <button className="p-2 text-white/80 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1" style={{ background: 'rgba(15, 23, 50, 0.98)' }}>
          {navLinks.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-sm font-medium text-white/80 py-2.5 px-3 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-white/10 mt-2">
            <Link href="/market" onClick={() => setMobileOpen(false)} className="text-center py-2.5 border border-white/30 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200">
              View Market
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-center py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-400 transition-colors duration-200">
              Open Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
