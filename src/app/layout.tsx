import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diamond Securities - Licensed DSE Broker',
  description: 'Your trusted partner in navigating the Dar es Salaam Stock Exchange. Professional brokerage services, intelligent insights, and personalized investment solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
