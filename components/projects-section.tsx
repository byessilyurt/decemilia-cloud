import { ProjectCard } from './project-card';
import type { Project } from '@/lib/database.types';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            A selection of work showcasing expertise in modern web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.length > 0 ? (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No projects yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}