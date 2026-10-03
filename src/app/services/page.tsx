import type { Metadata } from "next";
import { ServicesEditorial } from "@/components/services/ServicesEditorial";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile, AI, automation, SaaS, product engineering, GEO/AEO, and data systems — KorvaLabs for startups and SMBs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesEditorial />;
}
