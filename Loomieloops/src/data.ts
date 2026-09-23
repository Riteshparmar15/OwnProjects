export type CollectionId =
  | "anime"
  | "premium"
  | "her"
  | "him"
  | "future"
  | "gifts";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  hoverImage?: string;
  collections: CollectionId[];
  category: string;
  colors: string[];
  bestseller?: boolean;
  limited?: boolean;
  description: string;
  details: string[];
};

export const collections: {
  id: CollectionId;
  name: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "anime",
    name: "Anime Favorites",
    blurb: "Soft pastel character energy, stitched as wearable art.",
    image: "/images/product-star-bag.png",
  },
  {
    id: "premium",
    name: "Premium Collection",
    blurb: "Luxury yarns. Elevated silhouettes. Collectible pieces.",
    image: "/images/product-aura-scarf.png",
  },
  {
    id: "her",
    name: "For Her",
    blurb: "Cardigans, boleros, and bags made for every little moment.",
    image: "/images/lifestyle-her.png",
  },
  {
    id: "him",
    name: "For Him",
    blurb: "Street-ready loops. Soft power. Gender-inclusive ease.",
    image: "/images/lifestyle-him.png",
  },
  {
    id: "future",
    name: "Future Loops",
    blurb: "Cyber-cottage silhouettes with neon-kissed yarn.",
    image: "/images/product-neon-hat.png",
  },
  {
    id: "gifts",
    name: "Gifts & Customs",
    blurb: "Amigurumi, minis, and made-to-order magic.",
    image: "/images/product-custom-plush.png",
  },
];

export const products: Product[] = [
  {
    id: "ll-01",
    slug: "sakura-cloud-cardigan",
    name: "Sakura Cloud Cardigan",
    price: 4890,
    compareAt: 5600,
    image: "/images/product-sakura-cardigan.png",
    hoverImage: "/images/lifestyle-her.png",
    collections: ["anime", "her", "premium"],
    category: "Cardigan",
    colors: ["Dusty Rose", "Cream"],
    bestseller: true,
    description:
      "An oversized cloud of dusty-rose granny squares, blooming like sakura. Soft merino-blend yarn, made to layer over everything from street tees to silk slips.",
    details: ["Handmade in India", "Merino-cotton blend", "Relaxed oversized fit", "Custom length available"],
  },
  {
    id: "ll-02",
    slug: "neon-loop-bucket-hat",
    name: "Neon Loop Bucket Hat",
    price: 1690,
    image: "/images/product-neon-hat.png",
    collections: ["future", "him", "her"],
    category: "Hat",
    colors: ["Mint", "Neon Pink"],
    bestseller: true,
    description:
      "A future-crochet bucket with mint geometry and a kiss of electric pink. Lightweight, crushable, and made for city heat.",
    details: ["Cotton yarn", "Unisex sizing", "Packable brim", "Limited seasonal drop"],
  },
  {
    id: "ll-03",
    slug: "forest-spirit-tote",
    name: "Forest Spirit Tote",
    price: 2490,
    image: "/images/product-forest-bag.png",
    collections: ["anime", "her", "gifts"],
    category: "Bag",
    colors: ["Sage", "Cream"],
    description:
      "A round forest tote with leafy granny motifs — cottagecore with a studio-ghibli hush. Lined, sturdy, and quietly magical.",
    details: ["Cotton-linen yarn", "Lined interior", "Magnetic close", "Fits a 13-inch laptop sleeve"],
  },
  {
    id: "ll-04",
    slug: "midnight-mesh-vest",
    name: "Midnight Mesh Vest",
    price: 3290,
    image: "/images/product-midnight-vest.png",
    hoverImage: "/images/lifestyle-him.png",
    collections: ["premium", "him", "future"],
    category: "Vest",
    colors: ["Charcoal", "Lavender"],
    limited: true,
    description:
      "Architectural mesh in charcoal with a lavender glow. Layer it over a tee or a collared shirt — modern crochet that reads luxury, not craft-fair.",
    details: ["Open-work mesh", "Gender-inclusive cut", "Premium acrylic-wool", "Limited edition of 12"],
  },
  {
    id: "ll-05",
    slug: "soft-aura-scarf",
    name: "Soft Aura Scarf",
    price: 1890,
    image: "/images/product-aura-scarf.png",
    collections: ["premium", "her", "gifts"],
    category: "Scarf",
    colors: ["Cream", "Rose"],
    bestseller: true,
    description:
      "Cloud-stitch scarf in cream and dusty rose. A tactile aura you can wrap twice and still feel light.",
    details: ["Cloud stitch", "Extra-long drape", "Hypoallergenic blend", "Gift-ready wrap"],
  },
  {
    id: "ll-06",
    slug: "pixel-heart-amigurumi",
    name: "Pixel Heart Amigurumi",
    price: 890,
    image: "/images/product-pixel-heart.png",
    collections: ["anime", "gifts"],
    category: "Amigurumi",
    colors: ["Dusty Rose", "Cream"],
    description:
      "A collectible heart plush with a tiny stitched smile. Desk friend, gift, or pocket talisman.",
    details: ["Safety-stitched face", "Palm size", "Gift boxed", "Custom colors on request"],
  },
  {
    id: "ll-07",
    slug: "cyber-kitty-beanie",
    name: "Cyber Kitty Beanie",
    price: 1490,
    image: "/images/product-cyber-beanie.png",
    collections: ["future", "anime", "him", "her"],
    category: "Hat",
    colors: ["Ink", "Neon Purple"],
    limited: true,
    description:
      "Cat-ear beanie in ink black with electric purple ribbing. Soft anime, hard street.",
    details: ["Double-layer brim", "One-size stretch", "Neon accent yarn", "Drop of 20"],
  },
  {
    id: "ll-08",
    slug: "rose-quartz-bolero",
    name: "Rose Quartz Bolero",
    price: 2790,
    image: "/images/product-rose-bolero.png",
    collections: ["her", "premium"],
    category: "Bolero",
    colors: ["Rose Quartz"],
    limited: true,
    description:
      "A cropped bolero with pearl-sheen yarn. Wear it over a slip dress or a tank — instant main-character lighting.",
    details: ["Cropped silhouette", "Pearl viscose blend", "Open front", "Made to order in 10 days"],
  },
  {
    id: "ll-09",
    slug: "street-loop-hoodie",
    name: "Street Loop Hoodie",
    price: 4590,
    image: "/images/product-street-hoodie.png",
    hoverImage: "/images/lifestyle-him.png",
    collections: ["him", "future"],
    category: "Hoodie",
    colors: ["Warm Beige", "Charcoal"],
    bestseller: true,
    description:
      "Chunky crochet hoodie with an oversized street silhouette. Soft enough for monsoon evenings, bold enough for a night market.",
    details: ["Oversized fit", "Kangaroo pocket", "Heavy cotton yarn", "Unisex S–XL"],
  },
  {
    id: "ll-10",
    slug: "moonlight-granny-jacket",
    name: "Moonlight Granny Jacket",
    price: 5290,
    compareAt: 6100,
    image: "/images/product-granny-jacket.png",
    collections: ["premium", "her", "anime"],
    category: "Jacket",
    colors: ["Lavender", "Mint", "Cream"],
    description:
      "Pastel granny squares in moonlight lavender, mint, and cream. A collectible jacket that looks like a moodboard you can wear.",
    details: ["Statement squares", "Lined sleeves", "Slow-made 18 hours", "Patch customizable"],
  },
  {
    id: "ll-11",
    slug: "kawaii-star-mini-bag",
    name: "Kawaii Star Mini Bag",
    price: 1590,
    image: "/images/product-star-bag.png",
    collections: ["anime", "her", "gifts"],
    category: "Bag",
    colors: ["Lavender", "Cream"],
    bestseller: true,
    description:
      "A star-shaped mini with a gold chain. Night-out tiny, photo-dump famous.",
    details: ["Chain strap", "Fits phone + lip + keys", "Satin lined", "Custom star colors"],
  },
  {
    id: "ll-12",
    slug: "sage-cottage-cardigan",
    name: "Sage Cottage Cardigan",
    price: 4190,
    image: "/images/product-cottage-cardigan.png",
    hoverImage: "/images/lifestyle-her.png",
    collections: ["her", "premium"],
    category: "Cardigan",
    colors: ["Sage", "Cream"],
    description:
      "Cottagecore florals on sage yarn. Slow mornings, bookshop afternoons, golden-hour walks.",
    details: ["Floral motifs", "Mother-of-pearl buttons", "Mid-weight drape", "Custom sleeve length"],
  },
  {
    id: "ll-13",
    slug: "ember-chain-scarf",
    name: "Ember Chain Scarf",
    price: 1790,
    image: "/images/product-ember-scarf.png",
    collections: ["him", "gifts"],
    category: "Scarf",
    colors: ["Ember", "Charcoal"],
    description:
      "Chain-link crochet in ember and charcoal. A gift for him that does not look like a last-minute scarf.",
    details: ["Open chain stitch", "Lightweight warmth", "Gift boxed", "One size"],
  },
  {
    id: "ll-14",
    slug: "dreamweaver-gloves",
    name: "Dreamweaver Gloves",
    price: 1290,
    image: "/images/product-dream-gloves.png",
    collections: ["premium", "her", "gifts"],
    category: "Gloves",
    colors: ["Cream", "Lavender"],
    description:
      "Fingerless lace gloves in cream and lavender. For concerts, cafes, and slightly dramatic commutes.",
    details: ["Fingerless", "Lace stitch", "Soft stretch", "Pair gift wrap"],
  },
  {
    id: "ll-15",
    slug: "custom-character-plush",
    name: "Custom Character Plush",
    price: 2190,
    image: "/images/product-custom-plush.png",
    collections: ["gifts", "anime"],
    category: "Custom",
    colors: ["Made to order"],
    limited: true,
    description:
      "Tell us a character, a color story, or a feeling. We stitch an original plush — inspired, never copied, always collectible.",
    details: ["Original design", "7–10 day make time", "Photo proof before ship", "Worldwide packing"],
  },
];

export const testimonials = [
  {
    name: "Aanya R.",
    city: "Mumbai",
    quote: "The Sakura cardigan feels like a hug that also photographs insane. Everyone in my reel asked for the link.",
    image: "/images/lifestyle-her.png",
    tag: "Sakura Cloud Cardigan",
  },
  {
    name: "Kabir S.",
    city: "Bengaluru",
    quote: "Didn't think crochet could do street. The hoodie is heavy in the best way — premium, not costume.",
    image: "/images/lifestyle-him.png",
    tag: "Street Loop Hoodie",
  },
  {
    name: "Mira T.",
    city: "Delhi",
    quote: "Custom plush for my partner's birthday. They cried. I cried. Loomieloops gets the assignment.",
    image: "/images/product-custom-plush.png",
    tag: "Custom Order",
  },
  {
    name: "Leah K.",
    city: "Goa",
    quote: "Star mini bag is my whole personality now. Soft, sturdy, and it matches my lavender era.",
    image: "/images/product-star-bag.png",
    tag: "Kawaii Star Mini Bag",
  },
];

export const instagramPosts = [
  "/images/product-sakura-cardigan.png",
  "/images/lifestyle-her.png",
  "/images/product-neon-hat.png",
  "/images/product-star-bag.png",
  "/images/lifestyle-him.png",
  "/images/product-pixel-heart.png",
  "/images/about-making.png",
  "/images/product-cyber-beanie.png",
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const WHATSAPP = "https://wa.me/919876543210?text=Hi%20Loomieloops%2C%20I%20want%20to%20order%20";
export const INSTAGRAM = "https://instagram.com/loomieloops";
