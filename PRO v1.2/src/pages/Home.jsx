import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import AnimatedLogo from "../components/AnimatedLogo";
import BrandLogoWall from "../components/BrandLogoWall";
import GlobalShowcase from "../components/GlobalShowcase";
import ImpactStrip from "../components/ImpactStrip";
import { HERO_PHOTO, COLLAB_PHOTOS } from "../data/brands";

export default function Home() {
  usePageTitle("");

  return (
    <>
      <section className="hero hero--immersive" aria-label="Hero">
        <div
          className="hero-media"
          style={{ backgroundImage: `url(${HERO_PHOTO})` }}
          aria-hidden="true"
        />
        <div className="hero-media-overlay" aria-hidden="true" />
        <div className="hero-orb hero-orb--1" aria-hidden="true" />
        <div className="hero-orb hero-orb--2" aria-hidden="true" />
        <div className="hero-grid-3d" aria-hidden="true" />

        <div className="container hero-inner hero-inner--depth">
          <p className="hero-kicker">
            Global retail staffing · India · Dubai · International
          </p>
          <div className="hero-logo-wrap">
            <AnimatedLogo variant="full" className="hero-anim-logo" />
          </div>
          <p className="hero-headline">
            We shape retail success stories — across brands, borders, and
            careers.
          </p>
          <p className="hero-sub">
            High-value staffing for the world&apos;s leading retail brands —
            from Rolex and H&amp;M to India&apos;s national chains and Dubai&apos;s
            luxury flagships. Talent that converts walk-ins into advocates and
            protects brand culture at scale.
          </p>
          <div className="cta-group">
            <Link to="/contact" className="btn btn--primary btn--glow">
              Partner with ProStafff
            </Link>
            <Link to="/contact#talent" className="btn btn--ghost">
              Explore global opportunities
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Global reach">
        <div className="container trust-strip__inner">
          <p className="trust-strip__label">Global footprint</p>
          <ul className="trust-strip__list">
            <li>Pan-India</li>
            <li>Dubai &amp; GCC</li>
            <li>International retail</li>
            <li>Cross-border careers</li>
          </ul>
        </div>
      </section>

      <BrandLogoWall />

      <GlobalShowcase />

      <ImpactStrip />

      <section className="section approach" id="approach">
        <div className="container approach-grid">
          <div className="reveal">
            <span className="section-label">Global brand collaborations</span>
            <p className="approach-quote">
              We collaborate with every kind of retail brand — fashion, beauty,
              lifestyle, luxury, QSR, malls, and digital-first commerce — so
              talent and employers meet at the highest standard.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <h2 className="section-title">
              High-value hiring for brands that compete worldwide.
            </h2>
            <p className="section-lead">
              ProStafff Solution Private Limited is built for impact: culture-fit
              alignment, surge capacity for omnichannel peaks, and executive
              search that travels from India to Dubai and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="section collab-section" id="collaborations">
        <div className="container">
          <div className="reveal section-head-center">
            <span className="section-label">Brand collaborations</span>
            <h2 className="section-title section-title--wide">
              Partnered across every retail vertical that moves markets.
            </h2>
            <p className="section-lead section-lead--center">
              From first-job store associates to field directors — we staff
              collaborations that protect brand voice and operating discipline.
            </p>
          </div>

          <div className="collab-grid">
            {COLLAB_PHOTOS.map((item, i) => (
              <article
                key={item.title}
                className={`collab-card collab-card--visual reveal reveal-delay-${i % 3}`}
              >
                <div
                  className="collab-card__bg"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="collab-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="why-us">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Why ProStafff</span>
            <h2 className="section-title">
              Built for how retail actually runs — globally.
            </h2>
            <p className="section-lead">
              Generic agencies fill seats. We fill floors, field networks, and
              international benches with people who already understand the
              brand, the calendar, and the market.
            </p>
          </div>

          <div className="why-grid">
            <article className="why-item reveal">
              <p className="why-num">01 — Network</p>
              <h3>Deep retail network</h3>
              <p>
                Pre-mapped talent across in-store, field, and corporate retail —
                ready for single-store, pan-India, Dubai, and international
                mandates.
              </p>
            </article>
            <article className="why-item reveal reveal-delay-1">
              <p className="why-num">02 — Culture-fit</p>
              <h3>Culture-fit alignment</h3>
              <p>
                We screen for brand voice, service instinct, and operating
                discipline so new hires feel like they already belong.
              </p>
            </article>
            <article className="why-item reveal reveal-delay-2">
              <p className="why-num">03 — Scaling</p>
              <h3>High-volume scaling</h3>
              <p>
                Rapid deployment for festive calendars, new store launches, and
                omnichannel peaks — surge capacity without diluting quality.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section careers-band" id="careers">
        <div className="container careers-band__grid">
          <div className="reveal">
            <span className="section-label">Careers through ProStafff</span>
            <h2 className="section-title section-title--wide">
              Get placed with high-value brands — including Dubai.
            </h2>
            <p className="section-lead">
              Permanent leadership, seasonal surge teams, and executive
              opportunities with collaborating brands across India, Dubai &amp;
              the GCC, and international retail.
            </p>
            <div className="cta-group">
              <Link to="/contact#talent" className="btn btn--primary">
                Apply for opportunities
              </Link>
              <Link to="/services" className="btn btn--outline">
                See roles we staff
              </Link>
            </div>
          </div>
          <ul className="career-points reveal reveal-delay-1">
            <li>
              <strong>India</strong> — Store, cluster, HQ &amp; field roles
              nationwide
            </li>
            <li>
              <strong>Dubai &amp; GCC</strong> — Flagship, mall &amp; luxury
              retail careers
            </li>
            <li>
              <strong>International</strong> — Cross-border mandates with global
              brands
            </li>
            <li>
              <strong>Every collaboration</strong> — Fashion, beauty, lifestyle,
              QSR, e-com &amp; more
            </li>
          </ul>
        </div>
      </section>

      <section className="section services-teaser" id="services-preview">
        <div className="container">
          <div className="services-head reveal">
            <div>
              <span className="section-label">Our services</span>
              <h2 className="section-title">
                Permanent leadership, surge capacity, and executive search.
              </h2>
            </div>
            <p className="section-lead">
              Delivered for collaborating brands — from festive EOSS coverage to
              confidential international leadership searches.
            </p>
          </div>

          <div className="service-grid">
            <article className="service-tile reveal">
              <h3>Permanent staffing</h3>
              <p>
                Long-term leadership and corporate retail roles who stay, grow,
                and raise the bar across markets.
              </p>
              <Link to="/services#permanent" className="tile-link">
                View permanent hiring →
              </Link>
            </article>
            <article className="service-tile reveal reveal-delay-1">
              <h3>Temporary &amp; seasonal</h3>
              <p>
                Rapid deployment for festive peaks and Dubai opening weeks —
                surge capacity without diluting quality.
              </p>
              <Link to="/services#temporary" className="tile-link">
                View surge &amp; seasonal →
              </Link>
            </article>
            <article className="service-tile reveal reveal-delay-2">
              <h3>Executive search &amp; field</h3>
              <p>
                Confidential search for leaders who run multi-site P&amp;L —
                India to Dubai and beyond.
              </p>
              <Link to="/services#executive" className="tile-link">
                View executive search →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="close-cta close-cta--visual">
        <div
          className="close-cta__bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80)",
          }}
          aria-hidden="true"
        />
        <div className="container reveal">
          <span className="section-label section-label--on-dark">
            Global impact starts here
          </span>
          <h2 className="section-title">
            Brief a brand mandate — or launch your next career.
          </h2>
          <p className="section-lead">
            Employers: scale India, Dubai, or international retail. Candidates:
            get placed with high-value collaborating brands.
          </p>
          <div className="cta-group">
            <Link to="/contact" className="btn btn--primary btn--glow">
              Brief a staffing mandate
            </Link>
            <Link to="/contact#talent" className="btn btn--ghost">
              Submit your profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
