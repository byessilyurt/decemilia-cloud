import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { createServerClient } from '@/lib/supabase';
import type { Metadata } from 'next';
import type { Project } from '@/lib/database.types';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image_url ? [project.image_url] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          {project.image_url && (
            <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-border">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm font-mono">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.demo_url && (
              <Button size="lg" asChild>
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button size="lg" variant="outline" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  View Source
                </a>
              </Button>
            )}
          </div>

          {project.content && (
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="whitespace-pre-wrap text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br/>') }}
              />
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}