import { Link } from 'react-router-dom';
import { Magnetic } from '../ui/Motion';
import { openWhatsApp } from '../../lib/whatsapp';

export function CustomBanner() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 text-paper md:px-10 md:py-32">
      <img
        src="/images/hero-banner.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-paper/60">Bespoke & bulk</p>
        <h2 className="mt-4 font-display text-4xl italic md:text-7xl">
          Your character. Our yarn.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-paper/75">
          Anime commissions, custom colourways, festival gifting, and corporate boxes — brief the atelier, or message us now.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Link
              to="/studio"
              className="inline-block bg-paper px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              Open custom studio
            </Link>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  'Hi Loomie Loops 🧶 I want a bespoke / bulk order (anime character, colourway, or festival gifting).',
                )
              }
              className="inline-block border border-paper px-8 py-3.5 text-[11px] uppercase tracking-[0.22em]"
            >
              Route to WhatsApp
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
