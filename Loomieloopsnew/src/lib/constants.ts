export const BRAND = {
  name: 'Loomie Loops',
  slogan: 'Little loops, big feelings.',
} as const;

export const CONTACT = {
  whatsapp: '919313512434',
  whatsappDisplay: '+91 93135 12434',
  instagram: 'loomieloops',
  instagramUrl: 'https://www.instagram.com/loomieloops/',
  email: 'info.loomieloops@gmail.com',
} as const;

export const CRAFT_WINDOW = '3–5 Business Days';

export const NAV_LINKS = [
  { label: 'Collections', to: '/collections' },
  { label: 'Anime Drops', to: '/collections/anime' },
  { label: 'Custom Studio', to: '/studio' },
  { label: 'Our Story', to: '/story' },
  { label: 'B2B / Bulk', to: '/bulk' },
] as const;

export type Currency = 'INR' | 'USD' | 'EUR';

export const CURRENCIES: { code: Currency; label: string }[] = [
  { code: 'INR', label: 'INR ₹' },
  { code: 'USD', label: 'USD $' },
  { code: 'EUR', label: 'EUR €' },
];

/** Approximate FX from INR for display only */
export const FX_FROM_INR: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
};

export const CATEGORIES = [
  {
    id: 'anime',
    title: 'Anime Editions',
    subtitle: 'Kawaii, one of one',
    to: '/collections/anime',
    image: '/images/anime-plushie.jpg',
  },
  {
    id: 'festival',
    title: 'Festival / Seasonal',
    subtitle: 'Limited colour stories',
    to: '/collections/festival',
    image: '/images/sunflower-bag.jpg',
  },
  {
    id: 'wearables',
    title: 'Wearables & Statement Bags',
    subtitle: 'Carryable couture',
    to: '/collections/wearables',
    image: '/images/butterfly-tote.jpg',
  },
  {
    id: 'bespoke',
    title: 'Bespoke Orders',
    subtitle: 'Your character, our yarn',
    to: '/studio',
    image: '/images/yarn-art.jpg',
  },
] as const;
