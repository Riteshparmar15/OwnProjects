/** Central content for ProStaff — update here without touching components. */

export const site = {
  brand: 'ProStaff',
  legalName: 'ProStafff Solution Private Limited',
  tagline: 'Connecting Talent with Opportunity.',
  email: 'contact@prostafffsolution.com',
  linkedIn: 'https://www.linkedin.com/company/prostafff-solution-private-limited',
  url: 'https://prostafffsolution.com/',
  description:
    'Retail-focused staffing for national retailers, luxury/lifestyle brands and e-commerce businesses across permanent, seasonal and executive hiring.',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Retail Roles', href: '#retail-roles' },
  { label: 'Contact Us', href: '#contact' },
]

export const images = {
  hero: {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    alt: 'Modern retail store interior with carefully merchandised apparel displays',
  },
  about: {
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    alt: 'Retail associate assisting a customer on the shop floor',
  },
  services: [
    {
      src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
      alt: 'Premium fashion boutique with curated clothing rails',
    },
    {
      src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
      alt: 'Busy retail floor during a high-traffic shopping period',
    },
    {
      src: 'https://images.unsplash.com/photo-1556745753-b2904692e3fc',
      alt: 'Retail manager speaking with team members in store',
    },
  ],
  roles: [
    {
      src: 'https://images.unsplash.com/photo-1555529902-52614cc3b0d0',
      alt: 'Store associates working on a contemporary retail floor',
    },
    {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      alt: 'Retail leader in a professional meeting setting',
    },
    {
      src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
      alt: 'Warehouse and e-commerce fulfilment operations team',
    },
  ],
  candidate: {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    alt: 'Fashion retail team collaborating in a premium store environment',
  },
}

export const unsplashParams = (w, q = 75) =>
  `?auto=format&fit=crop&w=${w}&q=${q}`

export const trustItems = [
  {
    title: '100% Retail Focused',
    text: 'Specialists, not generalists',
  },
  {
    title: 'High-Volume Seasonal Support',
    text: 'Festive peaks & store launches',
  },
  {
    title: 'Vetted Talent',
    text: 'Culture-fit, brand-ready people',
  },
]

export const aboutBenefits = [
  {
    title: 'Deep Retail Network',
    text: 'Access to relevant talent across in-store, field and corporate retail functions.',
  },
  {
    title: 'Culture-Fit Alignment',
    text: 'Screen candidates for service mindset, brand representation, communication and operational discipline.',
  },
  {
    title: 'High-Volume Scaling',
    text: 'Support seasonal peaks, new-store launches and expansion requirements without losing focus on candidate quality.',
  },
]

export const differentiators = [
  { title: 'Customer-facing capability', text: 'People who can represent the brand under real floor pressure.' },
  { title: 'Communication', text: 'Clarity with customers, peers and store leadership.' },
  { title: 'Product & service mindset', text: 'Curiosity about product, experience and conversion.' },
  { title: 'Brand representation', text: 'Presentation and presence that match premium retail standards.' },
  { title: 'Shift availability', text: 'Practical readiness for retail schedules and peak days.' },
  { title: 'Location suitability', text: 'Store catchment and commute alignment before shortlisting.' },
  { title: 'Retail experience', text: 'Relevant exposure across formats, categories and channels.' },
  { title: 'Operational discipline', text: 'Reliability around process, inventory and floor execution.' },
  { title: 'Leadership capability', text: 'Managers who can coach teams and protect standards.' },
  { title: 'Seasonal availability', text: 'Flexible capacity when festive demand accelerates.' },
  { title: 'Culture alignment', text: 'Values and behaviour that fit the brand environment.' },
]

export const processSteps = [
  {
    step: '01',
    title: 'Understand',
    text: 'Understand the role, location, brand environment, experience requirements and operational expectations.',
  },
  {
    step: '02',
    title: 'Source',
    text: "Identify relevant candidates through ProStaff's retail-focused talent network.",
  },
  {
    step: '03',
    title: 'Screen',
    text: 'Evaluate experience, communication, availability, role fit and brand alignment.',
  },
  {
    step: '04',
    title: 'Shortlist',
    text: 'Present focused candidates aligned with the actual requirement.',
  },
  {
    step: '05',
    title: 'Support',
    text: 'Coordinate the process through interviews, selection and joining.',
  },
]

export const services = [
  {
    title: 'Permanent Staffing',
    text: 'Long-term hiring for retail leadership, store management and corporate retail positions.',
    points: [
      'Store & cluster leadership',
      'Buying, merchandising, HR & operations',
      'Long-term brand-aligned hiring',
    ],
  },
  {
    title: 'Temporary & Seasonal Staffing',
    text: 'Flexible staffing support for festive periods, sales events, launches and short-term requirements.',
    points: [
      'Festive & EOSS coverage',
      'Launch-week floor teams',
      'Short-term specialist support',
    ],
  },
  {
    title: 'Executive Search & Field Management',
    text: 'Focused recruitment for experienced leaders capable of managing stores, territories and complex retail operations.',
    points: [
      'Area & district managers',
      'Store directors / regional management',
      'Corporate retail specialists',
    ],
  },
]

export const retailRoles = [
  {
    id: 'in-store',
    title: 'In-Store Roles',
    subtitle: 'The brand on the floor',
    examples: [
      'Store Associates',
      'Cashiers',
      'Visual Merchandisers',
      'Customer-facing retail professionals',
    ],
  },
  {
    id: 'field',
    title: 'Field Management',
    subtitle: 'Leadership that travels',
    examples: [
      'Store Managers',
      'Area / District Managers',
      'Launch Leads',
      'Multi-store operations professionals',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Retail',
    subtitle: 'The engine behind the brand',
    examples: [
      'Retail Merchandisers',
      'Supply Chain professionals',
      'E-commerce Operations',
      'Buying / planning / operational roles',
    ],
  },
]

export const useCases = [
  {
    title: 'New Store Launches',
    text: 'Build floor and management teams for upcoming locations.',
  },
  {
    title: 'Festive & Seasonal Peaks',
    text: 'Add flexible staffing capacity during high-demand periods.',
  },
  {
    title: 'Retail Expansion',
    text: 'Support multi-location growth and regional staffing requirements.',
  },
  {
    title: 'Leadership Hiring',
    text: 'Find experienced store, area and corporate retail leaders.',
  },
  {
    title: 'Luxury & Lifestyle Retail',
    text: 'Source candidates capable of representing premium brand experiences.',
  },
  {
    title: 'E-commerce Operations',
    text: 'Support fulfilment, operations and omnichannel retail teams.',
  },
]

export const screeningAreas = [
  'Relevant retail experience',
  'Customer-service orientation',
  'Communication',
  'Brand presentation',
  'Role-specific capability',
  'Location and shift suitability',
  'Leadership experience',
  'Availability',
  'Culture alignment',
  'Career expectations',
]

/**
 * Add verified testimonials here when available.
 * Leave empty to hide the carousel and show the relationships message instead.
 * Shape: { quote, name, role, company }
 */
export const testimonials = []

export const faqs = [
  {
    q: 'What types of retail roles does ProStaff recruit for?',
    a: 'ProStaff recruits across the retail ecosystem — from store associates, cashiers and visual merchandisers to store managers, area/district leaders and corporate retail functions such as merchandising, supply chain and e-commerce operations.',
  },
  {
    q: 'Does ProStaff support temporary and seasonal staffing?',
    a: 'Yes. Alongside permanent hiring, we support temporary and seasonal staffing for festive peaks, sales events, launches and other short-term retail requirements.',
  },
  {
    q: 'Can ProStaff support new store launches?',
    a: 'Yes. We help build floor and management teams for upcoming locations so new stores open with people who understand brand standards and operational expectations.',
  },
  {
    q: 'Does ProStaff recruit for management and leadership positions?',
    a: 'Yes. Our executive search and field management support covers store managers, area and district managers, store directors, regional leadership and related retail management roles.',
  },
  {
    q: 'Do you recruit for corporate retail roles?',
    a: 'Yes. We support corporate retail hiring across merchandising, buying and planning, supply chain, HR, operations and e-commerce functions that keep retail brands running behind the scenes.',
  },
  {
    q: 'What retail sectors can ProStaff support?',
    a: 'We specialise in retail staffing for national chains, luxury and lifestyle brands, and e-commerce operators — spanning fashion, lifestyle and omnichannel retail environments.',
  },
  {
    q: 'How can candidates submit their profile?',
    a: 'Candidates can submit their profile through the application form on this website, including contact details, preferred role category, experience level and résumé.',
  },
  {
    q: 'What information should candidates provide?',
    a: 'Please share your full name, email, phone number, preferred role or category, experience level, résumé (PDF, DOC or DOCX up to 5 MB), an optional portfolio or Drive link, and a short bio.',
  },
  {
    q: 'Does ProStaff support high-volume retail hiring?',
    a: 'Yes. We support high-volume and seasonal hiring for festive peaks, store launches and expansion programmes while continuing to screen for culture fit and retail readiness.',
  },
]

export const roleCategories = [
  'Store Associate / Floor Staff',
  'Visual Merchandiser',
  'Cashier / Billing',
  'Store Manager / ASM',
  'Area / District Manager',
  'Launch / Project Lead',
  'Merchandising / Buying',
  'Supply Chain / Warehouse',
  'E-commerce Operations',
  'Corporate Retail / Other',
]

export const experienceLevels = [
  'Fresher / Entry Level',
  '1–3 years',
  '3–6 years',
  '6–10 years',
  '10+ years',
  'Leadership / Senior',
]
