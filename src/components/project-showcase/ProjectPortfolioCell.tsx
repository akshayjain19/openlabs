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
    <div className="flex min-w-0 items-center justify-center gap-3 overflow-hidden md:justify-end md:gap-5">
      {slots.map((src, index) => (
        <MobileDeviceFrame
          key={`${project.slug}-app-${index}`}
          src={src}
          alt={`${project.imageAlt} — app screen ${index + 1}`}
          fallbackLabel={`${project.name} app screen ${index + 1}`}
          priority={priority && index === 0}
          className={index > 1 ? "hidden h-[330px] w-auto sm:h-[380px] md:h-[430px] lg:block lg:h-[450px]" : "h-[330px] w-auto sm:h-[380px] md:h-[430px] lg:h-[450px]"}
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
          className="h-[280px] w-auto justify-self-center sm:h-[323px] md:h-[366px] lg:h-[383px] md:justify-self-end"
          imageClassName={project.slug === "tattvasri" ? "object-cover object-top" : undefined}
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
  const verifiedProof = project.proof?.[0];

  return (
    <article className="border border-white/10 px-4 py-5 md:px-6 md:py-6 lg:px-8">
      <div className="grid gap-5 md:min-h-[480px] md:grid-cols-[minmax(170px,0.24fr)_minmax(0,0.76fr)] md:items-center lg:gap-8">
        <div className="md:self-center">
          <h3 className="max-w-[10ch] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <ProjectTitle project={project} />
          </h3>
          {verifiedProof ? (
            <p className="mt-5 text-[11px] font-semibold tracking-[0.24em] text-zinc-500 uppercase">
              {verifiedProof}
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
