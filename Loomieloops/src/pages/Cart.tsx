import { Link } from "react-router-dom";
import { useCart } from "../cart";
import { formatPrice, WHATSAPP } from "../data";

export function CartPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();

  const message = encodeURIComponent(
    `Hi Loomieloops, checkout:%0A${items
      .map((i) => `• ${i.product.name} (${i.color}) x${i.qty}`)
      .join("%0A")}%0ATotal: ${formatPrice(subtotal)}`,
  );

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <h1 className="section-title">Checkout</h1>
      {items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-mute">Nothing in the bag yet.</p>
          <Link to="/shop" className="btn-primary mt-6">
            Shop the Collection
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((i) => (
            <div key={i.product.id + i.color} className="flex gap-4 rounded-3xl bg-white p-4 shadow-card">
              <img src={i.product.image} alt="" className="h-24 w-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="font-display text-lg font-bold">{i.product.name}</p>
                <p className="text-sm text-mute">{i.color}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(i.product.id, i.color, i.qty - 1)}>−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.color, i.qty + 1)}>+</button>
                  </div>
                  <p className="font-semibold">{formatPrice(i.product.price * i.qty)}</p>
                </div>
              </div>
              <button onClick={() => remove(i.product.id, i.color)} className="text-sm text-mute">
                Remove
              </button>
            </div>
          ))}
          <div className="rounded-3xl bg-lavender-50 p-6">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-sm text-mute">Shipping calculated on WhatsApp / Instagram confirmation. Secure checkout · Easy returns.</p>
            <a href={`${WHATSAPP.split("?")[0]}?text=${message}`} className="btn-primary mt-6 w-full" target="_blank" rel="noreferrer">
              Place order on WhatsApp
            </a>
            <button onClick={clear} className="mt-3 w-full text-sm text-mute">
              Clear bag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
