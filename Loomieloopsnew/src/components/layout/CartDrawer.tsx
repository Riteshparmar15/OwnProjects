import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { openWhatsApp } from '../../lib/whatsapp';

export function CartDrawer() {
  const {
    drawer,
    closeDrawer,
    cart,
    resolveItem,
    updateQty,
    removeItem,
    format,
    cartTotalInr,
  } = useStore();
  const open = drawer === 'cart';

  const waText = cart
    .map((item) => {
      const { product, colorwayName } = resolveItem(item);
      return `• ${product.name} — ${colorwayName} × ${item.qty}`;
    })
    .join('\n');

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            className="fixed inset-0 z-[60] bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-line bg-paper"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="text-[11px] uppercase tracking-[0.28em]">Bag</p>
              <button type="button" onClick={closeDrawer} aria-label="Close">
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="px-6 py-16">
                  <p className="font-display text-3xl italic">Your bag is quiet.</p>
                  <p className="mt-3 text-sm text-muted">The next one-of-one is waiting in the collections.</p>
                  <Link
                    to="/collections"
                    onClick={closeDrawer}
                    className="mt-8 inline-block border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.2em]"
                  >
                    Enter the shop
                  </Link>
                </div>
              ) : (
                <ul>
                  {cart.map((item) => {
                    const { product, colorwayName, lineInr } = resolveItem(item);
                    return (
                      <li key={item.key} className="flex gap-4 border-b border-line px-6 py-5">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="h-24 w-20 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-xl italic leading-none">{product.editorialName}</p>
                          <p className="mt-1 truncate text-xs text-muted">{colorwayName}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <button type="button" onClick={() => updateQty(item.key, item.qty - 1)} aria-label="Decrease">
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-sm">{item.qty}</span>
                            <button type="button" onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{format(lineInr)}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="mt-2 text-[10px] uppercase tracking-widest text-muted"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-line p-6">
                <div className="mb-4 flex justify-between text-sm">
                  <span className="uppercase tracking-[0.18em] text-muted">Subtotal</span>
                  <span>{format(cartTotalInr)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeDrawer}
                  className="block bg-ink py-3.5 text-center text-[11px] uppercase tracking-[0.22em] text-paper transition hover:bg-ink/90"
                >
                  Instant checkout
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      `Hi Loomie Loops 🧶 I'd like to order:\n${waText}\nTotal: ${format(cartTotalInr)}`,
                    )
                  }
                  className="mt-2 block w-full border border-ink py-3.5 text-center text-[11px] uppercase tracking-[0.22em]"
                >
                  Order via WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
