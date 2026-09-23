import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import ArrowButton from './ArrowButton'
import { metrics, opsHighlights } from '../data/content'
import { easeEnter } from '../hooks/useMotionSafe'

export default function OpsSection() {
  return (
    <section className="bg-cream py-8 md:py-12">
      <div className="site-shell">
      <div className="overflow-hidden radius-hero bg-navy text-cream">
        <div className="relative grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:p-14 lg:p-16">
          <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" />
          <Reveal className="relative">
            <h2 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Retail staffing operations, without the overhead.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/60 md:text-base">
              Free your HR and store teams. Partner with a retail-only hiring desk for
              permanent, seasonal, and executive search — with clear account ownership.
            </p>
            <ul className="mt-8 space-y-4">
              {opsHighlights.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: easeEnter }}
                  className="flex items-start gap-3 border-b border-cream/10 pb-4"
                >
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange text-xs font-bold text-cream">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-cream">{item.title}</p>
                    <p className="text-sm text-cream/50">{item.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowButton href="#contact">Contact Us</ArrowButton>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="rounded-[32px] border border-cream/10 bg-raised p-6 md:rounded-[40px] md:p-8">
              <h3 className="text-lg font-semibold text-cream md:text-xl">How we are structured</h3>
              <p className="mt-2 text-sm text-cream/50">
                Facts about our operating model — not unverified placement counts.
              </p>
              <div className="mt-8 space-y-8">
                {metrics.map((metric) => (
                  <div key={metric.label} className="border-t border-cream/10 pt-5">
                    <p className="font-display text-4xl font-bold tracking-tight text-orange md:text-5xl">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-cream">{metric.label}</p>
                    <p className="mt-1 text-sm text-cream/50">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      </div>
    </section>
  )
}
