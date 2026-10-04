import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";

const footerNav = [...site.nav, { label: "CONTACT", href: "/contact" }];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-sm font-bold tracking-[0.35em] text-white">{site.name}</p>
          <p className="mt-3 text-sm text-zinc-600">{site.tagline}</p>
        </div>
        <ul className="space-y-2">
          {footerNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-xs tracking-[0.2em] text-zinc-400 hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          <a href={whatsAppLink()} className="block text-xs tracking-[0.2em] text-zinc-400 hover:text-white">
            WHATSAPP US →
          </a>
          <a href={site.email.href} className="block text-xs tracking-[0.2em] text-zinc-400 hover:text-white">
            EMAIL US →
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 md:px-8">
        <p className="mx-auto max-w-[1400px] text-xs text-zinc-700">
          © {new Date().getFullYear()} KorvaLabs
        </p>
      </div>
    </footer>
  );
}
