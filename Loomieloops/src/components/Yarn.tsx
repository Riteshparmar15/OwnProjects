export function YarnMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M32 8c10 8 18 12 18 24s-8 22-18 24C22 54 14 44 14 32S22 16 32 8z"
        fill="#E8B4B8"
      />
      <path
        d="M32 16c7 5 12 8 12 16s-5 16-12 18c-7-2-12-10-12-18s5-11 12-16z"
        fill="#C9A8E0"
      />
      <circle cx="32" cy="32" r="6" fill="#FBF7F2" />
      <circle cx="32" cy="32" r="2.6" fill="#FF6B9D" />
    </svg>
  );
}

export function YarnLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg viewBox="0 0 120 120" className="h-20 w-20 yarn-spin" aria-hidden>
        <circle cx="60" cy="60" r="34" fill="#E8D5F2" />
        <path
          d="M60 26c18 12 26 18 26 34s-10 30-26 34C44 90 34 76 34 60s10-22 26-34z"
          fill="#E8B4B8"
        />
        <path
          d="M28 60c8-22 20-34 32-40"
          stroke="#FF6B9D"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="60" r="8" fill="#FBF7F2" />
        <circle cx="60" cy="60" r="3.5" fill="#9D4EDD" />
      </svg>
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-lavender-400">
        looping love
      </p>
    </div>
  );
}

export function FloatingYarn() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[
        { l: "8%", t: "18%", d: "0s", s: "w-16" },
        { l: "78%", t: "12%", d: "1.2s", s: "w-12" },
        { l: "88%", t: "58%", d: "0.6s", s: "w-20" },
        { l: "12%", t: "70%", d: "1.8s", s: "w-10" },
        { l: "46%", t: "8%", d: "0.4s", s: "w-8" },
      ].map((n) => (
        <svg
          key={n.l + n.t}
          viewBox="0 0 80 80"
          className={`absolute ${n.s} opacity-70 floaty`}
          style={{ left: n.l, top: n.t, animationDelay: n.d }}
        >
          <path
            d="M10 40c12-22 22-28 30-28s18 10 30 28"
            stroke="#C9A8E0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="40" cy="40" r="10" fill="#FF6B9D" opacity="0.35" />
        </svg>
      ))}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="sparkle absolute h-1.5 w-1.5 rounded-full bg-white"
          style={{
            left: `${12 + i * 8}%`,
            top: `${18 + (i % 5) * 12}%`,
            animationDelay: `${i * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}
