import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { journeySteps, promptExamples, snapshotRows } from '../data/content'
import ArrowButton from './ArrowButton'
import Reveal from './Reveal'
import { easeEnter, easeSmooth } from '../hooks/useMotionSafe'

export default function Hero() {
  const reduced = useReducedMotion()
  const [exampleIndex, setExampleIndex] = useState(0)

  useEffect(() => {
    if (reduced) return undefined
    const id = setInterval(() => {
      setExampleIndex((i) => (i + 1) % promptExamples.length)
    }, 3800)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-28 md:pt-36"
      aria-label="From brief to brand-ready talent"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <div className="site-shell relative">
        <Reveal y={30} scale={1} className="mb-10 hidden md:block">
          <div className="grid grid-cols-5 gap-4">
            {journeySteps.map((step) => (
              <div key={step.id} className="border-t border-navy/20 pt-3">
                <p className="text-xs font-semibold tracking-[0.08em] text-ink">
                  {step.id} {step.label}
                </p>
                <p className="mt-1 text-xs text-navy/60">{step.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <Reveal y={40}>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-navy/65 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Connecting Talent with Opportunity
              </p>
            </Reveal>

            <Reveal delay={0.08} y={50}>
              <h1 className="max-w-[14ch] font-display text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
                From brief,{' '}
                <span className="text-orange">to bench.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16} y={36} scale={1}>
              <p className="mt-5 max-w-xl text-lg font-semibold text-ink md:text-xl">
                Empowering Leading Retail Brands with Top-Tier Talent.
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-navy/70 md:text-base">
                We connect high-performing retail talent with leading brands to drive
                customer satisfaction, sales growth, and operational excellence.
              </p>
            </Reveal>

            <Reveal delay={0.24} y={28} scale={1} className="mt-8 flex flex-wrap gap-3">
              <ArrowButton href="#contact">Submit Profile</ArrowButton>
              <ArrowButton href="#roles" variant="outline">
                View Retail Roles
              </ArrowButton>
            </Reveal>
          </div>

          <Reveal delay={0.18} y={60} className="relative">
            <div className="radius-hero border border-navy/8 bg-raised p-5 text-cream shadow-[0_30px_80px_rgba(37,36,34,0.18)] md:p-7">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-cream/45 uppercase">
                Retail staffing snapshot
              </p>
              <div className="mt-5 space-y-3">
                {snapshotRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-full bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm text-cream/65">{row.label}</span>
                    <span className="text-sm font-semibold text-cream">{row.status}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-cream/55">
                From store associates to corporate leadership, we staff the full retail
                ecosystem — permanently, seasonally, and at executive level.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={48} className="mt-14 md:mt-20">
          <div className="radius-hero border border-navy/8 bg-white p-5 shadow-[0_20px_60px_rgba(37,36,34,0.06)] md:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">Looking for a retail role?</p>
                <p className="mt-1 text-sm text-navy/65">
                  Tell us the city, role, and experience — we&apos;ll take it from there.
                </p>
              </div>
              <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                Open intake
              </span>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex min-h-[56px] flex-1 items-center rounded-full bg-cream px-5 py-3.5 text-[15px] text-ink md:min-h-[60px] md:text-base">
                <motion.span
                  key={exampleIndex}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: easeSmooth }}
                  className="line-clamp-2"
                >
                  {promptExamples[exampleIndex]}
                </motion.span>
              </div>
              <ArrowButton href="#contact" className="shrink-0 self-stretch md:self-auto">
                Submit Profile
              </ArrowButton>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {['Permanent', 'Seasonal', 'Executive'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-navy/10 px-3 py-1 text-xs font-medium text-navy/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal y={30} scale={1} className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {[
            ['100% Retail Focused', 'Specialists, not generalists'],
            ['High-Volume Seasonal Support', 'Festive peaks & store launches'],
            ['Vetted Talent', 'Culture-fit, brand-ready people'],
          ].map(([title, sub], i) => (
            <motion.div
              key={title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: easeEnter }}
              className="rounded-[24px] border border-navy/8 bg-white/70 px-5 py-5 md:rounded-[32px]"
            >
              <p className="font-semibold text-navy">{title}</p>
              <p className="mt-1 text-sm text-navy/55">{sub}</p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
