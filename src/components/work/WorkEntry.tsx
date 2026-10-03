"use client";

import { useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";

export function WorkEntry({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="border-t border-white/10">
      <button
        type="button"
        className="flex w-full items-baseline justify-between gap-6 py-8 text-left md:py-10"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <p className="text-xs tracking-[0.25em] text-zinc-500">{project.type}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{project.name}</h2>
        </div>
        <span className="text-xs tracking-[0.3em] text-zinc-500">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="grid gap-8 pb-10 md:grid-cols-2">
          <div>
            <p className="text-sm leading-relaxed text-zinc-400">{project.description}</p>
            {project.note ? (
              <p className="mt-3 text-xs text-zinc-600">{project.note}</p>
            ) : null}
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-xs tracking-[0.25em] text-zinc-400 hover:text-white"
              >
                VISIT SITE →
              </a>
            ) : null}
          </div>
          <ProjectMedia project={project} />
        </div>
      ) : null}
    </article>
  );
}
