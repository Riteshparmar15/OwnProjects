import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatPrice, type Product } from "../data";
import { useCart } from "../cart";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  const [color, setColor] = useState(product?.colors[0] ?? "");

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      <button className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-cream shadow-2xl md:grid-cols-2">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white p-2">
          <X size={16} />
        </button>
        <img src={product.image} alt={product.name} className="h-72 w-full object-cover md:h-full" />
        <div className="p-6 sm:p-8">
          <p className="section-kicker">{product.category}</p>
          <h3 className="mt-2 font-display text-3xl font-bold">{product.name}</h3>
          <p className="mt-3 text-xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-4 text-sm leading-relaxed text-mute">{product.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-full px-3 py-1 text-xs ${
                  color === c ? "bg-ink text-cream" : "bg-white text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <button
              className="btn-primary"
              onClick={() => {
                add(product, 1, color || product.colors[0]);
                onClose();
              }}
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.slug}`} onClick={onClose} className="btn-secondary">
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
