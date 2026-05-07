import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import DownloadSection from '@/components/DownloadSection'

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="pt-20 pb-14 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                Resources
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6">
                <h1 className="font-display text-4xl sm:text-5xl text-[#0a0a0a] leading-[1.1]">
                  Download <span className="italic text-[#3457d5]">Centre</span>
                </h1>
              </div>
              <div className="lg:col-span-6">
                <p className="text-gray-500 text-lg leading-relaxed">
                  Access all necessary forms, reports, and documents to get started
                  with Diamond Global Securities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <DownloadSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
