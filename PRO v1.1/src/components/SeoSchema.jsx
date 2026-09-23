import { useEffect } from 'react'
import { faqs, site } from '../data/content'

export default function SeoSchema() {
  useEffect(() => {
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.legalName,
      alternateName: site.brand,
      url: site.url,
      email: site.email,
      description: site.description,
      sameAs: [site.linkedIn],
      areaServed: 'IN',
      knowsAbout: [
        'Retail staffing',
        'Retail recruitment',
        'Seasonal staffing',
        'Executive search',
        'Store management hiring',
      ],
    }

    const employer = {
      '@context': 'https://schema.org',
      '@type': 'EmploymentAgency',
      name: site.legalName,
      url: site.url,
      email: site.email,
      description:
        'Specialist retail staffing and recruitment for in-store, field management and corporate retail roles.',
      serviceType: [
        'Permanent Staffing',
        'Temporary and Seasonal Staffing',
        'Executive Search',
      ],
    }

    const faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    }

    const nodes = [organization, employer, faqPage].map((data, i) => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = `prostaff-schema-${i}`
      el.text = JSON.stringify(data)
      document.head.appendChild(el)
      return el
    })

    return () => {
      nodes.forEach((el) => el.remove())
    }
  }, [])

  return null
}
