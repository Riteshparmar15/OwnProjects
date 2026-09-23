import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../cart";
import { formatPrice, WHATSAPP } from "../data";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();

  if (!open) return null;

  const message = encodeURIComponent(
    `Hi Loomieloops, I'd like to order:\n${items
      .map((i) => `• ${i.product.name} (${i.color}) x${i.qty}`)
      .join("\n")}\nTotal: ${formatPrice(subtotal)}`,
  );

  return (
    <div className="fixed inset-0 z-[70]">
      <button className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close cart" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-xl font-bold">Your loops</h2>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-mute">Your bag is empty — the collection is waiting.</p>
              <Link to="/shop" onClick={() => setOpen(false)} className="btn-primary mt-6">
                Shop the Collection
              </Link>
            </div>
          )}
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.product.id + item.color} className="flex gap-3 rounded-2xl bg-white p-3 shadow-card">
                <img src={item.product.image} alt="" className="h-24 w-20 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="truncate font-medium">{item.product.name}</p>
                      <p className="text-xs text-mute">{item.color}</p>
                    </div>
                    <button onClick={() => remove(item.product.id, item.color)} className="text-mute">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-lavender-50 px-2 py-1">
                      <button onClick={() => setQty(item.product.id, item.color, item.qty - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm">{item.qty}</span>
                      <button onClick={() => setQty(item.product.id, item.color, item.qty + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(item.product.price * item.qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {items.length > 0 && (
          <div className="border-t border-ink/10 p-5">
            <div className="mb-4 flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <Link to="/cart" onClick={() => setOpen(false)} className="btn-primary mb-3 w-full">
              Checkout
            </Link>
            <a
              href={`${WHATSAPP.split("?")[0]}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full"
            >
              Order on WhatsApp
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
