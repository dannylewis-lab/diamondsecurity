'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark]             = useState(false)
  const [scrolled, setScrolled]     = useState(false)

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
    { label: 'Home',     href: '/'         },
    { label: 'About',    href: '/about'    },
    { label: 'Services', href: '/services' },
    { label: 'Market',   href: '/market'   },
    { label: 'News',     href: '/news'     },
  ]

  const navBg = dark
    ? (scrolled ? 'rgba(2,11,45,0.97)' : 'rgba(5,14,37,0.92)')
    : 'rgba(255,255,255,0.97)'

  const navBorder = dark
    ? (scrolled ? '1px solid rgba(52,87,213,0.15)' : 'none')
    : '1px solid rgba(0,0,0,0.07)'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? dark ? 'shadow-xl shadow-black/20' : 'shadow-md shadow-black/5'
          : 'shadow-none'
      }`}
      style={{ background: navBg, borderBottom: navBorder }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div
              className="relative shrink-0 bg-white rounded-2xl overflow-hidden"
              style={{ width: '52px', height: '52px', boxShadow: '0 0 18px 4px rgba(255,255,255,0.35), 0 4px 12px rgba(0,0,0,0.25)' }}
            >
              <Image
                src="/diamond-logo.png"
                alt="Diamond Global Securities Limited"
                fill
                className="object-cover scale-[1.2]"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className={`font-extrabold text-[15px] sm:text-base lg:text-lg tracking-wide transition-colors ${dark ? 'text-white' : 'text-[#1d1d1d]'}`}>
                DIAMOND GLOBAL
              </div>
              <div className={`text-[10px] sm:text-[11px] font-bold tracking-[0.22em] ${dark ? 'text-blue-300' : 'text-[#3457d5]'}`}>
                SECURITIES LIMITED
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 relative group/link ${
                  dark
                    ? 'text-white/75 hover:text-white'
                    : 'text-gray-600 hover:text-[#1d1d1d]'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3457d5] group-hover/link:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDark}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                dark
                  ? 'border-white/15 hover:border-blue-400/40 hover:bg-blue-500/10'
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
              aria-label="Toggle dark mode"
            >
              {dark
                ? <Sun  size={15} className="text-white" />
                : <Moon size={15} className="text-gray-500" />}
            </button>
            <Link
              href="/market"
              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 ${
                dark
                  ? 'border-white/20 text-white/85 hover:bg-white/8 hover:border-blue-400/40'
                  : 'border-gray-200 text-gray-700 hover:bg-[#fafafa] hover:border-blue-500/50'
              }`}
            >
              View Market
            </Link>
            <Link
              href="/contact"
              className="btn-blue px-5 py-2 text-sm font-semibold text-white rounded-lg"
            >
              Open Account
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDark}
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                dark ? 'border-white/15' : 'border-gray-200'
              }`}
            >
              {dark
                ? <Sun  size={14} className="text-white" />
                : <Moon size={14} className="text-gray-500" />}
            </button>
            <button
              className={`p-2 transition-colors ${dark ? 'text-white/75 hover:text-white' : 'text-gray-600 hover:text-[#1d1d1d]'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-1"
          style={{
            background: dark ? 'rgba(2,11,45,0.98)' : 'rgba(255,255,255,0.99)',
            borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}
        >
          {navLinks.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 ${
                dark
                  ? 'text-white/75 hover:bg-blue-500/10 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-[#1d1d1d]'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className={`pt-3 flex flex-col gap-2 border-t mt-2 ${dark ? 'border-white/10' : 'border-gray-100'}`}>
            <Link
              href="/market"
              onClick={() => setMobileOpen(false)}
              className={`text-center py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 ${
                dark
                  ? 'border-white/20 text-white/85 hover:bg-white/8'
                  : 'border-gray-200 text-gray-700 hover:bg-[#fafafa]'
              }`}
            >
              View Market
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-blue text-center py-2.5 text-white rounded-lg text-sm font-semibold"
            >
              Open Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
