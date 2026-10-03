"use client";

import dynamic from "next/dynamic";

const SignatureCanvas = dynamic(
  () => import("./SignatureCanvas").then((m) => m.SignatureCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(70vh,640px)] items-center justify-center border border-white/10 bg-[#0a0a0a]">
        <p className="text-xs tracking-[0.3em] text-zinc-600">LOADING EXPERIMENT</p>
      </div>
    ),
  },
);

export function SignatureExperiment() {
  return (
    <section className="relative border-y border-white/10">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-center px-5 py-16 md:px-8 lg:py-24">
          <h2 className="max-w-md text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
            WE LIKE MAKING
            <br />
            COMPLICATED THINGS
            <br />
            FEEL SIMPLE.
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-zinc-500">
            Move your cursor. Scroll. Break it a little. This is the kind of detail we bring
            to product work — when it earns its place.
          </p>
        </div>
        <SignatureCanvas />
      </div>
    </section>
  );
}
