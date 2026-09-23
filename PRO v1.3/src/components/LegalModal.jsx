import { useEffect, useState } from 'react'
import { policies, company } from '../data/company'

export default function LegalModal({ open, onClose, initial = 'privacy' }) {
  const [tab, setTab] = useState(initial)

  useEffect(() => {
    if (open) setTab(initial)
  }, [open, initial])

  if (!open) return null

  const active = tab === 'privacy' ? policies.privacy : policies.terms

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-raised/55 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-navy/10 bg-cream p-5 shadow-[0_24px_80px_rgba(37,36,34,0.28)] md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-navy/40 uppercase">
              {company.shortName}
            </p>
            <h2 id="legal-title" className="mt-1 text-xl font-bold text-navy">
              Policies
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-navy/10 px-3 py-1.5 text-sm font-semibold text-navy"
          >
            Close
          </button>
        </div>

        <div className="mt-5 inline-flex rounded-full border border-navy/10 bg-white p-1">
          {['privacy', 'terms'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                tab === id ? 'bg-navy text-cream' : 'text-navy/60'
              }`}
            >
              {id === 'privacy' ? 'Privacy' : 'Terms'}
            </button>
          ))}
        </div>

        <h3 className="mt-6 text-lg font-bold text-navy">{active.title}</h3>
        <ul className="mt-4 space-y-3">
          {active.points.map((point) => (
            <li key={point} className="text-sm leading-relaxed text-navy/65">
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-navy/45">
          {company.legalName} · {company.registration}
        </p>
      </div>
    </div>
  )
}
