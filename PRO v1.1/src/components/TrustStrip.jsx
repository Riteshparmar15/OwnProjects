import { BadgeCheck, CalendarRange, Focus } from 'lucide-react'
import { trustItems } from '../data/content'
import { Reveal } from '../hooks/useInView'

const icons = [Focus, CalendarRange, BadgeCheck]

export default function TrustStrip() {
  return (
    <section aria-label="ProStaff positioning" className="relative z-10 -mt-2 md:-mt-4 pb-2">
      <div className="container-pro">
        <Reveal className="grid gap-3 md:grid-cols-3 rounded-[20px] border border-line bg-white p-3 md:p-4 shadow-card">
          {trustItems.map((item, index) => {
            const Icon = icons[index]
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl px-3 py-3.5 md:px-4 hover:bg-surface transition-colors"
              >
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-bold text-navy-900 text-[0.98rem] leading-snug">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted leading-snug">{item.text}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
