import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { comparisonModes, comparisonStages } from '../data/content'
import { easeSmooth } from '../hooks/useMotionSafe'

export default function Comparison() {
  const [mode, setMode] = useState('own')

  return (
    <section
      id="compare"
      className="site-section bg-cream"
      aria-label="Your next hire. Less to manage."
    >
      <div className="site-shell">
        <Reveal className="max-w-3xl">
            <h2 className="font-display text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy">
              Your next hire — with less operational load.
            </h2>
          <p className="mt-4 text-[15px] text-navy/60 md:text-lg">
            Compare how roles get filled — then see how ProStafff connects the workflow.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 md:mt-10">
          <div className="inline-flex flex-wrap gap-2 rounded-full border border-navy/10 bg-white p-1.5">
            {comparisonModes.map((item) => {
              const active = mode === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active ? 'text-cream' : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="compare-pill"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={{ duration: 0.4, ease: easeSmooth }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Desktop table */}
        <Reveal delay={0.12} className="mt-8 hidden overflow-hidden radius-card border border-navy/8 bg-white md:block">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-navy/8 bg-cream/60 px-6 py-4 text-sm font-semibold text-navy/50">
            <span>Stage</span>
            <span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={mode}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {comparisonModes.find((m) => m.id === mode)?.label}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-orange">ProStafff</span>
          </div>
          {comparisonStages.map((stage, i) => (
            <div
              key={stage.id}
              className={`grid grid-cols-[1.1fr_1fr_1fr] gap-4 px-6 py-5 ${
                i !== comparisonStages.length - 1 ? 'border-b border-navy/6' : ''
              }`}
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-navy/40">
                  {stage.id}
                </p>
                <p className="mt-1 font-semibold text-navy">{stage.title}</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mode}-${stage.id}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, ease: easeSmooth }}
                  className="flex items-start gap-2 text-sm text-navy/55"
                >
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-navy/25" />
                  <span>{stage[mode]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-start gap-2 text-sm font-medium text-navy">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>{stage.prostaff}</span>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Mobile cards */}
        <div className="mt-6 space-y-3 md:hidden">
          {comparisonStages.map((stage, i) => (
            <Reveal key={stage.id} delay={i * 0.04} y={30} className="rounded-[24px] border border-navy/8 bg-white p-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-navy/40">
                {stage.id} · {stage.title}
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-cream px-4 py-3">
                  <p className="text-xs font-semibold text-navy/40">
                    {comparisonModes.find((m) => m.id === mode)?.label}
                  </p>
                  <p className="mt-1 text-sm text-navy/65">{stage[mode]}</p>
                </div>
                <div className="rounded-2xl bg-orange/10 px-4 py-3">
                  <p className="text-xs font-semibold text-orange">ProStafff</p>
                  <p className="mt-1 text-sm font-medium text-navy">{stage.prostaff}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
