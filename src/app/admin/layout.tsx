'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Newspaper, Sparkles, MessageSquare,
  FolderOpen, Settings, LogOut, Eye, EyeOff, Shield,
  ChevronRight, KeyRound, ArrowLeft, Menu, X,
} from 'lucide-react'

const sidebarLinks = [
  { label: 'Overview',        href: '/admin',           icon: LayoutDashboard },
  { label: 'News Management', href: '/admin/news',      icon: Newspaper },
  { label: 'Market Reports',  href: '/admin/reports',   icon: Sparkles },
  { label: 'Inquiries',       href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Documents',       href: '/admin/documents', icon: FolderOpen },
  { label: 'Settings',        href: '/admin/settings',  icon: Settings },
]

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

type Admin = { id: string; email: string; name: string }
type View  = 'login' | 'forgot'

function LoginScreen({ onLogin }: { onLogin: (admin: Admin) => void }) {
  const [view, setView]         = useState<View>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockout, setLockout]   = useState(0)

  const MAX_ATTEMPTS = 5
  const LOCKOUT_SECS = 30

  useEffect(() => {
    if (lockout <= 0) return
    const t = setTimeout(() => setLockout(l => l - 1), 1000)
    return () => clearTimeout(t)
  }, [lockout])

  const clear = () => { setError(''); setSuccess('') }

  const handleLogin = async () => {
    if (lockout > 0) return
    clear()
    if (!email || !password) { setError('Please enter both email and password.'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        const next = attempts + 1
        setAttempts(next)
        if (next >= MAX_ATTEMPTS) {
          setLockout(LOCKOUT_SECS)
          setAttempts(0)
          setError(`Too many failed attempts. Please wait ${LOCKOUT_SECS} seconds.`)
        } else {
          setError(`${data.error ?? 'Invalid credentials'}. ${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next === 1 ? '' : 's'} remaining.`)
        }
      } else {
        onLogin(data.admin)
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  const cardStripe = <div className="h-1 w-full" style={{ background: '#3457d5' }} />

  const logoBlock = (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div
          className="relative shrink-0 bg-white rounded-2xl overflow-hidden"
          style={{ width: '76px', height: '76px', boxShadow: '0 0 24px 6px rgba(255,255,255,0.3), 0 6px 20px rgba(0,0,0,0.35)' }}
        >
          <Image src="/diamond-logo.png" alt="Diamond Global Securities" fill className="object-cover scale-[1.2]" priority />
        </div>
        <div className="text-left leading-tight">
          <div className="font-extrabold text-white text-lg tracking-wide">DIAMOND GLOBAL</div>
          <div className="text-xs font-bold tracking-[0.22em] text-white">SECURITIES LIMITED</div>
        </div>
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-blue-300 font-medium tracking-wide mt-1">
        <Shield size={10} className="text-blue-400" />
        Admin Portal
      </div>
    </div>
  )

  const feedback = (
    <>
      {error   && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-start gap-2"><span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>{error}</div>}
      {success && <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">{success}</div>}
    </>
  )

  const inputCls = "w-full px-4 py-3 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
  const btnCls   = "w-full py-3.5 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 shadow-lg"
  const btnStyle = { background: 'linear-gradient(135deg, #3457d5 0%, #2a46c0 100%)' }

  const wrap = (children: React.ReactNode) => (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #020B2D 0%, #050E25 55%, #071435 100%)' }}>
      <div className="hero-dots absolute inset-0 opacity-40" />
      <div className="relative z-10 w-full max-w-sm">
        {logoBlock}
        {children}
        <p className="text-center text-xs text-blue-400/60 mt-5">© {new Date().getFullYear()} Diamond Global Securities Limited · CMSA Licensed</p>
      </div>
    </div>
  )

  if (view === 'forgot') return wrap(
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {cardStripe}
      <div className="p-6 sm:p-8">
        <button onClick={() => { setView('login'); clear() }} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mb-5 transition-colors">
          <ArrowLeft size={13} /> Back to sign in
        </button>
        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <KeyRound size={20} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-[#1d1d1d] mb-1">Forgot password?</h2>
        <p className="text-sm text-gray-400 mb-6">Contact your system administrator to reset your password.</p>
        {feedback}
        <button onClick={() => { setView('login'); clear() }} className={btnCls} style={btnStyle}>Back to Sign In</button>
      </div>
    </div>
  )

  return wrap(
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {cardStripe}
      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#1d1d1d] mb-1">Sign in</h2>
        <p className="text-sm text-gray-400 mb-6">Enter your credentials to access the dashboard</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); clear() }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="admin@diamondglobal.co.tz" className={inputCls} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
              <button type="button" onClick={() => { setView('forgot'); clear() }} className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">Forgot password?</button>
            </div>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); clear() }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••••" className={`${inputCls} pr-11`} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          {feedback}
          <button onClick={handleLogin} disabled={loading || lockout > 0} className={btnCls} style={lockout > 0 ? { background: '#94a3b8' } : btnStyle}>
            {loading ? <><Spinner /> Signing in...</> : lockout > 0 ? `Locked · wait ${lockout}s` : <>Sign In <ChevronRight size={15} /></>}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">← Back to main site</Link>
        </p>
      </div>
    </div>
  )
}

function SidebarContent({ admin, pathname, onLinkClick, onLogout }: { admin: Admin; pathname: string; onLinkClick?: () => void; onLogout: () => void }) {
  return (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group" onClick={onLinkClick}>
          <div className="relative shrink-0 bg-white rounded-xl overflow-hidden" style={{ width: '48px', height: '48px', boxShadow: '0 0 16px 4px rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.3)' }}>
            <Image src="/diamond-logo.png" alt="Diamond Global Securities" fill className="object-cover scale-[1.2]" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-white text-[13px] tracking-wide leading-tight">DIAMOND GLOBAL</div>
            <div className="text-[9px] font-bold tracking-[0.2em] leading-tight text-white">SECURITIES LIMITED</div>
          </div>
        </Link>
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/20 text-[10px] text-blue-400 font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Admin Portal
        </div>
      </div>

      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {admin.name?.[0]?.toUpperCase() ?? admin.email[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white leading-tight">{admin.name}</p>
            <p className="text-[11px] text-white/40 truncate leading-tight mt-0.5">{admin.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.18em] px-3 mb-3">Navigation</p>
        {sidebarLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${isActive ? 'text-white shadow-lg' : 'text-white/50 hover:bg-white/10 hover:text-white/90'}`}
              style={isActive ? { background: '#3457d5' } : {}}
            >
              <Icon size={15} className={isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={13} className="text-white/60" />}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link href="/" onClick={onLinkClick} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:bg-white/10 hover:text-white/80 transition-all duration-150">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Live Site
        </Link>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [admin, setAdmin]           = useState<Admin | null>(null)
  const [loading, setLoading]       = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(data => setAdmin(data?.admin ?? null))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAdmin(null)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-xs text-gray-400 tracking-wide">Loading portal...</p>
      </div>
    </div>
  )

  if (!admin) return <LoginScreen onLogin={setAdmin} />

  const currentLabel = sidebarLinks.find(l => l.href === pathname)?.label ?? 'Admin'

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col w-64 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} style={{ background: '#0f172a' }}>
        <button className="md:hidden absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10" onClick={() => setSidebarOpen(false)}>
          <X size={20} />
        </button>
        <SidebarContent admin={admin} pathname={pathname} onLinkClick={() => setSidebarOpen(false)} onLogout={handleLogout} />
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3 shadow-sm">
          <button className="md:hidden p-1.5 -ml-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xs text-gray-400 hidden sm:block">Admin</span>
            <ChevronRight size={12} className="text-gray-300 hidden sm:block" />
            <span className="text-sm font-semibold text-gray-800 truncate">{currentLabel}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Connected
            </div>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium flex items-center gap-1.5">
              <LogOut size={13} /><span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        <footer className="border-t border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-400 text-center">Diamond Global Securities Limited · Admin Portal · CMSA Licensed</p>
        </footer>
      </div>
    </div>
  )
}
