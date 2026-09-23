import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { images } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'
import { Reveal } from '../hooks/useInView'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-surface via-white to-white pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-teal-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-surface-2 blur-3xl" />

      <div className="container-pro grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 pb-10 md:pb-14">
        <Reveal>
          <p className="eyebrow mb-4">
            <span className="inline-block size-1.5 rounded-full bg-teal-600" />
            Connecting Talent with Opportunity
          </p>
          <h1 className="heading-xl max-w-[18ch]">
            Empowering Leading Retail Brands with Top-Tier Talent.
          </h1>
          <p className="body-lg mt-5 max-w-[42ch]">
            ProStaff connects high-performing retail professionals with ambitious brands, helping
            build teams that strengthen customer experience, sales performance and operational
            excellence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="btn btn-primary">
              Submit Your Resume
              <ArrowUpRight className="btn-arrow size-4" aria-hidden />
            </a>
            <a href="#services" className="btn btn-secondary">
              Explore Our Expertise
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal delay={2} className="relative">
          <div className="relative rounded-[22px] overflow-hidden border border-line shadow-card aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <ResponsiveImage
              baseSrc={images.hero.src}
              alt={images.hero.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 backdrop-blur-sm p-4 border border-white/60 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-teal-600">
                Retail specialist partner
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-900 leading-snug">
                National chains · Luxury & lifestyle · E-commerce operators
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
