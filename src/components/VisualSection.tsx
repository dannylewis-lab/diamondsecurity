import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const panels = [
  {
    src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop',
    alt: 'Live trading screens showing DSE market data',
    label: 'Brokerage & Dealing',
    caption: 'Real-time execution on the Dar es Salaam Stock Exchange.',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    alt: 'Financial advisor reviewing investment strategy with client',
    label: 'Investment Advisory',
    caption: 'Tailored strategies built around your financial goals.',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    alt: 'Portfolio risk analysis and performance charts',
    label: 'Fund Management',
    caption: 'Disciplined risk management and long-term value creation.',
    tall: false,
  },
]

export default function VisualSection() {
  return (
    <section className="py-24 bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#3457d5]" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3457d5]">
                Our Practice
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#0a0a0a]">
              Three services.<br />
              <span className="italic text-[#3457d5]">One trusted firm.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3457d5] hover:gap-3 transition-all"
          >
            Explore services <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Left — large tall panel */}
          <div className="lg:col-span-7 group">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: '520px' }}>
              <Image
                src={panels[0].src}
                alt={panels[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020B2D]/80 via-transparent to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-blue-300 block mb-1">
                  {panels[0].label}
                </span>
                <p className="text-white font-display text-xl leading-snug">
                  {panels[0].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Right — two stacked panels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {panels.slice(1).map((p) => (
              <div key={p.label} className="group relative overflow-hidden rounded-2xl flex-1" style={{ minHeight: '248px' }}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B2D]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-blue-300 block mb-1">
                    {p.label}
                  </span>
                  <p className="text-white font-display text-base leading-snug">
                    {p.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
