import Seo from '../components/Seo'
import Section from '../components/Section'
import Button from '../components/Button'
import { images, whyProStaff } from '../data/content'
import { IconCheck } from '../components/Icons'

export default function AboutPage() {
  return (
    <div className="page">
      <Seo
        title="About Us"
        description="Learn about ProStafff Solution Private Limited — a retail-sector staffing partner for national retailers, luxury brands, and e-commerce operators."
      />

      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>We shape retail success stories, one hire at a time.</h1>
          <p>
            ProStafff Solution Private Limited is a retail-sector staffing partner for national
            chains, luxury houses, and e-commerce operators.
          </p>
        </div>
      </header>

      <Section>
        <div className="split">
          <div className="split__media">
            <img
              src={images.team}
              alt="Professional discussing retail hiring in a modern workspace"
              width="900"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="prose">
            <p>
              We understand that a store’s energy, a brand’s service promise, and a network’s
              operational rhythm all depend on the people on the floor — and the leaders behind them.
            </p>
            <p>
              From first-job store associates to corporate merchandisers and field directors, we build
              teams that convert walk-ins into advocates, keep fulfilment moving, and protect brand
              culture at scale.
            </p>
            <p>
              Our work spans permanent staffing, temporary and seasonal support, executive search, and
              high-volume retail hiring — always with a specialist retail focus.
            </p>
            <Button to="/contact" variant="secondary">
              Speak with our team
            </Button>
          </div>
        </div>
      </Section>

      <Section
        soft
        eyebrow="What guides us"
        title="Specialists, not generalists."
        lead="We stay close to retail formats, calendars, and operating realities so hiring stays practical and brand-aligned."
      >
        <div className="grid-3">
          {whyProStaff.slice(0, 3).map((item) => (
            <article className="card" key={item.title}>
              <div className="card__icon">
                <IconCheck />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta-band">
          <div>
            <h2>Ready to build a stronger retail team?</h2>
            <p>Tell us about your hiring need or explore current opportunities.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button to="/contact">Contact Us</Button>
            <Button to="/jobs">View Jobs</Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
