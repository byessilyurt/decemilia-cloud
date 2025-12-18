import { CaseStudyCard } from './case-study-card';
import type { Project } from '@/lib/database.types';

interface CaseStudiesSectionProps {
  projects: Project[];
}

export function CaseStudiesSection({ projects }: CaseStudiesSectionProps) {
  return (
    <section id="case-studies" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-background to-cyan-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Case Studies
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real solutions we&apos;ve built for real businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.length > 0 ? (
            projects.map((project) => <CaseStudyCard key={project.id} project={project} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">Case studies coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Keep old export for backwards compatibility during transition
export { CaseStudiesSection as ProjectsSection };