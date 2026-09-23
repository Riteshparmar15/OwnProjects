import Reveal from './Reveal'
import { trustBar } from '../data/company'

export default function TrustBar() {
  return (
    <section className="bg-cream pb-4 md:pb-6" aria-label="Trust commitments">
      <div className="site-shell">
        <Reveal className="overflow-hidden radius-hero border border-navy/8 bg-white">
          <div className="grid gap-0 md:grid-cols-4">
            {trustBar.map((item, i) => (
              <div
                key={item.title}
                className={`p-5 md:p-6 ${i < trustBar.length - 1 ? 'border-b border-navy/8 md:border-b-0 md:border-r' : ''}`}
              >
                <p className="text-sm font-bold tracking-tight text-ink md:text-[15px]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
