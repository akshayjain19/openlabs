import { capabilities } from "@/content/site";

export function CapabilityList() {
  return (
    <section className="border-b border-white/10 py-10 md:py-12">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <p className="text-lg font-semibold tracking-tight text-white md:text-xl">NOT JUST WEBSITES.</p>
        <p className="mt-2 max-w-lg text-sm text-zinc-500">
          Apps, platforms and software built around how your business actually works.
        </p>
        <p className="mt-6 text-[10px] leading-relaxed tracking-[0.22em] text-zinc-500 md:text-[11px]">
          {capabilities.join(" · ")}
        </p>
      </div>
    </section>
  );
}
