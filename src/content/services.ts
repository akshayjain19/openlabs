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
    description: "Build websites, marketplaces, portals and web applications.",
    bullets: ["Customer platforms", "Admin & ops tools", "Integrations", "Performance work"],
  },
  {
    id: "mobile",
    title: "MOBILE",
    description: "Android and iOS products with robust backend architecture.",
    bullets: ["Native & cross-platform", "Release-ready delivery", "Engagement flows"],
  },
  {
    id: "ai",
    title: "AI",
    description:
      "AI-enabled products, copilots, RAG systems, agents, document intelligence and product features.",
    bullets: ["Copilots & assistants", "RAG", "Classification", "Product-native AI"],
  },
  {
    id: "automation",
    title: "AUTOMATION",
    description:
      "Operational workflows, integrations, CRM automation, internal systems and AI-powered automation.",
    bullets: ["Workflow orchestration", "CRM & lead routing", "Internal tooling"],
  },
  {
    id: "saas",
    title: "SAAS",
    description: "MVPs and full SaaS products designed to grow.",
    bullets: ["MVP delivery", "Subscription foundations", "Iteration after launch"],
  },
  {
    id: "product-engineering",
    title: "PRODUCT ENGINEERING",
    description: "Architecture, APIs, databases, infrastructure and ongoing product development.",
    bullets: ["System design", "APIs & data", "Long-term engineering"],
  },
  {
    id: "geo-aeo",
    title: "GEO / AEO",
    description:
      "Design content and technical structures so products and brands are easier for modern search and AI systems to discover, understand and cite.",
    bullets: ["Structured content", "Technical SEO", "Entity clarity"],
  },
  {
    id: "data",
    title: "DATA + INTERNAL TOOLS",
    description: "Dashboards, internal platforms, workflows and analytics systems.",
    bullets: ["Reporting", "Pipelines", "Operational analytics"],
  },
];
