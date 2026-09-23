import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT, CURRENCIES, NAV_LINKS } from '../../lib/constants';
import { useStore } from '../../context/StoreContext';

export function MenuDrawer() {
  const { drawer, closeDrawer, currency, setCurrency } = useStore();
  const open = drawer === 'menu';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-[70] flex w-full max-w-xl flex-col border-r border-line bg-paper px-8 py-8 sm:px-12"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Index</p>
              <button type="button" onClick={closeDrawer} aria-label="Close">
                <X size={22} strokeWidth={1.3} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-3">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    onClick={closeDrawer}
                    className="font-display text-4xl italic leading-tight transition hover:text-rose sm:text-5xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-2 pt-12 text-sm text-muted">
              <p className="text-[11px] uppercase tracking-[0.22em]">Atelier</p>
              <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                Currency
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as typeof currency)}
                  className="border border-line bg-transparent px-2 py-1 outline-none"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="block hover:text-ink">
                Instagram @{CONTACT.instagram}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="block hover:text-ink">
                {CONTACT.email}
              </a>
              <p>{CONTACT.whatsappDisplay}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
