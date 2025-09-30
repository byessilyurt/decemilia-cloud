import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { Blog } from '@/lib/database.types';
import { format } from 'date-fns';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const publishedDate = new Date(blog.published_at);

  return (
    <Link href={`/blog/${blog.slug}`}>
      <Card className="group overflow-hidden border-border bg-card hover:border-muted-foreground/50 transition-all duration-300 glow-hover h-full">
        <div className="relative h-48 sm:h-52 overflow-hidden bg-secondary">
          {blog.cover_image ? (
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl font-bold text-muted-foreground/20">
                {blog.title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={blog.published_at}>{format(publishedDate, 'MMM d, yyyy')}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{blog.reading_time} min read</span>
            </div>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2">
            {blog.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base line-clamp-2">
            {blog.excerpt}
          </CardDescription>
        </CardHeader>

        {blog.tags && blog.tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-mono bg-secondary/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}