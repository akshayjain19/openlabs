import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.35em] text-white">{site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">{site.tagline}</p>
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] text-zinc-500">NAVIGATION</p>
          <ul className="mt-4 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-zinc-300 hover:text-white">
                  {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-sm text-zinc-300 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] text-zinc-500">CONTACT</p>
          <a
            href={whatsAppLink()}
            className="mt-4 block text-sm text-zinc-300 hover:text-white"
          >
            WhatsApp {site.whatsapp.display}
          </a>
          <p className="mt-6 text-xs tracking-[0.2em] text-zinc-500">{site.location}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 md:px-8">
        <p className="mx-auto max-w-[1400px] text-xs text-zinc-600">
          © {new Date().getFullYear()} OpenLabs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
