import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import ArrowButton from './ArrowButton'
import Logo from './Logo'
import LegalModal from './LegalModal'
import { footerGroups } from '../data/content'
import { company } from '../data/company'
import { easeSmooth } from '../hooks/useMotionSafe'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('privacy')
  const reduced = useReducedMotion()

  const openLegal = (tab) => {
    setLegalTab(tab)
    setLegalOpen(true)
  }

  return (
    <footer className="bg-cream pb-8 pt-8 md:pb-10 md:pt-12">
      <LegalModal open={legalOpen} initial={legalTab} onClose={() => setLegalOpen(false)} />
      <div className="site-shell">
      <div className="overflow-hidden radius-hero bg-navy text-cream">
        <div className="grid gap-10 border-b border-cream/10 p-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:p-12 lg:p-14">
          <Reveal y={36}>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-orange-light uppercase">
              Stay in touch
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Stay close to retail opportunities.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/55 md:text-[15px]">
              {company.tagline}. Retail-only staffing for national retailers, luxury brands,
              and e-commerce — permanent, seasonal, and executive search.
            </p>
            <p className="mt-3 text-xs text-cream/40">{company.registration}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-cream/70">
              <a href={company.phoneHref} className="hover:text-cream">
                {company.phoneDisplay}
              </a>
              <span className="text-cream/30">·</span>
              <a href={`mailto:${company.email}`} className="hover:text-cream">
                {company.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={36}>
            {done ? (
              <div className="rounded-[28px] bg-white/5 px-5 py-8 text-center">
                <p className="font-semibold">You&apos;re on the list.</p>
                <p className="mt-2 text-sm text-cream/55">{company.responseSLA}.</p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!email) return
                  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
                    'Newsletter interest',
                  )}&body=${encodeURIComponent(`Please add me to updates.\nEmail: ${email}`)}`
                  setDone(true)
                }}
              >
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="min-h-[52px] flex-1 rounded-full border border-cream/15 bg-white/5 px-5 text-cream outline-none placeholder:text-cream/35 focus:border-orange"
                />
                <ArrowButton type="submit" className="shrink-0">
                  Request update
                </ArrowButton>
              </form>
            )}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href="#contact" className="inline-flex items-center gap-1 text-cream/70 hover:text-cream">
                Submit Profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a href="#roles" className="inline-flex items-center gap-1 text-cream/70 hover:text-cream">
                Retail Roles
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-8 p-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6 md:p-12 lg:px-14">
          {footerGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.06, duration: 0.6, ease: easeSmooth }}
            >
              <h3 className="text-sm font-semibold text-cream">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/55 transition hover:text-cream"
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 px-8 py-6 text-sm text-cream/45 md:flex-row md:items-center md:justify-between md:px-12 lg:px-14">
          <a href="#top" className="inline-flex">
            <Logo theme="light" markClassName="!h-8 !w-8 md:!h-9 md:!w-9" />
          </a>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => openLegal('privacy')}
              className="hover:text-cream"
            >
              Privacy
            </button>
            <button type="button" onClick={() => openLegal('terms')} className="hover:text-cream">
              Terms
            </button>
            <p>© 2026 {company.legalName}. All rights reserved.</p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
