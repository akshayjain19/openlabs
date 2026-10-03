import type { Metadata } from "next";
import { korvaLabsProjects } from "@/content/projects";
import { ProjectShowcase } from "@/components/project-showcase/ProjectShowcase";
import { ExperienceLogoGrid } from "@/components/experience-strip/ExperienceLogoGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Products and platforms built by KorvaLabs.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = [...korvaLabsProjects].sort(
    (a, b) => (b.leadPriority ?? 0) - (a.leadPriority ?? 0),
  );

  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          SELECTED WORK
        </h1>
        <p className="mt-4 max-w-lg text-sm text-zinc-500">Products, platforms and digital experiences.</p>
      </div>

      <div className="mt-10">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>

      <ExperienceLogoGrid />
    </div>
  );
}
