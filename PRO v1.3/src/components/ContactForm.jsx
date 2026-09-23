import { useState } from 'react'
import Reveal from './Reveal'
import ArrowButton from './ArrowButton'
import { company } from '../data/company'

function buildMailto({ to, subject, body }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = [
      `Name: ${fd.get('name')}`,
      `Email: ${fd.get('email')}`,
      `Phone: ${fd.get('phone')}`,
      `City: ${fd.get('city')}`,
      `Preferred role: ${fd.get('role')}`,
      `Experience: ${fd.get('experience')} years`,
      '',
      'Profile:',
      fd.get('message'),
    ].join('\n')
    window.location.href = buildMailto({
      to: company.careersEmail,
      subject: `Candidate profile — ${fd.get('name')}`,
      body,
    })
    setSent(true)
  }

  return (
    <section id="contact" className="site-section scroll-mt-28 bg-cream">
      <div className="site-shell site-shell-narrow">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-orange uppercase">
            Contact Us
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
            Start your retail career
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy/65 md:text-base">
            Submit your profile and our team will match you with retail roles across leading
            brands in India and the UAE. {company.responseSLA}.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 overflow-hidden radius-card border border-navy/8 bg-white p-5 md:mt-12 md:p-8"
        >
          {sent ? (
            <div className="rounded-[24px] bg-cream px-6 py-10 text-center">
              <p className="text-xl font-bold text-ink">Thanks — your message is ready to send.</p>
              <p className="mt-2 text-navy/65">
                If your email app did not open, write us at{' '}
                <a className="font-semibold text-orange" href={`mailto:${company.email}`}>
                  {company.email}
                </a>{' '}
                or call{' '}
                <a className="font-semibold text-orange" href={company.phoneHref}>
                  {company.phoneDisplay}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" required />
              <Field label="Current City" name="city" required />
              <label className="block text-sm font-medium text-navy/70">
                Preferred Role
                <select
                  name="role"
                  required
                  className="mt-2 w-full rounded-2xl border border-navy/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select role type
                  </option>
                  <option>Store Associate</option>
                  <option>Visual Merchandiser</option>
                  <option>Store Manager</option>
                  <option>Area / Cluster Manager</option>
                  <option>Corporate / Operations</option>
                  <option>Other retail role</option>
                </select>
              </label>
              <Field label="Years of Experience" name="experience" type="number" required />
              <label className="block text-sm font-medium text-navy/70 sm:col-span-2">
                About you / Resume link
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Short intro, brands you’ve worked with, or a resume link."
                  className="mt-2 w-full resize-y rounded-2xl border border-navy/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange"
                />
              </label>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-navy/65">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-navy/20 text-orange"
                  />
                  <span>
                    I agree my profile may be used for relevant retail role matching, as
                    described in our Privacy policy.
                  </span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <ArrowButton type="submit" showArrow>
                  Submit Profile
                </ArrowButton>
              </div>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.14} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={company.phoneHref}
            className="rounded-[24px] border border-navy/8 bg-white p-5 transition hover:border-navy/20"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              Call
            </p>
            <p className="mt-2 font-semibold text-ink">{company.phoneDisplay}</p>
            <p className="mt-1 text-sm text-navy/55">{company.hours}</p>
          </a>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-[24px] border border-navy/8 bg-white p-5 transition hover:border-navy/20"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              WhatsApp
            </p>
            <p className="mt-2 font-semibold text-ink">Careers desk</p>
            <p className="mt-1 text-sm text-navy/55">{company.responseSLA}</p>
          </a>
          <a
            href={`mailto:${company.email}`}
            className="rounded-[24px] border border-navy/8 bg-white p-5 transition hover:border-navy/20"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              Email
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-ink">{company.email}</p>
            <p className="mt-1 text-sm text-navy/55">General enquiries</p>
          </a>
          <a
            href={company.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-[24px] border border-navy/8 bg-white p-5 transition hover:border-navy/20"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              LinkedIn
            </p>
            <p className="mt-2 font-semibold text-ink">ProStafff Solution</p>
            <p className="mt-1 text-sm text-navy/55">Company page</p>
          </a>
        </Reveal>

        <Reveal delay={0.18} className="mt-6 grid gap-4 sm:grid-cols-2">
          {company.offices.map((office) => (
            <div
              key={office.city}
              className="rounded-[24px] border border-navy/8 bg-white px-5 py-4"
            >
              <p className="text-[11px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
                {office.label}
              </p>
              <p className="mt-2 font-semibold text-ink">{office.city}</p>
              {office.lines.map((line) => (
                <p key={line} className="text-sm text-navy/55">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required }) {
  return (
    <label className="block text-sm font-medium text-navy/70">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-navy/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange"
      />
    </label>
  )
}
