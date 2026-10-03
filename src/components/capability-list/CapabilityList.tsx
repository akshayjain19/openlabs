import { capabilities } from "@/content/site";

export function CapabilityList() {
  const row1 = capabilities.slice(0, 3).join(" · ");
  const row2 = capabilities.slice(3, 6).join(" · ");
  const row3 = capabilities.slice(6).join(" · ");

  return (
    <section className="border-b border-white/10 py-12 md:py-14">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-lg font-semibold tracking-[0.08em] text-white md:text-xl">WHAT WE BUILD.</h2>
        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed tracking-[0.22em] text-zinc-400 md:text-xs">
          {row1}
          <br />
          {row2}
          <br />
          {row3}
        </p>
        <p className="mt-4 text-sm text-zinc-500">Software for products, operations and growth.</p>
      </div>
    </section>
  );
}
