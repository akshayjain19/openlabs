import Link from "next/link";
import { openlabsProjects } from "@/content/projects";
import { principles } from "@/content/site";
import { HeroSection } from "@/components/hero/HeroSection";
import { CapabilityList } from "@/components/capability-list/CapabilityList";
import { ProjectShowcase } from "@/components/project-showcase/ProjectShowcase";
import { ExperienceStrip } from "@/components/experience-strip/ExperienceStrip";
import { StageSection } from "@/components/home/StageSection";
import { FinalCta } from "@/components/final-cta/FinalCta";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityList />

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-xs tracking-[0.3em] text-zinc-500">01 / OPENLABS WORK</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em]">
            THINGS WE&apos;VE BUILT.
          </h2>
        </div>
        {openlabsProjects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
        <div className="mx-auto max-w-[1400px] px-5 pb-8 md:px-8">
          <Link href="/work" className="text-xs tracking-[0.25em] text-zinc-400 hover:text-white">
            VIEW ALL WORK →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <p className="border-t border-white/10 pt-10 text-xs tracking-[0.3em] text-zinc-500">
          02 / PROFESSIONAL EXPERIENCE
        </p>
      </div>
      <ExperienceStrip />

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
            {principles.map((p) => (
              <li key={p.num} className="border-t border-white/10 pt-6">
                <p className="text-xs tracking-[0.25em] text-zinc-600">{p.num}</p>
                <p className="mt-4 text-lg leading-snug text-zinc-200 md:text-xl">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <StageSection />
      <FinalCta />
    </>
  );
}
