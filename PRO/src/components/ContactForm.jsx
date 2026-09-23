import { useState } from 'react'
import { company } from '../data/content'
import Button from './Button'

/**
 * API-ready contact payload.
 * Replace submitContact with a real API call when backend is ready.
 */
export async function submitContact(payload) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (import.meta.env.DEV) {
    console.info('[ProStaff] Contact payload ready for API:', payload)
  }
  return { ok: true }
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.message.trim()) next.message = 'Please share a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    if (!validate()) return
    setSubmitting(true)
    try {
      await submitContact(form)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setErrors({ form: 'Unable to send right now. Please email us directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="form-panel" onSubmit={onSubmit} noValidate>
      {success && (
        <div className="form-success" role="status">
          Message received. We will get back to you at the earliest.
        </div>
      )}
      {errors.form && <p className="field__error">{errors.form}</p>}

      <div className="form-grid form-grid--2">
        <div className="field">
          <label htmlFor="contact-name">Full Name *</label>
          <input
            id="contact-name"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email *</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            required
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="contact-phone">Phone</label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            value={form.subject}
            onChange={(e) => setField('subject', e.target.value)}
            placeholder="Hiring requirement or general enquiry"
          />
        </div>
      </div>

      <div className="field" style={{ marginTop: '1rem' }}>
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => setField('message', e.target.value)}
          placeholder="Tell us briefly how we can help."
          required
        />
        {errors.message && <span className="field__error">{errors.message}</span>}
        <span className="field__hint">
          Prefer email? Write to <a href={`mailto:${company.email}`}>{company.email}</a>
        </span>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
}
