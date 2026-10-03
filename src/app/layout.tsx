import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/content/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KorvaLabs — Product engineering studio",
    template: "%s · KorvaLabs",
  },
  description: site.description,
  keywords: [
    "app development",
    "mobile app development",
    "web development",
    "AI development",
    "AI automation",
    "product engineering",
    "MVP development",
    "SaaS development",
    "GEO",
    "AEO",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KorvaLabs",
    title: "KorvaLabs — Product engineering studio",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KorvaLabs",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KorvaLabs",
  url: siteUrl,
  description: site.description,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.email.address,
    availableLanguage: ["English"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-display)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
