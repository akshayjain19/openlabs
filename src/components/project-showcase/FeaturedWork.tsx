"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { LEGACY_MOBILE } from "@/lib/project-media";
import { ProjectMediaFrame } from "@/components/work/ProjectMediaFrame";

function resolveDesktop(project: Project) {
  return project.desktopImage ?? project.image;
}

function resolveMobile(project: Project) {
  if (project.mobileImage) return project.mobileImage;
  const legacy = project.gallery?.find((g) => g.includes(LEGACY_MOBILE)) ?? project.gallery?.[0];
  return legacy;
}

function ProjectTitle({ project }: { project: Project }) {
  if (!project.href) return project.name;
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-75"
    >
      {project.name}
    </Link>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const desktop = resolveDesktop(project);
  const mobile = resolveMobile(project);

  return (
    <article className="py-1 md:max-h-[72svh] md:py-2">
      <h3 className="text-lg font-semibold tracking-tight md:text-xl">
        <ProjectTitle project={project} />
      </h3>

      <div className="relative mt-3 overflow-visible md:mt-4" data-cursor="project">
        <ProjectMediaFrame
          src={desktop}
          alt={`${project.imageAlt} — desktop`}
          fallbackLabel={project.name}
          variant="desktop"
          className="max-h-[min(38svh,420px)] rounded-sm"
        />
        <div className="absolute right-2 bottom-2 w-[23%] min-w-[84px] max-w-[140px] md:right-5 md:bottom-5 md:w-[20%] md:max-w-[160px]">
          <ProjectMediaFrame
            src={mobile}
            alt={`${project.imageAlt} — mobile`}
            fallbackLabel={`${project.name} app`}
            variant="mobile"
            className="max-h-[min(29svh,290px)]"
          />
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-9 md:py-10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-6 space-y-7 md:space-y-8">
          {projects.map((project) => (
            <FeaturedProject key={project.slug} project={project} />
          ))}
        </div>
        <Link href="/work" className="mt-7 inline-block text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white">
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
