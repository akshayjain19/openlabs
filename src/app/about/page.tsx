import type { Metadata } from "next";
import Link from "next/link";
import { whatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "KorvaLabs — a small product engineering team building web, mobile, AI, and automation software for startups and SMBs. Location agnostic.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          A SMALL TEAM.
          <br />A LOT OF SOFTWARE.
        </h1>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-sm leading-relaxed text-zinc-400 md:text-base">
            <p>
              KorvaLabs exists for businesses that need technology to actually move the business
              forward.
            </p>
            <p>We work across:</p>
            <ul className="space-y-2 text-xs tracking-[0.15em] text-zinc-300">
              <li>BUSINESS PROBLEM</li>
              <li>PRODUCT THINKING</li>
              <li>DESIGN</li>
              <li>ENGINEERING</li>
              <li>AI</li>
              <li>AUTOMATION</li>
            </ul>
            <p>Location agnostic.</p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden border border-white/10 bg-[#0a0a0a] p-8">
            <div className="grid h-full grid-cols-4 grid-rows-4 gap-2 opacity-40">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-white/10 bg-white/[0.02]" />
              ))}
            </div>
            <p className="absolute bottom-8 left-8 max-w-xs text-2xl font-semibold leading-tight tracking-tight">
              KORVALABS
            </p>
          </div>
        </div>
        <Link
          href={whatsAppLink("Hi KorvaLabs — I'd like to learn more about working together.")}
          className="mt-14 inline-block border border-white px-6 py-3 text-xs tracking-[0.2em] hover:bg-white hover:text-black"
        >
          LET&apos;S TALK →
        </Link>
      </div>
    </div>
  );
}
