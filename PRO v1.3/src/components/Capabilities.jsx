import Reveal from './Reveal'
import { services, capabilityCards } from '../data/content'
import ArrowButton from './ArrowButton'

export default function Capabilities() {
  const large = capabilityCards.filter((c) => c.size === 'lg')
  const small = capabilityCards.filter((c) => c.size === 'sm')

  return (
    <section id="services" className="site-section bg-cream">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy">
            Built for how retail hiring actually runs.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy/60 md:text-lg">
            Staffing built for how retail actually runs — permanent leadership, surge
            capacity, and executive search delivered by a team that lives the retail
            calendar.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {large.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 0.08}
              className="radius-card relative overflow-hidden border border-navy/8 bg-white p-7 md:min-h-[280px] md:p-10"
            >
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-orange-pale/50" />
              <h3 className="relative max-w-[16ch] font-display text-[clamp(1.6rem,2.6vw,2.35rem)] font-bold leading-[1.08] tracking-tight text-navy">
                {card.title}
              </h3>
              <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-navy/60">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-5 md:gap-5">
          {small.map((card, i) => (
            <Reveal
              key={card.title}
              delay={(i % 3) * 0.06}
              y={40}
              className="radius-card border border-navy/8 bg-white p-6 md:p-7"
            >
              <div className="mb-4 h-10 w-10 rounded-2xl bg-blue-pale/70" />
              <h3 className="text-lg font-bold text-navy">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/55">{card.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.08}
              className={`radius-card border border-navy/8 bg-raised p-7 text-cream md:p-8 ${
                service.accent === 'wide' ? 'md:col-span-1' : ''
              }`}
            >
              <h3 className="text-xl font-bold tracking-tight md:text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60 md:text-[15px]">
                {service.body}
              </p>
              <ul className="mt-5 space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-cream/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center md:mt-14">
          <ArrowButton href="#contact">Submit Profile</ArrowButton>
        </Reveal>
      </div>
    </section>
  )
}
