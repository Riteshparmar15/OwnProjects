import { Link } from "react-router-dom";
import { INSTAGRAM, WHATSAPP } from "../data";
import { YarnMark } from "./Yarn";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/5 bg-[#2A2230] text-cream">
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-lavender-500/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-neon-pink/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <YarnMark className="h-8 w-8" />
            <span className="font-display text-xl font-bold">Loomieloops</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Handmade with Love • Loops that Last. Premium crochet for every soul — stitched in India, worn worldwide.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            <Link to="/shop">Shop</Link>
            <Link to="/collections/premium">Collections</Link>
            <Link to="/custom">Custom Order</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">Care</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            <span>Handmade • Secure checkout</span>
            <span>Easy 7-day returns</span>
            <span>India-first + worldwide shipping</span>
            <span>Custom orders welcome</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">Say hi</p>
          <p className="mt-4 text-sm text-cream/80">DM us a character, a color, a feeling. We’ll stitch it.</p>
          <div className="mt-5 flex flex-col gap-3">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary bg-cream text-ink hover:bg-white">
              WhatsApp order
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn-secondary border-cream/20 bg-transparent text-cream hover:border-neon-pink">
              Instagram @loomieloops
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-6 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Loomieloops. Crochet for Every Soul.
      </div>
    </footer>
  );
}
