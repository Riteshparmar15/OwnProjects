import Reveal from './Reveal'
import ArrowButton from './ArrowButton'
import { opsCapabilities } from '../data/content'

export default function Closing() {
  return (
    <section className="bg-cream py-10 md:py-16">
      <div className="site-shell">
        <Reveal className="radius-hero flex min-h-[300px] flex-col justify-between gap-8 bg-orange p-8 text-cream md:min-h-[360px] md:flex-row md:items-end md:p-12">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase opacity-85">
              For candidates
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              Ready for your next retail role.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {opsCapabilities.slice(0, 6).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cream/20 bg-cream/10 px-3 py-1.5 text-xs font-medium text-cream/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <ArrowButton href="#contact" variant="light" className="shrink-0 self-start md:self-auto">
            Submit Profile
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  )
}
