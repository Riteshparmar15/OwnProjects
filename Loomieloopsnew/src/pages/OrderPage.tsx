import { Link, useParams } from 'react-router-dom';
import { CONTACT } from '../lib/constants';
import { downloadInvoice } from '../lib/invoice';
import { openWhatsApp } from '../lib/whatsapp';
import { useStore, type OrderStatus } from '../context/StoreContext';
import { Eyebrow } from '../components/ui/Motion';
import { formatMoney } from '../lib/format';

const STEPS: { id: OrderStatus; label: string }[] = [
  { id: 'received', label: 'Order received' },
  { id: 'crafting', label: 'Stitching / handcrafting' },
  { id: 'quality', label: 'Quality check' },
  { id: 'dispatched', label: 'Dispatched' },
];

export function OrderPage() {
  const { id } = useParams();
  const { getOrder, resolveItem } = useStore();
  const order = getOrder(id ?? '');

  if (!order) {
    return (
      <div className="px-6 py-40 text-center">
        <p className="font-display text-4xl italic">No order under that number.</p>
        <Link to="/" className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em]">
          Home
        </Link>
      </div>
    );
  }

  const lines = order.items.map((item) => ({ item, ...resolveItem(item) }));
  const totalLabel = formatMoney(order.totalInr, order.currency);
  const active = STEPS.findIndex((s) => s.id === order.status);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-32">
      <Eyebrow>Post-order</Eyebrow>
      <h1 className="font-display text-5xl italic">{order.id}</h1>
      <p className="mt-3 text-sm text-muted">
        Confirmed for {order.customer.name}. A ping is ready on email and WhatsApp.
      </p>

      <ol className="mt-12 grid gap-4 sm:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.id}
            className={`border-t-2 pt-3 text-[11px] uppercase tracking-[0.16em] ${
              i <= active ? 'border-ink' : 'border-line text-muted'
            }`}
          >
            0{i + 1}
            <br />
            {s.label}
          </li>
        ))}
      </ol>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {lines.map(({ item, product, colorwayName }) => (
          <li key={item.key} className="flex justify-between py-4 text-sm">
            <span>
              {product.editorialName} · {colorwayName} × {item.qty}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right text-sm">{totalLabel}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => downloadInvoice({ order, lines, totalLabel })}
          className="flex-1 bg-ink py-3 text-[11px] uppercase tracking-[0.2em] text-paper"
        >
          Download invoice
        </button>
        <button
          type="button"
          onClick={() =>
            openWhatsApp(
              `Hi Loomie Loops 🧶 Order ${order.id} confirmed. ${order.customer.name}, ${totalLabel}. Please acknowledge.`,
            )
          }
          className="flex-1 border border-ink py-3 text-[11px] uppercase tracking-[0.2em]"
        >
          WhatsApp confirmation
        </button>
        <a
          href={`mailto:${order.customer.email}?cc=${CONTACT.email}&subject=${encodeURIComponent(
            `Loomie Loops ${order.id}`,
          )}&body=${encodeURIComponent(`Your order ${order.id} is received. Total ${totalLabel}.`)}`}
          className="flex-1 border border-ink py-3 text-center text-[11px] uppercase tracking-[0.2em]"
        >
          Email ping
        </a>
      </div>
    </div>
  );
}
