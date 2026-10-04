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
    <article className="border border-white/10 px-4 py-5 md:max-h-[75svh] md:px-6 md:py-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-[minmax(180px,0.28fr)_minmax(0,0.72fr)] md:items-center lg:gap-8">
        <div className="md:self-stretch md:py-2">
          <h3 className="max-w-[12ch] text-[clamp(2rem,3vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            <ProjectTitle project={project} />
          </h3>
        </div>

        <div
          className="grid min-w-0 items-end gap-3 md:grid-cols-[minmax(0,0.76fr)_minmax(104px,0.22fr)] md:gap-4 lg:gap-5"
          data-cursor="project"
        >
          <ProjectMediaFrame
            src={desktop}
            alt={`${project.imageAlt} — web`}
            fallbackLabel={`${project.name} web image`}
            variant="desktop"
            className="max-h-[min(46svh,500px)] rounded-sm"
          />
          <div className="w-[42%] min-w-[108px] max-w-[170px] justify-self-end md:w-full md:max-w-[190px]">
            <ProjectMediaFrame
              src={mobile}
              alt={`${project.imageAlt} — mobile`}
              fallbackLabel={`${project.name} mobile image`}
              variant="mobile"
              className="max-h-[min(43svh,430px)]"
            />
          </div>
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
        <div className="mt-6 space-y-6 md:space-y-8">
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
