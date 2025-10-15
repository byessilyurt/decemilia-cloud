'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { KeywordsSection } from '@/components/keywords-section';
import { ProjectsSection } from '@/components/projects-section';
import { BlogSection } from '@/components/blog-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: blogsData } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (projectsData) setProjects(projectsData);
      if (blogsData) setBlogs(blogsData);
    }

    fetchData();
  }, []);

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
