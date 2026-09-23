import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/content'
import { Reveal } from '../hooks/useInView'

function FaqItem({ item, open, onToggle, panelId, buttonId }) {
  return (
    <div className="rounded-2xl border border-line bg-white shadow-soft overflow-hidden">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left min-h-[56px]"
        >
          <span className="font-bold text-navy-900 text-[0.98rem] md:text-[1.02rem] leading-snug">
            {item.q}
          </span>
          <ChevronDown
            className={`size-5 shrink-0 text-teal-600 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-pad" aria-labelledby="faq-title">
      <div className="container-pro max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">FAQs</p>
          <h2 id="faq-title" className="heading-lg mt-3">
            Retail Staffing & Recruitment FAQs
          </h2>
          <p className="body-lg mt-4">
            Clear answers about the roles we recruit for, seasonal support and how candidates can
            connect with ProStaff.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i + 1, 4)}>
              <FaqItem
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
                panelId={`${baseId}-panel-${i}`}
                buttonId={`${baseId}-button-${i}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
