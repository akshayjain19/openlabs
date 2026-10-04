"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { MobileDeviceFrame } from "@/components/work/MobileDeviceFrame";
import { ProjectMediaFrame } from "@/components/work/ProjectMediaFrame";

type Props = {
  project: Project;
  priority?: boolean;
};

function ProjectTitle({ project }: { project: Project }) {
  if (!project.href) return project.name;
  return (
    <Link href={project.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
      {project.name}
    </Link>
  );
}

function AppMedia({ project, priority }: Props) {
  const images = project.appImages ?? [];
  const slots = images.length ? images.slice(0, 3) : [undefined, undefined];

  return (
    <div className="[--app-phone-width:clamp(135px,11vw,146px)] flex min-w-0 items-center justify-center gap-4 overflow-hidden md:justify-end md:gap-5">
      {slots.map((src, index) => (
        <MobileDeviceFrame
          key={`${project.slug}-app-${index}`}
          src={src}
          alt={`${project.imageAlt} — app screen ${index + 1}`}
          fallbackLabel={`${project.name} app screen ${index + 1}`}
          priority={priority && index === 0}
          className="w-[var(--app-phone-width)]"
        />
      ))}
    </div>
  );
}

function WebMedia({ project, priority }: Props) {
  const hasMobile = Boolean(project.mobileWebImage);

  return (
    <div
      className={
        hasMobile
          ? "grid min-w-0 items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:gap-5"
          : "grid min-w-0 items-center"
      }
    >
      <ProjectMediaFrame
        src={project.desktopImage ?? project.image}
        alt={`${project.imageAlt} — web`}
        fallbackLabel={`${project.name} web image`}
        variant="desktop"
        priority={priority}
        className="h-[330px] rounded-[4px] object-contain sm:h-[380px] md:h-[430px] lg:h-[450px]"
      />
      {hasMobile ? (
        <MobileDeviceFrame
          src={project.mobileWebImage}
          alt={`${project.imageAlt} — mobile web`}
          fallbackLabel={`${project.name} mobile web image`}
          variant="web"
          className="justify-self-center md:justify-self-end"
        />
      ) : null}
    </div>
  );
}

function HybridMedia({ project, priority }: Props) {
  return <WebMedia project={project} priority={priority} />;
}

function ProjectMedia({ project, priority }: Props) {
  if (project.type === "app") return <AppMedia project={project} priority={priority} />;
  if (project.type === "hybrid") return <HybridMedia project={project} priority={priority} />;
  return <WebMedia project={project} priority={priority} />;
}

export function ProjectPortfolioCell({ project, priority }: Props) {
  const projectProof = project.proofLine;
  const isApp = project.type === "app";

  return (
    <article className="border border-white/10 px-4 py-5 md:px-6 md:py-6 lg:px-8">
      <div className={isApp ? "grid gap-5 md:grid-cols-[minmax(170px,0.24fr)_minmax(0,0.76fr)] md:items-center lg:gap-8" : "grid gap-5 md:min-h-[480px] md:grid-cols-[minmax(170px,0.24fr)_minmax(0,0.76fr)] md:items-center lg:gap-8"}>
        <div className="md:self-center">
          <h3 className="max-w-[10ch] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <ProjectTitle project={project} />
          </h3>
          {projectProof ? (
            <p className="mt-3 max-w-[24ch] text-sm leading-snug text-zinc-500">
              {projectProof}
            </p>
          ) : null}
        </div>
        <div data-cursor="project">
          <ProjectMedia project={project} priority={priority} />
        </div>
      </div>
    </article>
  );
}
