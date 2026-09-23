import { CheckCircle2 } from 'lucide-react'
import { screeningAreas } from '../data/content'
import { Reveal } from '../hooks/useInView'

export default function CandidateScreening() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-pro">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 items-start">
          <Reveal>
            <p className="eyebrow">Candidate Screening</p>
            <h2 className="heading-lg mt-3">
              More than a résumé — we look for retail readiness.
            </h2>
            <p className="body-lg mt-4">
              Before connecting candidates with opportunities, ProStaff evaluates practical retail
              fit — from experience and communication to shift suitability and culture alignment.
            </p>
            <p className="mt-5 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-muted shadow-soft">
              The goal is a focused shortlist of people who can represent the brand, operate under
              retail conditions and grow with the role — not a stack of generic CVs.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {screeningAreas.map((item, i) => (
              <Reveal
                key={item}
                delay={(i % 4) + 1}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-soft"
              >
                <CheckCircle2 className="size-5 shrink-0 text-teal-600" aria-hidden />
                <span className="text-sm font-semibold text-navy-900">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
