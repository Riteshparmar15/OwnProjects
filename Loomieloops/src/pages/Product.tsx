import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice, products } from "../data";
import { useCart } from "../cart";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";
import type { Product } from "../data";

export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { add } = useCart();
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setColor(product?.colors[0] ?? "");
    setQty(1);
  }, [product]);
  const [quick, setQuick] = useState<Product | null>(null);

  if (!product) {
    return (
      <div className="px-6 py-40 text-center">
        <h1 className="font-display text-3xl font-bold">Piece not found</h1>
        <Link to="/shop" className="btn-primary mt-6">
          Back to shop
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.collections.some((c) => product.collections.includes(c))).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
          <img src={product.image} alt={product.name} className="w-full object-cover" />
        </div>
        <div>
          <p className="section-kicker">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt && <span className="text-mute line-through">{formatPrice(product.compareAt)}</span>}
            {product.limited && <span className="rounded-full bg-neon-pink px-2 py-1 text-[10px] font-bold uppercase text-white">Limited</span>}
          </div>
          <p className="mt-6 leading-relaxed text-mute">{product.description}</p>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-mute">Color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full px-4 py-2 text-sm ${color === c ? "bg-ink text-cream" : "bg-white"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full bg-white px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-8 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn-primary flex-1" onClick={() => add(product, qty, color)}>
              Add to Cart
            </button>
          </div>
          <Link to="/custom" className="btn-secondary mt-3 w-full">
            Customize this piece
          </Link>
          <ul className="mt-8 space-y-2 text-sm text-mute">
            {product.details.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="section-title mt-20">You might also loop</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} onQuick={setQuick} />
        ))}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
