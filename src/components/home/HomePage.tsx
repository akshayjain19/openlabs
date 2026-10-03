import Link from "next/link";
import { korvaLabsProjects } from "@/content/projects";
import { principles as principleItems } from "@/content/site";
import { HeroSection } from "@/components/hero/HeroSection";
import { CapabilityList } from "@/components/capability-list/CapabilityList";
import { SignatureSection } from "@/components/interactive/SignatureSection";
import { ProjectShowcase } from "@/components/project-showcase/ProjectShowcase";
import {
  ExperienceMarqueeStrip,
  ProfessionalExperienceIntro,
} from "@/components/experience-strip/ExperienceStrip";
import { StageSection } from "@/components/home/StageSection";
import { FinalCta } from "@/components/final-cta/FinalCta";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityList />
      <SignatureSection />

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-xs tracking-[0.3em] text-zinc-500">01 / KORVALABS WORK</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em]">
            THINGS WE&apos;VE BUILT.
          </h2>
        </div>
        {korvaLabsProjects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
        <div className="mx-auto max-w-[1400px] px-5 pb-8 md:px-8">
          <Link href="/work" className="text-xs tracking-[0.25em] text-zinc-400 hover:text-white">
            VIEW ALL WORK →
          </Link>
        </div>
      </section>

      <ProfessionalExperienceIntro />

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            GOOD SOFTWARE
            <br />
            STARTS BEFORE
            <br />
            THE CODE.
          </h2>
          <ol className="mt-20 space-y-14 md:mt-24 md:space-y-16">
            {principleItems.map((p) => (
              <li key={p.num} className="max-w-2xl">
                <p className="text-[10px] tracking-[0.35em] text-zinc-600">{p.num}</p>
                <p className="mt-4 whitespace-pre-line text-lg leading-snug text-zinc-400 md:text-xl">
                  {p.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <StageSection />
      <ExperienceMarqueeStrip />
      <FinalCta />
    </>
  );
}
