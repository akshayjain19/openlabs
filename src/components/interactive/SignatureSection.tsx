"use client";

import dynamic from "next/dynamic";

const InteractiveObject = dynamic(
  () => import("@/components/interactive/InteractiveObject").then((m) => m.InteractiveObject),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] items-center justify-center border-t border-white/10 bg-[#080808] md:min-h-[480px]">
        <p className="text-xs tracking-[0.3em] text-zinc-600">LOADING</p>
      </div>
    ),
  },
);

export function SignatureSection() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[1fr_1.05fr]">
        <div className="flex flex-col justify-center px-5 py-16 md:px-8 lg:py-24">
          <h2 className="max-w-md text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            WE LIKE MAKING
            <br />
            COMPLICATED THINGS
            <br />
            FEEL SIMPLE.
          </h2>
        </div>
        <InteractiveObject className="border-t lg:border-t-0" />
      </div>
    </section>
  );
}
