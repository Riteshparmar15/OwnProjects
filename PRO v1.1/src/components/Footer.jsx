import { useEffect, useState } from 'react'
import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, site } from '../data/content'

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.15V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-4V8.5z" />
    </svg>
  )
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="bg-navy-950 text-white pt-14 pb-8">
        <div className="container-pro grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white font-extrabold text-sm">
                PS
              </span>
              <div>
                <p className="font-extrabold text-lg tracking-tight">{site.legalName}</p>
                <p className="text-sm text-teal-500 font-semibold">{site.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">{site.description}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-white/80 no-underline hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Contact</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 no-underline hover:text-white"
                >
                  <Mail className="size-4 text-teal-500" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 no-underline hover:text-white"
                >
                  <LinkedInIcon className="size-4 text-teal-500" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-pro mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © 2026 {site.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/35">Retail Staffing & Recruitment Solutions</p>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full bg-navy-900 text-white shadow-card border border-white/10 transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="size-4" aria-hidden />
      </button>
    </>
  )
}
