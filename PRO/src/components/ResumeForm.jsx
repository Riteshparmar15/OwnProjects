import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { jobs } from '../data/jobs'
import Button from './Button'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const ALLOWED_EXT = ['.pdf', '.doc', '.docx']
const MAX_SIZE = 5 * 1024 * 1024

const initial = {
  fullName: '',
  email: '',
  phone: '',
  preferredRole: '',
  experience: '',
  currentLocation: '',
  preferredLocation: '',
  linkedin: '',
  summary: '',
}

function validateFile(file) {
  if (!file) return 'Please upload your resume.'
  const lower = file.name.toLowerCase()
  const extOk = ALLOWED_EXT.some((ext) => lower.endsWith(ext))
  const typeOk = !file.type || ALLOWED_TYPES.includes(file.type)
  if (!extOk || !typeOk) return 'Upload a PDF, DOC, or DOCX file only.'
  if (file.size > MAX_SIZE) return 'Resume must be 5 MB or smaller.'
  return ''
}

/**
 * API-ready resume application payload.
 * Replace submitApplication with a real API call when backend is ready.
 */
export async function submitApplication(payload) {
  // Future: POST /api/applications with FormData or JSON + file upload
  await new Promise((resolve) => setTimeout(resolve, 600))
  if (import.meta.env.DEV) {
    console.info('[ProStaff] Application payload ready for API:', {
      ...payload,
      resume: payload.resume
        ? { name: payload.resume.name, size: payload.resume.size, type: payload.resume.type }
        : null,
    })
  }
  return { ok: true, id: `app_${Date.now()}` }
}

export default function ResumeForm() {
  const [params] = useSearchParams()
  const roleFromQuery = params.get('role') || ''

  const roleOptions = useMemo(() => {
    const fromJobs = jobs.map((job) => job.title)
    const extras = [
      'Sales Associate',
      'Store Manager',
      'Area Manager',
      'Visual Merchandiser',
      'Retail Merchandiser',
      'E-commerce Operations',
      'Other Retail Role',
    ]
    return [...new Set([roleFromQuery, ...fromJobs, ...extras].filter(Boolean))]
  }, [roleFromQuery])

  const [form, setForm] = useState({ ...initial, preferredRole: roleFromQuery })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const onFile = (nextFile) => {
    setFile(nextFile)
    setErrors((prev) => ({ ...prev, resume: validateFile(nextFile) }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.phone.trim()) next.phone = 'Phone is required.'
    else if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (!form.preferredRole) next.preferredRole = 'Select a preferred role.'
    if (!form.experience) next.experience = 'Select your experience.'
    if (!form.currentLocation.trim()) next.currentLocation = 'Current location is required.'
    if (!form.preferredLocation.trim()) next.preferredLocation = 'Preferred location is required.'
    if (form.linkedin && !/^https?:\/\//i.test(form.linkedin)) {
      next.linkedin = 'Enter a full URL starting with https://'
    }
    const fileError = validateFile(file)
    if (fileError) next.resume = fileError
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    if (!validate()) return

    setSubmitting(true)
    try {
      await submitApplication({ ...form, resume: file })
      setSuccess(true)
      setForm({ ...initial, preferredRole: '' })
      setFile(null)
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: 'Something went wrong. Please try again or email us directly.',
      }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="form-panel" onSubmit={onSubmit} noValidate>
      {success && (
        <div className="form-success" role="status">
          Thank you. Your resume has been received. Our team will review your profile and be in touch
          if there is a suitable opportunity.
        </div>
      )}
      {errors.form && <p className="field__error">{errors.form}</p>}

      <div className="form-grid form-grid--2">
        <div className="field">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            value={form.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            autoComplete="name"
            required
          />
          {errors.fullName && <span className="field__error">{errors.fullName}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            autoComplete="email"
            required
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone *</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            autoComplete="tel"
            required
          />
          {errors.phone && <span className="field__error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="preferredRole">Preferred Role *</label>
          <select
            id="preferredRole"
            value={form.preferredRole}
            onChange={(e) => setField('preferredRole', e.target.value)}
            required
          >
            <option value="">Select a role</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.preferredRole && <span className="field__error">{errors.preferredRole}</span>}
        </div>

        <div className="field">
          <label htmlFor="experience">Experience *</label>
          <select
            id="experience"
            value={form.experience}
            onChange={(e) => setField('experience', e.target.value)}
            required
          >
            <option value="">Select experience</option>
            <option value="Fresher / 0–1 years">Fresher / 0–1 years</option>
            <option value="1–3 years">1–3 years</option>
            <option value="3–5 years">3–5 years</option>
            <option value="5–8 years">5–8 years</option>
            <option value="8+ years">8+ years</option>
          </select>
          {errors.experience && <span className="field__error">{errors.experience}</span>}
        </div>

        <div className="field">
          <label htmlFor="currentLocation">Current Location *</label>
          <input
            id="currentLocation"
            value={form.currentLocation}
            onChange={(e) => setField('currentLocation', e.target.value)}
            required
          />
          {errors.currentLocation && <span className="field__error">{errors.currentLocation}</span>}
        </div>

        <div className="field">
          <label htmlFor="preferredLocation">Preferred Location *</label>
          <input
            id="preferredLocation"
            value={form.preferredLocation}
            onChange={(e) => setField('preferredLocation', e.target.value)}
            required
          />
          {errors.preferredLocation && (
            <span className="field__error">{errors.preferredLocation}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="linkedin">LinkedIn (optional)</label>
          <input
            id="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={form.linkedin}
            onChange={(e) => setField('linkedin', e.target.value)}
          />
          {errors.linkedin && <span className="field__error">{errors.linkedin}</span>}
        </div>
      </div>

      <div className="field" style={{ marginTop: '1rem' }}>
        <label htmlFor="summary">Short Summary (optional)</label>
        <textarea
          id="summary"
          value={form.summary}
          onChange={(e) => setField('summary', e.target.value)}
          placeholder="Briefly share your retail experience and the roles you are targeting."
        />
      </div>

      <div className="field" style={{ marginTop: '1rem' }}>
        <span id="resume-label">Resume Upload *</span>
        <label
          htmlFor="resume"
          className={`file-drop${dragActive ? ' is-active' : ''}`}
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragActive(false)
            const next = e.dataTransfer.files?.[0]
            if (next) onFile(next)
          }}
        >
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-labelledby="resume-label"
            onChange={(e) => onFile(e.target.files?.[0] || null)}
          />
          {file ? (
            <p>
              Selected: <strong>{file.name}</strong>
            </p>
          ) : (
            <p>
              Drop a file or click to upload <strong>PDF, DOC, or DOCX</strong> up to 5 MB
            </p>
          )}
        </label>
        {errors.resume && <span className="field__error">{errors.resume}</span>}
        <span className="field__hint">Your application is stored in an API-ready format for future backend connection.</span>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Resume'}
        </Button>
      </div>
    </form>
  )
}
