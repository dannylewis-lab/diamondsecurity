import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import MarketDashboard from '@/components/MarketDashboard'
import {
  AIInsightsSection,
  NewsSection,
  DownloadSection,
  WhatsAppSection,
  InquirySection,
} from '@/components/Sections'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <MarketDashboard />
        <AIInsightsSection />
        <NewsSection />
        <DownloadSection />
        <WhatsAppSection />
        <InquirySection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
