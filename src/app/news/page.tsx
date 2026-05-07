import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import NewsPageContent from '@/components/NewsPageContent'
import { Newspaper } from 'lucide-react'

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-white border-b border-gray-100 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(52,87,213,0.04) 0%, transparent 65%)', transform: 'translate(20%, -20%)' }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#3457d5] border border-blue-200 mb-6"
              style={{ background: 'rgba(52,87,213,0.06)' }}
            >
              <Newspaper size={11} />
              Market Updates &amp; Insights
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1d1d1d] mb-3 leading-tight">
              News &amp; Insights
            </h1>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Stay informed with the latest market updates, articles, and official notices from Diamond Global Securities.
            </p>
          </div>
        </section>

        <NewsPageContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
