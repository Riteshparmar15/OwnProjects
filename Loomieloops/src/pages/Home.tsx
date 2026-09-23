import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Globe,
  Heart,
  Palette,
  Sparkles,
  Users,
  Wand2,
  ShieldCheck,
  RefreshCcw,
  HandHeart,
} from "lucide-react";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";
import {
  collections,
  instagramPosts,
  products,
  testimonials,
  INSTAGRAM,
  type Product,
} from "../data";

const why = [
  { icon: HandHeart, title: "100% Handmade", text: "Every stitch is made to order energy — no factory copies." },
  { icon: Users, title: "Gender-inclusive", text: "Silhouettes for her, him, and everyone in between." },
  { icon: Heart, title: "Premium soft yarns", text: "Skin-kind merino, cotton, and pearl viscose blends." },
  { icon: Sparkles, title: "Anime & modern drops", text: "Character-inspired, never childish. Collectible fashion." },
  { icon: Wand2, title: "Custom orders", text: "Tell us a color, character, or feeling. We stitch it." },
  { icon: Globe, title: "Ships from India", text: "India-first delivery + worldwide packed with love." },
];

export function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const featured = products.filter((p) => p.bestseller || p.limited).slice(0, 8);

  return (
    <div>
      <Hero />

      <div className="border-y border-ink/5 bg-white/50">
        <div className="marquee-track flex w-[200%] gap-10 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-mute">
          {[0, 1].map((n) => (
            <div key={n} className="flex min-w-[100%] justify-around">
              {["Handmade in India", "Secure Checkout", "Easy Returns", "Custom Orders Open", "Loops that Last"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Palette size={12} className="text-neon-pink" /> {t}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Featured collections</p>
            <h2 className="section-title mt-3">Find your loop.</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-semibold text-neon-pink sm:block">
            View all
          </Link>
        </div>
        <div className="mt-10 flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {collections.map((c) => (
            <Link
              key={c.id}
              to={`/collections/${c.id}`}
              className="group relative min-w-[78%] snap-start overflow-hidden rounded-[1.8rem] sm:min-w-[340px]"
            >
              <img src={c.image} alt={c.name} className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-cream/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-lavender-50/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">The drop</p>
          <h2 className="section-title mt-3">Pieces people collect.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onQuick={setQuick} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/shop" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="relative">
          <img src="/images/about-making.png" alt="Handmade crochet process" className="rounded-[2rem] object-cover shadow-soft" />
          <img
            src="/images/product-pixel-heart.png"
            alt=""
            className="absolute -bottom-8 -right-4 hidden w-40 rounded-3xl border-4 border-cream shadow-card sm:block"
          />
        </div>
        <div>
          <p className="section-kicker">Our story</p>
          <h2 className="section-title mt-3">Handmade in India with love.</h2>
          <p className="mt-5 text-mute leading-relaxed">
            Loomieloops started with a hook, a late-night anime episode, and the feeling that fashion could be softer —
            and still loud. We stitch unique crochet for women and men: cardigans you want to live in, bags that get
            screenshotted, gifts that feel like a secret.
          </p>
          <p className="mt-4 text-mute leading-relaxed">
            Every piece is made for a little moment — a first date, a concert, a quiet Sunday. Custom options are always
            open because no two souls loop the same way.
          </p>
          <Link to="/about" className="btn-secondary mt-8">
            Read the story
          </Link>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] bg-white p-6 shadow-card sm:grid-cols-3">
          {[
            { icon: HandHeart, t: "Handmade" },
            { icon: ShieldCheck, t: "Secure Checkout" },
            { icon: RefreshCcw, t: "Easy Returns" },
          ].map((b) => (
            <div key={b.t} className="flex items-center justify-center gap-3 py-2 text-sm font-semibold">
              <b.icon size={18} className="text-lavender-400" /> {b.t}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="section-kicker">Why Loomieloops</p>
        <h2 className="section-title mt-3">Soft. Bold. Collectible.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <div key={w.title} className="rounded-[1.6rem] bg-white p-6 shadow-card">
              <w.icon className="text-neon-pink" />
              <h3 className="mt-4 font-display text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-mute">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#2A2230] px-6 py-24 text-cream">
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-neon-pink/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-kicker text-rose-200">Custom order</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Want something unique?</h2>
            <p className="mt-4 max-w-lg text-cream/75">
              Tell us your anime character, color, or idea — we’ll stitch it for you. Original designs, photo proofs,
              and a piece that exists only once.
            </p>
          </div>
          <Link
            to="/custom"
            className="rounded-[2rem] bg-gradient-to-br from-lavender-300 to-neon-pink p-8 text-ink shadow-soft"
          >
            <p className="font-display text-3xl font-bold">Start a custom loop</p>
            <p className="mt-2 text-sm">10–18 day make time · Worldwide packing</p>
            <span className="btn-primary mt-6 bg-ink text-cream">Customize</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="section-kicker">Social proof</p>
        <h2 className="section-title mt-3">They fell in love. Then they collected.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="overflow-hidden rounded-[1.6rem] bg-white shadow-card">
              <img src={t.image} alt="" className="h-48 w-full object-cover" />
              <figcaption className="p-5">
                <p className="text-sm leading-relaxed text-ink/80">“{t.quote}”</p>
                <p className="mt-3 text-sm font-semibold">
                  {t.name} · <span className="font-normal text-mute">{t.city}</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-lavender-400">{t.tag}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-kicker">@loomieloops</p>
              <h2 className="section-title mt-3">The feed is a moodboard.</h2>
            </div>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-sm font-semibold text-neon-pink">
              Follow
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {instagramPosts.map((src) => (
              <a key={src} href={INSTAGRAM} target="_blank" rel="noreferrer" className="overflow-hidden rounded-2xl">
                <img src={src} alt="Loomieloops Instagram" className="aspect-square w-full object-cover transition hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
