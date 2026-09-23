import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <p className="section-kicker">Our story</p>
      <h1 className="section-title mt-3">Loops for every little moment.</h1>
      <img src="/images/about-making.png" alt="Making process" className="mt-10 rounded-[2rem] shadow-soft" />
      <div className="prose mt-10 max-w-none space-y-5 text-mute leading-relaxed">
        <p>
          Loomieloops is a handmade crochet house from India. We make unique, high-quality pieces for women and men —
          clothing, accessories, bags, hats, cardigans, amigurumi, and one-of-one customs.
        </p>
        <p>
          The personality is a contradiction on purpose: soft yet bold, cozy yet futuristic, cute yet premium.
          Anime-inspired without being childish. Think studio-ghibli light with a cyberpunk wink — pastels, neon, and
          yarn you can feel through the screen.
        </p>
        <p>
          We stitch for Gen Z and young adults who collect fashion the way they collect playlists: cottagecore Sundays,
          Y2K nights, street-style Tuesdays, and the character they loved at 2am.
        </p>
        <p>Handmade in India with love. Custom options always open. Loops that last.</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/shop" className="btn-primary">
          Shop Now
        </Link>
        <Link to="/custom" className="btn-secondary">
          Custom Order
        </Link>
      </div>
    </div>
  );
}
