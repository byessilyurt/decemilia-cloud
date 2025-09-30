import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import type { Blog } from '@/lib/database.types';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

async function getBlog(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.cover_image ? [blog.cover_image] : [],
      type: 'article',
      publishedTime: blog.published_at,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = new Date(blog.published_at);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/#blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-3xl mx-auto space-y-8">
          {blog.cover_image && (
            <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-border">
              <Image
                src={blog.cover_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={blog.published_at}>{format(publishedDate, 'MMMM d, yyyy')}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.reading_time} min read</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {blog.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground">{blog.excerpt}</p>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm font-mono">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border pt-8">
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-secondary prose-pre:border prose-pre:border-border
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:marker:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
            />
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Share this article</p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}