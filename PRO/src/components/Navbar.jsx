import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { company, navLinks } from '../data/content'
import Button from './Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
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
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container container--wide nav__inner">
        <Link to="/" className="nav__brand" onClick={close} aria-label={`${company.legalName} home`}>
          <span className="nav__mark" aria-hidden="true">
            PS
          </span>
          <span className="nav__brand-text">
            ProStafff
            <small>Solution Pvt. Ltd.</small>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <Button to="/submit-resume" className="nav__cta-desktop">
            Submit Resume
          </Button>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`nav__mobile${open ? ' is-open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={close}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
        <Button to="/submit-resume" onClick={close} className="nav__cta-mobile">
          Submit Resume
        </Button>
      </div>
    </header>
  )
}
