import { experienceCompanies, experienceCopy } from "@/content/experience";
import { KorvaFrame } from "@/components/ui/KorvaFrame";

export function ProfessionalExperienceIntro() {
  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <p className="text-[10px] tracking-[0.35em] text-zinc-600">02 / PROFESSIONAL EXPERIENCE</p>
        <h2 className="mt-8 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          {experienceCopy.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-zinc-500">{experienceCopy.body}</p>
      </div>
    </section>
  );
}

export function ExperienceMarqueeStrip() {
  const track = [...experienceCompanies, ...experienceCompanies, ...experienceCompanies];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#050505] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <KorvaFrame variant="rule" className="mb-12" />
        <p className="text-[10px] tracking-[0.35em] text-zinc-600">{experienceCopy.marqueeLabel}</p>
      </div>
      <div className="marquee marquee-slow mt-12 md:mt-16" aria-hidden>
        <div className="marquee-track">
          {track.map((name, i) => (
            <span key={`${name}-${i}`} className="marquee-item marquee-item-strong">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
