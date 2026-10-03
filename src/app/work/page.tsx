import type { Metadata } from "next";
import { openlabsProjects } from "@/content/projects";
import { ProjectShowcase } from "@/components/project-showcase/ProjectShowcase";
import { ExperienceStrip } from "@/components/experience-strip/ExperienceStrip";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected products, platforms, and digital experiences built by OpenLabs — plus the scale of experience behind the team.",
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
          OPENLABS WORK
        </p>
        {openlabsProjects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-5 md:px-8">
        <p className="border-t border-white/10 pt-10 text-xs tracking-[0.3em] text-zinc-500">
          PROFESSIONAL EXPERIENCE
        </p>
      </div>
      <ExperienceStrip />
    </div>
  );
}
