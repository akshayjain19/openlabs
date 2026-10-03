"use client";

import { experienceCompanies } from "@/content/site";

export function ExperienceMarquee() {
  const track = [...experienceCompanies, ...experienceCompanies];

  return (
    <section className="overflow-hidden border-y border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          BUILT BY PEOPLE
          <br />
          WHO HAVE BUILT
          <br />
          AT SCALE.
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          OpenLabs is built by people who have worked across product and technology teams at
          companies including — not client logos, but the environments that shaped how we ship
          software.
        </p>
      </div>

      <div className="marquee mt-14 border-t border-white/10 pt-10" aria-hidden>
        <div className="marquee-track">
          {track.map((name, i) => (
            <span key={`${name}-${i}`} className="marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
