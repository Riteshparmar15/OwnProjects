import { Link } from 'react-router-dom'
import { categoryLabels } from '../data/jobs'
import { IconBriefcase, IconCalendar, IconMapPin } from './Icons'
import Button from './Button'

export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card__top">
        <div>
          <h3>
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
        </div>
        <span className="badge">{categoryLabels[job.category]}</span>
      </div>

      <div className="job-card__meta">
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

      <p>{job.summary}</p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button to={`/jobs/${job.id}`} variant="secondary">
          View Details
        </Button>
        <Button to={`/submit-resume?role=${encodeURIComponent(job.title)}`}>Apply</Button>
      </div>
    </article>
  )
}
