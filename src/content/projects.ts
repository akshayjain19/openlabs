import { sitePreview } from "@/lib/screenshot";

export type ProjectCategory = "korvalabs" | "experience";

export type ProjectLayout = "feature" | "split" | "tall" | "horizontal";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  type: string;
  description: string;
  href?: string;
  image?: string;
  imageAlt: string;
  note?: string;
  layout: ProjectLayout;
  highlights?: string[];
};

export const korvaLabsProjects: Project[] = [
  {
    slug: "indore-nursery",
    name: "INDORE NURSERY",
    category: "korvalabs",
    type: "E-commerce / Commerce",
    layout: "feature",
    description:
      "A commerce experience for a plant nursery with product discovery, catalogue browsing, shopping flows and local fulfilment.",
    href: "https://indorenursery.com/",
    image: sitePreview("https://indorenursery.com/"),
    imageAlt: "Indore Nursery commerce platform",
    highlights: ["Catalogue", "Commerce", "Fulfilment"],
  },
  {
    slug: "tattvasri",
    name: "TATTVASRI",
    category: "korvalabs",
    type: "E-commerce / Lifestyle",
    layout: "split",
    description:
      "Digital commerce experience for a spiritual lifestyle brand, including product discovery and WhatsApp-led commerce.",
    href: "https://tattvasri.com/",
    image: sitePreview("https://tattvasri.com/"),
    imageAlt: "Tattvasri lifestyle commerce experience",
    highlights: ["Commerce", "WhatsApp-led flows"],
  },
  {
    slug: "viacation",
    name: "VIACATION",
    category: "korvalabs",
    type: "Travel / Travel Technology",
    layout: "tall",
    description:
      "Travel discovery and marketplace experience spanning destinations, packages, search and lead-generation flows.",
    href: "https://viacation.com/",
    image: sitePreview("https://viacation.com/"),
    imageAlt: "Viacation travel platform",
    highlights: ["Marketplace", "Search", "Lead generation"],
  },
  {
    slug: "sg11-fantasy",
    name: "SG11 FANTASY",
    category: "korvalabs",
    type: "Fantasy Sports / Consumer Product",
    layout: "split",
    description: "Consumer-facing fantasy sports product experience.",
    href: "https://sg11fantasyindia.com/",
    image: sitePreview("https://sg11fantasyindia.com/"),
    imageAlt: "SG11 Fantasy sports product",
    highlights: ["Consumer product", "Fantasy sports"],
  },
  {
    slug: "travel-deal-online",
    name: "TRAVEL DEAL ONLINE",
    category: "korvalabs",
    type: "Travel Marketplace",
    layout: "horizontal",
    description: "Travel deal and discovery platform.",
    imageAlt: "Travel Deal Online marketplace product",
    highlights: ["Deals", "Discovery"],
  },
  {
    slug: "mobile-game",
    name: "MOBILE GAME",
    category: "korvalabs",
    type: "Consumer Mobile Product",
    layout: "tall",
    description: "Casual mobile game product.",
    note: "Not represented as a currently live public release.",
    imageAlt: "Mobile game product work",
    highlights: ["Mobile", "Casual game"],
  },
  {
    slug: "gaming-platform",
    name: "GAMING PLATFORM",
    category: "korvalabs",
    type: "Interactive Entertainment",
    layout: "horizontal",
    description: "Older casino and poker-related mobile and product work.",
    note: "Not represented as currently live commercial products.",
    imageAlt: "Gaming platform engineering work",
    highlights: ["Gaming", "Legacy platforms"],
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
      "Experience across product and technology teams at scale — shipping, operating, and improving software in complex environments.",
    imageAlt: "Professional experience at scale",
  },
];

export const allProjects = [...korvaLabsProjects, ...experienceProjects];

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}
