import { differentiators } from '../data/content'
import { Reveal } from '../hooks/useInView'
import { Check } from 'lucide-react'

export default function Differentiators() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-pro">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Why ProStaff</p>
          <h2 className="heading-lg mt-3">
            Retail recruitment built around the realities of the industry.
          </h2>
          <p className="body-lg mt-4">
            Retail hiring requires more than matching a CV against a job description. We look at how
            people actually perform on the floor, in field leadership and across corporate retail
            functions.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 4) + 1}
              className="group rounded-2xl border border-line bg-white p-5 shadow-soft hover:border-teal-600/30 hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Check className="size-4" strokeWidth={2.5} aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-navy-900 text-[0.98rem]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
