export type ProjectCategory = "openlabs" | "experience";

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
};

export const openlabsProjects: Project[] = [
  {
    slug: "indore-nursery",
    name: "INDORE NURSERY",
    category: "openlabs",
    type: "E-commerce / Commerce platform",
    description:
      "Digital commerce experience for a plant nursery with product discovery, catalogue management, shopping flows and local fulfilment.",
    href: "https://indorenursery.com/",
    image: "https://indorenursery.com/cdn/shop/files/logo.png?v=1685000000",
    imageAlt: "Indore Nursery commerce platform",
  },
  {
    slug: "tattvasri",
    name: "TATTVASRI",
    category: "openlabs",
    type: "E-commerce / Lifestyle",
    description:
      "A commerce experience for a spiritual lifestyle brand, including product discovery and WhatsApp-led purchase flow.",
    href: "https://tattvasri.com/",
    imageAlt: "Tattvasri lifestyle commerce experience",
  },
  {
    slug: "sg11-fantasy",
    name: "SG11 FANTASY",
    category: "openlabs",
    type: "Fantasy sports / Consumer app",
    description: "Consumer-facing fantasy sports product and app experience.",
    href: "https://sg11fantasyindia.com/",
    imageAlt: "SG11 Fantasy sports product",
  },
  {
    slug: "viacation",
    name: "VIACATION",
    category: "openlabs",
    type: "Travel / Marketplace",
    description:
      "Travel platform experience spanning destination discovery, packages, search and travel planning flows.",
    href: "https://viacation.com/",
    imageAlt: "Viacation travel platform",
  },
  {
    slug: "travel-deal-online",
    name: "TRAVEL DEAL ONLINE",
    category: "openlabs",
    type: "Travel technology",
    description:
      "Digital travel marketplace focused on deal discovery and booking-oriented travel flows.",
    imageAlt: "Travel Deal Online marketplace product",
  },
  {
    slug: "mobile-game",
    name: "MOBILE GAME",
    category: "openlabs",
    type: "Consumer mobile product",
    description: "A casual mobile game experience built as a consumer product.",
    note: "Not represented as a currently live public release.",
    imageAlt: "Mobile game product work",
  },
  {
    slug: "gaming-platform",
    name: "GAMING PLATFORM",
    category: "openlabs",
    type: "Interactive entertainment",
    description:
      "Interactive mobile and gaming product engineering — including legacy casino and poker-related codebases.",
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
    description:
      "OpenLabs is built by people who have worked across product and technology teams at scale — shipping, operating, and improving software in complex environments.",
    imageAlt: "Team professional experience at scale",
  },
];

export const allProjects = [...openlabsProjects, ...experienceProjects];

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}
