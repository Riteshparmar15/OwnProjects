import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CURRENCIES } from '../../lib/constants';
import { useStore } from '../../context/StoreContext';
import { openWhatsApp } from '../../lib/whatsapp';

export function Header() {
  const { cartCount, currency, setCurrency, openDrawer } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
        scrolled
          ? 'border-b border-line/80 bg-paper/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="grid h-[72px] grid-cols-3 items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openDrawer('menu')}
            className="flex items-center gap-2 py-2 text-[11px] uppercase tracking-[0.22em]"
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.4} />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>

        <Link to="/" className="justify-self-center text-center">
          <span className="font-logo text-[15px] font-extrabold tracking-[0.28em] sm:text-lg">
            LOOMIE LOOPS
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as typeof currency)}
            className="max-w-[4.2rem] cursor-pointer bg-transparent py-2 text-[10px] uppercase tracking-[0.14em] outline-none sm:max-w-none sm:text-[11px] sm:tracking-[0.18em]"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => openDrawer('search')}
            className="p-2"
            aria-label="Search"
          >
            <Search size={18} strokeWidth={1.4} />
          </button>

          <button
            type="button"
            onClick={() => openDrawer('cart')}
            className="relative p-2"
            aria-label="Bag"
          >
            <ShoppingBag size={18} strokeWidth={1.4} />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] text-paper">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              openWhatsApp('Hi Loomie Loops 🧶 I have a quick question about a drop.')
            }
            className="p-2"
            aria-label="WhatsApp quick chat"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
              <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.74.46 3.44 1.34 4.94L2 22l5.38-1.41a10 10 0 0 0 4.66 1.18h.01c5.46 0 9.89-4.4 9.89-9.84 0-2.62-1.03-5.09-2.89-6.94Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              openWhatsApp('Hi Loomie Loops 🧶 I have a quick question about a drop.')
            }
            className="ml-1 hidden items-center gap-2 border border-ink px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition hover:bg-ink hover:text-paper lg:inline-flex"
          >
            Chat
          </button>
        </div>
      </div>
    </header>
  );
}