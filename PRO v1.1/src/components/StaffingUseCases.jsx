import {
  Store,
  Sparkles,
  MapPinned,
  Users,
  Gem,
  Package,
} from 'lucide-react'
import { useCases } from '../data/content'
import { Reveal } from '../hooks/useInView'

const icons = [Store, Sparkles, MapPinned, Users, Gem, Package]

export default function StaffingUseCases() {
  return (
    <section className="section-pad bg-navy-900 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,138,122,0.22),transparent_45%)]" />
      <div className="container-pro relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow !text-teal-500">Use Cases</p>
          <h2 className="heading-lg mt-3 !text-white">
            Talent solutions for every stage of retail growth.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/70 max-w-[50ch]">
            Practical staffing support for launches, peaks, expansion and leadership — across
            luxury, lifestyle and omnichannel retail.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, i) => {
            const Icon = icons[i]
            return (
              <Reveal
                key={item.title}
                delay={(i % 3) + 1}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-teal-600/20 text-teal-500">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
