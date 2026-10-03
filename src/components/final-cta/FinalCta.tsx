import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";
import { KorvaFrame } from "@/components/ui/KorvaFrame";

export function FinalCta() {
  return (
    <section className="relative border-t border-white/10 bg-[#030303] py-32 md:min-h-[85vh] md:py-40">
      <div className="pointer-events-none absolute inset-x-5 top-16 bottom-16 md:inset-x-8">
        <KorvaFrame variant="corner" className="h-full w-full" />
      </div>
      <div className="relative mx-auto flex max-w-[1400px] flex-col justify-center px-5 md:px-8">
        <h2 className="text-[clamp(3rem,12vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.05em]">
          HAVE SOMETHING
          <br />
          TO BUILD?
        </h2>
        <p className="mt-10 text-base text-zinc-500 md:mt-12 md:text-xl">TELL US WHAT&apos;S ON YOUR MIND.</p>
        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center md:mt-16">
          <Link
            href={whatsAppLink("Hi KorvaLabs — I have something to build.")}
            data-magnetic
            className="inline-flex min-w-[240px] items-center justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-black hover:bg-zinc-200"
          >
            WHATSAPP KORVALABS →
          </Link>
          <p className="text-sm text-zinc-600">{site.whatsapp.display}</p>
        </div>
        <Link
          href="/work"
          className="mt-10 inline-block text-[10px] tracking-[0.3em] text-zinc-600 hover:text-white"
        >
          VIEW THE WORK →
        </Link>
      </div>
    </section>
  );
}
