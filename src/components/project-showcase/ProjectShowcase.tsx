"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectMediaFrame } from "@/components/work/ProjectMediaFrame";

type Props = {
  project: Project;
};

function Title({ project }: { project: Project }) {
  if (project.href) {
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
  return project.name;
}

function ProjectVisual({ project, tall }: { project: Project; tall?: boolean }) {
  const src = project.desktopImage ?? project.image;
  const mobile = project.mobileImage ?? project.gallery?.[0];
  const maxClass = tall ? "max-h-[min(43svh,460px)]" : "max-h-[min(40svh,430px)]";

  return (
    <div data-cursor="project" className="group relative overflow-visible rounded-sm">
      <ProjectMediaFrame
        src={src}
        alt={project.imageAlt}
        fallbackLabel={project.name}
        variant="desktop"
        className={maxClass}
      />
      <div className="absolute right-2 bottom-2 w-[22%] min-w-[82px] max-w-[132px] md:right-5 md:bottom-5 md:w-[18%] md:max-w-[150px]">
        <ProjectMediaFrame
          src={mobile}
          alt={`${project.imageAlt} — mobile`}
          fallbackLabel={`${project.name} mobile`}
          variant="mobile"
          className="max-h-[min(30svh,300px)]"
        />
      </div>
    </div>
  );
}

function MetaBlock({ project }: { project: Project }) {
  return (
    <div>
      <h3 className="text-[clamp(1.2rem,2vw,2rem)] font-semibold leading-tight tracking-[-0.03em]">
        <Title project={project} />
      </h3>
      <p className="mt-1 text-[10px] tracking-[0.32em] text-zinc-500 uppercase">{project.type}</p>
      <p className="mt-2 max-w-lg text-sm text-zinc-500">
        {project.proofLine ?? project.outcome ?? project.description}
      </p>
      {project.note ? <p className="mt-2 text-xs text-zinc-600">{project.note}</p> : null}
    </div>
  );
}

export function ProjectShowcase({ project }: Props) {
  const variant =
    project.slug === "viacation"
      ? "a"
      : project.slug === "our-shopee" ||
          project.slug === "indore-nursery" ||
          project.slug === "tattvasri"
        ? "b"
        : "c";

  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-12 md:px-8 md:pb-14">
      {variant === "a" ? (
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:items-end md:gap-10">
          <MetaBlock project={project} />
          <ProjectVisual project={project} />
        </div>
      ) : null}
      {variant === "b" ? (
        <div className="space-y-5">
          <ProjectVisual project={project} tall />
          <MetaBlock project={project} />
        </div>
      ) : null}
      {variant === "c" ? (
        <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
          <ProjectVisual project={project} />
          <MetaBlock project={project} />
        </div>
      ) : null}
    </article>
  );
}
