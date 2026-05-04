'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Newspaper, Sparkles, MessageSquare,
  FolderOpen, Settings, LogOut, Eye, EyeOff, Shield,
  ChevronRight, Mail, KeyRound, ArrowLeft,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const sidebarLinks = [
  { label: 'Overview',        href: '/admin',           icon: LayoutDashboard },
  { label: 'News Management', href: '/admin/news',      icon: Newspaper },
  { label: 'AI Reports',      href: '/admin/reports',   icon: Sparkles },
  { label: 'Inquiries',       href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Documents',       href: '/admin/documents', icon: FolderOpen },
  { label: 'Settings',        href: '/admin/settings',  icon: Settings },
]

/* ─── Shared spinner ────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

/* ─── Login Screen ─────────────────────────────────────────────────────────── */
type View = 'login' | 'forgot' | 'reset'

function LoginScreen({ onLogin }: { onLogin: (user: any) => void }) {
  const [view, setView]         = useState<View>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [newPass, setNewPass]   = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')
  const [loading, setLoading]   = useState(false)
  const supabase = createClient()

  /* Detect password-recovery token when user clicks the email link */
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setView('reset')
        setError('')
        setSuccess('')
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const clear = () => { setError(''); setSuccess('') }

  /* ── Sign in ── */
  const handleLogin = async () => {
    clear()
    if (!email || !password) { setError('Please enter both email and password.'); return }
    setLoading(true)
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError || !data.user) {
      setError('Invalid email or password. Please try again.')
    } else {
      onLogin(data.user)
    }
    setLoading(false)
  }

  /* ── Send reset email ── */
  const handleForgotPassword = async () => {
    clear()
    if (!email) { setError('Please enter your email address.'); return }
    setLoading(true)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    })
    if (resetError) {
      setError(resetError.message)
    } else {
      setSuccess('Reset link sent! Check your inbox and click the link to set a new password.')
    }
    setLoading(false)
  }

  /* ── Set new password ── */
  const handleResetPassword = async () => {
    clear()
    if (!newPass || newPass.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password: newPass })
    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess('Password updated! You can now sign in.')
      setView('login')
      setNewPass('')
    }
    setLoading(false)
  }

  /* ── Shared wrapper ── */
  const cardStripe = (
    <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #3B82F6)' }} />
  )

  const logoBlock = (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="relative h-14 w-14 shrink-0">
          <Image
            src="/logoo.jpeg"
            alt="Diamond Global Securities"
            width={160} height={160}
            className="h-14 w-auto object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
        <div className="text-left leading-tight">
          <div className="font-extrabold text-white text-lg tracking-wide">DIAMOND GLOBAL</div>
          <div className="text-xs font-bold tracking-[0.22em]" style={{ color: '#c8cc00' }}>SECURITIES LIMITED</div>
        </div>
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-blue-300 font-medium tracking-wide mt-1">
        <Shield size={10} className="text-blue-400" />
        Admin Portal
      </div>
    </div>
  )

  const feedbackBlock = (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0">!</span>
          {error}
        </div>
      )}
      {success && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs shrink-0">✓</span>
          {success}
        </div>
      )}
    </>
  )

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
  const btnClass   = "w-full py-3.5 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 shadow-lg"
  const btnStyle   = { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }

  const outerWrap = (children: React.ReactNode) => (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020B2D 0%, #050E25 55%, #071435 100%)' }}
    >
      <div className="hero-dots absolute inset-0 opacity-40" />
      <div
        className="absolute -left-32 top-1/2 w-[500px] h-[500px] rounded-full border-[60px] border-white opacity-[0.03] pointer-events-none"
        style={{ transform: 'translateY(-50%)' }}
      />
      <div className="relative z-10 w-full max-w-sm">
        {logoBlock}
        {children}
        <p className="text-center text-xs text-blue-400/60 mt-5">
          © {new Date().getFullYear()} Diamond Global Securities Limited · CMSA Licensed
        </p>
      </div>
    </div>
  )

  /* ── Forgot password view ── */
  if (view === 'forgot') return outerWrap(
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {cardStripe}
      <div className="p-8">
        <button onClick={() => { setView('login'); clear() }} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mb-5 transition-colors">
          <ArrowLeft size={13} /> Back to sign in
        </button>
        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <Mail size={20} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Forgot password?</h2>
        <p className="text-sm text-gray-400 mb-6">Enter your email and we'll send a reset link.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); clear() }}
              onKeyDown={e => e.key === 'Enter' && handleForgotPassword()}
              placeholder="admin@diamondsecurities.co.tz"
              className={inputClass}
            />
          </div>
          {feedbackBlock}
          <button onClick={handleForgotPassword} disabled={loading} className={btnClass} style={btnStyle}>
            {loading ? <><Spinner /> Sending...</> : <><Mail size={15} /> Send Reset Link</>}
          </button>
        </div>
      </div>
    </div>
  )

  /* ── Reset password view (after clicking email link) ── */
  if (view === 'reset') return outerWrap(
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {cardStripe}
      <div className="p-8">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <KeyRound size={20} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Set new password</h2>
        <p className="text-sm text-gray-400 mb-6">Choose a strong password for your admin account.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={newPass}
                onChange={e => { setNewPass(e.target.value); clear() }}
                onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                placeholder="At least 6 characters"
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          {feedbackBlock}
          <button onClick={handleResetPassword} disabled={loading} className={btnClass} style={btnStyle}>
            {loading ? <><Spinner /> Updating...</> : <><KeyRound size={15} /> Set New Password</>}
          </button>
        </div>
      </div>
    </div>
  )

  /* ── Default login view ── */
  return outerWrap(
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {cardStripe}
      <div className="p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Sign in</h2>
        <p className="text-sm text-gray-400 mb-6">Enter your credentials to access the dashboard</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); clear() }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="admin@diamondsecurities.co.tz"
              className={inputClass}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
              <button
                type="button"
                onClick={() => { setView('forgot'); clear() }}
                className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); clear() }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••••"
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {feedbackBlock}

          <button onClick={handleLogin} disabled={loading} className={btnClass} style={btnStyle}>
            {loading ? <><Spinner /> Signing in...</> : <>Sign In <ChevronRight size={15} /></>}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">← Back to main site</Link>
        </p>
      </div>
    </div>
  )
}

/* ─── Admin Shell ──────────────────────────────────────────────────────────── */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [user, setUser]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-xs text-gray-400 tracking-wide">Loading portal...</p>
        </div>
      </div>
    )
  }

  if (!user) return <LoginScreen onLogin={setUser} />

  const currentLabel = sidebarLinks.find(l => l.href === pathname)?.label ?? 'Admin'

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex w-64 fixed left-0 top-0 bottom-0 z-40 flex-col"
        style={{ background: '#0f172a' }}>

        {/* Logo section */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/logoo.jpeg"
                alt="Diamond Global Securities"
                width={160}
                height={160}
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-white text-[13px] tracking-wide leading-tight">
                DIAMOND GLOBAL
              </div>
              <div className="text-[9px] font-bold tracking-[0.2em] leading-tight" style={{ color: '#c8cc00' }}>
                SECURITIES LIMITED
              </div>
            </div>
          </Link>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Admin Portal
          </div>
        </div>

        {/* User badge */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white leading-tight">Administrator</p>
              <p className="text-[11px] text-white/40 truncate leading-tight mt-0.5">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.18em] px-3 mb-3">
            Navigation
          </p>
          {sidebarLinks.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-white/50 hover:bg-white/10 hover:text-white/90'
                }`}
                style={!isActive ? {} : {}}
              >
                <Icon size={15} className={isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={13} className="text-white/60" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom — view site + logout */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:bg-white/10 hover:text-white/80 transition-all duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Admin</span>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-sm font-semibold text-gray-800">{currentLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Supabase connected
            </div>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium flex items-center gap-1"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3">
          <p className="text-xs text-gray-400 text-center">
            Diamond Global Securities Limited · Admin Portal · CMSA Licensed
          </p>
        </footer>
      </div>
    </div>
  )
}
