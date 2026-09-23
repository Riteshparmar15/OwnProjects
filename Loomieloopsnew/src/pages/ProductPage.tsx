import { useMemo, useRef, useState, type MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProduct, type Product } from '../data/products';
import { CRAFT_WINDOW } from '../lib/constants';
import { useStore } from '../context/StoreContext';
import { openWhatsApp, productOrderMessage } from '../lib/whatsapp';
import { Magnetic } from '../components/ui/Motion';

export function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id ?? '');

  if (!product) {
    return (
      <div className="px-6 py-40 text-center">
        <p className="font-display text-4xl italic">This piece has left the atelier.</p>
        <Link to="/collections" className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em]">
          Return to collections
        </Link>
      </div>
    );
  }

  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { format, addToCart } = useStore();

  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colorways[0]?.id ?? '');
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const [spin, setSpin] = useState(0);
  const drag = useRef<{ x: number; spinning: boolean }>({ x: 0, spinning: false });

  const colorway = useMemo(
    () => product.colorways.find((c) => c.id === color) ?? product.colorways[0],
    [product, color],
  );

  const img = product.images[active] ?? product.images[0];
  const priceLabel = `${format(product.price * qty)} · ${colorway?.name} × ${qty}`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (drag.current.spinning) {
      const dx = e.clientX - drag.current.x;
      setSpin((s) => s + dx * 0.45);
      drag.current.x = e.clientX;
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      on: true,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  function add(opts?: { open?: boolean }) {
    addToCart(
      {
        productId: product.id,
        colorwayId: colorway?.id ?? product.colorways[0].id,
        qty,
        notes,
      },
      opts,
    );
  }

  function waOrder() {
    openWhatsApp(
      productOrderMessage({
        name: product.name,
        priceLabel,
        colorway: colorway?.name ?? '',
        qty,
        notes,
      }),
    );
  }

  return (
    <div className="grid gap-10 px-6 pb-24 pt-24 md:grid-cols-2 md:gap-0 md:px-0 md:pt-20 lg:min-h-screen">
      <div className="md:sticky md:top-20 md:h-[calc(100svh-5rem)] md:border-r md:border-line">
        <div
          className="relative h-[70vw] max-h-[720px] cursor-grab overflow-hidden bg-paper-2 active:cursor-grabbing md:h-full md:max-h-none"
          onMouseMove={onMove}
          onMouseLeave={() => {
            setZoom((z) => ({ ...z, on: false }));
            drag.current.spinning = false;
          }}
          onMouseDown={(e) => {
            drag.current = { x: e.clientX, spinning: true };
          }}
          onMouseUp={() => {
            drag.current.spinning = false;
          }}
        >
          <img
            src={img}
            alt={product.name}
            className="h-full w-full object-cover transition duration-200"
            style={{
              transform: `scale(${zoom.on ? 1.55 : 1}) rotateY(${spin}deg)`,
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
              filter: `sepia(0.15) saturate(1.05)`,
              boxShadow: `inset 0 0 80px ${colorway?.hex}33`,
            }}
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-25 transition"
            style={{ background: colorway?.hex }}
          />
          <span className="absolute left-4 top-4 bg-paper/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur">
            360° · Drag to spin · Hover to zoom
          </span>
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 p-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`h-16 w-14 overflow-hidden border ${i === active ? 'border-ink' : 'border-transparent'}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center md:px-12 lg:px-20">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{product.categoryLabel}</p>
        <h1 className="mt-3 font-display text-5xl italic leading-none md:text-7xl">{product.editorialName}</h1>
        <p className="mt-2 text-sm text-muted">{product.name}</p>
        <p className="mt-6 text-lg">{format(product.price)}</p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{product.story}</p>

        <fieldset className="mt-10">
          <legend className="text-[11px] uppercase tracking-[0.2em]">Colourway</legend>
          <div className="mt-3 flex gap-3">
            {product.colorways.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                className={`h-9 w-9 rounded-full border-2 ${color === c.id ? 'border-ink scale-110' : 'border-line'}`}
                style={{ background: c.hex }}
                aria-label={c.name}
                title={c.name}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">{colorway?.name}</p>
        </fieldset>

        <div className="mt-8 flex items-center gap-6">
          <p className="text-[11px] uppercase tracking-[0.2em]">Quantity</p>
          <div className="flex items-center border border-line">
            <button type="button" className="px-3 py-2" onClick={() => setQty((n) => Math.max(1, n - 1))}>
              −
            </button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button type="button" className="px-3 py-2" onClick={() => setQty((n) => n + 1)}>
              +
            </button>
          </div>
        </div>

        <label className="mt-8 block">
          <span className="text-[11px] uppercase tracking-[0.2em]">Custom message / character notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Bespoke character details, personalisation, gift note…"
            className="mt-2 w-full border border-line bg-transparent p-3 text-sm outline-none focus:border-ink"
          />
        </label>

        <div className="mt-8 border border-line px-4 py-3 text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Production</p>
          <p className="mt-1">Estimated Crafting & Dispatch Time: {CRAFT_WINDOW}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Magnetic>
            <button
              type="button"
              onClick={() => add()}
              className="w-full bg-ink py-4 text-[11px] uppercase tracking-[0.22em] text-paper"
            >
              Add to cart
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={() => {
              add({ open: false });
              navigate('/checkout');
            }}
            className="w-full border border-ink py-4 text-[11px] uppercase tracking-[0.22em]"
          >
            Instant checkout
          </button>
          <button
            type="button"
            onClick={waOrder}
            className="w-full bg-sage/40 py-4 text-[11px] uppercase tracking-[0.22em]"
          >
            1-click WhatsApp order
          </button>
        </div>
      </div>
    </div>
  );
}
