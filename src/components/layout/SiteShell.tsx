import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CustomCursor } from "@/components/interactive/CustomCursor";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <main className="flex-1 bg-[#070707] text-white">{children}</main>
      <SiteFooter />
    </>
  );
}
