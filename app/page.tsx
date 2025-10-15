import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { KeywordsSection } from '@/components/keywords-section';
import { ProjectsSection } from '@/components/projects-section';
import { BlogSection } from '@/components/blog-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { createServerClient } from '@/lib/supabase';

async function getProjects() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

async function getBlogs() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

export default async function Home() {
  const projects = await getProjects();
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <KeywordsSection />
        <ProjectsSection projects={projects} />
        <BlogSection blogs={blogs} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
