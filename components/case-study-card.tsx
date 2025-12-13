import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { Project } from '@/lib/database.types';

interface CaseStudyCardProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  'web-application': 'Web Application',
  'ecommerce': 'E-commerce',
  'automation': 'Automation',
  'micro-saas': 'Micro-SaaS',
  'extension': 'Extension',
  'desktop': 'Desktop App',
};

const categoryColors: Record<string, string> = {
  'web-application': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'ecommerce': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'automation': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'micro-saas': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'extension': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'desktop': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  const category = (project as any).category || 'web-application';
  const outcome = (project as any).outcome;

  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-secondary">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/50">
            <div className="text-5xl font-bold text-muted-foreground/20">
              {project.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className={`text-xs font-medium border ${categoryColors[category] || categoryColors['web-application']}`}
          >
            {categoryLabels[category] || 'Project'}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold tracking-tight">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Outcome highlight */}
        {outcome && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-sm font-medium text-foreground">{outcome}</p>
          </div>
        )}

        {/* Tech stack - subtle */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs text-muted-foreground/70 bg-secondary px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="text-xs text-muted-foreground/50">
              +{project.tech_stack.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group/link pt-2"
        >
          View Case Study
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
