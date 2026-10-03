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
  const proofTags = project.highlights?.slice(0, 3) ?? project.proof?.slice(0, 3);

  return (
    <article className="max-h-none min-h-0 md:max-h-[72svh] md:min-h-[52svh]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
          <ProjectTitle project={project} />
        </h3>
        <p className="text-[10px] tracking-[0.32em] text-zinc-500 uppercase">{project.type}</p>
      </div>

      <div className="relative mt-4 md:mt-5" data-cursor="project">
        <ProjectMediaFrame
          src={desktop}
          alt={`${project.imageAlt} — desktop`}
          fallbackLabel={project.name}
          variant="desktop"
          className="max-h-[min(38vh,420px)] rounded-sm"
        />
        <div className="absolute right-2 bottom-2 w-[22%] min-w-[88px] max-w-[150px] md:right-4 md:bottom-4 md:w-[20%]">
          <ProjectMediaFrame
            src={mobile}
            alt={`${project.imageAlt} — mobile`}
            fallbackLabel={`${project.name} app`}
            variant="mobile"
            className="max-h-[min(28vh,320px)]"
          />
        </div>
      </div>

      <p className="mt-3 max-w-lg text-sm text-zinc-500">
        {project.proofLine ?? project.outcome}
      </p>
      {proofTags?.length ? (
        <p className="mt-2 text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
          {proofTags.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-8 space-y-10 md:space-y-12">
          {projects.map((project) => (
            <FeaturedProject key={project.slug} project={project} />
          ))}
        </div>
        <Link
          href="/work"
          className="mt-8 inline-block text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white"
        >
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
