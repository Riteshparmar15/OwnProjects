import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import { faqs } from '../data/content'
import { easeSmooth } from '../hooks/useMotionSafe'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()

  return (
    <section className="site-section bg-cream">
      <div className="site-shell site-shell-narrow">
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(2.3rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy">
            Common questions
            <br />
            <span className="text-orange">Clear answers.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3 md:mt-16">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04} y={30} className="overflow-hidden rounded-[24px] border border-navy/8 bg-white md:rounded-[32px]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-8 md:py-6"
                >
                  <h3 className="pr-4 text-base font-semibold text-navy md:text-xl">
                    {item.q}
                  </h3>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen ? 'bg-orange text-cream' : 'bg-cream text-navy'
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeSmooth }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-[15px] leading-relaxed text-navy/60 md:px-8 md:pb-8 md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
