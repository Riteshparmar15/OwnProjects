import { Link } from 'react-router-dom';
import { CONTACT, NAV_LINKS } from '../../lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="grid gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <p className="font-logo text-sm tracking-[0.28em]">LOOMIE LOOPS</p>
          <p className="mt-4 font-display text-4xl italic md:text-5xl">
            Little loops,
            <br />
            big feelings.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">
            Handcrafted artisan drops. Cloud-soft yarn. One of one. Worldwide delivery from the atelier.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-paper/50">House</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-rose">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-paper/50">Client</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/checkout" className="hover:text-rose">
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/studio" className="hover:text-rose">
                Bespoke brief
              </Link>
            </li>
            <li>
              <Link to="/bulk" className="hover:text-rose">
                Corporate gifting
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-paper/50">Atelier desk</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} className="hover:text-rose">
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagramUrl} className="hover:text-rose">
                @{CONTACT.instagram}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-rose">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-paper/10 px-6 py-5 text-[11px] uppercase tracking-[0.18em] text-paper/45 md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} Loomie Loops</span>
        <span>Handcrafted · Never duplicated</span>
      </div>
    </footer>
  );
}
