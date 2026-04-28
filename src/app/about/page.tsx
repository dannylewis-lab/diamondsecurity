import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import AboutPage from '@/components/AboutPage'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <AboutPage />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
