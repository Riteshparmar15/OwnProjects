export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  headerClassName = '',
  action,
  soft = false,
  surface = false,
  wide = false,
}) {
  const sectionClass = [
    'section',
    soft ? 'section--soft' : '',
    surface ? 'section--surface' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={sectionClass}>
      <div className={wide ? 'container container--wide' : 'container'}>
        {(eyebrow || title || lead || action) && (
          <div className={`section-header ${action ? 'section-header--row' : ''} ${headerClassName}`.trim()}>
            <div>
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {title && <h2 className="section-heading">{title}</h2>}
              {lead && <p className="section-lead">{lead}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
