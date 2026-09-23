/** Real retail brands across Global, India, and Dubai / GCC markets. */

export const REAL_BRANDS = [
  // Global
  { id: "rolex", name: "Rolex", region: "global", tag: "Luxury · Global", domain: "rolex.com" },
  { id: "hm", name: "H&M", region: "global", tag: "Fashion · Global", domain: "hm.com" },
  { id: "zara", name: "Zara", region: "global", tag: "Fashion · Global", domain: "zara.com" },
  { id: "nike", name: "Nike", region: "global", tag: "Sport · Global", domain: "nike.com" },
  { id: "adidas", name: "Adidas", region: "global", tag: "Sport · Global", domain: "adidas.com" },
  { id: "uniqlo", name: "Uniqlo", region: "global", tag: "Fashion · Global", domain: "uniqlo.com" },
  { id: "ikea", name: "IKEA", region: "global", tag: "Home · Global", domain: "ikea.com" },
  { id: "sephora", name: "Sephora", region: "global", tag: "Beauty · Global", domain: "sephora.com" },
  { id: "starbucks", name: "Starbucks", region: "global", tag: "QSR · Global", domain: "starbucks.com" },
  { id: "apple", name: "Apple", region: "global", tag: "Retail · Global", domain: "apple.com" },

  // India
  { id: "reliance", name: "Reliance Retail", region: "india", tag: "Retail · India", domain: "relianceretail.com" },
  { id: "titan", name: "Titan", region: "india", tag: "Lifestyle · India", domain: "titan.co.in" },
  { id: "nykaa", name: "Nykaa", region: "india", tag: "Beauty · India", domain: "nykaa.com" },
  { id: "myntra", name: "Myntra", region: "india", tag: "E-com · India", domain: "myntra.com" },
  { id: "shoppers", name: "Shoppers Stop", region: "india", tag: "Department · India", domain: "shoppersstop.com" },
  { id: "lifestyle", name: "Lifestyle", region: "india", tag: "Fashion · India", domain: "lifestylestores.com" },
  { id: "westside", name: "Westside", region: "india", tag: "Fashion · India", domain: "westside.com" },
  { id: "fabindia", name: "Fabindia", region: "india", tag: "Lifestyle · India", domain: "fabindia.com" },
  { id: "ajio", name: "AJIO", region: "india", tag: "E-com · India", domain: "ajio.com" },
  { id: "croma", name: "Croma", region: "india", tag: "Electronics · India", domain: "croma.com" },

  // Dubai / GCC
  { id: "chalhoub", name: "Chalhoub Group", region: "dubai", tag: "Luxury · Dubai", domain: "chalhoubgroup.com" },
  { id: "landmark", name: "Landmark Group", region: "dubai", tag: "Retail · Dubai", domain: "landmarkgroup.com" },
  { id: "alshaya", name: "Alshaya", region: "dubai", tag: "Franchise · Dubai", domain: "alshaya.com" },
  { id: "emaar", name: "Emaar", region: "dubai", tag: "Malls · Dubai", domain: "emaar.com" },
  { id: "noon", name: "noon", region: "dubai", tag: "E-com · Dubai", domain: "noon.com" },
  { id: "centrepoint", name: "Centrepoint", region: "dubai", tag: "Fashion · Dubai", domain: "centrepointstores.com" },
  { id: "splash", name: "Splash", region: "dubai", tag: "Fashion · Dubai", domain: "splashfashions.com" },
  { id: "namshi", name: "Namshi", region: "dubai", tag: "E-com · Dubai", domain: "namshi.com" },
  { id: "lulu", name: "Lulu Hypermarket", region: "dubai", tag: "Hypermarket · GCC", domain: "luluhypermarket.com" },
  { id: "majid", name: "Majid Al Futtaim", region: "dubai", tag: "Malls · Dubai", domain: "majidalfuttaim.com" },
];

export function brandLogoUrl(domain) {
  return `https://logo.clearbit.com/${domain}`;
}

export const SHOWCASE_SCENES = [
  {
    id: "india",
    title: "India · National retail scale",
    subtitle: "From national chains to premium lifestyle & e-com talent",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "dubai",
    title: "Dubai · GCC flagship markets",
    subtitle: "Luxury doors, mall networks & cross-border careers",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "luxury",
    title: "Global luxury & fashion",
    subtitle: "Culture-fit teams for the world's most demanding brands",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b2414e6634?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "mall",
    title: "High-street & mall retail",
    subtitle: "Festive peaks, EOSS coverage & launch-week floor teams",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1800&q=80",
  },
];

export const HERO_PHOTO =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=80";

export const COLLAB_PHOTOS = [
  {
    title: "Luxury & premium",
    body: "Flagship hospitality and culture-first floor teams for houses that never dilute the experience.",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "India · national chains",
    body: "Cluster leadership, festive & EOSS coverage, and pan-India scaling with calendar precision.",
    img: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "E-commerce & omnichannel",
    body: "Fulfillment-ready associates and HQ talent for marketplace and ship-from-store peaks.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Dubai & international",
    body: "Cross-border placements for GCC hubs — careers on global retail stages.",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
  },
];
