import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./data";

export type CartItem = {
  product: Product;
  qty: number;
  color: string;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, qty?: number, color?: string) => void;
  remove: (id: string, color: string) => void;
  setQty: (id: string, color: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "loomieloops-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { id: string; qty: number; color: string }[];
      const restored = parsed
        .map((row) => {
          const product = products.find((p) => p.id === row.id);
          if (!product) return null;
          return { product, qty: row.qty, color: row.color };
        })
        .filter(Boolean) as CartItem[];
      setItems(restored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      KEY,
      JSON.stringify(items.map((i) => ({ id: i.product.id, qty: i.qty, color: i.color }))),
    );
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const add = (product: Product, qty = 1, color?: string) => {
      const chosen = color ?? product.colors[0];
      setItems((prev) => {
        const found = prev.find((i) => i.product.id === product.id && i.color === chosen);
        if (found) {
          return prev.map((i) =>
            i.product.id === product.id && i.color === chosen ? { ...i, qty: i.qty + qty } : i,
          );
        }
        return [...prev, { product, qty, color: chosen }];
      });
      setOpen(true);
    };
    const remove = (id: string, color: string) =>
      setItems((prev) => prev.filter((i) => !(i.product.id === id && i.color === color)));
    const setQty = (id: string, color: string, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => !(i.product.id === id && i.color === color))
          : prev.map((i) => (i.product.id === id && i.color === color ? { ...i, qty } : i)),
      );
    const clear = () => setItems([]);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
    return { items, add, remove, setQty, clear, count, subtotal, open, setOpen };
  }, [items, open]);

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
