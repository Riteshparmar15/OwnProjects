import { CONTACT } from '../../lib/constants';
import { lookbook, testimonials } from '../../data/products';
import { Eyebrow, Reveal } from '../ui/Motion';

export function Lookbook() {
  return (
    <section className="py-24 md:py-32">
      <div className="px-6 md:px-10">
        <Reveal>
          <Eyebrow>Editorial lookbook · @{CONTACT.instagram}</Eyebrow>
          <h2 className="font-display text-4xl md:text-6xl">Proof, in fibre.</h2>
          <p className="mt-4 max-w-lg text-sm text-muted">
            Client unboxings, atelier stills, and verified notes from the people who live in the pieces.
          </p>
        </Reveal>
      </div>

      <div className="lookbook-row mt-12 flex gap-4 overflow-x-auto px-6 pb-4 md:px-10">
        {lookbook.map((shot) => (
          <a
            key={shot.tag}
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative w-[78vw] shrink-0 snap-center sm:w-[48vw] lg:w-[32vw]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={shot.src}
                alt={shot.caption}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.18em]">
              <span>{shot.tag}</span>
              <span className="text-muted">{shot.caption}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20 grid gap-px border-y border-line bg-line md:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote key={t.id} className="bg-paper px-6 py-10 md:px-10">
            <p className="font-display text-2xl italic leading-snug">“{t.text}”</p>
            <footer className="mt-8 text-[11px] uppercase tracking-[0.18em] text-muted">
              {t.author} · {t.city} · {t.handle}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
