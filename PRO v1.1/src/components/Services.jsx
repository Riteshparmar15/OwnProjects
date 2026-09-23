import { ArrowUpRight } from 'lucide-react'
import { images, services } from '../data/content'
import { ResponsiveImage } from './ResponsiveImage'
import { Reveal } from '../hooks/useInView'

export default function Services() {
  return (
    <section id="services" className="section-pad bg-surface">
      <div className="container-pro">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Our Services</p>
          <h2 className="heading-lg mt-3">Staffing built for how retail actually runs.</h2>
          <p className="body-lg mt-4">
            Permanent, seasonal and leadership hiring — structured around store operations, brand
            experience and growth timelines.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i + 1} className="group h-full">
              <article className="card-surface h-full overflow-hidden flex flex-col">
                <div className="aspect-[16/10] overflow-hidden">
                  <ResponsiveImage
                    baseSrc={images.services[i].src}
                    alt={images.services[i].alt}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold text-navy-900 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{service.text}</p>
                  <ul className="mt-5 space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-ink">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600" />
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 no-underline group-hover:gap-2.5 transition-all"
                  >
                    Talk to ProStaff
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
