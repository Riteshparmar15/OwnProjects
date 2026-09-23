import Seo from '../components/Seo'
import Section from '../components/Section'
import Button from '../components/Button'
import { images, services } from '../data/content'
import { IconClock, IconLayers, IconSearch, IconUsers } from '../components/Icons'

const icons = {
  permanent: IconUsers,
  temporary: IconClock,
  executive: IconSearch,
  'high-volume': IconLayers,
}

export default function ServicesPage() {
  return (
    <div className="page">
      <Seo
        title="Services"
        description="Permanent staffing, temporary and seasonal hiring, executive search, and high-volume retail recruitment from ProStafff Solution."
      />

      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Staffing built for how retail actually runs.</h1>
          <p>
            Permanent leadership, surge capacity, and executive search — delivered by a team that
            understands the retail calendar.
          </p>
        </div>
      </header>

      <Section>
        <div className="split split--reverse">
          <div className="split__media">
            <img
              src={images.services}
              alt="Fashion retail store interior with merchandise displays"
              width="900"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="prose">
            <h2>Retail hiring with operating context</h2>
            <p>
              Every mandate is framed around brand standards, location realities, and the pace of
              modern retail — whether you are opening stores, covering festive peaks, or hiring field
              leadership.
            </p>
            <Button to="/contact">Discuss a requirement</Button>
          </div>
        </div>
      </Section>

      <Section soft>
        <div className="grid-2">
          {services.map((service) => {
            const Icon = icons[service.id] || IconLayers
            return (
              <article className="card" key={service.id} id={service.id}>
                <div className="card__icon">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </Section>

      <Section>
        <div className="cta-band">
          <div>
            <h2>Need talent for your next retail mandate?</h2>
            <p>Share your requirement and we will outline a clear hiring approach.</p>
          </div>
          <Button to="/contact">Get in touch</Button>
        </div>
      </Section>
    </div>
  )
}
