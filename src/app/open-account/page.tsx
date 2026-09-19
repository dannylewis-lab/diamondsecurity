import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import OpenAccountPage from '@/components/OpenAccountPage'

export const metadata: Metadata = {
  title: 'Open an Account - Diamond Global Securities',
  description: 'Open a CDS trading account with Diamond Global Securities — see the steps, the documents you need, and apply online.',
}

export default function OpenAccount() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <OpenAccountPage />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
