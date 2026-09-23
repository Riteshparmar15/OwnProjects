import Reveal from './Reveal'
import { aboutPillars } from '../data/content'
import { trustSignals, company } from '../data/company'

export default function About() {
  return (
    <section id="about" className="site-section bg-cream">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-orange uppercase">
              About Us
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              We shape retail success stories, one hire at a time.
            </h2>
            <div className="mt-6 rounded-[28px] border border-navy/8 bg-raised p-6 text-cream md:p-7">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-cream/55 uppercase">
                People who carry the brand
              </p>
              <p className="mt-3 max-w-[18ch] font-display text-2xl font-bold md:text-3xl">
                Talent with flagship presence.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1} y={40}>
              <p className="text-[15px] leading-relaxed text-navy/65 md:text-lg">
                ProStafff Solution Private Limited is a retail-sector staffing partner for
                national chains, luxury houses, and e-commerce operators. We understand that
                a store&apos;s energy, a brand&apos;s service promise, and a network&apos;s
                operational rhythm all depend on the people on the floor — and the leaders
                behind them.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-navy/65 md:text-lg">
                From first-job store associates to corporate merchandisers and field
                directors, we build teams that convert walk-ins into advocates, keep
                fulfilment moving, and protect brand culture at scale.
              </p>
              <p className="mt-4 text-sm font-medium text-navy/50">
                {company.legalName} · {company.registration}
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-6 grid grid-cols-2 gap-3">
              {trustSignals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-navy/8 bg-white px-4 py-3"
                >
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-navy/40 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">{item.value}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {aboutPillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.08}
              className="radius-card border border-navy/8 bg-white p-6 md:p-8"
            >
              <h3 className="text-xl font-bold tracking-tight text-navy">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/60 md:text-[15px]">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
