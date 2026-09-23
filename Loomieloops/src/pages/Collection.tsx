import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collections, products, type Product } from "../data";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";

export function CollectionPage() {
  const { id } = useParams();
  const col = collections.find((c) => c.id === id) ?? collections[0];
  const list = useMemo(() => products.filter((p) => p.collections.includes(col.id)), [col.id]);
  const [quick, setQuick] = useState<Product | null>(null);

  return (
    <div className="pb-24">
      <div className="relative h-[46vh] min-h-[320px]">
        <img src={col.image} alt={col.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-12">
          <div className="mx-auto w-full max-w-7xl">
            <p className="section-kicker text-rose-200">Collection</p>
            <h1 className="mt-2 font-display text-4xl font-bold text-cream sm:text-6xl">{col.name}</h1>
            <p className="mt-3 max-w-lg text-cream/80">{col.blurb}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl gap-2 overflow-x-auto px-6 hide-scrollbar">
        {collections.map((c) => (
          <Link
            key={c.id}
            to={`/collections/${c.id}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              c.id === col.id ? "bg-ink text-cream" : "bg-white"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onQuick={setQuick} />
        ))}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
