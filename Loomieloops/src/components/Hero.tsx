import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FloatingYarn } from "./Yarn";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <img
        src="/images/hero-banner.png"
        alt="Loomieloops handmade crochet worn by models"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A2230]/70 via-[#2A2230]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2230]/50 via-transparent to-[#2A2230]/20" />
      <div className="grain-overlay absolute inset-0" />
      <FloatingYarn />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:justify-center sm:pb-0">
        <p className="section-kicker text-rose-200">Handmade in India · 2026 drop</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
          Loops Made
          <br />
          for You
        </h1>
        <p className="mt-5 max-w-xl text-base text-cream/85 sm:text-lg">
          Premium handmade crochet for women & men • Anime-inspired collections • Custom orders open
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop" className="btn-primary bg-cream text-ink hover:bg-white">
            Shop the Collection <ArrowRight size={16} />
          </Link>
          <Link to="/custom" className="btn-secondary border-white/30 bg-white/10 text-cream hover:border-neon-pink">
            Custom Order
          </Link>
        </div>
      </div>
    </section>
  );
}
