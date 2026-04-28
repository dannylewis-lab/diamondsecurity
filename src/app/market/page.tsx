import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import MarketDashboard from '@/components/MarketDashboard'

export default function MarketPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-gray-50 py-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Market</h1>
            <p className="text-gray-500">Real-time data from the Dar es Salaam Stock Exchange</p>
          </div>
        </div>
        <MarketDashboard />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
