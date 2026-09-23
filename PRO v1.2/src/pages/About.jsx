import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function About() {
  usePageTitle("About");

  return (
    <>
      <header className="page-hero">
        <div className="container reveal">
          <span className="section-label">About ProStafff</span>
          <h1>
            A global retail staffing brand — shaping success stories across
            borders.
          </h1>
          <p>
            ProStafff Solution Private Limited collaborates with every kind of
            retail brand and places high-value talent across India, Dubai &amp;
            the GCC, and international markets — one hire at a time.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container about-story">
          <div className="reveal">
            <h2>Built for brand collaborations that matter.</h2>
            <p>
              Fashion, beauty, lifestyle, luxury, national chains, QSR, malls,
              and e-commerce — each collaboration needs a different culture-fit.
              ProStafff was built inside that reality: a specialized retail-sector
              partner, not a generic agency that treats every mandate the same.
            </p>
            <p>
              We work with HR Directors, Operations Heads, National Chain
              Managers, Luxury Brand Managers, and E-commerce Operators who
              refuse to compromise on brand voice, service instinct, or
              operating discipline — whether the brief is a single store or a
              multi-country rollout.
            </p>
          </div>

          <div className="reveal reveal-delay-1">
            <h2>India. Dubai. International impact.</h2>
            <p>
              Our deep retail network spans in-store, field, and corporate
              talent ready for pan-India mandates and Dubai flagship openings.
              Candidates get placed with collaborating brands that move markets.
              Employers get surge capacity for festive calendars, EOSS coverage,
              and omnichannel peaks — without diluting quality.
            </p>
            <p>
              Every hire is measured against what retail actually demands:
              converting walk-ins into advocates, keeping fulfillment moving,
              and protecting brand culture at scale — from India&apos;s busiest
              floors to Dubai&apos;s most demanding doors.
            </p>
          </div>
        </div>
      </section>

      <section className="section calendar-strip">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Why the retail calendar</span>
            <h2 className="section-title">
              We live the same peaks your stores do — in every market.
            </h2>
            <p className="section-lead">
              Generic agencies optimize for résumés. Retail runs on festive
              windows, EOSS coverage, launch weeks, Dubai tourism peaks, and
              sudden omnichannel spikes. We plan benches the way you plan
              inventory — ahead of the rush.
            </p>
          </div>

          <div className="calendar-points">
            <article className="calendar-point reveal">
              <h3>Festive &amp; EOSS foresight</h3>
              <p>
                Temporary and seasonal benches built for festive &amp; EOSS
                coverage — surge capacity already warm when your doors need it
                most.
              </p>
            </article>

            <article className="calendar-point reveal reveal-delay-1">
              <h3>Dubai &amp; launch rhythm</h3>
              <p>
                New store launches and GCC expansions need launch-week floor
                teams and leaders who understand multi-site P&amp;L. We staff
                openings that must feel premium from day one.
              </p>
            </article>

            <article className="calendar-point reveal reveal-delay-2">
              <h3>Omnichannel without chaos</h3>
              <p>
                Associates and specialists who keep fulfillment moving while
                protecting the brand experience — across India, Dubai, and
                international collaborations.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section approach">
        <div className="container approach-grid">
          <div className="reveal">
            <span className="section-label">Our promise</span>
            <p className="approach-quote">
              Global collaborations. High-value talent. Permanent leadership.
              Surge capacity. Executive search — always culture-first, always
              retail-native.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="section-lead" style={{ marginBottom: "1.5rem" }}>
              Whether you are a luxury brand protecting a service promise, a
              national chain scaling pan-India, an e-commerce operator racing an
              omnichannel peak, or a retailer opening in Dubai — ProStafff is
              built to hire the people who make the story work.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Partner with ProStafff
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
