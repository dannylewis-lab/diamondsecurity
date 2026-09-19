import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ServicesPage from '@/components/ServicesPage'

export const metadata: Metadata = {
  title: 'Our Services - Diamond Global Securities',
  description: 'Brokerage, investment advisory, and fund management services from Diamond Global Securities, a CMSA-licensed DSE dealing member.',
}

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ServicesPage />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
