import { motion, useReducedMotion } from 'framer-motion'
import { easeEnter } from '../hooks/useMotionSafe'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 56,
  scale = 0.96,
  as = 'div',
  amount = 0.28,
}) {
  const reduced = useReducedMotion()
  const Comp = motion[as] || motion.div

  if (reduced) {
    return <Comp className={className}>{children}</Comp>
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.95, delay, ease: easeEnter }}
    >
      {children}
    </Comp>
  )
}
