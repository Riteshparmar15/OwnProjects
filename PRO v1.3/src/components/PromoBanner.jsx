import ArrowButton from './ArrowButton'
import Reveal from './Reveal'

export default function PromoBanner() {
  return (
    <section className="bg-cream pb-6 md:pb-10">
      <div className="site-shell">
        <Reveal className="relative overflow-hidden radius-hero bg-navy text-cream">
          <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-50" />
          <div className="pointer-events-none absolute -right-10 top-0 h-full w-[55%] bg-[radial-gradient(circle_at_center,rgba(235,94,40,0.22),transparent_65%)]" />

          <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-10 md:p-14 lg:p-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-orange-light uppercase">
                Festive & launch ready
              </p>
              <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.1rem,4.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                Staff your next festive peak or store launch
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/70 md:text-base">
                Imagine the floor ready, brief the roles, and we&apos;ll deliver brand-fit
                talent for EOSS, holiday calendars, and opening-week hypercare.
              </p>
              <div className="mt-8">
              <ArrowButton href="#contact">Contact Us</ArrowButton>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                ['Festive benches', 'Pre-vetted associates'],
                ['Launch leads', 'Opening-week playbooks'],
                ['Luxury floors', 'Service theatre ready'],
                ['Multi-city', 'IN + UAE coverage'],
              ].map(([title, sub]) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-cream/10 bg-white/5 p-4 md:rounded-[28px] md:p-5"
                >
                  <p className="font-semibold text-cream">{title}</p>
                  <p className="mt-1 text-sm text-cream/55">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
