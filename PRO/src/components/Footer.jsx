import { Link } from 'react-router-dom'
import { company, navLinks } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="nav__mark" aria-hidden="true">
              PS
            </div>
            <strong>{company.legalName}</strong>
            <p>
              Retail recruitment specialists connecting high-performing professionals with leading
              brands across in-store, field management, and corporate retail roles.
            </p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/submit-resume">Submit Resume</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <a href={company.linkedinUrl} target="_blank" rel="noreferrer">
                  {company.linkedinLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {company.legalName}. All rights reserved.
          </span>
          <span>{company.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
