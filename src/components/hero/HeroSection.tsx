"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { HeroHeadline } from "@/components/home/HeroHeadline";

const InteractiveSpeaker = dynamic(
  () => import("@/components/interactive/InteractiveSpeaker").then((m) => m.InteractiveSpeaker),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[240px] w-full bg-transparent md:min-h-[320px]" aria-hidden />
    ),
  },
);

export function HeroSection() {
  return (
    <section className="relative border-b border-white/10 bg-[#050505] pt-24 pb-10 md:pt-28 md:pb-14 lg:min-h-[92svh] lg:pb-16 lg:pt-32">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8">
        <div className="flex flex-col justify-end pb-2 lg:pb-8">
          <HeroHeadline />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500 md:mt-8">
            Digital products built around your business.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
            <Link
              href={whatsAppLink("Hi KorvaLabs — I'd like to discuss a project.")}
              data-magnetic
              className="inline-flex min-w-[200px] items-center justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-black transition hover:bg-zinc-200"
            >
              WHATSAPP US →
            </Link>
            <Link
              href={site.email.href}
              data-magnetic
              className="inline-flex min-w-[200px] items-center justify-center border border-white/25 px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-white transition hover:border-white"
            >
              EMAIL US →
            </Link>
          </div>
        </div>
        <div className="relative lg:-mt-6 lg:justify-self-end lg:w-full lg:max-w-[520px]">
          <InteractiveSpeaker variant="hero" />
        </div>
      </div>
    </section>
  );
}
