'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, ExternalLink, Shield, BarChart2, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

type Status = { type: 'success' | 'error'; message: string } | null

export default function SettingsPage() {
  const [current,  setCurrent]  = useState('')
  const [next,     setNext]     = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showCur,  setShowCur]  = useState(false)
  const [showNew,  setShowNew]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [status,   setStatus]   = useState<Status>(null)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (next !== confirm) {
      setStatus({ type: 'error', message: 'New passwords do not match' })
      return
    }
    if (next.length < 8) {
      setStatus({ type: 'error', message: 'New password must be at least 8 characters' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', message: data.error ?? 'Something went wrong' })
      } else {
        setStatus({ type: 'success', message: 'Password changed successfully' })
        setCurrent(''); setNext(''); setConfirm('')
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error — please try again' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1d1d1d] mb-2">Settings</h1>
      <p className="text-sm text-gray-400 mb-8">Company configuration and system information</p>

      <div className="space-y-6 max-w-2xl">

        {/* Company Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-[#1d1d1d] mb-5">Company Information</h2>
          <div className="space-y-3">
            {[
              { icon: Shield,  label: 'Company',  value: 'Diamond Global Securities Limited' },
              { icon: Shield,  label: 'Licence',  value: 'CMSA Licensed - DSE Dealing Member' },
              { icon: Phone,   label: 'Phone',    value: '+255 655 952 075' },
              { icon: Mail,    label: 'Email',    value: 'info@diamondsecurities.co.tz' },
              { icon: MapPin,  label: 'Location', value: 'Dar es Salaam, Tanzania' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-[#fafafa] rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-[#1d1d1d]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Data */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[#1d1d1d]">Market Data</h2>
            <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
              Mockup - API integration pending
            </span>
          </div>
          <div className="space-y-3">
            {[
              { icon: BarChart2, label: 'Data Source',      value: 'DSE Open API (data.dse.co.tz)' },
              { icon: BarChart2, label: 'Refresh Interval', value: '30 seconds (configurable)' },
              { icon: BarChart2, label: 'Historical Data',  value: '180-day rolling window' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-[#fafafa] rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-[#1d1d1d]">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://data.dse.co.tz"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:text-blue-600 transition-colors"
          >
            <ExternalLink size={11} /> DSE API documentation
          </a>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock size={15} className="text-gray-400" />
            <h2 className="font-semibold text-[#1d1d1d]">Change Password</h2>
          </div>

          {status && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-5 ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-100'
                : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {status.type === 'success'
                ? <CheckCircle size={14} className="shrink-0" />
                : <AlertCircle size={14} className="shrink-0" />}
              {status.message}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Current password */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Current Password</label>
              <div className="relative">
                <input
                  type={showCur ? 'text' : 'password'}
                  value={current}
                  onChange={e => setCurrent(e.target.value)}
                  required
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-[#fafafa]"
                />
                <button type="button" onClick={() => setShowCur(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCur ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={next}
                  onChange={e => setNext(e.target.value)}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-[#fafafa]"
                />
                <button type="button" onClick={() => setShowNew(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Confirm new password */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Repeat new password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-[#fafafa]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#3457d5] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Backend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-[#1d1d1d] mb-4">Backend - Self-Managed Stack</h2>
          <div className="space-y-2 text-sm text-gray-600">
            {[
              'MySQL database via Prisma ORM',
              'JWT authentication (HttpOnly cookie, 8h session)',
              'News articles & publishing',
              'Document storage - local disk (/public/uploads/)',
              'Inquiry collection',
              'Market reports',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Active
          </div>
        </div>

      </div>
    </div>
  )
}
