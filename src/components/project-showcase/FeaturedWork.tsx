"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { MobileDeviceFrame } from "@/components/work/MobileDeviceFrame";
import { ProjectMediaFrame } from "@/components/work/ProjectMediaFrame";

function resolveDesktop(project: Project) {
  return project.desktopImage ?? project.image;
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
  const mobileWeb = project.mobileWebImage;
  const appImages = project.appImages ?? [];
  const [primaryAppImage, secondaryAppImage] = appImages;

  return (
    <article className="border border-white/10 px-4 py-5 md:px-6 md:py-6 lg:px-8">
      <div className="grid gap-5 md:min-h-[480px] md:grid-cols-[minmax(170px,0.24fr)_minmax(0,0.76fr)] md:items-center lg:gap-8">
        <div className="md:self-center">
          <h3 className="max-w-[10ch] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <ProjectTitle project={project} />
          </h3>
        </div>

        {primaryAppImage ? (
          <div
            className="flex min-w-0 items-end justify-center gap-3 overflow-hidden md:justify-end md:gap-5"
            data-cursor="project"
          >
            <MobileDeviceFrame
              src={primaryAppImage}
              alt={`${project.imageAlt} — app screen 1`}
              fallbackLabel={`${project.name} app screen 1`}
              className="w-[47%] max-w-[205px] md:w-[260px] md:max-w-[260px]"
            />
            <MobileDeviceFrame
              src={secondaryAppImage}
              alt={`${project.imageAlt} — app screen 2`}
              fallbackLabel={`${project.name} app screen 2`}
              className="w-[39%] max-w-[170px] opacity-95 md:w-[220px] md:max-w-[220px]"
            />
          </div>
        ) : (
          <div
            className="grid min-w-0 items-end gap-4 md:grid-cols-[minmax(0,1fr)_clamp(200px,21vw,260px)] md:gap-5"
            data-cursor="project"
          >
            <div className="min-w-0">
              <ProjectMediaFrame
                src={desktop}
                alt={`${project.imageAlt} — web`}
                fallbackLabel={`${project.name} web image`}
                variant="desktop"
                className="max-h-[500px] rounded-[4px] object-contain"
              />
            </div>
            <MobileDeviceFrame
              src={mobileWeb}
              alt={`${project.imageAlt} — mobile web`}
              fallbackLabel={`${project.name} mobile web image`}
              className="w-[56%] max-w-[230px] justify-self-center md:w-full md:max-w-[260px] md:justify-self-end"
            />
          </div>
        )}
      </div>
    </article>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-8 md:py-9">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-5 space-y-4 md:space-y-5">
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
