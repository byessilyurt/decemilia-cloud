import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from './blog-card';
import { Button } from './ui/button';
import type { Blog } from '@/lib/database.types';

interface BlogSectionProps {
  blogs: Blog[];
}

export function BlogSection({ blogs }: BlogSectionProps) {
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Latest Articles
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Thoughts on web development, architecture, and best practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayBlogs.length > 0 ? (
            displayBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No articles yet</p>
            </div>
          )}
        </div>

        {blogs.length > 3 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}