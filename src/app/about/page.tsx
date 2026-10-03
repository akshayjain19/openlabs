import type { Metadata } from "next";
import Link from "next/link";
import { experienceCompanies } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small product engineering team building web, mobile, AI, and automation software for startups and SMBs — location agnostic.",
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
              OpenLabs exists for businesses that need technology to actually move the business
              forward — not slide decks, not endless discovery, not a template storefront.
            </p>
            <p>
              We sit between business problem, product thinking, design, engineering, AI, and
              automation. The team is intentionally small: product-minded engineers who can own
              outcomes end to end.
            </p>
            <p>
              We work remotely with founders and operators globally — location agnostic by design,
              aligned time zones when it matters, async when it doesn&apos;t.
            </p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden border border-white/10 bg-[#0a0a0a] p-8">
            <div className="absolute inset-0 opacity-30">
              {experienceCompanies.map((name, i) => (
                <span
                  key={name}
                  className="absolute text-xs tracking-[0.35em] text-white"
                  style={{
                    top: `${(i * 17) % 80}%`,
                    left: `${(i * 29) % 70}%`,
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 12}deg)`,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="relative max-w-xs text-2xl font-semibold leading-tight tracking-tight">
              Product · Design · Engineering · AI · Automation
            </p>
          </div>
        </div>
        <Link
          href={whatsAppLink("Hi OpenLabs — I'd like to learn more about working together.")}
          className="mt-14 inline-block border border-white px-6 py-3 text-xs tracking-[0.2em] hover:bg-white hover:text-black"
        >
          LET&apos;S TALK →
        </Link>
      </div>
    </div>
  );
}
