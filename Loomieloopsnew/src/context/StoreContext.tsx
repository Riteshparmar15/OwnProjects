import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { products, type Product } from '../data/products';
import { type Currency } from '../lib/constants';
import { formatMoney } from '../lib/format';

export interface CartItem {
  key: string;
  productId: string;
  colorwayId: string;
  qty: number;
  notes: string;
}

export type OrderStatus = 'received' | 'crafting' | 'quality' | 'dispatched';
export type PayMethod = 'upi' | 'card' | 'netbanking';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  payMethod: PayMethod;
  status: OrderStatus;
  createdAt: string;
  totalInr: number;
  currency: Currency;
}

type Drawer = 'menu' | 'cart' | 'search' | null;

interface StoreValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amountInr: number) => string;
  cart: CartItem[];
  cartCount: number;
  cartTotalInr: number;
  addToCart: (item: Omit<CartItem, 'key'> & { key?: string }, opts?: { open?: boolean }) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  resolveItem: (item: CartItem) => { product: Product; colorwayName: string; lineInr: number };
  drawer: Drawer;
  openDrawer: (d: Exclude<Drawer, null>) => void;
  closeDrawer: () => void;
  orders: Order[];
  placeOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

const CART_KEY = 'll-cart';
const ORDER_KEY = 'll-orders';
const CUR_KEY = 'll-currency';

const StoreContext = createContext<StoreValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() =>
    readJson<Currency>(CUR_KEY, 'INR'),
  );
  const [cart, setCart] = useState<CartItem[]>(() => readJson(CART_KEY, []));
  const [orders, setOrders] = useState<Order[]>(() => readJson(ORDER_KEY, []));
  const [drawer, setDrawer] = useState<Drawer>(null);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(CUR_KEY, JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setDrawer((d) => (d === 'search' ? null : 'search'));
      }
      if (e.key === 'Escape') setDrawer(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), []);
  const format = useCallback((amountInr: number) => formatMoney(amountInr, currency), [currency]);

  const addToCart = useCallback((item: Omit<CartItem, 'key'> & { key?: string }, opts?: { open?: boolean }) => {
    setCart((prev) => {
      const key = item.key ?? `${item.productId}-${item.colorwayId}-${item.notes}`;
      const existing = prev.find(
        (p) =>
          p.productId === item.productId &&
          p.colorwayId === item.colorwayId &&
          p.notes === item.notes,
      );
      if (existing) {
        return prev.map((p) =>
          p.key === existing.key ? { ...p, qty: p.qty + item.qty } : p,
        );
      }
      return [...prev, { ...item, key }];
    });
    if (opts?.open !== false) setDrawer('cart');
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, qty } : p)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((p) => p.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const resolveItem = useCallback((item: CartItem) => {
    const product = products.find((p) => p.id === item.productId)!;
    const colorway = product.colorways.find((c) => c.id === item.colorwayId);
    return {
      product,
      colorwayName: colorway?.name ?? 'Atelier default',
      lineInr: product.price * item.qty,
    };
  }, []);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const cartTotalInr = useMemo(
    () => cart.reduce((n, i) => n + resolveItem(i).lineInr, 0),
    [cart, resolveItem],
  );

  const placeOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  }, []);

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  const value = useMemo<StoreValue>(
    () => ({
      currency,
      setCurrency,
      format,
      cart,
      cartCount,
      cartTotalInr,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      resolveItem,
      drawer,
      openDrawer: (d) => setDrawer(d),
      closeDrawer: () => setDrawer(null),
      orders,
      placeOrder,
      getOrder,
    }),
    [
      currency,
      setCurrency,
      format,
      cart,
      cartCount,
      cartTotalInr,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      resolveItem,
      drawer,
      orders,
      placeOrder,
      getOrder,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
