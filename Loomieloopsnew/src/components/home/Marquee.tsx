export function Marquee() {
  const line = 'Handcrafted  •  One of one  •  Cloud-soft yarn  •  Worldwide delivery  •  Anime editions  •  ';
  return (
    <div className="overflow-hidden border-y border-line bg-paper py-3">
      <div className="marquee-track text-[11px] uppercase tracking-[0.32em] text-muted">
        <span className="px-8">{line.repeat(8)}</span>
        <span className="px-8">{line.repeat(8)}</span>
      </div>
    </div>
  );
}
