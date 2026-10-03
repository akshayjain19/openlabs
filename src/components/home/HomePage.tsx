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

      <section className="border-b border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-2xl text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            GOOD SOFTWARE STARTS BEFORE THE CODE.
          </h2>
          <ul className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap md:gap-x-10">
            {principleItems.map((p) => (
              <li key={p.text} className="text-sm text-zinc-500">
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
