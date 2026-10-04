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

  return (
    <article className="border border-white/10 px-4 py-5 md:max-h-[75svh] md:px-6 md:py-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-[minmax(180px,0.28fr)_minmax(0,0.72fr)] md:items-center lg:gap-8">
        <div className="md:self-stretch md:py-2">
          <h3 className="max-w-[12ch] text-[clamp(2rem,3vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            <ProjectTitle project={project} />
          </h3>
        </div>

        {appImages.length ? (
          <div
            className="flex min-w-0 items-end justify-center gap-2 overflow-hidden sm:gap-4 md:justify-end lg:gap-6"
            data-cursor="project"
          >
            {appImages.slice(0, 3).map((src, index) => (
              <MobileDeviceFrame
                key={src}
                src={src}
                alt={`${project.imageAlt} — app screen ${index + 1}`}
                fallbackLabel={`${project.name} app screen ${index + 1}`}
                className={
                  index === 0
                    ? "w-[34%] max-w-[165px] sm:max-w-[230px] md:w-[38%] md:max-w-[270px]"
                    : "w-[27%] max-w-[132px] opacity-90 sm:max-w-[178px] md:w-[29%] md:max-w-[210px]"
                }
              />
            ))}
          </div>
        ) : (
          <div className="relative min-w-0 pb-2 md:pr-[clamp(170px,22vw,285px)]" data-cursor="project">
            <ProjectMediaFrame
              src={desktop}
              alt={`${project.imageAlt} — web`}
              fallbackLabel={`${project.name} web image`}
              variant="desktop"
              className="max-h-[min(46svh,500px)] rounded-sm"
            />
            <MobileDeviceFrame
              src={mobileWeb}
              alt={`${project.imageAlt} — mobile web`}
              fallbackLabel={`${project.name} mobile web image`}
              className="mt-3 w-[45%] min-w-[145px] max-w-[220px] justify-self-end md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[24vw] md:max-w-[265px]"
            />
          </div>
        )}
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
