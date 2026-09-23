import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { easeSmooth } from '../hooks/useMotionSafe'

const variants = {
  primary:
    'bg-orange text-cream hover:bg-orange-hi shadow-[0_10px_30px_rgba(235,94,40,0.28)]',
  ghost:
    'bg-transparent text-cream border border-cream/35 hover:border-cream/70',
  dark: 'bg-navy text-cream hover:bg-raised',
  light: 'bg-cream text-navy border border-navy/10 hover:bg-white',
  outline:
    'bg-white text-navy border border-navy/15 hover:border-navy/40',
}

export default function ArrowButton({
  children,
  href = '#contact',
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  showArrow = true,
}) {
  const reduced = useReducedMotion()
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 md:px-6 md:py-3.5 text-sm md:text-[15px] font-semibold transition-colors ${variants[variant]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <motion.span
          aria-hidden
          className="inline-flex"
          whileHover={reduced ? undefined : { x: 2, y: -2 }}
          transition={{ duration: 0.35, ease: easeSmooth }}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
        </motion.span>
      )}
    </>
  )

  const motionProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.35, ease: easeSmooth },
      }

  if (type === 'submit' || onClick) {
    return (
      <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
        {content}
      </motion.button>
    )
  }

  return (
    <motion.a href={href} className={classes} {...motionProps}>
      {content}
    </motion.a>
  )
}
