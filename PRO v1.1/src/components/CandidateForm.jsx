import { useRef, useState } from 'react'
import { CheckCircle2, FileUp, Loader2, AlertCircle, X } from 'lucide-react'
import { experienceLevels, roleCategories, site } from '../data/content'
import { Reveal } from '../hooks/useInView'

const MAX_BYTES = 5 * 1024 * 1024
const ACCEPTED = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const ACCEPTED_EXT = ['.pdf', '.doc', '.docx']

const initial = {
  fullName: '',
  email: '',
  phone: '',
  role: '',
  experience: '',
  driveLink: '',
  bio: '',
}

function validate(values, file) {
  const errors = {}
  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!/^[\d+\-\s()]{8,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.role) errors.role = 'Select a preferred role or category.'
  if (!values.experience) errors.experience = 'Select your experience level.'
  if (!file) {
    errors.resume = 'Please upload your résumé (PDF, DOC or DOCX, max 5 MB).'
  } else {
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`
    const typeOk = ACCEPTED.includes(file.type) || ACCEPTED_EXT.includes(ext)
    if (!typeOk) errors.resume = 'Only PDF, DOC and DOCX files are accepted.'
    if (file.size > MAX_BYTES) errors.resume = 'File must be 5 MB or smaller.'
  }
  if (values.driveLink && !/^https?:\/\//i.test(values.driveLink.trim())) {
    errors.driveLink = 'Link must start with http:// or https://'
  }
  if (values.bio && values.bio.trim().length > 800) {
    errors.bio = 'Please keep your bio under 800 characters.'
  }
  return errors
}

function Field({ label, error, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-bold text-navy-900">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600" role="alert">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  )
}

const inputClass =
  'w-full min-h-12 rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink transition-shadow placeholder:text-muted/70 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15'

export default function CandidateForm() {
  const [values, setValues] = useState(initial)
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const setResume = (next) => {
    setFile(next)
    setErrors((prev) => ({ ...prev, resume: undefined }))
  }

  const onFile = (selected) => {
    if (!selected) return
    setResume(selected)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values, file)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    // Front-end only: simulate submit. Wire to your API / Formspree / email service later.
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
    setValues(initial)
    setFile(null)
  }

  return (
    <section id="contact" className="section-pad bg-surface" aria-labelledby="contact-title">
      <div className="container-pro grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 items-start">
        <Reveal>
          <p className="eyebrow">Submit Resume</p>
          <h2 id="contact-title" className="heading-lg mt-3">
            Ready for your next opportunity in retail?
          </h2>
          <p className="body-lg mt-4">
            Submit your profile to connect with ProStaff for relevant opportunities across
            in-store, management and corporate retail roles.
          </p>
          <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-soft">
            <p className="text-sm font-bold text-navy-900">Prefer email?</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block text-teal-600 font-semibold no-underline hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Attach your résumé and mention your preferred role category and city.
            </p>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="rounded-[22px] border border-line bg-white p-5 md:p-8 shadow-card">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-10 px-4" role="status">
                <CheckCircle2 className="size-14 text-teal-600" aria-hidden />
                <h3 className="mt-4 text-2xl font-extrabold text-navy-900">Application received</h3>
                <p className="mt-2 max-w-md text-muted leading-relaxed">
                  Thank you. Your profile has been captured. Our team will review it for relevant
                  retail opportunities.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary mt-6"
                  onClick={() => setStatus('idle')}
                >
                  Submit another profile
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <p className="text-sm font-semibold text-muted">
                  Candidate application only — for job seekers.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *" htmlFor="fullName" error={errors.fullName}>
                    <input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      className={inputClass}
                      value={values.fullName}
                      onChange={onChange}
                      aria-invalid={!!errors.fullName}
                    />
                  </Field>
                  <Field label="Email *" htmlFor="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      value={values.email}
                      onChange={onChange}
                      aria-invalid={!!errors.email}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone *" htmlFor="phone" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      value={values.phone}
                      onChange={onChange}
                      aria-invalid={!!errors.phone}
                    />
                  </Field>
                  <Field label="Preferred Role / Category *" htmlFor="role" error={errors.role}>
                    <select
                      id="role"
                      name="role"
                      className={inputClass}
                      value={values.role}
                      onChange={onChange}
                      aria-invalid={!!errors.role}
                    >
                      <option value="">Select category</option>
                      {roleCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Experience Level *" htmlFor="experience" error={errors.experience}>
                  <select
                    id="experience"
                    name="experience"
                    className={inputClass}
                    value={values.experience}
                    onChange={onChange}
                    aria-invalid={!!errors.experience}
                  >
                    <option value="">Select experience</option>
                    {experienceLevels.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <div>
                  <p className="mb-1.5 text-sm font-bold text-navy-900">Resume Upload *</p>
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        inputRef.current?.click()
                      }
                    }}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragOver(false)
                      onFile(e.dataTransfer.files?.[0])
                    }}
                    className={`rounded-2xl border-2 border-dashed px-4 py-7 text-center cursor-pointer transition-colors ${
                      dragOver
                        ? 'border-teal-600 bg-teal-50'
                        : errors.resume
                          ? 'border-red-300 bg-red-50/40'
                          : 'border-line bg-surface hover:border-teal-600/50'
                    }`}
                  >
                    <FileUp className="mx-auto size-7 text-teal-600" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-navy-900">
                      {file ? file.name : 'Drag & drop or click to upload'}
                    </p>
                    <p className="mt-1 text-xs text-muted">PDF, DOC, DOCX · Max 5 MB</p>
                    <input
                      ref={inputRef}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => onFile(e.target.files?.[0])}
                    />
                  </div>
                  {file ? (
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-navy-900"
                      onClick={() => setResume(null)}
                    >
                      <X className="size-3.5" aria-hidden />
                      Remove file
                    </button>
                  ) : null}
                  {errors.resume ? (
                    <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600" role="alert">
                      <AlertCircle className="size-3.5" aria-hidden />
                      {errors.resume}
                    </p>
                  ) : null}
                </div>

                <Field
                  label="Google Drive / Portfolio Link"
                  htmlFor="driveLink"
                  error={errors.driveLink}
                >
                  <input
                    id="driveLink"
                    name="driveLink"
                    type="url"
                    placeholder="https://"
                    className={inputClass}
                    value={values.driveLink}
                    onChange={onChange}
                    aria-invalid={!!errors.driveLink}
                  />
                </Field>

                <Field label="Short Bio" htmlFor="bio" error={errors.bio}>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className={`${inputClass} !min-h-[120px] py-3 resize-y`}
                    value={values.bio}
                    onChange={onChange}
                    placeholder="Briefly share your retail background and what you are looking for."
                    aria-invalid={!!errors.bio}
                  />
                </Field>

                {status === 'error' && Object.keys(errors).length > 0 ? (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    Please fix the highlighted fields and try again.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="btn btn-primary w-full !rounded-xl"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Submitting…
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
