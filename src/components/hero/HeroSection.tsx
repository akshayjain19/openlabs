import Link from "next/link";
import { whatsAppLink } from "@/lib/utils";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { KorvaFrame } from "@/components/ui/KorvaFrame";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end border-b border-white/10 pb-10 pt-28 md:min-h-[100svh] md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-x-5 top-20 bottom-8 md:inset-x-8 md:top-24 md:bottom-12">
        <KorvaFrame variant="corner" className="h-full w-full" />
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <HeroHeadline />
        <p className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500 md:mt-10">
          From product idea to production-ready software.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-12">
          <Link
            href={whatsAppLink("Hi KorvaLabs — I'd like to discuss a project.")}
            data-magnetic
            className="inline-flex min-w-[200px] items-center justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-black transition hover:bg-zinc-200"
          >
            WHATSAPP US →
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center px-1 py-2 text-[10px] tracking-[0.28em] text-zinc-600 transition hover:text-zinc-400"
          >
            VIEW OUR WORK →
          </Link>
        </div>
      </div>
    </section>
  );
}
