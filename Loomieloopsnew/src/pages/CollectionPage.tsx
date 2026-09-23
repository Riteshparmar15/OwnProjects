import { Link, useParams } from 'react-router-dom';
import { getByCategory } from '../data/products';
import { CATEGORIES } from '../lib/constants';
import { ProductCard } from '../components/ui/ProductCard';
import { Eyebrow } from '../components/ui/Motion';
import type { ReactNode } from 'react';

const TITLES: Record<string, { title: string; sub: string }> = {
  all: { title: 'Collections', sub: 'The full atelier edit' },
  anime: { title: 'Anime Drops', sub: 'Kawaii, one of one' },
  festival: { title: 'Festival / Seasonal', sub: 'Limited colour stories' },
  wearables: { title: 'Wearables & Statement Bags', sub: 'Carryable couture' },
  atelier: { title: 'Atelier Objects', sub: 'Wall, object, presence' },
};

export function CollectionPage() {
  const { category } = useParams();
  const key = category ?? 'all';
  const meta = TITLES[key] ?? TITLES.all;
  const list = getByCategory(key === 'all' ? undefined : key);

  return (
    <div className="px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-32">
      <Eyebrow>Lookbook · Shop</Eyebrow>
      <h1 className="font-display text-5xl italic md:text-7xl">{meta.title}</h1>
      <p className="mt-3 text-sm text-muted">{meta.sub}</p>

      <div className="mt-10 flex flex-wrap gap-2">
        <FilterChip to="/collections" active={!category}>
          All
        </FilterChip>
        {CATEGORIES.filter((c) => c.id !== 'bespoke').map((c) => (
          <FilterChip key={c.id} to={`/collections/${c.id}`} active={category === c.id}>
            {c.title}
          </FilterChip>
        ))}
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="py-20 text-muted">This room is between drops. Brief the studio for a commission.</p>
      )}
    </div>
  );
}

function FilterChip({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`border px-4 py-2 text-[10px] uppercase tracking-[0.18em] ${
        active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
      }`}
    >
      {children}
    </Link>
  );
}
