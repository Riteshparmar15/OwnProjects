/**
 * ProStafff Solution — Job Openings
 * ------------------------------------------------------------------
 * HOW TO ADD A NEW JOB (no layout changes required):
 * 1. Copy an existing object in the jobs array below.
 * 2. Give it a unique `id` (lowercase, hyphens, no spaces).
 * 3. Fill in title, location, category, type, and description.
 *
 * category must be one of:
 *   "in-store"  |  "management"  |  "corporate"
 *
 * type examples: "Permanent" | "Temporary" | "Seasonal" | "Executive Search"
 */
export const jobs = [
  {
    id: "store-associate-mumbai",
    title: "Store Associate",
    location: "Mumbai, Maharashtra",
    category: "in-store",
    type: "Permanent",
    description:
      "Deliver exceptional floor service for a national fashion retailer. Drive conversion, maintain visual standards, and support peak-hour operations.",
  },
  {
    id: "cashier-delhi",
    title: "Cashier / POS Associate",
    location: "New Delhi, NCR",
    category: "in-store",
    type: "Temporary",
    description:
      "Handle high-volume checkout with accuracy and warmth. Ideal for candidates who thrive in fast-paced lifestyle and grocery formats.",
  },
  {
    id: "visual-merchandiser-bengaluru",
    title: "Visual Merchandiser",
    location: "Bengaluru, Karnataka",
    category: "in-store",
    type: "Permanent",
    description:
      "Translate brand stories into compelling in-store displays. Partner with store leadership on window schemes, planograms, and campaign resets.",
  },
  {
    id: "seasonal-associate-pune",
    title: "Seasonal Retail Associate",
    location: "Pune, Maharashtra",
    category: "in-store",
    type: "Seasonal",
    description:
      "Join festive and sale-period teams for a leading lifestyle brand. Rapid onboarding, flexible shifts, and strong customer-service focus.",
  },
  {
    id: "store-manager-hyderabad",
    title: "Store Manager",
    location: "Hyderabad, Telangana",
    category: "management",
    type: "Permanent",
    description:
      "Own P&L, people, and customer experience for a flagship store. Coach associates, hit sales targets, and uphold brand operating standards.",
  },
  {
    id: "area-manager-west",
    title: "Area / District Manager",
    location: "West India (Multi-city)",
    category: "management",
    type: "Executive Search",
    description:
      "Lead a cluster of stores across the western region. Drive like-for-like growth, talent development, and consistent brand execution.",
  },
  {
    id: "assistant-manager-chennai",
    title: "Assistant Store Manager",
    location: "Chennai, Tamil Nadu",
    category: "management",
    type: "Permanent",
    description:
      "Support store leadership on floor operations, inventory discipline, and team scheduling for a premium multi-brand retailer.",
  },
  {
    id: "retail-merchandiser-mumbai",
    title: "Retail Merchandiser",
    location: "Mumbai, Maharashtra",
    category: "corporate",
    type: "Permanent",
    description:
      "Shape range architecture, seasonal buys, and in-season trading for a national apparel brand. Strong commercial and analytical mindset required.",
  },
  {
    id: "ecommerce-ops-bengaluru",
    title: "E-commerce Operations Specialist",
    location: "Bengaluru, Karnataka",
    category: "corporate",
    type: "Permanent",
    description:
      "Orchestrate marketplace and D2C fulfilment SLAs, returns, and peak-season capacity planning for a high-growth online retailer.",
  },
  {
    id: "supply-chain-ncr",
    title: "Supply Chain Coordinator",
    location: "Gurugram, Haryana",
    category: "corporate",
    type: "Permanent",
    description:
      "Keep store and warehouse inventory flowing. Coordinate inbound logistics, allocation, and shortage recovery across a national retail network.",
  },
];

export const categoryLabels = {
  "in-store": "In-Store",
  management: "Management",
  corporate: "Corporate",
};
