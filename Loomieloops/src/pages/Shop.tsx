import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";
import { products, type Product } from "../data";

const filters = ["All", "Cardigan", "Hat", "Bag", "Vest", "Scarf", "Amigurumi", "Hoodie", "Jacket", "Bolero", "Gloves", "Custom"];

export function Shop() {
  const [filter, setFilter] = useState("All");
  const [quick, setQuick] = useState<Product | null>(null);
  const list = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <p className="section-kicker">Shop</p>
      <h1 className="section-title mt-3">The collection.</h1>
      <p className="mt-3 max-w-xl text-mute">Premium handmade crochet — bestsellers, limited editions, and custom-ready pieces.</p>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              filter === f ? "bg-ink text-cream" : "bg-white text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onQuick={setQuick} />
        ))}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
