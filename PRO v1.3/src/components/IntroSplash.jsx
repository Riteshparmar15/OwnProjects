import { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { journeySteps } from '../data/content'
import { easeEnter, easeSmooth } from '../hooks/useMotionSafe'

export default function IntroSplash({ onComplete }) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (reduced) {
      setShow(false)
      onComplete?.()
      return undefined
    }

    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setShow(false), 2700),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete, reduced])

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {show && (
        <motion.section
          key="intro"
          className="fixed inset-0 z-[60] flex flex-col bg-navy text-cream grid-bg-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -48 }}
          transition={{ duration: 0.85, ease: easeEnter }}
        >
          <div className="relative flex flex-1 items-center justify-center px-6">
            <div className="pointer-events-none absolute inset-[12%] md:inset-[18%]">
              <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-cream/50 md:h-12 md:w-12" />
              <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-cream/50 md:h-12 md:w-12" />
              <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-cream/50 md:h-12 md:w-12" />
              <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-cream/50 md:h-12 md:w-12" />
            </div>

            <div className="text-center">
              <motion.img
                src="./brand/prostafff-mark-light.svg"
                alt="ProStafff"
                width={72}
                height={72}
                className="mx-auto mb-8 h-14 w-14 md:mb-10 md:h-[72px] md:w-[72px]"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: easeEnter }}
              />
              <motion.div
                className="font-display text-[18vw] font-bold leading-[0.9] tracking-[-0.04em] md:text-[9rem]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeEnter }}
              >
                TALENT<span className="text-orange">.</span>
              </motion.div>
              <motion.div
                className="font-display text-[18vw] font-bold leading-[0.9] tracking-[-0.04em] md:text-[9rem]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 40 }}
                transition={{ duration: 0.9, ease: easeEnter }}
              >
                READY<span className="text-orange">.</span>
              </motion.div>
              <motion.p
                className="mt-6 text-sm font-medium tracking-[0.18em] text-cream/55 uppercase md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 0.6, ease: easeSmooth }}
              >
                From brief, to bench.
              </motion.p>
            </div>
          </div>

          <div className="border-t border-cream/10 px-4 pb-8 pt-5 md:px-10">
            <div className="mx-auto grid max-w-5xl grid-cols-5 gap-2 md:gap-4">
              {journeySteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.6, ease: easeEnter }}
                  className="text-center md:text-left"
                >
                  <div className="mb-2 h-[2px] overflow-hidden rounded-full bg-cream/15">
                    <motion.div
                      className="h-full origin-left bg-orange"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: phase >= 1 ? 1 : 0 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: easeSmooth }}
                    />
                  </div>
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-cream/45 md:text-xs">
                    {step.id} {step.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
