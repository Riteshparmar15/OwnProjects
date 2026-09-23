import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { categoryLabels, getJobById } from '../data/jobs'
import { IconBriefcase, IconCalendar, IconMapPin } from '../components/Icons'

export default function JobDetailPage() {
  const { jobId } = useParams()
  const job = getJobById(jobId)

  if (!job) {
    return (
      <div className="page">
        <header className="page-hero">
          <div className="container">
            <h1>Role not found</h1>
            <p>This opportunity may have closed or the link is incorrect.</p>
            <div style={{ marginTop: '1.25rem' }}>
              <Button to="/jobs">Back to jobs</Button>
            </div>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div className="page">
      <Seo title={job.title} description={job.summary} />

      <header className="page-hero">
        <div className="container">
          <p style={{ marginBottom: '0.75rem' }}>
            <Link to="/jobs" style={{ color: 'var(--accent)', fontWeight: 700 }}>
              ← All openings
            </Link>
          </p>
          <span className="eyebrow">{categoryLabels[job.category]}</span>
          <h1>{job.title}</h1>
          <p>{job.summary}</p>
          <div className="job-card__meta" style={{ marginTop: '1rem' }}>
            <span>
              <IconMapPin /> {job.location}
            </span>
            <span>
              <IconBriefcase /> {job.experience}
            </span>
            <span>
              <IconCalendar /> {job.employmentType}
            </span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container job-detail">
          <article className="form-panel prose">
            <h2>About the role</h2>
            <p>{job.description}</p>

            <h2>Responsibilities</h2>
            <ul>
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Requirements</h2>
            <ul>
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <aside className="form-panel sticky-card">
            <h2 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Apply for this role</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.1rem' }}>
              Submit your resume with this role pre-selected. Our team will review your profile for
              fit.
            </p>
            <Button to={`/submit-resume?role=${encodeURIComponent(job.title)}`} className="btn--full">
              Apply Now
            </Button>
            <div style={{ marginTop: '0.75rem' }}>
              <Button to="/jobs" variant="secondary" className="btn--full">
                View other openings
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
