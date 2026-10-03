export const site = {
  name: "OPENLABS",
  tagline: "Build what's next.",
  description:
    "OpenLabs is a premium product engineering studio — web products, mobile apps, AI systems, automation, and SaaS for startups and SMBs.",
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

export const buildFor = [
  {
    id: "idea",
    label: "IDEA",
    text: "Turn a business idea into a real product.",
  },
  {
    id: "mvp",
    label: "MVP",
    text: "Validate quickly without building throwaway software.",
  },
  {
    id: "growth",
    label: "GROWTH",
    text: "Improve, rebuild or scale an existing product.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    text: "Replace repetitive operational work with software and AI.",
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
    text: "Ship. Measure. Improve.",
  },
] as const;

export const whatWeBuild = [
  { num: "01", label: "WEB", hint: "Websites, marketplaces, portals and web applications." },
  { num: "02", label: "MOBILE", hint: "Android and iOS products with robust backend architecture." },
  { num: "03", label: "AI", hint: "Copilots, RAG, agents, and AI-native product features." },
  { num: "04", label: "AUTOMATION", hint: "Workflows, integrations, and operational systems." },
  { num: "05", label: "SAAS", hint: "MVPs and SaaS products designed to grow." },
  { num: "06", label: "PRODUCT ENGINEERING", hint: "Architecture, APIs, and ongoing product development." },
  { num: "07", label: "GEO / AEO", hint: "Structures for modern search and answer-engine discovery." },
  { num: "08", label: "DATA + INTERNAL TOOLS", hint: "Dashboards, workflows, and analytics systems." },
] as const;
