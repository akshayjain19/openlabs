"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectImage } from "@/components/work/ProjectImage";

function ProjectTitle({ project }: { project: Project }) {
  const title = project.name;
  if (project.href) {
    return (
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-75"
      >
        {title}
      </Link>
    );
  }
  return title;
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <>
      <h3 className="text-[clamp(1.35rem,2.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">
        <ProjectTitle project={project} />
      </h3>
      <p className="mt-1 text-[10px] tracking-[0.32em] text-zinc-500 uppercase">{project.type}</p>
      <p className="mt-2 max-w-md text-sm text-zinc-500">
        {project.proofLine ?? project.outcome ?? project.description}
      </p>
    </>
  );
}

function Visual({ project, className = "" }: { project: Project; className?: string }) {
  const src = project.image;
  if (!src) return null;
  return (
    <div
      data-cursor="project"
      className={`group relative overflow-hidden rounded-sm ${className}`}
    >
      <ProjectImage src={src} alt={project.imageAlt} className="max-h-[min(42vh,520px)] object-cover object-top" />
    </div>
  );
}

function VariantA({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:items-end md:gap-8">
      <ProjectMeta project={project} />
      <Visual project={project} />
    </article>
  );
}

function VariantB({ project }: { project: Project }) {
  return (
    <article className="space-y-4">
      <Visual project={project} />
      <ProjectMeta project={project} />
    </article>
  );
}

function VariantC({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 md:grid-cols-2 md:items-center md:gap-10">
      <Visual project={project} className="md:order-2" />
      <div className="md:order-1">
        <ProjectMeta project={project} />
      </div>
    </article>
  );
}

const layoutBySlug: Record<string, "a" | "b" | "c"> = {
  viacation: "a",
  "indore-nursery": "b",
  "sg11-fantasy": "c",
  "the-laundry-house": "c",
};

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-[70px] md:py-[90px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-8 space-y-[50px] md:mt-10 md:space-y-[72px]">
          {projects.map((project) => {
            const variant = layoutBySlug[project.slug] ?? "a";
            if (variant === "b") return <VariantB key={project.slug} project={project} />;
            if (variant === "c") return <VariantC key={project.slug} project={project} />;
            return <VariantA key={project.slug} project={project} />;
          })}
        </div>
        <Link
          href="/work"
          className="mt-10 inline-block text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white"
        >
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
