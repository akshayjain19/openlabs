"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";

type Props = {
  project: Project;
  index: number;
};

export function ProjectShowcase({ project, index }: Props) {
  const titleBlock = (
    <div>
      <p className="text-xs tracking-[0.25em] text-zinc-500">{project.type}</p>
      <h3 className="mt-3 text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
        {project.href ? (
          <Link href={project.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {project.name}
          </Link>
        ) : (
          project.name
        )}
      </h3>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-base">{project.description}</p>
      {project.note ? <p className="mt-3 text-xs text-zinc-600">{project.note}</p> : null}
      {project.highlights?.length ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="border border-white/15 px-2 py-1 text-[10px] tracking-[0.15em] text-zinc-500">
              {h}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const media = (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5 }}
      className="group overflow-hidden border border-white/10"
    >
      <ProjectMedia project={project} />
    </motion.div>
  );

  const wrap = (children: React.ReactNode) => (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      className="mx-auto max-w-[1400px] px-5 md:px-8"
    >
      {children}
    </motion.article>
  );

  switch (project.layout) {
    case "feature":
      return wrap(
        <div className="py-12 md:py-20">
          {titleBlock}
          <div className="mt-10">{media}</div>
        </div>,
      );
    case "split":
      return wrap(
        <div className="grid gap-8 py-12 md:grid-cols-2 md:items-end md:py-16">
          {titleBlock}
          {media}
        </div>,
      );
    case "tall":
      return wrap(
        <div className="grid gap-8 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16">
          <div className="md:pt-16">{titleBlock}</div>
          <div className="max-w-md md:ml-auto">{media}</div>
        </div>,
      );
    case "horizontal":
      return wrap(
        <div className="py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            {titleBlock}
            <div className="lg:-mr-8">{media}</div>
          </div>
        </div>,
      );
    default:
      return wrap(
        <div className="grid gap-8 py-12 md:grid-cols-2 md:py-16">
          {titleBlock}
          {media}
        </div>,
      );
  }
}
