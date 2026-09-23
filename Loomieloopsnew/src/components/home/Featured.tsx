import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Eyebrow, Reveal } from '../ui/Motion';
import { ProductCard } from '../ui/ProductCard';

export function Featured() {
  return (
    <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <Eyebrow>Limited edition</Eyebrow>
          <h2 className="font-display text-4xl md:text-6xl">The current drop</h2>
        </Reveal>
        <Link to="/collections" className="text-[11px] uppercase tracking-[0.22em] underline-offset-4 hover:underline">
          All collections
        </Link>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 3).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
