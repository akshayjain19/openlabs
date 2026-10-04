import type { Project } from "@/content/projects";
import { ProjectPortfolioCell } from "@/components/project-showcase/ProjectPortfolioCell";

type Props = {
  project: Project;
};

export function ProjectShowcase({ project }: Props) {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
      <ProjectPortfolioCell project={project} />
    </div>
  );
}
