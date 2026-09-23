import { useEffect } from 'react'

export default function Seo({
  title,
  description = 'ProStafff Solution Private Limited — retail recruitment specialists connecting high-performing talent with leading retail brands.',
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ProStafff Solution`
      : 'ProStafff Solution Private Limited | Retail Recruitment Specialists'
    document.title = fullTitle

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])

  return null
}
