import { getFeaturedHomeProjects } from "@/content/projects";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedWork } from "@/components/project-showcase/FeaturedWork";
import { ExperienceLogoGrid } from "@/components/experience-strip/ExperienceLogoGrid";
import { FinalCta } from "@/components/final-cta/FinalCta";

export function HomePage() {
  const featured = getFeaturedHomeProjects();

  return (
    <>
      <HeroSection />
      <FeaturedWork projects={featured} />
      <ExperienceLogoGrid />

      <section className="border-b border-white/10 py-8 md:py-10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-xl text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            WE LIKE MAKING
            <br />
            COMPLICATED THINGS
            <br />
            FEEL SIMPLE.
            <br />
            <span className="text-zinc-400">AND SEXY.</span>
          </h2>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
