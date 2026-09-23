import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONTACT } from '../lib/constants';
import { createOrderId } from '../lib/format';
import { openWhatsApp } from '../lib/whatsapp';
import { useStore, type OrderCustomer, type PayMethod } from '../context/StoreContext';
import { Eyebrow } from '../components/ui/Motion';

const BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak'];

export function CheckoutPage() {
  const { cart, resolveItem, format, cartTotalInr, placeOrder, currency } = useStore();
  const navigate = useNavigate();
  const [pay, setPay] = useState<PayMethod>('upi');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [upi, setUpi] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', holder: '' });
  const [bank, setBank] = useState(BANKS[0]);

  const lines = useMemo(
    () => cart.map((item) => ({ item, ...resolveItem(item) })),
    [cart, resolveItem],
  );

  function setC<K extends keyof OrderCustomer>(k: K, v: string) {
    setCustomer((c) => ({ ...c, [k]: v }));
  }

  function validatePay() {
    if (pay === 'upi') {
      if (!/^[\w.-]{2,}@[\w]{2,}$/i.test(upi.trim())) return 'Enter a valid UPI ID.';
    }
    if (pay === 'card') {
      const num = card.number.replace(/\s/g, '');
      if (!/^\d{16}$/.test(num)) return 'Card number must be 16 digits.';
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return 'Expiry must be MM/YY.';
      if (!/^\d{3}$/.test(card.cvv)) return 'CVV must be 3 digits.';
      if (card.holder.trim().length < 2) return 'Enter the name on card.';
    }
    if (pay === 'netbanking' && !bank) return 'Select a bank.';
    return '';
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (cart.length === 0) return;
    const msg = validatePay();
    if (msg) {
      setError(msg);
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 1400));
    const id = createOrderId();
    placeOrder({
      id,
      items: cart,
      customer,
      payMethod: pay,
      status: 'received',
      createdAt: new Date().toISOString(),
      totalInr: cartTotalInr,
      currency,
    });
    setBusy(false);
    navigate(`/order/${id}`);
  }

  if (cart.length === 0) {
    return (
      <div className="px-6 py-40 text-center">
        <p className="font-display text-4xl italic">Nothing to settle.</p>
        <Link to="/collections" className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em]">
          Shop the drop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 px-6 pb-24 pt-28 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pt-32">
      <div>
        <Eyebrow>Transparent checkout</Eyebrow>
        <h1 className="font-display text-5xl italic">Settle the atelier.</h1>
        <form className="mt-10 space-y-8" onSubmit={onSubmit}>
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.22em]">Delivery</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input label="Full name" value={customer.name} onChange={(v) => setC('name', v)} required />
              <Input label="Email" type="email" value={customer.email} onChange={(v) => setC('email', v)} required />
              <Input label="Phone" value={customer.phone} onChange={(v) => setC('phone', v)} required />
              <Input label="PIN code" value={customer.pincode} onChange={(v) => setC('pincode', v)} required />
              <div className="sm:col-span-2">
                <Input label="Address" value={customer.address} onChange={(v) => setC('address', v)} required />
              </div>
              <Input label="City" value={customer.city} onChange={(v) => setC('city', v)} required />
              <Input label="State" value={customer.state} onChange={(v) => setC('state', v)} required />
            </div>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.22em]">Payment</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(
                [
                  ['upi', 'UPI'],
                  ['card', 'Card'],
                  ['netbanking', 'Net banking'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPay(id)}
                  className={`border py-3 text-[10px] uppercase tracking-[0.16em] ${
                    pay === id ? 'border-ink bg-ink text-paper' : 'border-line'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 border border-line p-4">
              {pay === 'upi' && (
                <div>
                  <Input label="UPI ID" value={upi} onChange={setUpi} placeholder="name@okaxis" />
                  <p className="mt-3 text-xs text-muted">GPay · PhonePe · Paytm · BHIM — instant validation at confirm.</p>
                </div>
              )}
              {pay === 'card' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Input
                      label="Card number"
                      value={card.number}
                      onChange={(v) => setCard({ ...card, number: v.replace(/[^\d\s]/g, '').slice(0, 19) })}
                    />
                  </div>
                  <Input
                    label="Expiry MM/YY"
                    value={card.expiry}
                    onChange={(v) => setCard({ ...card, expiry: v })}
                    placeholder="08/28"
                  />
                  <Input
                    label="CVV"
                    value={card.cvv}
                    onChange={(v) => setCard({ ...card, cvv: v.replace(/\D/g, '').slice(0, 3) })}
                  />
                  <div className="sm:col-span-2">
                    <Input label="Name on card" value={card.holder} onChange={(v) => setCard({ ...card, holder: v })} />
                  </div>
                </div>
              )}
              {pay === 'netbanking' && (
                <label className="block text-[11px] uppercase tracking-[0.18em]">
                  Bank
                  <select
                    className="mt-2 w-full border border-line bg-transparent p-3 text-sm"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    {BANKS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            {error && <p className="mt-3 text-sm text-rose">{error}</p>}
          </section>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink py-4 text-[11px] uppercase tracking-[0.22em] text-paper disabled:opacity-60"
          >
            {busy ? 'Validating payment…' : `Pay ${format(cartTotalInr)}`}
          </button>
        </form>
      </div>

      <aside className="h-fit border border-line p-6 md:sticky md:top-28">
        <p className="text-[11px] uppercase tracking-[0.22em]">Order</p>
        <ul className="mt-6 space-y-4">
          {lines.map(({ item, product, colorwayName, lineInr }) => (
            <li key={item.key} className="flex gap-3 text-sm">
              <img src={product.images[0]} alt="" className="h-16 w-12 object-cover" />
              <div className="flex-1">
                <p>{product.editorialName}</p>
                <p className="text-xs text-muted">
                  {colorwayName} × {item.qty}
                </p>
              </div>
              <p>{format(lineInr)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-line pt-4 text-sm">
          <span>Total</span>
          <span>{format(cartTotalInr)}</span>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Instant validation on UPI, cards, and net banking. You will receive an order ping on email and can confirm on WhatsApp.
          Crafting begins after atelier confirmation — typically {CONTACT.whatsappDisplay}.
        </p>
        <button
          type="button"
          onClick={() =>
            openWhatsApp(
              `Hi Loomie Loops 🧶 Checkout assist — bag total ${format(cartTotalInr)}.\n${lines
                .map((l) => `• ${l.product.name} × ${l.item.qty}`)
                .join('\n')}`,
            )
          }
          className="mt-4 w-full border border-ink py-3 text-[10px] uppercase tracking-[0.18em]"
        >
          Prefer WhatsApp checkout
        </button>
      </aside>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.18em]">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-line bg-transparent p-3 text-sm tracking-normal outline-none focus:border-ink"
      />
    </label>
  );
}
