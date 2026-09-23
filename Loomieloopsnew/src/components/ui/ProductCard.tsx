import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { format } = useStore();

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden border border-line bg-paper-2">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-paper">
            {product.badge}
          </span>
        )}
        <div className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full border border-white/40 opacity-0 transition group-hover:opacity-100"
          style={{ background: product.colorways[0]?.hex }}
        />
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex items-start justify-between gap-4 border-x border-b border-line px-4 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{product.categoryLabel}</p>
          <h3 className="mt-1 font-display text-2xl italic leading-none">{product.editorialName}</h3>
          <p className="mt-1 text-sm text-muted">{product.name}</p>
        </div>
        <p className="shrink-0 pt-5 text-sm tracking-wide">{format(product.price)}</p>
      </div>
    </Link>
  );
}
