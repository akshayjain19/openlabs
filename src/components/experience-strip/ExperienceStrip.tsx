"use client";

import { experienceCompanies, experienceCopy } from "@/content/experience";

export function ExperienceStrip() {
  const track = [...experienceCompanies, ...experienceCompanies];

  return (
    <section className="overflow-hidden border-y border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          {experienceCopy.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          {experienceCopy.body}
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
