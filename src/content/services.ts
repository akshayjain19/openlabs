export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "web",
    title: "WEB",
    description: "Websites, marketplaces, portals and web applications.",
    bullets: ["Product web apps", "Marketplaces", "Portals", "Integrations"],
  },
  {
    id: "mobile",
    title: "MOBILE",
    description: "Android and iOS products backed by robust architecture.",
    bullets: ["iOS & Android", "Cross-platform", "Backend-connected apps"],
  },
  {
    id: "ai",
    title: "AI",
    description:
      "AI-enabled products, RAG systems, agents, copilots, document intelligence and intelligent product features.",
    bullets: ["RAG & agents", "Copilots", "Document intelligence", "Product features"],
  },
  {
    id: "automation",
    title: "AUTOMATION",
    description:
      "Workflow automation, integrations, CRM workflows, internal tools and AI-powered operations.",
    bullets: ["CRM workflows", "Internal tools", "Orchestration", "AI operations"],
  },
  {
    id: "saas",
    title: "SAAS",
    description: "MVPs and SaaS products designed to grow.",
    bullets: ["MVP delivery", "Subscription-ready foundations", "Iteration"],
  },
  {
    id: "product-engineering",
    title: "PRODUCT ENGINEERING",
    description: "Architecture, APIs, databases, infrastructure and ongoing product development.",
    bullets: ["System design", "APIs", "Infrastructure", "Long-term engineering"],
  },
  {
    id: "geo-aeo",
    title: "GEO / AEO",
    description:
      "Technical and content structures designed to improve discoverability across search engines and AI-driven discovery systems.",
    bullets: ["Structured content", "Technical SEO", "Entity clarity"],
  },
  {
    id: "data",
    title: "DATA + INTERNAL TOOLS",
    description: "Dashboards, analytics systems and internal operating software.",
    bullets: ["Dashboards", "Analytics", "Internal platforms"],
  },
];
