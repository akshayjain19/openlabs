import { projectGallery, projectImage } from "@/lib/project-media";

/** Internal: Afrikmart — DO NOT PUBLISH until verified and approved. */

export type ProjectCategory = "korvalabs" | "experience";

export type ProjectLayout = "feature" | "split" | "tall" | "horizontal";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  type: string;
  description: string;
  outcome?: string;
  href?: string;
  image?: string;
  gallery?: string[];
  imageAlt: string;
  note?: string;
  layout: ProjectLayout;
  /** Verified outcomes only — do not invent */
  proof?: string[];
  highlights?: string[];
  featured?: boolean;
  leadPriority?: number;
  /** One-line proof on homepage / work */
  proofLine?: string;
};

export const korvaLabsProjects: Project[] = [
  {
    slug: "viacation",
    name: "VIACATION",
    category: "korvalabs",
    type: "Travel product",
    layout: "tall",
    featured: true,
    leadPriority: 100,
    description: "Travel discovery and marketplace experience.",
    outcome: "Search, packages, and lead-generation flows.",
    proofLine: "Search + discovery for a travel marketplace.",
    href: "https://viacation.com/",
    image: projectImage("viacation", "hero.webp"),
    gallery: projectGallery("viacation"),
    imageAlt: "Viacation travel platform",
    proof: ["Search + discovery", "Marketplace architecture", "Built end-to-end"],
  },
  {
    slug: "our-shopee",
    name: "OURSHOPEE",
    category: "korvalabs",
    type: "Marketplace / E-commerce",
    layout: "feature",
    featured: true,
    leadPriority: 95,
    description:
      "Multi-seller marketplace product spanning discovery, catalogue, checkout, promotions and post-purchase flows.",
    outcome: "Search, catalogue, checkout, order tracking and deals in one marketplace experience.",
    proofLine: "Marketplace architecture — search, catalogue, checkout and order tracking.",
    href: "https://www.ourshopee.com/",
    image: projectImage("our-shopee", "hero.webp"),
    gallery: projectGallery("our-shopee"),
    imageAlt: "OurShopee marketplace — search, categories and product discovery",
    proof: [
      "Marketplace architecture",
      "Search & discovery",
      "Multi-seller catalogue",
      "Checkout & payments",
      "Order tracking",
      "Deals & promotions",
    ],
    highlights: [
      "Marketplace architecture",
      "Search & discovery",
      "Multi-seller experience",
      "Product catalogue",
      "Checkout / payments",
      "Order tracking",
      "Deals / promotions",
    ],
  },
  {
    slug: "indore-nursery",
    name: "INDORE NURSERY",
    category: "korvalabs",
    type: "Commerce",
    layout: "feature",
    featured: true,
    leadPriority: 90,
    description: "Commerce for a plant nursery with catalogue and local fulfilment.",
    outcome: "Built for organic discovery and local commerce.",
    proofLine: "Built for organic discovery and local commerce.",
    href: "https://indorenursery.com/",
    image: projectImage("indore-nursery", "hero.webp"),
    gallery: projectGallery("indore-nursery"),
    imageAlt: "Indore Nursery commerce platform",
    proof: ["Multi-step commerce flow", "Catalogue at scale", "Built end-to-end"],
  },
  {
    slug: "sg11-fantasy",
    name: "SG11 FANTASY",
    category: "korvalabs",
    type: "Consumer product",
    layout: "split",
    featured: true,
    leadPriority: 80,
    description: "Consumer fantasy sports product experience.",
    outcome: "High-engagement consumer product flows.",
    proofLine: "Consumer-facing fantasy sports product experience.",
    href: "https://sg11fantasyindia.com/",
    image: projectImage("sg11-fantasy", "hero.webp"),
    gallery: projectGallery("sg11-fantasy"),
    imageAlt: "SG11 Fantasy sports product",
    proof: ["Consumer app experience", "Complex user flows"],
  },
  {
    slug: "the-laundry-house",
    name: "THE LAUNDRY HOUSE",
    category: "korvalabs",
    type: "Service business",
    layout: "split",
    featured: true,
    /** Fourth featured homepage slot; higher values rank first site-wide */
    leadPriority: 75,
    description:
      "A premium digital experience for a garment-care business, bringing service discovery, booking, doorstep pickup and delivery, store discovery, and franchise enquiries into one platform.",
    outcome: "Garment-care across 9 major cities — discovery, booking, and enquiries.",
    proofLine: "Service discovery, booking and local lead generation.",
    href: "https://thelaundryhouseindia.com/",
    image: projectImage("the-laundry-house", "hero.webp"),
    gallery: projectGallery("the-laundry-house"),
    imageAlt: "The Laundry House digital experience for garment care",
    proof: ["Service discovery", "Booking flow", "Store locator", "Lead generation"],
  },
  {
    slug: "travel-deal-online",
    name: "TRAVEL DEAL ONLINE",
    category: "korvalabs",
    type: "Travel",
    layout: "horizontal",
    featured: false,
    leadPriority: 70,
    description: "Travel deal and discovery platform.",
    outcome: "Deal discovery and travel marketplace flows.",
    proofLine: "Travel deal discovery and marketplace flows.",
    imageAlt: "Travel Deal Online marketplace product",
    proof: ["Travel marketplace", "Discovery flows"],
  },
  {
    slug: "tattvasri",
    name: "TATTVASRI",
    category: "korvalabs",
    type: "Commerce",
    layout: "split",
    featured: false,
    leadPriority: 50,
    description:
      "Digital commerce for a spiritual lifestyle brand with WhatsApp-led purchase flows.",
    proofLine: "WhatsApp-led commerce and product discovery.",
    href: "https://tattvasri.com/",
    image: projectImage("tattvasri", "hero.webp"),
    gallery: projectGallery("tattvasri"),
    imageAlt: "Tattvasri lifestyle commerce experience",
    proof: ["WhatsApp-led commerce", "Product discovery"],
  },
  {
    slug: "mobile-game",
    name: "MOBILE GAME",
    category: "korvalabs",
    type: "Consumer mobile",
    layout: "tall",
    featured: false,
    leadPriority: 20,
    description: "Casual mobile game product.",
    note: "Not represented as a currently live public release.",
    imageAlt: "Mobile game product work",
  },
  {
    slug: "gaming-platform",
    name: "GAMING PLATFORM",
    category: "korvalabs",
    type: "Interactive entertainment",
    layout: "horizontal",
    featured: false,
    leadPriority: 10,
    description: "Older casino and poker-related product work.",
    note: "Not represented as currently live commercial products.",
    imageAlt: "Gaming platform engineering work",
  },
];

export const experienceProjects: Project[] = [
  {
    slug: "team-scale",
    name: "PRODUCT & PLATFORM TEAMS",
    category: "experience",
    type: "Professional experience",
    layout: "feature",
    description:
      "Experience across product and technology teams at scale — shipping and operating software in complex environments.",
    imageAlt: "Professional experience at scale",
  },
];

export const allProjects = [...korvaLabsProjects, ...experienceProjects];

export function getFeaturedHomeProjects(limit = 4) {
  return korvaLabsProjects
    .filter((p) => p.featured)
    .sort((a, b) => (b.leadPriority ?? 0) - (a.leadPriority ?? 0))
    .slice(0, limit);
}

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}
