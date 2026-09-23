import { Link } from 'react-router-dom';
import { Eyebrow, Reveal } from '../ui/Motion';

export function Atelier() {
  return (
    <section className="grid border-y border-line md:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <Eyebrow>The craft & atelier</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
            High-grade yarn.
            <br />
            <span className="italic">Hand-stitch precision.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted md:text-base">
            We select fibre the way a house selects cloth: for hand, colourfastness, and how it holds a thought.
            Every loop is tensioned by a person — never a machine line. The aim is not decoration. It is tangible emotion.
          </p>
          <ul className="mt-10 space-y-4 text-sm">
            {[
              ['01', 'Yarn', 'Cloud-soft acrylic blends, colour-true, built to be held.'],
              ['02', 'Stitch', 'Six to eight hours per piece. Gauge set by hand, not batch.'],
              ['03', 'Vision', 'Anime, festival, couture carry — one of one, always.'],
            ].map(([n, t, d]) => (
              <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-4">
                <span className="text-[11px] text-muted">{n}</span>
                <div>
                  <p className="uppercase tracking-[0.18em]">{t}</p>
                  <p className="mt-1 text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/story"
            className="mt-10 inline-block border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.22em]"
          >
            Read our story
          </Link>
        </Reveal>
      </div>
      <div className="relative min-h-[420px]">
        <img src="/images/yarn-art.jpg" alt="Atelier yarn work" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
}
