"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { HeroHeadline } from "@/components/home/HeroHeadline";

const InteractiveObject = dynamic(
  () => import("@/components/interactive/InteractiveObject").then((m) => m.InteractiveObject),
  { ssr: false, loading: () => <div className="min-h-[240px] bg-[#080808] lg:min-h-full" aria-hidden /> },
);

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] border-b border-white/10">
      <div className="grid min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32">
          <div className="space-y-2 text-[10px] tracking-[0.35em] text-zinc-500">
            <p>WORKING GLOBALLY</p>
            <p>{site.location}</p>
          </div>
          <HeroHeadline />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Apps, web products, AI systems and automation for businesses moving from 0→1 and
            1→10.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={whatsAppLink("Hi OpenLabs — I'd like to discuss a project.")}
              data-magnetic
              className="inline-flex items-center justify-center border border-white bg-white px-6 py-3 text-xs font-medium tracking-[0.2em] text-black transition hover:bg-zinc-200"
            >
              WHATSAPP US →
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-2 py-3 text-xs font-medium tracking-[0.2em] text-zinc-300 hover:text-white"
            >
              VIEW OUR WORK →
            </Link>
          </div>
        </div>
        <InteractiveObject compact className="lg:border-l" />
      </div>
    </section>
  );
}
