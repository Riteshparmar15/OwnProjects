import { ArrowUpRight } from 'lucide-react'
import { images } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'
import { Reveal } from '../hooks/useInView'

export default function CandidateCTA() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-pro">
        <Reveal className="relative overflow-hidden rounded-[24px] border border-line min-h-[420px]">
          <div className="absolute inset-0">
            <ResponsiveImage
              baseSrc={images.candidate.src}
              alt={images.candidate.alt}
              sizes="100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-navy-950/70" />
          </div>
          <div className="relative z-10 flex min-h-[420px] items-center px-6 py-12 md:px-12 lg:px-16">
            <div className="max-w-xl text-white">
              <p className="eyebrow !text-teal-500">For Candidates</p>
              <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold leading-tight tracking-tight">
                Connecting ambitious retail talent with brands where they can grow.
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-white/75">
                Whether you are building a career on the shop floor, in field management or across
                corporate retail functions, ProStaff helps you connect with brands that match your
                ambition and strengths.
              </p>
              <a href="#contact" className="btn btn-primary mt-8">
                Start Your Retail Career
                <ArrowUpRight className="btn-arrow size-4" aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
