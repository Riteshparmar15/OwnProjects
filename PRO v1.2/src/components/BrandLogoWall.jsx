import { useMemo, useRef, useState } from "react";
import { REAL_BRANDS, brandLogoUrl } from "../data/brands";

const FILTERS = [
  { id: "all", label: "All brands" },
  { id: "global", label: "Global" },
  { id: "india", label: "India" },
  { id: "dubai", label: "Dubai & GCC" },
];

function BrandLogo({ brand }) {
  const [src, setSrc] = useState(brandLogoUrl(brand.domain));
  const [failed, setFailed] = useState(false);

  const onError = () => {
    if (src.includes("clearbit")) {
      setSrc(
        `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`
      );
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <span className="brand-logo-fallback" aria-hidden="true">
        {brand.name
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase()}
      </span>
    );
  }

  return (
    <img
      className="brand-logo-img"
      src={src}
      alt={`${brand.name} logo`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={onError}
    />
  );
}

function BrandCard({ brand, index }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={ref}
      className="brand-card reveal is-visible"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="brand-card__inner">
        <div className="brand-card__logo">
          <BrandLogo brand={brand} />
        </div>
        <h3 className="brand-card__name">{brand.name}</h3>
        <p className="brand-card__tag">{brand.tag}</p>
      </div>
    </article>
  );
}

export default function BrandLogoWall() {
  const [filter, setFilter] = useState("all");

  const brands = useMemo(
    () =>
      filter === "all"
        ? REAL_BRANDS
        : REAL_BRANDS.filter((b) => b.region === filter),
    [filter]
  );

  const marquee = useMemo(() => [...REAL_BRANDS, ...REAL_BRANDS], []);

  return (
    <section className="brand-wall" aria-label="Global retail brand network">
      <div className="container brand-wall__head reveal">
        <span className="section-label">Global · India · Dubai</span>
        <h2 className="section-title section-title--wide">
          Real brands. Real markets. Professional retail talent.
        </h2>
        <p className="section-lead">
          From Rolex and H&amp;M to Reliance, Titan, Nykaa, Chalhoub, Landmark and
          Majid Al Futtaim ecosystems — ProStafff staffs high-value retail
          across India, Dubai &amp; the GCC, and international brand networks.
        </p>

        <div className="brand-filters" role="tablist" aria-label="Brand regions">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`brand-filter${filter === f.id ? " is-active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="brand-wall__grid container">
        {brands.map((brand, i) => (
          <BrandCard key={brand.id} brand={brand} index={i} />
        ))}
      </div>

      <div className="logo-marquee" aria-hidden="true">
        <div className="logo-marquee__track logo-marquee__track--logos">
          {marquee.map((brand, i) => (
            <div key={`${brand.id}-m-${i}`} className="logo-marquee__item logo-marquee__item--logo">
              <span className="logo-marquee__mark">
                <BrandLogo brand={brand} />
              </span>
              <span className="logo-marquee__name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
