import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectPortfolioCell } from "@/components/project-showcase/ProjectPortfolioCell";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-8 md:py-9">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-5 space-y-4 md:space-y-5">
          {projects.map((project, index) => (
            <ProjectPortfolioCell key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
        <Link href="/work" className="mt-7 inline-block text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white">
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
