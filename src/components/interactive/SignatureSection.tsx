"use client";

import dynamic from "next/dynamic";

const InteractiveObject = dynamic(
  () => import("@/components/interactive/InteractiveObject").then((m) => m.InteractiveObject),
  {
    ssr: false,
    loading: () => <div className="min-h-[280px] border-t border-white/10 bg-[#080808] lg:min-h-[360px]" aria-hidden />,
  },
);

export function SignatureSection() {
  return (
    <section className="border-b border-white/10">
      <InteractiveObject />
    </section>
  );
}
