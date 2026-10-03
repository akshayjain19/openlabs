import type { Metadata } from "next";
import { ServicesList } from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile, AI, automation, SaaS, product engineering, GEO/AEO, and data systems — built for startups and SMBs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesList />;
}
