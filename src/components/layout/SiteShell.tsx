"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CustomCursor } from "@/components/interactive/CustomCursor";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-1 bg-[#070707] text-white"
      >
        {children}
      </motion.main>
      <SiteFooter />
    </>
  );
}
