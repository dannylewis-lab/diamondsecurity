'use client'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function InquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.type) e.type = 'Please select an inquiry type'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async () => {
    setServerError('')
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from('inquiries').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      type: form.type,
      message: form.message.trim(),
      status: 'new',
    })

    if (error) {
      setServerError('Failed to send inquiry. Please try again or contact us directly.')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3457d5]" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">Received</span>
        </div>
        <h3 className="font-display text-3xl text-[#0a0a0a] mb-3">
          Thank you, <span className="italic text-[#3457d5]">{form.name}.</span>
        </h3>
        <p className="text-gray-500 text-[15px] leading-relaxed mb-7">
          We&apos;ll get back to you at <strong className="text-[#0a0a0a]">{form.email}</strong> within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm({ name: '', email: '', phone: '', type: '', message: '' })
          }}
          className="btn-blue inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white"
        >
          Send Another Inquiry <ArrowUpRight size={13} />
        </button>
      </div>
    )
  }

  const fieldCls = (id: keyof typeof form) =>
    `w-full px-4 py-3 bg-white border text-sm text-[#0a0a0a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3457d5]/15 focus:border-[#3457d5] transition-colors rounded-lg ${
      errors[id] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
    }`

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-semibold tracking-wide text-gray-500 uppercase mb-2">
      {children}
    </label>
  )

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label>Full Name</Label>
          <input type="text" placeholder="John Doe" value={form.name}
            onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
            className={fieldCls('name')} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label>Email Address</Label>
          <input type="email" placeholder="john@example.com" value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
            className={fieldCls('email')} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label>Phone Number</Label>
          <input type="tel" placeholder="+255 712 345 678" value={form.phone}
            onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }) }}
            className={fieldCls('phone')} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label>Inquiry Type</Label>
          <select value={form.type}
            onChange={e => { setForm({ ...form, type: e.target.value }); setErrors({ ...errors, type: '' }) }}
            className={fieldCls('type')}>
            <option value="">Select type</option>
            <option>Account Opening</option>
            <option>Investment Advisory</option>
            <option>Brokerage Services</option>
            <option>Fund Management</option>
            <option>General Inquiry</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
        </div>
      </div>

      <div className="mt-5">
        <Label>Message</Label>
        <textarea rows={4} placeholder="Tell us how we can help you…" value={form.message}
          onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }}
          className={`${fieldCls('message')} resize-none`} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {serverError && (
        <div className="mt-4 border border-red-200 bg-red-50 rounded-lg px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-blue mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending…
          </>
        ) : (
          <>Send Inquiry <ArrowUpRight size={14} /></>
        )}
      </button>
    </div>
  )
}
