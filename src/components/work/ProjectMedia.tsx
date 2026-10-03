import type { Project } from "@/content/projects";

type Props = {
  project: Project;
  className?: string;
};

export function ProjectMedia({ project, className = "" }: Props) {
  const label = project.name.replace(/\s+/g, " ");

  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={project.imageAlt}
        className={`aspect-[16/10] w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden bg-[#101010] ${className}`}
      role="img"
      aria-label={project.imageAlt}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_55%)]" />
      <div className="absolute inset-0 flex items-end p-6 md:p-10">
        <p className="max-w-[90%] text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-white/90">
          {label}
        </p>
      </div>
      <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] text-zinc-600">OPENLABS</div>
    </div>
  );
}
