import Seo from '../components/Seo'
import Section from '../components/Section'
import Button from '../components/Button'
import { images, roleCategories } from '../data/content'

export default function RetailRolesPage() {
  return (
    <div className="page">
      <Seo
        title="Retail Roles"
        description="Explore in-store, field management, and corporate retail roles recruited by ProStafff Solution Private Limited."
      />

      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Retail Roles</span>
          <h1>The full retail ecosystem, covered.</h1>
          <p>
            Whether you need floor energy, multi-store leadership, or HQ commercial talent, we recruit
            across the complete retail stack.
          </p>
        </div>
      </header>

      <Section>
        <div className="split">
          <div className="split__media">
            <img
              src={images.store}
              alt="Lifestyle retail store with apparel displays"
              width="900"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="prose">
            <p>
              Retail careers span far beyond the shop floor. ProStaff supports hiring across customer-facing
              roles, field leadership, and corporate functions that keep brands commercially sharp.
            </p>
            <Button to="/jobs">Browse open roles</Button>
          </div>
        </div>
      </Section>

      <Section soft>
        <div className="grid-3">
          {roleCategories.map((category) => (
            <article className="role-block" key={category.id} id={category.id}>
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

      <Section>
        <div className="cta-band">
          <div>
            <h2>See where you fit in retail.</h2>
            <p>Submit your resume and we will consider you for matching opportunities.</p>
          </div>
          <Button to="/submit-resume">Submit Resume</Button>
        </div>
      </Section>
    </div>
  )
}
