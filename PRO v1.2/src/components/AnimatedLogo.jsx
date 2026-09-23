export default function AnimatedLogo({
  variant = "full",
  className = "",
  animated = true,
}) {
  const cls = `anim-logo anim-logo--${variant}${animated ? " is-animated" : ""} ${className}`.trim();

  return (
    <span className={cls} aria-label="ProStafff">
      <svg
        className="anim-logo__mark"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          className="anim-logo__plate"
          x="2"
          y="2"
          width="44"
          height="44"
          rx="10"
          strokeWidth="2"
        />
        <path
          className="anim-logo__p"
          d="M14 34V14h9.2c4.6 0 7.6 2.5 7.6 6.4 0 2.8-1.5 4.9-4 5.8L34 34h-6.4l-5.5-8H20v8H14zm6-13.4h2.9c2.1 0 3.4-1 3.4-2.7s-1.3-2.7-3.4-2.7H20v5.4z"
        />
        <circle className="anim-logo__dot" cx="38" cy="34" r="3.2" />
      </svg>
      {variant !== "mark" && (
        <span className="anim-logo__word">
          ProStafff<span className="anim-logo__period">.</span>
        </span>
      )}
    </span>
  );
}
