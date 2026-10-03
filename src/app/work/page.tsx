import type { Metadata } from "next";
import { korvaLabsProjects } from "@/content/projects";
import { ProjectShowcase } from "@/components/project-showcase/ProjectShowcase";
import {
  ExperienceMarqueeStrip,
  ProfessionalExperienceIntro,
} from "@/components/experience-strip/ExperienceStrip";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected products, platforms, and digital experiences built by KorvaLabs — plus the scale of experience behind the team.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          SELECTED WORK
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Products, platforms and digital experiences we&apos;ve built.
        </p>
      </div>

      <div className="mt-12">
        <p className="mx-auto max-w-[1400px] px-5 text-xs tracking-[0.3em] text-zinc-500 md:px-8">
          KORVALABS WORK
        </p>
        {korvaLabsProjects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>

      <ProfessionalExperienceIntro />
      <ExperienceMarqueeStrip />
    </div>
  );
}
