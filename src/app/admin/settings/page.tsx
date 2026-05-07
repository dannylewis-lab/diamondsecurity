'use client'
import { Mail, Phone, MapPin, ExternalLink, Shield, BarChart2 } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-sm text-gray-400 mb-8">Company configuration and system information</p>

      <div className="space-y-6 max-w-2xl">
        {/* Company Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Company Information</h2>
          <div className="space-y-3">
            {[
              { icon: Shield, label: 'Company', value: 'Diamond Global Securities Limited' },
              { icon: Shield, label: 'Licence', value: 'CMSA Licensed — DSE Dealing Member' },
              { icon: Phone, label: 'Phone', value: '+255 655 952 075' },
              { icon: Mail, label: 'Email', value: 'info@diamondsecurities.co.tz' },
              { icon: MapPin, label: 'Location', value: 'Dar es Salaam, Tanzania' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Data */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Market Data</h2>
            <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
              Mockup — API integration pending
            </span>
          </div>
          <div className="space-y-3">
            {[
              { icon: BarChart2, label: 'Data Source', value: 'DSE Open API (data.dse.co.tz)' },
              { icon: BarChart2, label: 'Refresh Interval', value: '30 seconds (configurable)' },
              { icon: BarChart2, label: 'Historical Data', value: '180-day rolling window' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-gray-900">{value}</p>
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

        {/* Supabase */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Backend — Supabase</h2>
          <div className="space-y-2 text-sm text-gray-600">
            {['News articles & publishing', 'Document storage & downloads', 'Inquiry collection', 'Market reports', 'Admin authentication'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Connected
          </div>
        </div>
      </div>
    </div>
  )
}
