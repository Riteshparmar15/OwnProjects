import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const services = [
  {
    id: "permanent",
    tag: "Tier 01",
    title: "Permanent staffing",
    intro:
      "Long-term leadership and corporate retail executive roles. We hire store managers, category specialists, and HQ talent who stay, grow, and raise the bar — people who strengthen culture instead of just filling a roster.",
    benefits: [
      {
        title: "Store & cluster leadership",
        body: "From single-unit store managers to cluster leads who keep multiple sites in rhythm — we place leaders who own floor standards, coaching, and conversion, not just opening and closing.",
      },
      {
        title: "Buying, merchandising, HR & ops",
        body: "Corporate retail talent who understand seasonality, sell-through, and store realities. Merchandisers who think like the floor. Ops and HR partners who design processes that survive a Saturday rush.",
      },
      {
        title: "Brand-aligned retained search",
        body: "When the role defines the brand experience, we run retained search with culture-fit alignment at the center — screening for brand voice, service instinct, and operating discipline before anyone reaches your shortlist.",
      },
    ],
  },
  {
    id: "temporary",
    tag: "Tier 02",
    title: "Temporary & seasonal staffing",
    intro:
      "Rapid deployment for festive peaks, sale events, and new store launches. Flexible benches of trained associates who can start fast and represent the brand well — surge capacity without diluting quality.",
    benefits: [
      {
        title: "Festive & EOSS coverage",
        body: "Diwali rushes, year-end clearances, and End of Season Sale chaos demand people who can learn the floor fast. We pre-stage trained associates so your festive calendar and EOSS coverage never feel improvised.",
      },
      {
        title: "Launch-week floor teams",
        body: "New store openings live or die in the first fortnight. We deploy launch-week floor teams who understand planograms, POS flow, and brand hospitality — so opening energy becomes lasting advocacy.",
      },
      {
        title: "Short-term specialist cover",
        body: "Maternity cover, project merchandising, visual resets, or omnichannel peaks — we place short-term specialists who keep fulfillment moving and protect the customer journey while your permanent bench is stretched.",
      },
    ],
  },
  {
    id: "executive",
    tag: "Tier 03",
    title: "Executive search & field management",
    intro:
      "Confidential search for area managers, store directors, and corporate specialists who can run multi-site P&L and complex omnichannel operations — leaders who protect brand culture across a network, not just a single door.",
    benefits: [
      {
        title: "Area & district managers",
        body: "Field leaders who balance people, product, and profit across territories. We map candidates who have already run high-velocity retail networks and know how to coach stores through peak and trough.",
      },
      {
        title: "Store directors & RM roles",
        body: "Flagship and regional managers who set the standard for luxury houses and national chains alike — confidential placements where discretion, culture-fit, and commercial instinct all have to land.",
      },
      {
        title: "Corporate retail specialists",
        body: "HQ talent for buying, planning, digital commerce, and retail HR who understand pan-India mandates, Dubai market standards, and omnichannel reality. Specialists who close the gap between boardroom strategy and floor execution.",
      },
    ],
  },
];

export default function Services() {
  usePageTitle("Services");

  return (
    <>
      <header className="page-hero">
        <div className="container reveal">
          <span className="section-label">Services</span>
          <h1>Staffing built for how retail actually runs — worldwide.</h1>
          <p>
            Permanent leadership, surge capacity, and executive search —
            delivered for brand collaborations across India, Dubai &amp; the
            GCC, and international retail.
          </p>
        </div>
      </header>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`service-block${index % 2 === 1 ? " service-block--alt" : ""}`}
          aria-labelledby={`${service.id}-title`}
        >
          <div className="container service-block__inner">
            <div className="service-block__meta reveal">
              <span className="tag">{service.tag}</span>
              <h2 id={`${service.id}-title`}>{service.title}</h2>
              <p>{service.intro}</p>
            </div>
            <div className="benefit-list reveal reveal-delay-1">
              {service.benefits.map((item) => (
                <article key={item.title} className="benefit-item">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="close-cta">
        <div className="container reveal">
          <span className="section-label">Next step</span>
          <h2 className="section-title">
            Tell us the mandate. We&apos;ll map the global bench.
          </h2>
          <p className="section-lead">
            Single-store, pan-India, Dubai flagship, or international executive
            search — start with our retail desk.
          </p>
          <div className="cta-group">
            <Link to="/contact" className="btn btn--primary">
              Start a staffing brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
