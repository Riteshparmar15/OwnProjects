import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return { ref, isVisible }
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const { ref, isVisible } = useInView()
  const delayClass =
    delay === 1
      ? 'reveal-delay-1'
      : delay === 2
        ? 'reveal-delay-2'
        : delay === 3
          ? 'reveal-delay-3'
          : delay === 4
            ? 'reveal-delay-4'
            : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${delayClass} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
