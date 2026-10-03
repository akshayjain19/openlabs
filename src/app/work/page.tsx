import type { Metadata } from "next";
import { openlabsProjects, experienceProjects } from "@/content/projects";
import { WorkEntry } from "@/components/work/WorkEntry";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected products, platforms, and digital experiences built by OpenLabs — plus the scale of experience behind the team.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <p className="text-[10px] tracking-[0.35em] text-zinc-500">PORTFOLIO</p>
        <h1 className="mt-6 text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          SELECTED WORK
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Products, platforms and digital experiences we&apos;ve built.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-5 md:px-8">
        <p className="border-b border-white/10 pb-4 text-xs tracking-[0.3em] text-zinc-500">01 / OPENLABS WORK</p>
        {openlabsProjects.map((project) => (
          <WorkEntry key={project.slug} project={project} />
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[1400px] px-5 md:px-8">
        <p className="border-b border-white/10 pb-4 text-xs tracking-[0.3em] text-zinc-500">
          02 / PROFESSIONAL EXPERIENCE
        </p>
        <p className="max-w-3xl py-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          The companies below reflect where our team has worked — not OpenLabs clients. They
          explain the product and engineering judgment we bring to founder and SMB engagements.
        </p>
        {experienceProjects.map((project) => (
          <WorkEntry key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
