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

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            GOOD SOFTWARE
            <br />
            STARTS BEFORE
            <br />
            THE CODE.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {principleItems.map((p) => (
              <li key={p.num} className="border-t border-white/10 pt-6">
                <p className="text-xs tracking-[0.25em] text-zinc-600">{p.num}</p>
                <p className="mt-4 whitespace-pre-line text-base leading-snug text-zinc-200 md:text-lg">
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
