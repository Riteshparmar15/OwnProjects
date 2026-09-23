import Seo from '../components/Seo'
import Section from '../components/Section'
import Button from '../components/Button'
import FaqList from '../components/FaqList'
import {
  IconCheck,
  IconClock,
  IconLayers,
  IconSearch,
  IconUsers,
} from '../components/Icons'
import {
  faqs,
  images,
  processSteps,
  retailSegments,
  roleCategories,
  services,
  whyProStaff,
} from '../data/content'

const serviceIcons = [IconUsers, IconClock, IconSearch, IconLayers]

export default function HomePage() {
  return (
    <div className="page">
      <Seo
        title="Retail Recruitment Specialists"
        description="ProStafff Solution Private Limited connects high-performing retail professionals with leading brands across India."
      />

      <section className="hero" aria-labelledby="hero-heading">
        <div className="container container--wide hero__grid">
          <div className="hero__content">
            <span className="eyebrow">Retail Recruitment Specialists</span>
            <h1 id="hero-heading">Empowering Leading Retail Brands with Top-Tier Talent.</h1>
            <p className="hero__text">
              ProStaff connects high-performing retail professionals with leading brands — from store
              teams and field leaders to corporate retail talent.
            </p>
            <div className="hero__actions">
              <Button to="/jobs">Explore Opportunities</Button>
              <Button to="/services" variant="secondary">
                Our Services
              </Button>
            </div>
          </div>
          <div className="hero__media" aria-hidden="true">
            <img
              src={images.hero}
              alt=""
              width="1200"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <Section
        eyebrow="About ProStaff"
        title="A specialist retail recruitment partner."
        lead="We work with national retailers, luxury and lifestyle brands, e-commerce operators, and modern retail businesses to build teams that perform on the floor and behind the brand."
      >
        <div className="split">
          <div className="split__media">
            <img
              src={images.about}
              alt="Retail associate assisting a customer in a modern store"
              width="900"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              ProStafff Solution Private Limited is focused on how retail actually runs — store
              energy, brand service standards, and the operational rhythm of multi-site networks.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              From first-job associates to corporate merchandisers and field directors, we help brands
              hire people who convert, lead, and protect culture at scale.
            </p>
            <Button to="/about" variant="secondary">
              Learn more about us
            </Button>
          </div>
        </div>
      </Section>

      <Section
        soft
        eyebrow="Services"
        title="Staffing built for how retail runs."
        lead="Permanent leadership, seasonal capacity, executive search, and high-volume hiring — delivered with a retail-first lens."
        action={
          <Button to="/services" variant="ghost">
            View all services →
          </Button>
        }
      >
        <div className="grid-2 grid-2--services">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] || IconLayers
            return (
              <article className="card" key={service.id}>
                <div className="card__icon">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            )
          })}
        </div>
      </Section>

      <Section
        eyebrow="Why ProStaff"
        title="Retail focus. Quality screening. Scalable delivery."
        lead="We stay specialised — so brands get candidates who understand service, pace, and operating discipline."
      >
        <div className="grid-4">
          {whyProStaff.map((item) => (
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

      <Section
        soft
        eyebrow="Retail Roles"
        title="The full retail ecosystem, covered."
        lead="Whether you need floor energy, multi-store leadership, or HQ commercial talent, we recruit across the complete retail stack."
        action={
          <Button to="/retail-roles" variant="ghost">
            Explore roles →
          </Button>
        }
      >
        <div className="grid-3">
          {roleCategories.map((category) => (
            <article className="role-block" key={category.id}>
              <h3>{category.title}</h3>
              <p className="role-block__sub">{category.subtitle}</p>
              <ul>
                {category.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Recruitment Process"
        title="A clear path from brief to close."
        lead="A simple, transparent process designed for retail hiring speed without compromising fit."
      >
        <div className="process">
          {processSteps.map((step) => (
            <article className="process__item" key={step.step}>
              <span className="process__step">Step {step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        soft
        eyebrow="Retail Segments"
        title="Across formats that define modern retail."
        lead="We support hiring needs across specialty and high-growth retail segments."
      >
        <div className="segments" role="list">
          {retailSegments.map((segment) => (
            <span className="segment" role="listitem" key={segment}>
              {segment}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta-band">
          <div>
            <h2>Looking for your next retail opportunity?</h2>
            <p>
              Submit your resume and let our team match you with roles that fit your experience,
              location preferences, and career goals.
            </p>
          </div>
          <Button to="/submit-resume">Submit Your Resume</Button>
        </div>
      </Section>

      <Section
        soft
        eyebrow="FAQ"
        title="Answers for candidates and hiring teams."
        lead="A few common questions about how ProStaff works."
      >
        <FaqList items={faqs} />
      </Section>
    </div>
  )
}
