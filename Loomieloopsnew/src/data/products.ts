export interface Colorway {
  id: string;
  name: string;
  hex: string;
}

export type CategoryId = 'anime' | 'festival' | 'wearables' | 'atelier';

export interface Product {
  id: string;
  name: string;
  editorialName: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  images: string[];
  description: string;
  story: string;
  badge?: string;
  tags: string[];
  colorways: Colorway[];
  limited: boolean;
}

export const products: Product[] = [
  {
    id: 'sunflower-bag',
    name: 'Sunflower Crochet Tote',
    editorialName: 'Soleil',
    category: 'festival',
    categoryLabel: 'Festival / Seasonal',
    price: 1499,
    images: ['/images/sunflower-bag.jpg', '/images/hero-banner.jpg'],
    description:
      'Cloud-soft granny-square tote with hand-crocheted sunflower motifs. Brunches, bookstores, and late-light walks.',
    story:
      'Worked in a honey-cream story, each sunflower is mapped by hand — no two petals sit the same. A seasonal drop, never restocked in identical gauge.',
    badge: 'Bestseller',
    tags: ['Handmade', 'Premium Yarn'],
    colorways: [
      { id: 'honey', name: 'Honey Cream', hex: '#E8C47A' },
      { id: 'sage', name: 'Atelier Sage', hex: '#9CB896' },
      { id: 'blush', name: 'Blush Silk', hex: '#E8A0BF' },
    ],
    limited: true,
  },
  {
    id: 'anime-plushie',
    name: 'Kawaii Anime Plushie',
    editorialName: 'Mochi',
    category: 'anime',
    categoryLabel: 'Anime Editions',
    price: 999,
    images: ['/images/anime-plushie.jpg'],
    description:
      'Adorable amigurumi in cloud-soft pastel. Five hours of concentrated handwork. Main-character energy, shelf or suitcase.',
    story:
      'Sculpted stitch by stitch from a kawaii brief. Face, flush, and proportion are set by hand — a one-of-one companion, not a factory toy.',
    badge: 'New Drop',
    tags: ['Limited', 'Gift Ready'],
    colorways: [
      { id: 'blush', name: 'Sakura Blush', hex: '#FADADD' },
      { id: 'lavender', name: 'Kyoto Lilac', hex: '#B8A4D4' },
      { id: 'cream', name: 'Cloud Cream', hex: '#F3EFE8' },
    ],
    limited: true,
  },
  {
    id: 'butterfly-tote',
    name: 'Butterfly Dream Tote',
    editorialName: 'Papillon',
    category: 'wearables',
    categoryLabel: 'Wearables & Statement Bags',
    price: 1699,
    images: ['/images/butterfly-tote.jpg', '/images/hero-banner.jpg'],
    description:
      'Lavender butterfly tote with scalloped edge. Statement piece, everyday carry. Always one of one.',
    story:
      'Wings are built as layered motifs, then set onto a structured body so the silhouette holds — couture logic, artisan yarn.',
    badge: 'Limited',
    tags: ['One-of-One', 'Artisan'],
    colorways: [
      { id: 'lavender', name: 'Dream Lilac', hex: '#B8A4D4' },
      { id: 'ink', name: 'Soft Charcoal', hex: '#3A3A3A' },
      { id: 'blush', name: 'Ballet Blush', hex: '#E8A0BF' },
    ],
    limited: true,
  },
  {
    id: 'strawberry-clutch',
    name: 'Strawberry Crossbody',
    editorialName: 'Fraise',
    category: 'festival',
    categoryLabel: 'Festival / Seasonal',
    price: 1299,
    images: ['/images/strawberry-clutch.jpg'],
    description:
      'Fruit-form crossbody that turns a room. Deep red yarn, hand-stitched seed detail. Cottagecore, approved.',
    story:
      'A playful objet meant to be worn. Seeds are embroidered after the form is stuffed and balanced — a small sculpture with a strap.',
    tags: ['Unique', 'Cottagecore'],
    colorways: [
      { id: 'rouge', name: 'Berry Rouge', hex: '#C45C5C' },
      { id: 'cream', name: 'Milk Foam', hex: '#F3EFE8' },
      { id: 'sage', name: 'Leaf Sage', hex: '#9CB896' },
    ],
    limited: false,
  },
  {
    id: 'yarn-art',
    name: 'Rainbow Mandala Wall Art',
    editorialName: 'Chromatic',
    category: 'atelier',
    categoryLabel: 'Atelier Objects',
    price: 2499,
    images: ['/images/yarn-art.jpg', '/images/hero-banner.jpg'],
    description:
      'Statement hanging in twelve-plus colours of premium yarn. Bohemian, maximal, ten hours of focused craft.',
    story:
      'A colour score written in fibre. Each ring is tensioned by hand so the mandala reads as architecture on the wall — not decoration, a presence.',
    badge: 'Made to Order',
    tags: ['Home', 'Custom'],
    colorways: [
      { id: 'rainbow', name: 'Spectrum', hex: '#E8A0BF' },
      { id: 'sunset', name: 'Sunset Score', hex: '#E8C47A' },
      { id: 'night', name: 'Midnight Garden', hex: '#4A2C4E' },
    ],
    limited: false,
  },
];

export const testimonials = [
  {
    id: 1,
    text: 'The sunflower bag is couture that happens to be crochet. Compliments every time I leave the house. You feel the hours in the yarn.',
    author: 'Priya M.',
    handle: '@priya.vibes',
    initials: 'PM',
    city: 'Mumbai',
  },
  {
    id: 2,
    text: 'Commissioned a custom plushie. She cried. The face, the flush, the weight — it was a character, not a gift-shop object.',
    author: 'Ananya S.',
    handle: '@ananya.stories',
    initials: 'AS',
    city: 'Bengaluru',
  },
  {
    id: 3,
    text: 'Finally a house that understands both aesthetic and hand. The butterfly tote is the most photographed piece in my wardrobe.',
    author: 'Riya K.',
    handle: '@riyakraft',
    initials: 'RK',
    city: 'Delhi',
  },
];

export const lookbook = [
  { src: '/images/hero-banner.jpg', caption: 'Atelier light, SS drop', tag: 'Look 01' },
  { src: '/images/sunflower-bag.jpg', caption: 'Soleil tote, honey cream', tag: 'Look 02' },
  { src: '/images/anime-plushie.jpg', caption: 'Mochi, sakura blush', tag: 'Look 03' },
  { src: '/images/butterfly-tote.jpg', caption: 'Papillon, dream lilac', tag: 'Look 04' },
  { src: '/images/strawberry-clutch.jpg', caption: 'Fraise, festival carry', tag: 'Look 05' },
  { src: '/images/yarn-art.jpg', caption: 'Chromatic, wall score', tag: 'Look 06' },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getByCategory(category?: string) {
  if (!category || category === 'all') return products;
  if (category === 'bespoke') return products.filter((p) => p.category === 'atelier' || p.limited);
  return products.filter((p) => p.category === category);
}
