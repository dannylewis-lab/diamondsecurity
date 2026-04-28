import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import NewsPageContent from '@/components/NewsPageContent'

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div
          className="py-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a2744 100%)' }}
        >
          <div className="hero-dots absolute inset-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl font-bold text-white mb-2">News & Insights</h1>
            <p className="text-blue-200">Stay informed with the latest market updates, articles, and official notices</p>
          </div>
        </div>
        <NewsPageContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
