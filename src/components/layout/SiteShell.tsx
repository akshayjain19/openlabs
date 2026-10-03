"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CustomCursor } from "@/components/interactive/CustomCursor";

function subscribeReduced(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, () => false);

  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <motion.main
        key={pathname}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
        className="flex-1 bg-[#070707] text-white"
      >
        {children}
      </motion.main>
      <SiteFooter />
    </>
  );
}
