import { Link } from 'react-router-dom'

export default function Button({
  to,
  href,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
