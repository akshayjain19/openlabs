import { sitePreview } from "@/lib/screenshot";

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
    href: "https://viacation.com/",
    image: sitePreview("https://viacation.com/", 1600),
    imageAlt: "Viacation travel platform",
    proof: ["Search + discovery", "Marketplace architecture", "Built end-to-end"],
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
    href: "https://indorenursery.com/",
    image: sitePreview("https://indorenursery.com/", 1600),
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
    href: "https://sg11fantasyindia.com/",
    image: sitePreview("https://sg11fantasyindia.com/", 1600),
    imageAlt: "SG11 Fantasy sports product",
    proof: ["Consumer app experience", "Complex user flows"],
  },
  {
    slug: "the-laundry-house",
    name: "THE LAUNDRY HOUSE",
    category: "korvalabs",
    type: "Service business / Digital experience",
    layout: "split",
    featured: true,
    /** Fourth featured homepage slot; higher values rank first site-wide */
    leadPriority: 75,
    description:
      "A premium digital experience for a garment-care business, bringing service discovery, booking, doorstep pickup and delivery, store discovery, and franchise enquiries into one platform.",
    outcome: "Garment-care services across 9 major cities — discovery, booking, and enquiries.",
    href: "https://thelaundryhouseindia.com/",
    image: sitePreview("https://thelaundryhouseindia.com/", 1600),
    imageAlt: "The Laundry House digital experience for garment care",
    proof: ["Service discovery", "Booking flow", "Store locator", "Lead generation"],
    highlights: ["Service discovery", "Booking flow", "Store locator", "Lead generation"],
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
    href: "https://tattvasri.com/",
    image: sitePreview("https://tattvasri.com/", 1600),
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
