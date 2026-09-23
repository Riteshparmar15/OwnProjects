import { images, unsplashParams } from '../data/content'

export function ResponsiveImage({
  baseSrc,
  alt,
  className = '',
  widths = [480, 768, 1080, 1400],
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  aspectClass = '',
}) {
  const srcSet = widths
    .map((w) => `${baseSrc}${unsplashParams(w)} ${w}w`)
    .join(', ')
  const src = `${baseSrc}${unsplashParams(widths[Math.min(2, widths.length - 1)])}`

  return (
    <div className={`img-zoom ${aspectClass} ${className}`.trim()}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={widths[widths.length - 1]}
        height={Math.round(widths[widths.length - 1] * 0.7)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  )
}

export function getImage(key) {
  return images[key]
}
