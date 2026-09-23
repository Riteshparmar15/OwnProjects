import { useEffect, useState } from "react";
import { SHOWCASE_SCENES } from "../data/brands";

export default function GlobalShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SHOWCASE_SCENES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const scene = SHOWCASE_SCENES[active];

  return (
    <section className="global-showcase" aria-label="Global retail showcase">
      <div className="global-showcase__stage">
        {SHOWCASE_SCENES.map((s, i) => (
          <div
            key={s.id}
            className={`global-showcase__slide${i === active ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== active}
          />
        ))}
        <div className="global-showcase__veil" />
        <div className="global-showcase__depth" aria-hidden="true" />

        <div className="container global-showcase__content">
          <span className="section-label section-label--on-dark">
            Immersive global footprint
          </span>
          <h2 className="global-showcase__title">{scene.title}</h2>
          <p className="global-showcase__sub">{scene.subtitle}</p>

          <div className="global-showcase__dots" role="tablist">
            {SHOWCASE_SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={s.title}
                className={`global-showcase__dot${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
