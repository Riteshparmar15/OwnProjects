import { Link } from "react-router-dom";
import AnimatedLogo from "./AnimatedLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo-link logo-link--footer">
            <AnimatedLogo variant="full" animated={false} />
          </Link>
          <p>
            Global retail staffing — brand collaborations across India, Dubai
            &amp; the GCC, and international markets. We shape success stories,
            one hire at a time.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/services">Services</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact#talent">Careers / jobs</Link>
        </div>

        <div className="footer-col">
          <h4>Markets</h4>
          <Link to="/about">Pan-India staffing</Link>
          <Link to="/contact">Dubai &amp; GCC</Link>
          <Link to="/services">International search</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} ProStafff Solution Private Limited</span>
        <span>India · Dubai · International · High-value retail talent</span>
      </div>
    </footer>
  );
}
