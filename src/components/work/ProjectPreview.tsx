"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";

type Props = {
  project: Project;
  index: number;
};

export function ProjectPreview({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group border-t border-white/10 py-12 md:py-16"
    >
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 md:grid-cols-[1fr_1.2fr] md:items-end md:px-8">
        <div>
          <p className="text-xs tracking-[0.25em] text-zinc-500">{project.type}</p>
          <h3 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            {project.href ? (
              <Link href={project.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">{project.description}</p>
          {project.note ? (
            <p className="mt-3 text-xs tracking-wide text-zinc-600">{project.note}</p>
          ) : null}
        </div>
        <div className="overflow-hidden border border-white/10">
          <ProjectMedia project={project} />
        </div>
      </div>
    </motion.article>
  );
}
