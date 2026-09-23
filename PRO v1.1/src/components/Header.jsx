import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, site } from '../data/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md border-b border-line shadow-[0_4px_20px_rgba(5,42,56,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`container-pro flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4 md:py-5'
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 no-underline" onClick={close}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white font-extrabold text-sm tracking-tight">
            PS
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-extrabold text-navy-900 text-[1.05rem] tracking-tight">
              {site.brand}
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted hidden sm:block">
              Retail Staffing
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-[0.92rem] font-semibold text-ink/80 hover:text-navy-900 transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn btn-primary !min-h-11 !px-4 !text-sm hidden sm:inline-flex"
          >
            Submit Resume
            <ArrowUpRight className="btn-arrow size-4" aria-hidden />
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-11 rounded-full border border-line bg-white text-navy-900"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="container-pro flex flex-col gap-1 pb-5 pt-1 border-t border-line/70"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-xl px-3 py-3.5 text-base font-semibold text-navy-900 no-underline hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="btn btn-primary mt-2 w-full sm:hidden">
            Submit Resume
            <ArrowUpRight className="btn-arrow size-4" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  )
}
