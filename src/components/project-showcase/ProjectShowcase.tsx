"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { KorvaFrame } from "@/components/ui/KorvaFrame";

type Props = {
  project: Project;
  index: number;
};

function SpreadMedia({ project, aspect = "aspect-[16/10]" }: { project: Project; aspect?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  return (
    <motion.div
      ref={ref}
      data-cursor="project"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        mx.set(px * 14);
        my.set(py * 10);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={`group relative overflow-hidden border border-white/10 ${aspect}`}
    >
      <ProjectMedia project={project} className="h-full min-h-full !aspect-auto" />
    </motion.div>
  );
}

function IndexMark({ n }: { n: number }) {
  return (
    <p className="select-none text-[clamp(4rem,14vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.06]">
      {String(n).padStart(2, "0")}
    </p>
  );
}

function MetaLine({ project }: { project: Project }) {
  return (
    <p className="mt-3 text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
      {project.highlights?.join(" / ") ?? project.type.toUpperCase()}
    </p>
  );
}

export function ProjectShowcase({ project, index }: Props) {
  const num = index + 1;
  const title = project.href ? (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:opacity-70"
    >
      {project.name}
    </Link>
  ) : (
    project.name
  );

  const wrap = (children: React.ReactNode) => (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-[1400px] px-5 md:px-8"
    >
      <KorvaFrame variant="rule" className="mb-10 md:mb-14" />
      {children}
    </motion.article>
  );

  switch (project.slug) {
    case "indore-nursery":
      return wrap(
        <div className="pb-16 md:pb-24">
          <SpreadMedia project={project} aspect="aspect-[16/9] md:aspect-[2/1]" />
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-zinc-500">E-COMMERCE</p>
              <h3 className="mt-2 text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
                {title}
              </h3>
              <MetaLine project={project} />
            </div>
            <IndexMark n={num} />
          </div>
        </div>,
      );
    case "tattvasri":
      return wrap(
        <div className="grid gap-8 pb-16 md:grid-cols-12 md:gap-6 md:pb-24">
          <div className="md:col-span-5 md:pt-20">
            <IndexMark n={num} />
            <h3 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              {title}
            </h3>
            <p className="mt-3 text-[10px] tracking-[0.35em] text-zinc-500">E-COMMERCE / LIFESTYLE</p>
            <MetaLine project={project} />
          </div>
          <div className="md:col-span-7 md:-mt-6">
            <SpreadMedia project={project} aspect="aspect-[4/5] md:aspect-[3/4]" />
          </div>
        </div>,
      );
    case "viacation":
      return wrap(
        <div className="grid gap-8 pb-16 md:grid-cols-[0.85fr_1.15fr] md:pb-28">
          <div className="flex flex-col justify-end">
            <h3 className="text-[clamp(2rem,6vw,4rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
              {title}
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">{project.description}</p>
            <MetaLine project={project} />
          </div>
          <SpreadMedia project={project} aspect="aspect-[9/16] max-h-[78vh] md:ml-auto md:max-w-md" />
        </div>,
      );
    case "sg11-fantasy":
      return wrap(
        <div className="relative pb-20 md:pb-28">
          <IndexMark n={num} />
          <div className="mt-2 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SpreadMedia project={project} aspect="aspect-[16/11]" />
            <div className="lg:-ml-12 lg:translate-y-8 lg:border lg:border-white/10 lg:bg-[#070707] lg:p-8">
              <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[-0.03em]">{title}</h3>
              <p className="mt-2 text-[10px] tracking-[0.3em] text-zinc-500">FANTASY SPORTS</p>
              <MetaLine project={project} />
            </div>
          </div>
        </div>,
      );
    default:
      return wrap(
        <div className="grid gap-8 pb-16 md:grid-cols-2 md:pb-20">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-zinc-500">{project.type.toUpperCase()}</p>
            <h3 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.03em]">{title}</h3>
            <p className="mt-4 max-w-md text-sm text-zinc-500">{project.description}</p>
            {project.note ? <p className="mt-2 text-xs text-zinc-600">{project.note}</p> : null}
            <MetaLine project={project} />
          </div>
          <SpreadMedia project={project} />
        </div>,
      );
  }
}
