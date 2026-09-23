import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export function SearchOverlay() {
  const { drawer, closeDrawer, format } = useStore();
  const open = drawer === 'search';
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.editorialName.toLowerCase().includes(s) ||
        p.categoryLabel.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s)),
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-paper/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-6 pt-8">
            <Search size={18} strokeWidth={1.4} className="shrink-0" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search drops, colourways, anime editions…"
              className="w-full bg-transparent py-3 font-display text-2xl italic outline-none placeholder:text-muted/60"
            />
            <button type="button" onClick={closeDrawer} aria-label="Close search">
              <X size={20} />
            </button>
          </div>
          <p className="mx-auto mt-2 w-full max-w-3xl px-6 text-[11px] uppercase tracking-[0.2em] text-muted">
            {results.length} pieces · ⌘K
          </p>
          <ul className="mx-auto mt-8 w-full max-w-3xl flex-1 overflow-y-auto px-6 pb-16">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/product/${p.id}`}
                  onClick={closeDrawer}
                  className="flex items-center gap-4 border-t border-line py-4 transition hover:bg-paper-2/60"
                >
                  <img src={p.images[0]} alt="" className="h-16 w-14 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-xl italic">{p.editorialName}</p>
                    <p className="text-xs text-muted">{p.name}</p>
                  </div>
                  <p className="text-sm">{format(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
