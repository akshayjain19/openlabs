export const site = {
  name: "OPENLABS",
  tagline: "Build what's next.",
  description:
    "OpenLabs is a product engineering studio building web products, mobile apps, AI systems, and automation for startups and SMBs.",
  url: "https://openlabs.dev",
  whatsapp: {
    display: "+91 84410 78510",
    e164: "918441078510",
    href: "https://wa.me/918441078510",
  },
  location: "LOCATION AGNOSTIC",
  nav: [
    { label: "WORK", href: "/work" },
    { label: "SERVICES", href: "/services" },
    { label: "ABOUT", href: "/about" },
  ],
} as const;

export const experienceCompanies = [
  "ZUPERIOR",
  "ZETA",
  "FLIPKART",
  "AMAZON",
  "EXPEDIA",
  "PROBO",
] as const;

export const buildFor = [
  {
    id: "idea",
    label: "IDEA",
    text: "Turn a rough concept into something you can show, test, and learn from.",
  },
  {
    id: "mvp",
    label: "MVP",
    text: "Ship a focused first version with the architecture to grow past it.",
  },
  {
    id: "growth",
    label: "GROWTH",
    text: "Extend platforms, improve performance, and unblock the next product stage.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    text: "Replace manual work with reliable workflows, integrations, and internal tools.",
  },
] as const;

export const principles = [
  {
    num: "01",
    text: "Understand the business.",
  },
  {
    num: "02",
    text: "Choose the simplest architecture that can survive the next stage.",
  },
  {
    num: "03",
    text: "Ship, measure, improve.",
  },
] as const;

export const whatWeBuild = [
  { num: "01", label: "WEB PRODUCTS", hint: "Platforms, dashboards, and customer-facing web software." },
  { num: "02", label: "MOBILE APPS", hint: "Native-feeling apps for iOS and Android." },
  { num: "03", label: "AI SYSTEMS", hint: "Copilots, RAG, classification, and product-native AI." },
  { num: "04", label: "AUTOMATION", hint: "Workflows, orchestration, and operational tooling." },
  { num: "05", label: "SAAS & MVPs", hint: "From first login to billing-ready product foundations." },
  { num: "06", label: "PRODUCT ENGINEERING", hint: "Full-stack delivery with design and product judgment." },
  { num: "07", label: "GEO / AEO", hint: "Structured content and discoverability for modern search." },
  { num: "08", label: "DATA & INTERNAL TOOLS", hint: "Analytics, reporting, and systems your team runs on." },
] as const;
