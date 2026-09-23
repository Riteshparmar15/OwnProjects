import { CONTACT } from './constants';

export function waLink(text: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string) {
  window.open(waLink(text), '_blank', 'noopener,noreferrer');
}

export function productOrderMessage(opts: {
  name: string;
  priceLabel: string;
  colorway: string;
  qty: number;
  notes?: string;
}) {
  const notes = opts.notes?.trim()
    ? `\nCustom notes: ${opts.notes.trim()}`
    : '';
  return `Hi Loomie Loops 🧶\nI'd love to order:\n• ${opts.name}\n• Colourway: ${opts.colorway}\n• Qty: ${opts.qty}\n• ${opts.priceLabel}${notes}`;
}
