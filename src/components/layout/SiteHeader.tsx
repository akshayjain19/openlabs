"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import { whatsAppLink, cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-white/15 bg-[#070707]/95 backdrop-blur-md"
          : "border-white/10 bg-[#070707]/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.35em] text-white md:text-base"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs font-medium tracking-[0.25em] text-zinc-400 transition-colors hover:text-white",
                pathname === item.href && "text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <MagneticContact />
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-8 bg-white" />
          <span className="h-px w-5 bg-white" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-[#070707] px-5 py-10 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-semibold tracking-tight text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={whatsAppLink("Hi OpenLabs — I'd like to talk about a project.")}
                className="pt-4 text-2xl font-medium tracking-wide text-zinc-300"
                onClick={() => setOpen(false)}
              >
                LET&apos;S TALK →
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MagneticContact() {
  return (
    <Link
      href={whatsAppLink("Hi OpenLabs — I'd like to talk about a project.")}
      data-magnetic
      className="group relative text-xs font-medium tracking-[0.2em] text-white"
    >
      <span className="relative z-10">LET&apos;S TALK →</span>
      <span className="absolute -inset-x-3 -inset-y-2 scale-95 border border-white/0 transition group-hover:border-white/30 group-hover:scale-100" />
    </Link>
  );
}
