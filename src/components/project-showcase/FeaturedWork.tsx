"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";

function FeaturedVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 20 });
  const sy = useSpring(my, { stiffness: 140, damping: 20 });

  return (
    <motion.div
      ref={ref}
      data-cursor="project"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
        my.set(((e.clientY - rect.top) / rect.height - 0.5) * 8);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="group relative mt-4 overflow-hidden border border-white/10"
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={1600}
          height={900}
          className="h-auto w-full object-cover grayscale transition duration-700 group-hover:grayscale-[0.15]"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      ) : (
        <ProjectMedia project={project} className="!aspect-[16/9]" />
      )}
    </motion.div>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em]">
          THINGS WE&apos;VE BUILT.
        </h2>
        <div className="mt-10 space-y-14 md:mt-12 md:space-y-16">
          {projects.map((project) => {
            const title = project.href ? (
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                {project.name}
              </Link>
            ) : (
              project.name
            );
            const proofLine = project.proof?.[0] ?? project.outcome ?? project.description;

            return (
              <article key={project.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
                    <p className="mt-1 text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
                      {project.type}
                    </p>
                  </div>
                  <p className="max-w-sm text-right text-sm text-zinc-500">{proofLine}</p>
                </div>
                <FeaturedVisual project={project} />
              </article>
            );
          })}
        </div>
        <Link
          href="/work"
          className="mt-12 inline-block text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white"
        >
          VIEW ALL WORK →
        </Link>
      </div>
    </section>
  );
}
