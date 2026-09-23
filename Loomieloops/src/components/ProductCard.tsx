import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "../data";
import { useCart } from "../cart";

export function ProductCard({
  product,
  onQuick,
}: {
  product: Product;
  onQuick: (p: Product) => void;
}) {
  const { add } = useCart();
  const [hover, setHover] = useState(false);
  const img = hover && product.hoverImage ? product.hoverImage : product.image;

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-[1.6rem] bg-white shadow-card">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={img}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.bestseller && (
              <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream backdrop-blur">
                Bestseller
              </span>
            )}
            {product.limited && (
              <span className="rounded-full bg-neon-pink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                Limited
              </span>
            )}
          </div>
          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product);
              }}
              className="btn-primary flex-1 px-3 py-2 text-xs"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuick(product);
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-card"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-mute">{product.category}</p>
          <h3 className="mt-1 font-display text-lg font-bold leading-tight">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-mute line-through">{formatPrice(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
