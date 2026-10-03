export type ProjectCategory = "openlabs" | "experience";

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

export const openlabsProjects: Project[] = [
  {
    slug: "indore-nursery",
    name: "INDORE NURSERY",
    category: "openlabs",
    type: "E-commerce / Commerce",
    layout: "feature",
    description:
      "A commerce experience for a plant nursery, including catalogue browsing, product discovery, shopping flows and local fulfilment.",
    href: "https://indorenursery.com/",
    imageAlt: "Indore Nursery commerce platform",
    highlights: ["Catalogue", "Commerce flows", "Local fulfilment"],
  },
  {
    slug: "tattvasri",
    name: "TATTVASRI",
    category: "openlabs",
    type: "E-commerce / Lifestyle",
    layout: "split",
    description:
      "Digital commerce experience for a spiritual lifestyle brand, including product discovery and WhatsApp-led commerce.",
    href: "https://tattvasri.com/",
    imageAlt: "Tattvasri lifestyle commerce experience",
    highlights: ["Product discovery", "WhatsApp commerce"],
  },
  {
    slug: "viacation",
    name: "VIACATION",
    category: "openlabs",
    type: "Travel / Travel technology",
    layout: "horizontal",
    description:
      "Travel discovery and marketplace experience spanning destinations, packages, search and lead-generation flows.",
    href: "https://viacation.com/",
    imageAlt: "Viacation travel platform",
    highlights: ["Destinations", "Packages", "Lead generation"],
  },
  {
    slug: "sg11-fantasy",
    name: "SG11 FANTASY",
    category: "openlabs",
    type: "Fantasy sports / Consumer product",
    layout: "tall",
    description: "Consumer-facing fantasy sports product experience.",
    href: "https://sg11fantasyindia.com/",
    imageAlt: "SG11 Fantasy sports product",
    highlights: ["Consumer app", "Fantasy sports"],
  },
  {
    slug: "travel-deal-online",
    name: "TRAVEL DEAL ONLINE",
    category: "openlabs",
    type: "Travel marketplace",
    layout: "split",
    description: "Travel deal and discovery platform.",
    imageAlt: "Travel Deal Online marketplace product",
    highlights: ["Deal discovery", "Travel marketplace"],
  },
  {
    slug: "mobile-game",
    name: "MOBILE GAME",
    category: "openlabs",
    type: "Consumer mobile product",
    layout: "tall",
    description: "Casual mobile game product.",
    note: "Not represented as a currently live public release.",
    imageAlt: "Mobile game product work",
    highlights: ["Mobile", "Casual game"],
  },
  {
    slug: "gaming-platform",
    name: "GAMING PLATFORM",
    category: "openlabs",
    type: "Interactive entertainment",
    layout: "horizontal",
    description:
      "Older casino and poker-related source-code projects — interactive entertainment engineering.",
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
      "OpenLabs is built by people who have worked across product and technology teams at scale — shipping, operating, and improving software in complex environments.",
    imageAlt: "Team professional experience at scale",
  },
];

export const allProjects = [...openlabsProjects, ...experienceProjects];

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}
