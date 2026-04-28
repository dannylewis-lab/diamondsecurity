import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ServicesPage from '@/components/ServicesPage'

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
