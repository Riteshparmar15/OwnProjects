import Seo from '../components/Seo'
import ContactForm from '../components/ContactForm'
import { company } from '../data/content'

export default function ContactPage() {
  return (
    <div className="page">
      <Seo
        title="Contact Us"
        description="Contact ProStafff Solution Private Limited for retail recruitment support or candidate enquiries."
      />

      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact Us</span>
          <h1>Let’s start a conversation.</h1>
          <p>
            Whether you are hiring for retail roles or exploring your next opportunity, our team is
            ready to help.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="contact-info__item">
              <span>Email</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
            <div className="contact-info__item">
              <span>LinkedIn</span>
              <a href={company.linkedinUrl} target="_blank" rel="noreferrer">
                {company.linkedinLabel}
              </a>
            </div>
            <div className="contact-info__item">
              <span>Focus</span>
              <strong>Retail recruitment & staffing</strong>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Send a short note about your requirement or enquiry. We respond with clear next steps —
              no employer hire form required on this site.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  )
}
