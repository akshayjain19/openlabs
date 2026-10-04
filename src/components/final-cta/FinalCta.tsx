import Link from "next/link";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative border-t border-white/10 bg-[#030303] py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(2.75rem,10vw,7rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
          HAVE SOMETHING
          <br />
          TO BUILD?
        </h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={whatsAppLink("Hi KorvaLabs — I have something to build.")}
            data-magnetic
            className="inline-flex min-w-[220px] items-center justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-black hover:bg-zinc-200"
          >
            WHATSAPP US →
          </Link>
          <Link
            href={site.email.href}
            data-magnetic
            className="inline-flex min-w-[220px] items-center justify-center border border-white/25 px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-white hover:border-white"
          >
            EMAIL US →
          </Link>
        </div>
      </div>
    </section>
  );
}
