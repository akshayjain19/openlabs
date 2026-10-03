import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="border-t border-white/10 bg-[#050505] py-28 md:min-h-[70vh] md:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-center px-5 md:px-8">
        <h2 className="text-[clamp(2.75rem,10vw,7rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
          HAVE SOMETHING
          <br />
          TO BUILD?
        </h2>
        <p className="mt-8 text-lg text-zinc-400 md:text-xl">TELL US WHAT&apos;S ON YOUR MIND.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={whatsAppLink("Hi KorvaLabs — I have something to build.")}
            data-magnetic
            className="inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-medium tracking-[0.2em] text-white hover:bg-white hover:text-black"
          >
            WHATSAPP KORVALABS →
          </Link>
          <p className="text-sm text-zinc-500">{site.whatsapp.display}</p>
        </div>
        <Link href="/work" className="mt-8 inline-block text-xs tracking-[0.25em] text-zinc-500 hover:text-white">
          VIEW THE WORK →
        </Link>
      </div>
    </section>
  );
}
