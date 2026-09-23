import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../lib/constants';
import { Eyebrow, Reveal } from '../ui/Motion';

export function Categories() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <Eyebrow>Curated worlds</Eyebrow>
        <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
          Four rooms. One atelier.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.08}>
            <Link to={c.to} className="group relative block min-h-[320px] overflow-hidden md:min-h-[420px]">
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/35 transition group-hover:bg-ink/20" />
              <div className="absolute inset-0 bg-lavender/0 transition duration-500 group-hover:bg-lavender/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-paper">
                <p className="text-[10px] uppercase tracking-[0.24em] opacity-80">{c.subtitle}</p>
                <h3 className="mt-2 font-display text-4xl italic md:text-5xl">{c.title}</h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
