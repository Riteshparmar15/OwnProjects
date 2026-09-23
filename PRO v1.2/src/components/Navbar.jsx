import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AnimatedLogo from "./AnimatedLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav container" aria-label="Primary">
          <Link to="/" className="logo-link" onClick={close}>
            <AnimatedLogo variant="full" />
            <span className="logo-sub">Global Retail Staffing</span>
          </Link>

          <div className="nav-links">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          <Link to="/contact" className="btn btn--primary nav-cta">
            Brief a mandate
          </Link>

          <button
            type="button"
            className={`nav-toggle${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} role="dialog">
        <NavLink to="/" end onClick={close}>
          Home
        </NavLink>
        <NavLink to="/services" onClick={close}>
          Services
        </NavLink>
        <NavLink to="/about" onClick={close}>
          About
        </NavLink>
        <NavLink to="/contact" onClick={close}>
          Contact
        </NavLink>
        <Link to="/contact" className="btn btn--primary" onClick={close}>
          Brief a mandate
        </Link>
      </div>
    </>
  );
}
