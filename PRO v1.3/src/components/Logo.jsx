export default function Logo({
  variant = 'full',
  theme = 'dark',
  className = '',
  markClassName = '',
  showWordmark = true,
}) {
  const isLight = theme === 'light'
  const nameClass = isLight ? 'text-cream' : 'text-ink'
  const subClass = isLight ? 'text-cream/60' : 'text-navy/55'
  const markSrc = isLight ? './brand/prostafff-mark-light.svg' : './brand/prostafff-mark.png'

  return (
    <span className={`inline-flex items-center gap-2.5 min-w-0 ${className}`}>
      <img
        src={markSrc}
        alt=""
        width={40}
        height={40}
        className={`h-9 w-9 shrink-0 object-contain md:h-10 md:w-10 ${markClassName}`}
      />
      {showWordmark && (
        <span className="min-w-0 leading-tight">
          <span className={`block font-display text-[15px] font-bold tracking-tight md:text-base ${nameClass}`}>
            ProStafff
          </span>
          {variant === 'full' && (
            <span
              className={`hidden text-[10px] font-medium uppercase tracking-[0.16em] sm:block ${subClass}`}
            >
              Solution
            </span>
          )}
        </span>
      )}
    </span>
  )
}
