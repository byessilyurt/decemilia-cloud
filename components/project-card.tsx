import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Project } from '@/lib/database.types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-2">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-secondary">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-bold text-muted-foreground/20">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs font-mono bg-purple-500/10 hover:bg-purple-500/30 border border-purple-500/20 transition-colors duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          {project.github_url && (
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          <Button size="sm" variant="default" className="flex-1" asChild>
            <Link href={`/projects/${project.slug}`}>Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}