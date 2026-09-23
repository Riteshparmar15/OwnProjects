import { useEffect, useRef, useState } from "react";

const METRICS = [
  { value: 500, suffix: "+", label: "Brand collaborations supported" },
  { value: 12, suffix: "+", label: "Markets & city hubs spanned" },
  { value: 98, suffix: "%", label: "Culture-fit focus on shortlists" },
  { value: 48, suffix: "h", label: "Surge response for peak calendars" },
];

function useCountUp(target, active, duration = 1400) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setN(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return n;
}

function Metric({ value, suffix, label, active }) {
  const n = useCountUp(value, active);
  return (
    <article className="impact-item">
      <p className="impact-value">
        {n}
        <span>{suffix}</span>
      </p>
      <p className="impact-label">{label}</p>
    </article>
  );
}

export default function ImpactStrip() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impact-strip" ref={ref} aria-label="High-value impact">
      <div className="container">
        <div className="impact-head reveal">
          <span className="section-label">High-value impact</span>
          <h2 className="section-title section-title--wide">
            Numbers that reflect how seriously we take every collaboration.
          </h2>
        </div>
        <div className="impact-grid">
          {METRICS.map((m) => (
            <Metric key={m.label} {...m} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
