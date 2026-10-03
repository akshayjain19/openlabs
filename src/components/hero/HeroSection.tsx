import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { KorvaFrame } from "@/components/ui/KorvaFrame";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end border-b border-white/10 pb-12 pt-28 md:pb-20 md:pt-36">
      <div className="pointer-events-none absolute inset-x-5 top-24 bottom-10 md:inset-x-8 md:top-28 md:bottom-14">
        <KorvaFrame variant="corner" className="h-full w-full" />
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <div className="mb-auto flex gap-8 pt-6 text-[9px] tracking-[0.4em] text-zinc-600 uppercase md:pt-10">
          <span>Working globally</span>
          <span className="hidden sm:inline">·</span>
          <span>{site.location.toLowerCase()}</span>
        </div>
        <HeroHeadline />
        <p className="mt-10 max-w-md text-sm leading-relaxed text-zinc-500 md:mt-12 md:text-[15px]">
          Apps, web products, AI systems and automation for businesses moving from 0→1 and
          1→10.
        </p>
        <div className="mt-12 flex flex-col gap-5 sm:mt-14 sm:flex-row sm:items-center md:mt-16">
          <Link
            href={whatsAppLink("Hi KorvaLabs — I'd like to discuss a project.")}
            data-magnetic
            className="inline-flex min-w-[200px] items-center justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-black transition hover:bg-zinc-200"
          >
            WHATSAPP US →
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center px-1 py-2 text-[10px] tracking-[0.28em] text-zinc-600 transition hover:text-zinc-300"
          >
            VIEW OUR WORK →
          </Link>
        </div>
      </div>
    </section>
  );
}
