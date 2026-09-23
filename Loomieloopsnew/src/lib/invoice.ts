import type { CartItem, Order } from '../context/StoreContext';
import type { Product } from '../data/products';
import { CONTACT } from './constants';

export function downloadInvoice(opts: {
  order: Order;
  lines: { item: CartItem; product: Product; colorwayName: string; lineInr: number }[];
  totalLabel: string;
}) {
  const { order, lines, totalLabel } = opts;
  const rows = lines
    .map(
      (l) =>
        `<tr><td>${l.product.name}</td><td>${l.colorwayName}</td><td>${l.item.qty}</td><td>${l.item.notes || '—'}</td></tr>`,
    )
    .join('');
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>Invoice ${order.id}</title>
<style>
  body{font-family:Georgia,serif;padding:48px;color:#121212;background:#f3efe8}
  h1{font-style:italic;font-weight:400;font-size:36px}
  table{width:100%;border-collapse:collapse;margin-top:24px;font-size:14px}
  td,th{border-bottom:1px solid #d6d0c6;padding:8px 4px;text-align:left}
  .muted{color:#6b6560;font-size:12px;letter-spacing:.16em;text-transform:uppercase}
</style></head>
<body>
  <p class="muted">Loomie Loops · Atelier invoice</p>
  <h1>${order.id}</h1>
  <p>${order.customer.name}<br/>${order.customer.address}, ${order.customer.city} ${order.customer.pincode}<br/>${order.customer.email} · ${order.customer.phone}</p>
  <table><thead><tr><th>Piece</th><th>Colourway</th><th>Qty</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table>
  <p><strong>Total ${totalLabel}</strong> · ${order.payMethod.toUpperCase()} · ${new Date(order.createdAt).toLocaleString('en-IN')}</p>
  <p class="muted">Little loops, big feelings. · ${CONTACT.email}</p>
</body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LoomieLoops-Invoice-${order.id}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
