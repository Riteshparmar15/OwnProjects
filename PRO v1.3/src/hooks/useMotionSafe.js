import { useReducedMotion } from 'framer-motion'

export const easeEnter = [0.16, 1, 0.3, 1]
export const easeSmooth = [0.22, 1, 0.36, 1]

export function useMotionSafe() {
  const reduced = useReducedMotion()
  return {
    reduced,
    fadeUp: (delay = 0, y = 48) =>
      reduced
        ? { initial: false, animate: { opacity: 1, y: 0, scale: 1 } }
        : {
            initial: { opacity: 0, y, scale: 0.96 },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 0.9, delay, ease: easeEnter },
          },
    stagger: (i = 0, base = 0.08) => (reduced ? 0 : i * base),
  }
}
