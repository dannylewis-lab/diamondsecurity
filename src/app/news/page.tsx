import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import NewsPageContent from '@/components/NewsPageContent'
import { Newspaper } from 'lucide-react'

const diamonds = [
  { id: 1, size: 'w-3 h-3',     color: 'border-[#00D4FF]/40 border-2',  top: '15%', left: '6%',  delay: '0s',   duration: '7s',  opacity: 0.5 },
  { id: 2, size: 'w-4 h-4',     color: 'border-[#3B82F6]/30 border-2',  top: '55%', left: '80%', delay: '1.5s', duration: '9s',  opacity: 0.4 },
  { id: 3, size: 'w-2 h-2',     color: 'bg-[#00D4FF]/50',               top: '75%', left: '20%', delay: '2s',   duration: '8s',  opacity: 0.6 },
  { id: 4, size: 'w-2.5 h-2.5', color: 'bg-[#3B82F6]/40',              top: '30%', left: '60%', delay: '1s',   duration: '6s',  opacity: 0.5 },
]

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #020B2D 0%, #041444 50%, #020B2D 100%)' }}
        >
          <div className="hero-grid-bg absolute inset-0 opacity-30" />

          {/* Glow orbs */}
          <div
            className="glow-orb glow-orb-1 absolute"
            style={{ width: '400px', height: '400px', top: '-30%', right: '5%' }}
          />
          <div
            className="glow-orb glow-orb-2 absolute"
            style={{ width: '250px', height: '250px', bottom: '-10%', left: '-3%' }}
          />

          {/* Floating diamonds */}
          {diamonds.map((d) => (
            <div
              key={d.id}
              className={`floating-diamond absolute ${d.size} ${d.color}`}
              style={{
                top: d.top, left: d.left,
                animationDelay: d.delay, animationDuration: d.duration,
                opacity: d.opacity,
              }}
            />
          ))}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-semibold tracking-widest uppercase mb-6">
              <Newspaper size={12} />
              Market Updates &amp; Insights
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
              News &amp; <span className="text-gradient-blue">Insights</span>
            </h1>
            <p className="text-blue-200/80 text-lg max-w-xl leading-relaxed">
              Stay informed with the latest market updates, articles, and official notices from Diamond Global Securities.
            </p>
          </div>
        </section>

        <NewsPageContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
