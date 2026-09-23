import { aboutBenefits, images } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'
import { Reveal } from '../hooks/useInView'

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-pro">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <Reveal className="order-2 lg:order-1 relative">
            <div className="rounded-[22px] overflow-hidden border border-line shadow-soft aspect-[5/4]">
              <ResponsiveImage
                baseSrc={images.about.src}
                alt={images.about.alt}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="h-full w-full"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 md:right-6 max-w-[240px] rounded-2xl bg-navy-900 text-white p-4 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-500">
                Specialist partner
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug">
                People on the floor. Leaders behind the brand.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="order-1 lg:order-2">
            <p className="eyebrow">About ProStaff</p>
            <h2 className="heading-lg mt-3 max-w-[18ch]">
              We shape retail success stories, one hire at a time.
            </h2>
            <p className="body-lg mt-4">
              ProStafff Solution Private Limited is a specialist retail staffing partner supporting
              national chains, luxury and lifestyle brands, and e-commerce operators.
            </p>
            <p className="body-lg mt-3">
              Successful retail operations depend on the people representing the brand on the floor
              — as well as the managers, merchandisers and operational teams behind them. We focus
              exclusively on that ecosystem.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {aboutBenefits.map((item, i) => (
            <Reveal key={item.title} delay={i + 1} className="card-surface p-6">
              <span className="text-xs font-extrabold tracking-[0.14em] text-teal-600">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-extrabold text-navy-900 tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
