import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products, formatPrice } from "../data";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.colors.join(" ").toLowerCase().includes(s),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] grid place-items-start bg-ink/40 p-4 pt-24 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-cream p-5 shadow-2xl">
        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3">
          <Search size={18} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cardigans, hats, custom..."
            className="w-full bg-transparent text-sm outline-none"
          />
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <ul className="mt-4 max-h-[50vh] space-y-2 overflow-y-auto">
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to={`/product/${p.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl p-2 hover:bg-white"
              >
                <img src={p.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-mute">
                    {p.category} · {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
