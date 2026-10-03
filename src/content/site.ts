export const site = {
  name: "KORVALABS",
  tagline: "Build what's next.",
  description:
    "KorvaLabs is a premium product engineering and digital product studio — web products, mobile apps, AI systems, automation, and SaaS for startups and SMBs worldwide.",
  url: "https://korvalabs.dev",
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
    text: "Validate quickly without creating throwaway software.",
  },
  {
    id: "growth",
    label: "GROWTH",
    text: "Improve, rebuild or scale an existing product.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    text: "Turn repetitive operational work into software and AI-powered workflows.",
  },
] as const;

export const principles = [
  {
    num: "01",
    text: "UNDERSTAND THE BUSINESS.",
  },
  {
    num: "02",
    text: "CHOOSE THE SIMPLEST ARCHITECTURE THAT CAN SURVIVE THE NEXT STAGE.",
  },
  {
    num: "03",
    text: "SHIP.\nMEASURE.\nIMPROVE.",
  },
] as const;

export const whatWeBuild = [
  { num: "01", label: "WEB", hint: "Websites, marketplaces, portals and web applications." },
  { num: "02", label: "MOBILE", hint: "Android and iOS products backed by robust architecture." },
  { num: "03", label: "AI", hint: "AI-enabled products, RAG, agents, copilots and intelligent features." },
  { num: "04", label: "AUTOMATION", hint: "Workflow automation, integrations and operational systems." },
  { num: "05", label: "SAAS", hint: "MVPs and SaaS products designed to grow." },
  { num: "06", label: "PRODUCT ENGINEERING", hint: "Architecture, APIs, infrastructure and ongoing development." },
  { num: "07", label: "GEO / AEO", hint: "Discoverability across search engines and AI-driven discovery." },
  { num: "08", label: "DATA + INTERNAL TOOLS", hint: "Dashboards, analytics and internal operating software." },
] as const;
