import { Handshake } from 'lucide-react'
import { testimonials } from '../data/content'
import { Reveal } from '../hooks/useInView'

/**
 * Testimonials component structure.
 * When `testimonials` in content.js has verified entries, a carousel-style list renders.
 * Until then, a neutral relationships message is shown — no invented quotes.
 */
export default function Testimonials() {
  const hasTestimonials = testimonials.length > 0

  return (
    <section className="section-pad bg-surface" aria-labelledby="proof-title">
      <div className="container-pro">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="eyebrow justify-center">Relationships</p>
          <h2 id="proof-title" className="heading-lg mt-3">
            Built around long-term relationships with talent and retail businesses
          </h2>
          <p className="body-lg mt-4 mx-auto">
            ProStaff partners with retail professionals and brands across permanent, seasonal and
            leadership hiring. Verified client and candidate stories can be featured here as they
            become available.
          </p>
        </Reveal>

        {hasTestimonials ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Reveal key={`${item.name}-${item.company}`} className="card-surface p-6">
                <blockquote className="text-[0.98rem] leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <footer className="mt-5 border-t border-line pt-4">
                  <p className="font-bold text-navy-900">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.role}
                    {item.company ? `, ${item.company}` : ''}
                  </p>
                </footer>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={2} className="mt-10 mx-auto max-w-2xl">
            <div className="rounded-[20px] border border-line bg-white px-6 py-10 text-center shadow-soft">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Handshake className="size-6" aria-hidden />
              </span>
              <p className="mt-4 text-sm font-semibold text-muted leading-relaxed max-w-md mx-auto">
                We prioritise lasting partnerships with retail talent and brands — across permanent,
                seasonal and leadership hiring programmes.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
