import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import VisualSection from '@/components/VisualSection'
import MarketDashboard from '@/components/MarketDashboard'
import {
  AIInsightsSection,
  NewsSection,
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
        <VisualSection />
        <MarketDashboard />
        <AIInsightsSection />
        <NewsSection />
        <WhatsAppSection />
        <InquirySection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
