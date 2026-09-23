import Seo from '../components/Seo'
import Section from '../components/Section'
import Button from '../components/Button'

export default function JobsPage() {
  return (
    <div className="page">
      <Seo
        title="Job Openings"
        description="Browse retail job openings with ProStafff Solution Private Limited."
      />

      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Job Openings</span>
          <h1>Current retail opportunities.</h1>
          <p>No openings are listed right now. Submit your resume and we will consider you for upcoming roles.</p>
        </div>
      </header>

      <Section>
        <div className="empty-state">
          <p>There are no job openings at the moment.</p>
          <div style={{ marginTop: '1rem' }}>
            <Button to="/submit-resume">Submit Your Resume</Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
