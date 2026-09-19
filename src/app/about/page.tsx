import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'About Us - Diamond Global Securities',
  description: 'Learn about Diamond Global Securities, a CMSA-licensed DSE dealing member offering brokerage, investment advisory, and fund management services in Tanzania.',
}

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
