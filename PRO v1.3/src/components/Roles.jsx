import Reveal from './Reveal'
import { roleGroups } from '../data/content'

export default function Roles() {
  return (
    <section id="roles" className="site-section bg-cream">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-orange uppercase">
            Retail Roles
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy">
            The full retail ecosystem, covered
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-navy/60 md:text-lg">
            Whether you need floor energy, multi-store leadership, or HQ commercial
            talent, we recruit across the complete retail stack.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {roleGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.08}
              className="radius-card border border-navy/8 bg-white p-6 md:p-8"
            >
              <p className="text-xs font-semibold tracking-[0.12em] text-navy/40 uppercase">
                {group.tag}
              </p>
              <h3 className="mt-2 text-xl font-bold text-navy md:text-2xl">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-navy/8 pt-3 text-sm leading-relaxed text-navy/65"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
