import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/ui/Motion';

export function StoryPage() {
  return (
    <article className="pb-24 pt-28 md:pt-32">
      <div className="px-6 md:px-10">
        <Eyebrow>Our story</Eyebrow>
        <h1 className="max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
          A house for people who feel too much — and want to hold it.
        </h1>
      </div>
      <div className="mt-14 grid md:grid-cols-2">
        <img src="/images/hero-banner.jpg" alt="" className="h-[60vw] w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center px-6 py-16 md:px-16">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Loomie Loops began as a private practice of making: hours at the hook, pastel palettes, characters that should not exist as objects until they do. We kept the feeling and raised the finish — yarn like cloth, stitch like tailoring, drops like a fashion calendar.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            Nothing is mass. Anime editions, festival colour stories, statement bags, and wall scores are worked one at a time. When a piece leaves, its gauge leaves with it.
          </p>
        </div>
      </div>
      <div className="grid border-y border-line md:grid-cols-3">
        {[
          ['Fibre', 'Premium cloud-soft blends chosen for drape, colour, and the way they take light.'],
          ['Time', 'Six to eight hours is a typical piece. Bespoke runs longer. We do not rush a loop.'],
          ['World', 'Worldwide delivery from the atelier. A small house, a long reach.'],
        ].map(([t, d]) => (
          <div key={t} className="border-b border-line px-6 py-12 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:px-10">
            <h2 className="font-display text-3xl italic">{t}</h2>
            <p className="mt-4 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-16 text-center md:px-10">
        <Link to="/studio" className="border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.22em]">
          Commission the next chapter
        </Link>
      </div>
    </article>
  );
}
