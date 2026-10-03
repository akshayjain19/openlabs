export type Service = {
  id: string;
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    id: "web",
    title: "WEB",
    headline: "Web products that carry real business load.",
    description:
      "Customer platforms, internal dashboards, and web software meant to stay fast, maintainable, and clear as the product grows.",
    capabilities: [
      "Product web apps",
      "Marketing sites with substance",
      "Admin & operations tools",
      "Performance & reliability work",
      "Integrations & APIs",
    ],
  },
  {
    id: "mobile",
    title: "MOBILE",
    headline: "Apps built to be used every day.",
    description:
      "Mobile products with thoughtful flows, solid foundations, and the engineering discipline to keep shipping after launch.",
    capabilities: [
      "iOS & Android apps",
      "Cross-platform delivery",
      "Offline-aware experiences",
      "Push & engagement hooks",
      "Store-ready release support",
    ],
  },
  {
    id: "ai",
    title: "AI",
    headline: "AI that has a job to do.",
    description:
      "Practical AI embedded in products and operations — not demos that never reach production.",
    capabilities: [
      "AI copilots",
      "RAG systems",
      "Workflow agents",
      "Document intelligence",
      "Classification & extraction",
      "Internal assistants",
      "AI-enabled product features",
    ],
  },
  {
    id: "automation",
    title: "AUTOMATION",
    headline: "Less manual work. More reliable operations.",
    description:
      "Automations that connect your tools, move data, and keep teams focused on decisions instead of repetition.",
    capabilities: [
      "Operational workflows",
      "Lead routing",
      "CRM automation",
      "Internal tooling",
      "Notifications",
      "Data pipelines",
      "API orchestration",
    ],
  },
  {
    id: "saas",
    title: "SAAS",
    headline: "From MVP to something customers can pay for.",
    description:
      "SaaS foundations — auth, billing hooks, multi-tenant patterns, and the product engineering to get a first version out the door.",
    capabilities: [
      "MVP scoping & delivery",
      "Subscription-ready architecture",
      "Onboarding & activation flows",
      "Admin & support tooling",
      "Iteration after launch",
    ],
  },
  {
    id: "product-engineering",
    title: "PRODUCT ENGINEERING",
    headline: "Engineering with product judgment.",
    description:
      "We sit close to the problem — design, architecture, and implementation aligned so the software matches how the business actually works.",
    capabilities: [
      "Technical discovery",
      "System design",
      "UI implementation",
      "Backend & APIs",
      "QA-minded delivery",
      "Long-term maintenance",
    ],
  },
  {
    id: "geo-aeo",
    title: "GEO / AEO",
    headline: "Discoverability for how people search now.",
    description:
      "Structured content, entity clarity, and technical SEO aligned with generative and answer-engine discovery — without gimmicks.",
    capabilities: [
      "Content architecture",
      "Structured data",
      "Technical SEO",
      "Entity & topic clarity",
      "Landing system design",
      "Measurement & iteration",
    ],
  },
  {
    id: "data",
    title: "DATA & INTERNAL TOOLS",
    headline: "Systems your team actually runs on.",
    description:
      "Reporting, analytics, and internal tools that make operations visible and decisions easier.",
    capabilities: [
      "Dashboards & reporting",
      "ETL & pipelines",
      "Warehouse-friendly models",
      "Operational analytics",
      "Access-controlled tooling",
      "Integration with existing stacks",
    ],
  },
];
