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
    <article className="py-2 md:max-h-[75svh] md:py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-lg font-semibold tracking-tight md:text-xl">
          <ProjectTitle project={project} />
        </h3>
        <p className="text-[10px] tracking-[0.32em] text-zinc-500 uppercase">{project.type}</p>
      </div>

      <p className="mt-2 max-w-lg text-sm text-zinc-500">
        {project.proofLine ?? project.outcome}
      </p>

      <div className="relative mt-4 overflow-visible md:mt-5" data-cursor="project">
        <ProjectMediaFrame
          src={desktop}
          alt={`${project.imageAlt} — desktop`}
          fallbackLabel={project.name}
          variant="desktop"
          className="max-h-[min(43svh,460px)] rounded-sm"
        />
        <div className="absolute right-2 bottom-2 w-[22%] min-w-[82px] max-w-[132px] md:right-5 md:bottom-5 md:w-[18%] md:max-w-[150px]">
          <ProjectMediaFrame
            src={mobile}
            alt={`${project.imageAlt} — mobile`}
            fallbackLabel={`${project.name} app`}
            variant="mobile"
            className="max-h-[min(30svh,300px)]"
          />
        </div>
      </div>

      {proofTags?.length ? (
        <p className="mt-3 text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
          {proofTags.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-10 md:py-12">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-7 space-y-8 md:space-y-10">
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
