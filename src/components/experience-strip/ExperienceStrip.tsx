import { experienceCompanies, experienceCopy } from "@/content/experience";

export function ProfessionalExperienceIntro() {
  return (
    <section className="border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <p className="text-xs tracking-[0.3em] text-zinc-500">02 / PROFESSIONAL EXPERIENCE</p>
        <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          {experienceCopy.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          {experienceCopy.body}
        </p>
        <p className="mt-8 text-xs tracking-[0.2em] text-zinc-500">
          {experienceCompanies.join(" · ")}
        </p>
      </div>
    </section>
  );
}

export function ExperienceMarqueeStrip() {
  const track = [...experienceCompanies, ...experienceCompanies];

  return (
    <section className="overflow-hidden border-y border-white/10 py-16 md:py-20">
      <p className="mx-auto max-w-[1400px] px-5 text-xs tracking-[0.3em] text-zinc-500 md:px-8">
        {experienceCopy.marqueeLabel}
      </p>
      <div className="marquee mt-10" aria-hidden>
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
