import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { AlertTriangle } from 'lucide-react'

export default function LegalPage({
  title, updated, children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="pt-20 pb-16 bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">Legal</span>
            </div>
            <h1 className="font-display text-4xl text-[#0a0a0a] leading-[1.1] mb-3">{title}</h1>
            <p className="text-sm text-gray-400">Last updated: {updated}</p>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                This page is a general draft pending review by Diamond Global Securities&apos; management
                and legal counsel. If you have questions before it is finalised, contact{' '}
                <a href="mailto:info@diamondsecurities.co.tz" className="underline">info@diamondsecurities.co.tz</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-legal">
            {children}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
