import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../ui/Motion';

const SLIDES = [
  '/images/hero-banner.jpg',
  '/images/sunflower-bag.jpg',
  '/images/butterfly-tote.jpg',
  '/images/anime-plushie.jpg',
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink">
      {SLIDES.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt=""
            className={`h-full w-full object-cover ${idx === i ? 'kenburns' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/20 to-ink/55" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-24 pt-28 md:px-12 md:pb-28">
        <p className="mb-6 inline-flex w-fit items-center gap-2 border border-paper/30 bg-paper/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-paper backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-honey" />
          Handcrafted Artisan Drops • Worldwide Delivery
        </p>
        <h1 className="max-w-4xl font-display text-[18vw] leading-[0.85] text-paper sm:text-7xl md:text-8xl lg:text-9xl">
          Little loops,
          <br />
          <span className="italic">big feelings.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/80 md:text-base">
          Limited-edition crochet, anime objects, and statement bags — cut from cloud-soft yarn, never duplicated.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Link
              to="/collections"
              className="inline-block bg-paper px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              Shop the drop
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/studio"
              className="inline-block border border-paper/70 px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-paper"
            >
              Custom studio
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
