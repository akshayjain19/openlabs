"use client";

import dynamic from "next/dynamic";

const InteractiveSpeaker = dynamic(
  () => import("@/components/interactive/InteractiveSpeaker").then((m) => m.InteractiveSpeaker),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[min(52vh,480px)] w-full bg-[#050505] lg:min-h-[min(58vh,560px)]"
        aria-hidden
      />
    ),
  },
);

export function SignatureSection() {
  return (
    <section className="border-b border-white/10 bg-[#050505]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-[70px] md:px-8 md:py-[100px] lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="max-w-md lg:py-8">
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            WE LIKE MAKING
            <br />
            COMPLICATED THINGS
            <br />
            FEEL SIMPLE.
            <br />
            <span className="text-zinc-400">AND SEXY.</span>
          </h2>
          <p className="mt-6 text-[10px] tracking-[0.35em] text-zinc-600">TURN IT ON.</p>
        </div>
        <InteractiveSpeaker />
      </div>
    </section>
  );
}
