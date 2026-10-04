import { experienceCompanies, experienceCopy } from "@/content/experience";
import { KorvaFrame } from "@/components/ui/KorvaFrame";

export function ProfessionalExperienceIntro() {
  return (
    <section className="border-t border-white/10 py-10 md:py-12">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="max-w-[56rem] text-[clamp(0.95rem,1.7vw,1.3rem)] font-semibold leading-snug tracking-[0.02em]">
          EXPERIENCE ACROSS PRODUCT &amp; TECHNOLOGY TEAMS AT
        </h2>
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
