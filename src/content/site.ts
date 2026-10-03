export const site = {
  name: "KORVALABS",
  tagline: "Build what's next.",
  description:
    "KorvaLabs builds digital products end to end — apps, platforms, and production software for startups and SMBs.",
  url: "https://korvalabs.dev",
  whatsapp: {
    e164: "918441078510",
    href: "https://wa.me/918441078510",
  },
  email: {
    address: "korvalabs.business@gmail.com",
    href: "mailto:korvalabs.business@gmail.com",
  },
  nav: [
    { label: "WORK", href: "/work" },
    { label: "SERVICES", href: "/services" },
    { label: "ABOUT", href: "/about" },
  ],
} as const;

export const capabilities = [
  "WEB",
  "MOBILE",
  "AI",
  "AUTOMATION",
  "SAAS",
  "PRODUCT",
  "GEO / AEO",
] as const;

export const principles = [
  { text: "Understand the business." },
  { text: "Choose architecture that survives the next stage." },
  { text: "Ship. Measure. Improve." },
] as const;
