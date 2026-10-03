import { getFeaturedHomeProjects } from "@/content/projects";
import { principles as principleItems } from "@/content/site";
import { HeroSection } from "@/components/hero/HeroSection";
import { CapabilityList } from "@/components/capability-list/CapabilityList";
import { SignatureSection } from "@/components/interactive/SignatureSection";
import { FeaturedWork } from "@/components/project-showcase/FeaturedWork";
import { ExperienceLogoGrid } from "@/components/experience-strip/ExperienceLogoGrid";
import { FinalCta } from "@/components/final-cta/FinalCta";

export function HomePage() {
  const featured = getFeaturedHomeProjects();

  return (
    <>
      <HeroSection />
      <CapabilityList />
      <SignatureSection />
      <FeaturedWork projects={featured} />
      <ExperienceLogoGrid />

      <section className="border-b border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            GOOD SOFTWARE STARTS BEFORE THE CODE.
          </h2>
          <ul className="mt-10 space-y-6 md:mt-12">
            {principleItems.map((p) => (
              <li key={p.text} className="max-w-xl text-sm text-zinc-500 md:text-base">
                {p.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
