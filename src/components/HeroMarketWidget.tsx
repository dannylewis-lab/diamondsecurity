import { ArrowUpRight, ShieldCheck } from 'lucide-react'

export function HeroMarketWidget() {
  return (
    <a
      href="https://dse.co.tz/"
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1" style={{ background: '#3457d5' }} />

        <div className="p-8 lg:p-10 flex flex-col items-center text-center">

          {/* Logos: CMSA + DSE */}
          <div className="flex items-end gap-4 mb-7">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '88px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/cmsa-logo.jpg" alt="CMSA Tanzania" className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Regulator</span>
            </div>
            <div className="w-px h-12 bg-gray-200 mb-5" />
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm" style={{ width: '88px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/dse-logo.png" alt="Dar es Salaam Stock Exchange" className="max-h-full max-w-full object-contain scale-[0.85]" />
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Exchange</span>
            </div>
          </div>

          <p className="text-[#1d1d1d] font-bold text-lg tracking-tight mb-1">
            Dar es Salaam Stock Exchange
          </p>
          <p className="text-gray-400 text-sm mb-8">Official Market Authority — Tanzania</p>

          {/* CTA */}
          <div
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-opacity duration-200 group-hover:opacity-90"
            style={{ background: '#3457d5' }}
          >
            Visit DSE Website
            <ArrowUpRight size={15} />
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <ShieldCheck size={12} className="text-gray-300" />
            <p className="text-[11px] text-gray-400 font-medium">
              Diamond Global Securities · Licensed DSE Dealing Member
            </p>
          </div>

        </div>
      </div>
    </a>
  )
}
