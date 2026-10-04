import { projectDesktopPath, projectGallery, projectMobileWebPath } from "@/lib/project-media";

/** Internal: Afrikmart — DO NOT PUBLISH until verified and approved. */

export type ProjectCategory = "korvalabs" | "experience";

export type ProjectLayout = "feature" | "split" | "tall" | "horizontal";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  type: "web" | "app" | "hybrid";
  description: string;
  outcome?: string;
  href?: string;
  /** @deprecated use desktopImage */
  image?: string;
  desktopImage?: string;
  mobileWebImage?: string;
  appImages?: string[];
  crmImage?: string;
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
    type: "app",
    layout: "tall",
    featured: true,
    leadPriority: 100,
    description: "Travel discovery and marketplace experience.",
    outcome: "Search, packages, and lead-generation flows.",
    proofLine: "Search + discovery for a travel marketplace.",
    href: "https://viacation.com/",
    appImages: [
      "/projects/viacation/app-1.webp",
      "/projects/viacation/app-2.webp",
      "/projects/viacation/app-3.webp",
    ],
    gallery: projectGallery("viacation"),
    imageAlt: "Viacation travel platform",
  },
  {
    slug: "our-shopee",
    name: "OURSHOPEE",
    category: "korvalabs",
    type: "app",
    layout: "feature",
    featured: false,
    leadPriority: 20,
    description: "Selected marketplace feature development on a live multi-seller product.",
    outcome: "Scoped product engineering — not full product ownership.",
    proofLine: "SELECTED FEATURE DEVELOPMENT",
    href: "https://www.ourshopee.com/",
    appImages: [
      "/projects/our-shopee/app-1.webp",
      "/projects/our-shopee/app-2.webp",
      "/projects/our-shopee/app-3.webp",
    ],
    gallery: projectGallery("our-shopee"),
    imageAlt: "OurShopee marketplace — selected feature work",
    proof: ["SELECTED FEATURE DEVELOPMENT"],
  },
  {
    slug: "indore-nursery",
    name: "INDORE NURSERY",
    category: "korvalabs",
    type: "web",
    layout: "feature",
    featured: true,
    leadPriority: 95,
    description: "Commerce for a plant nursery with catalogue and local fulfilment.",
    outcome: "Built for organic discovery and local commerce.",
    proofLine: "Built for organic discovery and local commerce.",
    href: "https://indorenursery.com/",
    desktopImage: projectDesktopPath("indore-nursery"),
    mobileWebImage: projectMobileWebPath("indore-nursery"),
    image: projectDesktopPath("indore-nursery"),
    gallery: projectGallery("indore-nursery"),
    imageAlt: "Indore Nursery commerce platform",
  },
  {
    slug: "sg11-fantasy",
    name: "SG11 FANTASY",
    category: "korvalabs",
    type: "app",
    layout: "split",
    featured: true,
    leadPriority: 90,
    description: "Consumer fantasy sports product experience.",
    outcome: "High-engagement consumer product flows.",
    proofLine: "Consumer-facing fantasy sports product experience.",
    href: "https://sg11fantasyindia.com/",
    appImages: [
      "/projects/sg11-fantasy/app-1.webp",
      "/projects/sg11-fantasy/app-2.webp",
      "/projects/sg11-fantasy/app-3.webp",
    ],
    gallery: projectGallery("sg11-fantasy"),
    imageAlt: "SG11 Fantasy sports product",
  },
  {
    slug: "the-laundry-house",
    name: "THE LAUNDRY HOUSE",
    category: "korvalabs",
    type: "web",
    layout: "split",
    featured: true,
    /** Fourth featured homepage slot; higher values rank first site-wide */
    leadPriority: 85,
    description:
      "A premium digital experience for a garment-care business, bringing service discovery, booking, doorstep pickup and delivery, store discovery, and franchise enquiries into one platform.",
    outcome: "Garment-care across 9 major cities — discovery, booking, and enquiries.",
    proofLine: "Service discovery, booking and local lead generation.",
    href: "https://thelaundryhouseindia.com/",
    desktopImage: projectDesktopPath("the-laundry-house"),
    mobileWebImage: projectMobileWebPath("the-laundry-house"),
    image: projectDesktopPath("the-laundry-house"),
    gallery: projectGallery("the-laundry-house"),
    imageAlt: "The Laundry House digital experience for garment care",
  },
  {
    slug: "usmara-coffee",
    name: "USMARA COFFEE",
    category: "korvalabs",
    type: "hybrid",
    layout: "feature",
    featured: true,
    leadPriority: 80,
    description: "Premium coffee ecommerce experience.",
    href: "https://usmaracoffee.com/",
    desktopImage: projectDesktopPath("usmara-coffee"),
    mobileWebImage: projectMobileWebPath("usmara-coffee"),
    image: projectDesktopPath("usmara-coffee"),
    gallery: projectGallery("usmara-coffee"),
    imageAlt: "Usmara Coffee ecommerce experience",
  },
  {
    slug: "apes-together-strong",
    name: "APES TOGETHER STRONG",
    category: "korvalabs",
    type: "web",
    layout: "horizontal",
    featured: false,
    leadPriority: 70,
    description: "Public website hero visual.",
    href: "https://apes-together-strong.vercel.app/",
    desktopImage: projectDesktopPath("apes-together-strong"),
    image: projectDesktopPath("apes-together-strong"),
    gallery: projectGallery("apes-together-strong"),
    imageAlt: "Apes Together Strong website",
  },
  {
    slug: "tattvasri",
    name: "TATTVASRI",
    category: "korvalabs",
    type: "web",
    layout: "split",
    featured: false,
    leadPriority: 50,
    description:
      "Digital commerce for a spiritual lifestyle brand with WhatsApp-led purchase flows.",
    proofLine: "WhatsApp-led commerce and product discovery.",
    href: "https://tattvasri.com/",
    desktopImage: projectDesktopPath("tattvasri"),
    mobileWebImage: projectMobileWebPath("tattvasri"),
    image: projectDesktopPath("tattvasri"),
    gallery: projectGallery("tattvasri"),
    imageAlt: "Tattvasri lifestyle commerce experience",
  },
  {
    slug: "mobile-games",
    name: "MOBILE GAMES",
    category: "korvalabs",
    type: "app",
    layout: "tall",
    featured: false,
    leadPriority: 30,
    description: "Mobile game product and source-code experience.",
    appImages: [
      "/projects/mobile-games/candy.webp",
      "/projects/mobile-games/poker.webp",
    ],
    imageAlt: "Mobile games product work",
  },
];

export const experienceProjects: Project[] = [
  {
    slug: "team-scale",
    name: "PRODUCT & PLATFORM TEAMS",
    category: "experience",
    type: "web",
    layout: "feature",
    description:
      "Experience across product and technology teams at scale — shipping and operating software in complex environments.",
    imageAlt: "Professional experience at scale",
  },
];

export const allProjects = [...korvaLabsProjects, ...experienceProjects];

export function getFeaturedHomeProjects(limit = 5) {
  return korvaLabsProjects
    .filter((p) => p.featured)
    .sort((a, b) => (b.leadPriority ?? 0) - (a.leadPriority ?? 0))
    .slice(0, limit);
}

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}
